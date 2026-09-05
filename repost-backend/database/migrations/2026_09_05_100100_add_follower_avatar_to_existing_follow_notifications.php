<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $notifications = DB::table('notifications')
            ->where('type', 'App\\Notifications\\UserFollowed')
            ->get();

        foreach ($notifications as $notif) {
            $data = json_decode($notif->data, true);

            if (!empty($data['follower_avatar'])) {
                continue;
            }

            $user = DB::table('users')->where('id', $data['follower_id'] ?? 0)->first();

            if ($user && $user->avatar) {
                $data['follower_avatar'] = $user->avatar;
                DB::table('notifications')
                    ->where('id', $notif->id)
                    ->update(['data' => json_encode($data)]);
            }
        }
    }

    public function down(): void
    {
        $notifications = DB::table('notifications')
            ->where('type', 'App\\Notifications\\UserFollowed')
            ->get();

        foreach ($notifications as $notif) {
            $data = json_decode($notif->data, true);
            unset($data['follower_avatar']);
            DB::table('notifications')
                ->where('id', $notif->id)
                ->update(['data' => json_encode($data)]);
        }
    }
};
