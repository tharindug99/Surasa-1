<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\{AdminController,
    BookingController,
    CategoryController,
    ContactUsController,
    DailyMenuItemController,
    OrderController,
    OrderItemController,
    PaymentController,
    ProductController,
    ReviewController,
    UserController};

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'payment'], function() {

    Route::post('/', [PaymentController::class, 'makePayment']);

});

Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('admins', AdminController::class);
Route::apiResource('bookings', BookingController::class);
Route::apiResource('contactus', ContactUsController::class);
Route::apiResource('dailymenuitems', DailyMenuItemController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('orderitems', OrderItemController::class);
Route::apiResource('reviews', ReviewController::class);
Route::apiResource('users', UserController::class);

// User Login
Route::post('/users/login', [UserController::class, 'login']);
Route::post('/users/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

// Admin routes
Route::post('/admin/login', [AdminController::class, 'adminLogin']);
Route::post('/admin/logout', [AdminController::class, 'adminLogout']);

// Loyalty Points
Route::middleware('auth:sanctum')->group(function () {
    Route::patch('/users/{user}/add-loyalty-points', [UserController::class, 'addLoyaltyPoints']);
    Route::patch('/users/{user}/deduct-loyalty-points', [UserController::class, 'deductLoyaltyPoints']);
});




