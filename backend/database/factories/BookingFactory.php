<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
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
            'email' => $this->faker->safeEmail, // Generates a random safe email
            'faculty' => $this->faker->randomElement(['Agricultural Sciences', 'Applied Sciences', 'Computing','Geomatics','Management Studies','Medicine','Social Sciences & Languages','Technology','Graduate Studies']), // Random facility option
            'status' => $this->faker->randomElement(['Pending','Confirmed', 'Rejected', 'Completed']),
            'start_time' => $this->faker->dateTime, // Generates a random date-time for start time
            'end_time' => $this->faker->dateTime, // Generates a random date-time for end time
            'event_name' => $this->faker->word, // Generates a random word for the event name
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
