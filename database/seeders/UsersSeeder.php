<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Administrator',
            'email' => 'administrator@gmail.com',
            'password' => Hash::make('password'),
            'is_admin' => 'true',
            'additional_data' => '{"dynamicticket":{"escalation_campaign":[1]}}',
        ]);
        // $user->assignRole('super-admin');
    }
}