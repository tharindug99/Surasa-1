<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ContactUs>
 */
class ContactUsFactory extends Factory
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
            'email' => $this->faker->safeEmail, // Generates a random safe email
            'message' => $this->faker->paragraph, // Generates a random paragraph for the message
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
