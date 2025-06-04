<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('daily_menu_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('category_id')->nullable(); // Added category_id
            $table->decimal('price', 8, 2);
            $table->string('name');
            $table->text('description');
            $table->string('image');
            $table->date('date');
            $table->timestamps();

            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            // Foreign key for category_id
            $table->foreign('category_id')
                ->references('id')
                ->on('categories') // Assuming your categories table is named 'categories'
                ->onDelete('set null') // Or 'cascade'/'restrict' based on your needs
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_menu_items');
    }
};
