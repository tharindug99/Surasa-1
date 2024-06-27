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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id(); // id INT AUTO_INCREMENT PRIMARY KEY
            $table->unsignedBigInteger('user_id'); // user_id INT NOT NULL
            $table->unsignedBigInteger('product_id'); // product_id INT NOT NULL
            $table->string('review_image')->nullable(); // review_image VARCHAR(255) NULL
            $table->integer('no_of_stars'); // no_of_stars INT NOT NULL
            $table->string('full_name'); // full_name VARCHAR(255) NOT NULL
            $table->text('comment'); // comment TEXT NOT NULL
            $table->timestamps(); // created_at and updated_at timestamps

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade') // Cascade on delete
                ->onUpdate('cascade'); // Cascade on update

            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->onDelete('cascade') // Cascade on delete
                ->onUpdate('cascade'); // Cascade on update
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
