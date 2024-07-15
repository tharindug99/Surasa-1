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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name'); // first_name VARCHAR(255) NOT NULL
            $table->string('last_name'); // last_name VARCHAR(255) NOT NULL
            $table->string('email')->unique(); // email VARCHAR(255) UNIQUE NOT NULL
            $table->string('phone_num', 20)->unique(); // phone_num VARCHAR(20) UNIQUE NOT NULL
            $table->string('image')->nullable(); // image VARCHAR(255) NULL
            $table->timestamp('email_verified_at')->nullable();
            $table->integer('loyalty_points')->default(0)->nullable(); // loyalty_points INT DEFAULT 0
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
