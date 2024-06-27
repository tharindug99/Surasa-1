<?php

namespace Database\Seeders;

use App\Models\DailyMenuItem;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DailyMenuItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::all();
        $products->each(function($product) {
            DailyMenuItem::factory()->count(3)->create([
                'product_id' => $product->id
            ]);
        });
    }
}
