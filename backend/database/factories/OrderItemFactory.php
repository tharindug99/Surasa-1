<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(), // Creates a new order and assigns its id
            'product_id' => Product::factory(), // Creates a new product and assigns its id
            'price' => $this->faker->randomFloat(2, 1, 200), // Random price between 1 and 200 with 2 decimal places
            'quantity' => $this->faker->numberBetween(1, 10), // Random quantity between 1 and 10
            'total_cost' => function (array $attributes) {
                return $attributes['price'] * $attributes['quantity']; // Calculates total cost
            },
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
