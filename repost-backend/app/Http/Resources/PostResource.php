<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'media_url' => $this->media_url,
            'media_type' => $this->media_type,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'location_name' => $this->location_name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => new UserResource($this->whenLoaded('user')),
            'likes_count' => $this->whenCounted('likes'),
            'comments_count' => $this->whenCounted('comments'),
            'reposts_count' => $this->whenCounted('reposts'),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
            'is_liked' => $request->user()
                ? $this->relationLoaded('likes')
                    ? $this->likes->contains('user_id', $request->user()->id)
                    : $this->likes()->where('user_id', $request->user()->id)->exists()
                : false,
            'is_reposted' => $request->user()
                ? $this->relationLoaded('reposts')
                    ? $this->reposts->contains('user_id', $request->user()->id)
                    : $this->reposts()->where('user_id', $request->user()->id)->exists()
                : false,
        ];
    }
}
