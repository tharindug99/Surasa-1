<?php

namespace Database\Factories;

use App\Models\Product;
use Faker\Guesser\Name;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DailyMenuItem>
 */
class DailyMenuItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $product = Product::factory()->create();
        return [
            'product_id' => $product->id,
            'name' => $product->name,
            'price' => $product->price,
            'description' => $this->faker->paragraph, // Generates a random paragraph for the description
            'image' => 'https://placehold.co/300x200', // Placeholder image URL
            'date' => $this->faker->date() // Generates a random date
        ];
    }
}
