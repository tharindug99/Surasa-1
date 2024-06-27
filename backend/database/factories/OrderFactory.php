<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Creates a new user and assigns its id
            'full_name' => $this->faker->name, // Generates a random full name
            'mobile_number' => $this->faker->phoneNumber, // Generates a random phone number
            'order_time' => now(), // Current timestamp
            'address' => $this->faker->address, // Generates a random address
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
