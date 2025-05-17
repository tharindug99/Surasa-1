<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

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
            'name' => $this->faker->name,
            'phone_num' => $this->faker->phoneNumber,
            'password' => Hash::make('password'), // Use Hash facade instead of bcrypt()
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
