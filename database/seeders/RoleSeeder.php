<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Admin',
                'description' => 'Administrator dengan akses penuh ke semua modul',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ketua OSIS',
                'description' => 'Ketua OSIS dengan akses ke Prokers, Transactions, Messages',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sekretaris',
                'description' => 'Sekretaris dengan akses ke Messages dan Divisions',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bendahara',
                'description' => 'Bendahara dengan akses ke Transactions',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Anggota',
                'description' => 'Anggota OSIS dengan akses terbatas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('roles')->insert($roles);

        // Insert role permissions
        $this->seedRolePermissions();
    }

    private function seedRolePermissions(): void
    {
        $modules = ['Dashboard', 'Divisions', 'Users', 'Prokers', 'Messages', 'Transactions', 'Settings', 'Profile'];
        
        // Admin - Full access
        foreach ($modules as $module) {
            DB::table('role_permissions')->insert([
                'role_id' => 1, // Admin
                'module_name' => $module,
                'can_view' => true,
                'can_create' => true,
                'can_edit' => true,
                'can_delete' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Ketua OSIS - Prokers, Transactions, Messages
        $ketuaModules = ['Dashboard', 'Prokers', 'Transactions', 'Messages', 'Profile'];
        foreach ($ketuaModules as $module) {
            DB::table('role_permissions')->insert([
                'role_id' => 2, // Ketua OSIS
                'module_name' => $module,
                'can_view' => true,
                'can_create' => $module !== 'Dashboard',
                'can_edit' => $module !== 'Dashboard',
                'can_delete' => $module !== 'Dashboard',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Sekretaris - Messages, Divisions
        $sekretarisModules = ['Dashboard', 'Messages', 'Divisions', 'Profile'];
        foreach ($sekretarisModules as $module) {
            DB::table('role_permissions')->insert([
                'role_id' => 3, // Sekretaris
                'module_name' => $module,
                'can_view' => true,
                'can_create' => $module !== 'Dashboard',
                'can_edit' => $module !== 'Dashboard',
                'can_delete' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Bendahara - Transactions
        $bendaharaModules = ['Dashboard', 'Transactions', 'Profile'];
        foreach ($bendaharaModules as $module) {
            DB::table('role_permissions')->insert([
                'role_id' => 4, // Bendahara
                'module_name' => $module,
                'can_view' => true,
                'can_create' => $module === 'Transactions',
                'can_edit' => $module === 'Transactions' || $module === 'Profile',
                'can_delete' => $module === 'Transactions',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Anggota - Dashboard & Profile only
        $anggotaModules = ['Dashboard', 'Profile'];
        foreach ($anggotaModules as $module) {
            DB::table('role_permissions')->insert([
                'role_id' => 5, // Anggota
                'module_name' => $module,
                'can_view' => true,
                'can_create' => false,
                'can_edit' => $module === 'Profile',
                'can_delete' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
