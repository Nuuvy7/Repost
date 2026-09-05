<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Migrate existing reposts: posts with repost_of set
        $reposts = DB::table('posts')
            ->whereNotNull('repost_of')
            ->get(['id', 'user_id', 'repost_of']);

        foreach ($reposts as $repost) {
            // Insert into reposts table
            DB::table('reposts')->insert([
                'user_id' => $repost->user_id,
                'post_id' => $repost->repost_of,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Increment reposts_count on original post
            DB::table('posts')
                ->where('id', $repost->repost_of)
                ->increment('reposts_count');
        }

        // Delete the duplicate repost posts (they were created as separate posts)
        DB::table('posts')
            ->whereNotNull('repost_of')
            ->delete();
    }

    public function down(): void
    {
        // Cannot fully reverse, but we can restore the repost_of column
        // The deleted posts are gone
    }
};