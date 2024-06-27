<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = Order::all();
        $orders->each(function ($order) {
            $products = Product::all()->random(5); // Fetch a random subset of products
            $products->each(function ($product) use ($order) {
                OrderItem::factory()->create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                ]);
            });
        });
    }
}
