<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Repost;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    private function resolveOptionalAuth(Request $request): void
    {
        try {
            if (!$request->user() && $request->bearerToken()) {
                $token = PersonalAccessToken::findToken($request->bearerToken());
                if ($token) {
                    $request->setUserResolver(fn () => $token->tokenable);
                }
            }
        } catch (\Throwable $e) {
            // Silent fail
        }
    }

    public function show(Request $request, User $user): JsonResponse
    {
        $this->resolveOptionalAuth($request);

        $user->load('posts');
        $user->loadCount('posts', 'followers', 'following');

        $reputation = $user->posts()->sum('reposts_count');

        $isFollowing = false;
        if ($request->user()) {
            $isFollowing = $user->followers()->where('user_id', $request->user()->id)->exists();
        }

        return response()->json([
            'user' => array_merge($user->toArray(), [
                'is_following' => $isFollowing,
                'reputation' => $reputation,
            ]),
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'avatar' => ['nullable', 'url', 'max:500'],
            'bio' => ['nullable', 'string'],
            'role' => ['nullable', 'string', 'max:255'],
        ]);

        $user->update($validated);

        return response()->json([
            'user' => $user,
        ]);
    }

    public function uploadAvatar(Request $request): JsonResponse
    {
        $request->validate([
            'avatar' => ['required', 'file', 'mimes:jpg,jpeg,png,gif,webp', 'max:2048'],
        ]);

        $file = $request->file('avatar');
        $path = $file->store('avatars', 'public');

        $user = $request->user();
        $user->update(['avatar' => Storage::disk('public')->url($path)]);

        return response()->json([
            'user' => $user,
            'avatar_url' => Storage::disk('public')->url($path),
        ]);
    }

    public function search(Request $request): JsonResponse
    {
        $query = $request->get('q', '');

        if (strlen($query) < 2) {
            return response()->json(['users' => [], 'posts' => []]);
        }

        $users = User::where('name', 'LIKE', "%{$query}%")
            ->orWhere('username', 'LIKE', "%{$query}%")
            ->limit(5)
            ->get();

        $posts = Post::with('user')
            ->where('title', 'LIKE', "%{$query}%")
            ->orWhere('body', 'LIKE', "%{$query}%")
            ->limit(5)
            ->orderByDesc('created_at')
            ->get();

        return response()->json(['users' => $users, 'posts' => $posts]);
    }

    public function suggested(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        // Get users that I follow
        $myFollowing = DB::table('follows')
            ->where('user_id', $userId)
            ->pluck('followed_user_id');

        if ($myFollowing->isEmpty()) {
            // If I follow no one, return random users
            $users = User::where('id', '!=', $userId)
                ->withCount('followers')
                ->inRandomOrder()
                ->limit(5)
                ->get();

            return response()->json(['users' => $users]);
        }

        // Find users who follow the same people as me (mutual followers)
        $suggestedRows = DB::table('follows')
            ->whereIn('followed_user_id', $myFollowing)
            ->where('user_id', '!=', $userId)
            ->whereNotIn('user_id', function ($query) use ($userId) {
                $query->select('followed_user_id')
                      ->from('follows')
                      ->where('user_id', $userId);
            })
            ->select('user_id', DB::raw('COUNT(*) as mutual_count'))
            ->groupBy('user_id')
            ->orderByDesc('mutual_count')
            ->limit(5)
            ->get();

        $suggestedIds = $suggestedRows->pluck('user_id');
        $mutualCounts = $suggestedRows->pluck('mutual_count', 'user_id');

        $users = User::whereIn('id', $suggestedIds)
            ->withCount('followers')
            ->orderByRaw('FIELD(id, ' . $suggestedIds->implode(',') . ')')
            ->get()
            ->map(function ($user) use ($mutualCounts) {
                $user->mutual_count = $mutualCounts->get($user->id, 0);
                return $user;
            });

        return response()->json(['users' => $users]);
    }

    public function stats(User $user): JsonResponse
    {
        $weeks = 8;
        $labels = [];
        $posts = [];
        $reposts = [];

        for ($i = $weeks - 1; $i >= 0; $i--) {
            $weekStart = now()->subWeeks($i + 1)->startOfWeek();
            $weekEnd = now()->subWeeks($i)->endOfWeek();
            $labels[] = 'W' . ($weeks - $i);

            $postCount = Post::where('user_id', $user->id)
                ->whereBetween('created_at', [$weekStart, $weekEnd])
                ->count();
            $posts[] = $postCount;

            $repostCount = Repost::whereHas('post', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->whereBetween('created_at', [$weekStart, $weekEnd])->count();
            $reposts[] = $repostCount;
        }

        return response()->json([
            'labels' => $labels,
            'posts' => $posts,
            'reposts' => $reposts,
        ]);
    }
}
