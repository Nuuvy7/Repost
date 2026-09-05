<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Models\Post;
use App\Models\Repost;
use App\Notifications\PostReposted;
use App\Notifications\PostCreated;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;

class PostController extends Controller
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
            // Silent fail — posts still load for unauthenticated users
        }
    }

    private function expandFilter(string $filter): string
    {
        return match($filter) {
            'jakut'  => 'Jakarta Utara',
            'jaksel' => 'Jakarta Selatan',
            'jakpus' => 'Jakarta Pusat',
            'jaktim' => 'Jakarta Timur',
            'jakbar' => 'Jakarta Barat',
            default  => $filter,
        };
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $this->resolveOptionalAuth($request);

        $query = Post::with(['user', 'comments', 'likes'])
            ->withCount(['likes', 'comments', 'reposts']);

        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('location') && $request->location !== 'all') {
            $filter = $request->location;
            $query->where(function ($q) use ($filter) {
                $q->where('location_name', 'LIKE', '%' . $filter . '%')
                  ->orWhere('location_name', 'LIKE', '%' . $this->expandFilter($filter) . '%');
            });
        }

        $posts = $query->orderByDesc('reposts_count')
            ->orderByDesc('created_at')
            ->paginate($request->get('per_page', 15));

        return \App\Http\Resources\PostResource::collection($posts);
    }

    public function show(Post $post): \App\Http\Resources\PostResource
    {
        $this->resolveOptionalAuth(request());

        $post->load(['user', 'comments.user', 'likes']);
        $post->loadCount('likes', 'comments', 'reposts');

        return new \App\Http\Resources\PostResource($post);
    }

    public function store(StorePostRequest $request): JsonResponse
    {
        $post = $request->user()->posts()->create($request->validated());
        $post->load('user');

        // Notify recent followers about new post (limit to prevent spam)
        $followers = $request->user()->followers()->latest()->limit(100)->get();
        foreach ($followers as $follower) {
            if ($follower->id !== $request->user()->id) {
                $follower->notify(new PostCreated($post, $request->user()));
            }
        }

        return response()->json([
            'post' => $post,
        ], 201);
    }

    public function update(UpdatePostRequest $request, Post $post): JsonResponse
    {
        if ($request->user()->id !== $post->user_id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $post->update($request->validated());
        $post->load('user');

        return response()->json([
            'post' => $post,
        ]);
    }

    public function destroy(Request $request, Post $post): JsonResponse
    {
        if ($request->user()->id !== $post->user_id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully.',
        ]);
    }

    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:jpg,jpeg,png,gif,webp', 'max:10240'],
        ]);

        $file = $request->file('file');
        $path = $file->store('posts', 'public');

        return response()->json([
            'url' => Storage::disk('public')->url($path),
            'path' => $path,
        ]);
    }

    public function trending(): AnonymousResourceCollection
    {
        $posts = Post::with(['user'])
            ->withCount(['likes', 'comments', 'reposts'])
            ->where('reposts_count', '>', 0)
            ->orderByDesc('reposts_count')
            ->limit(5)
            ->get();

        return \App\Http\Resources\PostResource::collection($posts);
    }

    public function toggleRepost(Request $request, Post $post): JsonResponse
    {
        $user = $request->user();
        $existing = $post->reposts()->where('user_id', $user->id)->first();

        if ($existing) {
            $post->reposts()->detach($user->id);
            $post->decrement('reposts_count');
            $post->user->decrement('reputation');

            return response()->json([
                'reposted' => false,
                'count' => $post->reposts_count,
            ]);
        }

        $post->reposts()->attach($user->id);
        $post->increment('reposts_count');
        $post->user->increment('reputation');

        // Notify original author (if not self-repost)
        if ($post->user_id !== $user->id) {
            $post->user->notify(new \App\Notifications\PostReposted($post, $user));
        }

        return response()->json([
            'reposted' => true,
            'count' => $post->reposts_count,
        ]);
    }
}