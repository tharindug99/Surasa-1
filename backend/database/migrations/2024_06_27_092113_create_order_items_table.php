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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id(); // id INT AUTO_INCREMENT PRIMARY KEY
            $table->unsignedBigInteger('order_id'); // order_id INT NOT NULL
            $table->unsignedBigInteger('product_id'); // product_id INT NOT NULL
            $table->decimal('price', 10, 2); // price DECIMAL(10,2) NOT NULL
            $table->integer('quantity'); // quantity INT NOT NULL
            $table->decimal('total_cost', 10, 2); // total_cost DECIMAL(10,2) NOT NULL
            $table->timestamps(); // created_at and updated_at timestamps
            $table->foreignId('user_id')->constrained();
            $table->string('status')->default('Pending');

            $table->foreign('order_id')
                ->references('id')
                ->on('orders')
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
        Schema::dropIfExists('order_items');
    }
};
