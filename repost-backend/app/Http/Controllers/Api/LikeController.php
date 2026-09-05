<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Notifications\PostLiked;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LikeController extends Controller
{
    public function like(Request $request, Post $post): JsonResponse
    {
        return DB::transaction(function () use ($request, $post) {
            $existingLike = $post->likes()
                ->where('user_id', $request->user()->id)
                ->lockForUpdate()
                ->first();

            if ($existingLike) {
                return response()->json([
                    'message' => 'Already liked.',
                    'liked' => true,
                    'count' => $post->likes()->count(),
                ]);
            }

            $post->likes()->create(['user_id' => $request->user()->id]);

            if ($post->user_id !== $request->user()->id) {
                $post->user->notify(new PostLiked($post, $request->user()));
            }

            return response()->json([
                'liked' => true,
                'count' => $post->likes()->count(),
            ]);
        });
    }

    public function unlike(Request $request, Post $post): JsonResponse
    {
        $post->likes()->where('user_id', $request->user()->id)->delete();

        return response()->json([
            'liked' => false,
            'count' => $post->likes()->count(),
        ]);
    }
}
