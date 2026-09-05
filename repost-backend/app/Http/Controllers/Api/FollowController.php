<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Follow;
use App\Models\User;
use App\Notifications\UserFollowed;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FollowController extends Controller
{
    public function toggle(Request $request, User $user): JsonResponse
    {
        $currentUser = $request->user();

        if ($currentUser->id === $user->id) {
            return response()->json(['message' => 'Tidak bisa follow diri sendiri'], 400);
        }

        return DB::transaction(function () use ($currentUser, $user) {
            $existing = Follow::where('user_id', $currentUser->id)
                ->where('followed_user_id', $user->id)
                ->lockForUpdate()
                ->first();

            if ($existing) {
                $existing->delete();
                $user->decrement('followers_count');

                return response()->json([
                    'following' => false,
                    'followers_count' => $user->fresh()->followers_count,
                ]);
            }

            Follow::create([
                'user_id' => $currentUser->id,
                'followed_user_id' => $user->id,
            ]);
            $user->increment('followers_count');

            if ($user->id !== $currentUser->id) {
                $user->notify(new UserFollowed($currentUser));
            }

            return response()->json([
                'following' => true,
                'followers_count' => $user->fresh()->followers_count,
            ], 201);
        });
    }

    public function followers(User $user): JsonResponse
    {
        $followers = User::whereHas('following', function ($query) use ($user) {
            $query->where('followed_user_id', $user->id);
        })->get();

        return response()->json([
            'followers' => $followers,
            'count' => $followers->count(),
        ]);
    }

    public function following(User $user): JsonResponse
    {
        $following = User::whereHas('followers', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->get();

        return response()->json([
            'following' => $following,
            'count' => $following->count(),
        ]);
    }
}
