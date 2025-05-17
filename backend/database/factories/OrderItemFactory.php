<?php

// database/factories/OrderItemFactory.php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'product_id' => Product::inRandomOrder()->first()->id,
            'price' => $this->faker->randomFloat(2, 10, 100),
            'quantity' => $this->faker->numberBetween(1, 5),
            'total_cost' => function (array $attributes) {
                return $attributes['price'] * $attributes['quantity'];
            },
            'user_id' => function (array $attributes) {
                return Order::find($attributes['order_id'])->user_id;
            },

            'created_at' => now(),
            'updated_at' => now()

        ];
    }
}


