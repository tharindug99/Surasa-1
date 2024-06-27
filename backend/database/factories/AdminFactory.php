<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name, // Generates a random name
            'phone_num' => $this->faker->phoneNumber, // Generates a random phone number
            'password' => bcrypt('password'), // Default password
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
