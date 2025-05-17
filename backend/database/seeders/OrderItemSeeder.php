<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    // database/seeders/OrderItemSeeder.php

    public function run(): void
    {
        Order::all()->each(function ($order) {
            OrderItem::factory()
                ->count(5) // Create 5 items per order
                ->create([
                    'order_id' => $order->id,

                ]);
        });
    }
}
