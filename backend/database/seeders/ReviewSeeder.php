<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use App\Models\Order; // Import Order model
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $users->each(function ($user) {
            // Get orders for the current user
            $orders = Order::where('user_id', $user->id)->get();

            $orders->each(function ($order) use ($user) {
                // Get order items for the current order
                $orderItems = $order->orderItems;

                $orderItems->each(function ($orderItem) use ($user, $order) {
                    // Check if a review for this product and order already exists
                    $existingReview = Review::where('user_id', $user->id)
                        ->where('product_id', $orderItem->product_id)
                        ->where('order_id', $order->id)
                        ->exists();

                    if (!$existingReview) {
                        Review::factory()->create([
                            'user_id' => $user->id,
                            'product_id' => $orderItem->product_id,
                            'order_id' => $order->id,
                        ]);
                    }
                });
            });
        });
    }
}
