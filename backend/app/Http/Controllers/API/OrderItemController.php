<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderItemRequest;
use App\Models\OrderItem;



class OrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orderItems = OrderItem::all();
        return response()->json($orderItems);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderItemRequest $request)
    {
        $validated = $request->validated();
        $orderItems = new OrderItem();
        $orderItems->order_id = $validated['order_id'];
        $orderItems->product_id = $validated['product_id'];
        $orderItems->price = $validated['price'];
        $orderItems->quantity = $validated['quantity'];
        $orderItems->total_cost = $validated['total_cost'];

        $orderItems->save();

        return response()->json([
            'success' => true,
            'message' => 'Order item created successfully.',
            'OrderItem' => $orderItems
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $orderItems = OrderItem::find($id);

        if (!$orderItems) {
            return response()->json(['error' => 'Order item not found'], 404);
        }

        return response()->json($orderItems);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderItemRequest $request, string $id)
    {
        $orderItems = OrderItem::find($id);

        if (!$orderItems) {
            return response()->json(['error' => 'Item not found'], 404);
        }

        $validated = $request->validated();


        $orderItems->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Item updated successfully.',
            'orderItems' => $orderItems
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $orderItems = OrderItem::find($id);

        if (!$orderItems) {
            return response()->json(['error' => 'Order Item not found'], 404);
        }

        $orderItems->delete();

        return response()->json(['message' => 'Order Item deleted']);
    }
}
