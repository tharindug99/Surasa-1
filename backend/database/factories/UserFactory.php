<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName, // Generates a random first name
            'last_name' => $this->faker->lastName, // Generates a random last name
            'email' => $this->faker->unique()->safeEmail, // Generates a unique email address
            'phone_num' => $this->faker->unique()->phoneNumber, // Generates a unique phone number
            'image' => 'https://placehold.co/300x200', // Placeholder image URL
            'password' => bcrypt('password'), // Default password
            'loyalty_points' => $this->faker->numberBetween(0, 1000), // Random loyalty points between 0 and 1000
            'created_at' => now(),
            'updated_at' => now()
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
