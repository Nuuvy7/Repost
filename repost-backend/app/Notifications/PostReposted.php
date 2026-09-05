<?php

namespace App\Notifications;

use App\Models\Post;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\DatabaseMessage;
use Illuminate\Notifications\Notification;

class PostReposted extends Notification
{
    use Queueable;

    public function __construct(
        public Post $post,
        public User $reposter
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'repost',
            'post_id' => $this->post->id,
            'reposter_id' => $this->reposter->id,
            'reposter_name' => $this->reposter->name,
            'reposter_avatar' => $this->reposter->avatar,
            'message' => "{$this->reposter->name} reposted your post",
        ];
    }
}