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
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // id INT AUTO_INCREMENT PRIMARY KEY
            $table->unsignedBigInteger('category_id'); // category_id INT NOT NULL
            $table->string('name'); // name VARCHAR(255) NOT NULL
            $table->decimal('price', 10, 2); // price DECIMAL(10,2) NOT NULL
            $table->text('description'); // description TEXT NOT NULL
            $table->string('avatar')->nullable(); // image VARCHAR(255) NULL
            $table->timestamps(); // created_at and updated_at timestamps

            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade')  // Cascade on delete
                ->onUpdate('cascade'); // Cascade on update
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
