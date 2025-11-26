<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles and permissions first
        $this->call([
            RoleSeeder::class,
            AppSettingSeeder::class,
        ]);

        // Create default admin user
        User::firstOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'Administrator',
                'email' => 'admin@osisviska.com',
                'password' => bcrypt('password'),
                'role_id' => 1, // Admin role
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );
    }
}
