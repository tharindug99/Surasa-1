<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $users->each(function ($user) {
            $products = Product::all()->random(3); // Fetch a random subset of products
            $products->each(function ($product) use ($user) {
                Review::factory()->create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                ]);
            });
        });
    }
}
