<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'category_id' => Category::factory(), // Creates a new category and assigns its id
            'name' => $this->faker->word, // Generates a random word for the name
            'price' => $this->faker->randomFloat(2, 1, 200), // Generates a random price between 1 and 1000 with 2 decimal places
            'description' => $this->faker->paragraph, // Generates a random paragraph for the description
//            'avatar' => $this->faker->imageUrl(640, 480, 'products', true), // Generates a random image URL
            'avatar' => 'https://placehold.co/300x200', // Generates a random image URL
        ];
    }
}
