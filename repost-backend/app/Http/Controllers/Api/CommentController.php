<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Comment\StoreCommentRequest;
use App\Models\Post;
use App\Notifications\PostCommented;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    public function index(Request $request, Post $post): AnonymousResourceCollection
    {
        $comments = $post->comments()
            ->with('user')
            ->orderByDesc('created_at')
            ->paginate($request->get('per_page', 15));

        return \App\Http\Resources\CommentResource::collection($comments);
    }

    public function store(StoreCommentRequest $request, Post $post): JsonResponse
    {
        return DB::transaction(function () use ($request, $post) {
            $comment = $post->comments()->create([
                'user_id' => $request->user()->id,
                'body' => $request->body,
            ]);

            $comment->load('user');

            if ($post->user_id !== $request->user()->id) {
                $post->user->notify(new PostCommented($post, $request->user(), $request->body));
            }

            return response()->json([
                'comment' => $comment,
            ], 201);
        });
    }

    public function destroy(Request $request, Post $post, $id): JsonResponse
    {
        $comment = $post->comments()->findOrFail($id);

        if ($request->user()->id !== $comment->user_id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted successfully.',
        ]);
    }
}
