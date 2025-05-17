<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // id INT AUTO_INCREMENT PRIMARY KEY
            $table->unsignedBigInteger('user_id'); // user_id INT NOT NULL
            $table->string('full_name'); // full_name VARCHAR(255) NOT NULL
            $table->string('mobile_number', 20); // mobile_number VARCHAR(20) NOT NULL
            $table->timestamp('order_time')->default(DB::raw('CURRENT_TIMESTAMP')); // order_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            $table->text('address'); // address TEXT NOT NULL
            $table->timestamps(); // created_at and updated_at timestamps
            $table->string('status')->default('Pending');
            $table->decimal('price', 10, 2)->default(0.00);

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade') // Cascade on delete
                ->onUpdate('cascade'); // Cascade on update
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
