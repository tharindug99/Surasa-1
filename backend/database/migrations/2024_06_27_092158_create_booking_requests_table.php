<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('booking_requests', function (Blueprint $table) {
            $table->id(); // id INT AUTO_INCREMENT PRIMARY KEY
            $table->string('name'); // name VARCHAR(255) NOT NULL
            $table->string('phone_num', 20); // phone_num VARCHAR(20) NOT NULL
            $table->string('email'); // email VARCHAR(255) NOT NULL
            $table->enum('faculty', ['Agricultural Sciences', 'Applied Sciences', 'Computing','Geomatics','Management Studies','Medicine','Social Sciences & Languages','Technology','Graduate Studies']); // facility ENUM('Option1', 'Option2', 'Option3') NOT NULL
            $table->timestamp('start_time'); // start_time TIMESTAMP NOT NULL
            $table->timestamp('end_time'); // end_time TIMESTAMP NOT NULL
            $table->string('event_name'); // event_name VARCHAR(255) NOT NULL
            $table->timestamps(); // created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_requests');
    }
};
