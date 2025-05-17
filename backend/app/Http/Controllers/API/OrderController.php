<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Models\Order;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request)
    {
        $validated = $request->validated();
        $orders = new Order();
        $orders->fill($validated);
        $orders->user_id = $validated['user_id'];
        $orders->full_name = $validated['full_name'];
        $orders->mobile_number = $validated['mobile_number'];
        $orders->address = $validated['address'];

        $orders->save();

        return response()->json([
            'success' => true,
            'message' => 'Order created successfully.',
            'dailyMenuItem' => $orders
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $orders = Order::find($id);

        if (!$orders) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        return response()->json($orders);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderRequest $request, string $id)
    {
        $orders = Order::find($id);

        if (!$orders) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $validated = $request->validated();


        $orders->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Order updated successfully.',
            'order' => $orders
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $orders = Order::find($id);

        if (!$orders) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $orders->delete();

        return response()->json(['message' => 'Order deleted']);
    }
}
