<?php

namespace App\Notifications;

use App\Models\Post;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PostCreated extends Notification
{
    use Queueable;

    public function __construct(
        public Post $post,
        public User $author
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'post_created',
            'post_id' => $this->post->id,
            'post_title' => $this->post->title,
            'author_id' => $this->author->id,
            'author_name' => $this->author->name,
            'author_avatar' => $this->author->avatar,
            'message' => "{$this->author->name} memposting baru: {$this->post->title}",
        ];
    }
}
