<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'body',
        'media_url',
        'media_type',
        'reposts_count',
        'status',
        'category',
        'latitude',
        'longitude',
        'location_name',
    ];

    protected function casts(): array
    {
        return [
            'reposts_count' => 'integer',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'likes');
    }

    public function reposts()
    {
        return $this->belongsToMany(User::class, 'reposts')->withTimestamps();
    }

    public function repostedByUsers()
    {
        return $this->belongsToMany(User::class, 'reposts')->withTimestamps();
    }
}