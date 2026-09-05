<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Delete duplicate notifications keeping only the oldest one
        DB::statement('
            DELETE n1 FROM notifications n1
            INNER JOIN notifications n2
            WHERE n1.type = n2.type
            AND n1.notifiable_type = n2.notifiable_type
            AND n1.notifiable_id = n2.notifiable_id
            AND n1.data = n2.data
            AND n1.id > n2.id
        ');
    }

    public function down(): void
    {
        // Nothing to rollback — duplicates are permanently removed
    }
};
