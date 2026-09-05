<?php

namespace App\Notifications;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PostCommented extends Notification
{
    use Queueable;

    public function __construct(
        public Post $post,
        public User $commenter,
        public string $commentBody
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'comment',
            'post_id' => $this->post->id,
            'post_title' => $this->post->title,
            'commenter_id' => $this->commenter->id,
            'commenter_name' => $this->commenter->name,
            'commenter_avatar' => $this->commenter->avatar,
            'comment_body' => $this->commentBody,
            'message' => "{$this->commenter->name} berkomentar di post anda: {$this->post->title}",
        ];
    }
}
