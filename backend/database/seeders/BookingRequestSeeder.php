<?php

namespace Database\Seeders;

use App\Models\BookingRequest;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookingRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BookingRequest::factory()->count(10)->create();
    }
}
