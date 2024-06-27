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
            $table->id(); // id INT AUTO_INCREMENT PRIMARY KEY
            $table->unsignedBigInteger('product_id'); // product_id INT NOT NULL
            $table->text('description'); // description TEXT NOT NULL
            $table->string('image'); // image VARCHAR(255) NOT NULL
            $table->date('date'); //  DATE NOT NULL
            $table->timestamps(); // created_at and updated_at timestamps

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
        Schema::dropIfExists('daily_menu_items');
    }
};
