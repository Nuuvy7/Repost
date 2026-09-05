<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $notifications = DB::table('notifications')
            ->where('type', 'App\\Notifications\\PostReposted')
            ->get();

        foreach ($notifications as $notif) {
            $data = json_decode($notif->data, true);

            if (isset($data['reposter_avatar'])) {
                continue;
            }

            $user = DB::table('users')->where('id', $data['reposter_id'] ?? 0)->first();

            if ($user) {
                $data['reposter_avatar'] = $user->avatar;
                DB::table('notifications')
                    ->where('id', $notif->id)
                    ->update(['data' => json_encode($data)]);
            }
        }
    }

    public function down(): void
    {
        $notifications = DB::table('notifications')
            ->where('type', 'App\\Notifications\\PostReposted')
            ->get();

        foreach ($notifications as $notif) {
            $data = json_decode($notif->data, true);
            unset($data['reposter_avatar']);
            DB::table('notifications')
                ->where('id', $notif->id)
                ->update(['data' => json_encode($data)]);
        }
    }
};
