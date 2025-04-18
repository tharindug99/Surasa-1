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
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

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
Route::post('/users/login', [UserController::class, 'login']);

Route::post('/users/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');





