<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
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
            'product_id' => Product::factory(), // Creates a new product and assigns its id
            'review_image' => 'https://placehold.co/300x200', // Placeholder image URL
            'no_of_stars' => $this->faker->numberBetween(1, 5), // Random number of stars between 1 and 5
            'full_name' => $this->faker->name, // Generates a random full name
            'comment' => $this->faker->paragraph, // Generates a random paragraph for the comment
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
