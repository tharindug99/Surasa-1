<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
                CategorySeeder::class,
                ProductSeeder::class,
                UserSeeder::class,
                DailyMenuItemSeeder::class,
                OrderSeeder::class,
                OrderItemSeeder::class,
                ReviewSeeder::class,
                ContactUsSeeder::class,
                AdminSeeder::class,
                BookingSeeder::class,
            ]
        );

    }
}
