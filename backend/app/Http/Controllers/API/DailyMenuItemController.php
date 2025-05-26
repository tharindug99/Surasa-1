<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\DailyMenuItemRequest;
use App\Models\DailyMenuItem;
use DateTime;



class DailyMenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dailyMenuItems = DailyMenuItem::all();
        return response()->json($dailyMenuItems);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DailyMenuItemRequest $request)
    {
        $validated = $request->validated();
        $dailyMenuItem = new DailyMenuItem();
        $dailyMenuItem->product_id = $validated['product_id'];
        $dailyMenuItem->price = $validated['price'];
        $dailyMenuItem->name = $validated['name'];
        $dailyMenuItem->description = $validated['description'];
        $dailyMenuItem->image = $validated['image']  ?? "https://media.istockphoto.com/id/1425232352/photo/expired-organic-bio-waste-mix-vegetables-and-fruits-in-a-huge-container-in-a-rubbish-bin-heap.jpg?s=612x612&w=0&k=20&c=_hIv18ePoswfw6BTJK9j7JMC4mhgXU-GX8rpIEbIJ5s="; // Default to null if not provided; 
        $dailyMenuItem->date = (new DateTime($validated['date']))->format('Y-m-d');

        $dailyMenuItem->save();

        return response()->json([
            'success' => true,
            'message' => 'Daily menu item created successfully.',
            'dailyMenuItem' => $dailyMenuItem
        ], 201);
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $dailyMenuItem = DailyMenuItem::find($id);

        if (!$dailyMenuItem) {
            return response()->json(['error' => 'Daily menu item not found'], 404);
        }

        return response()->json($dailyMenuItem);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DailyMenuItemRequest $request, string $id)
    {
        $dailyMenuItem = DailyMenuItem::find($id);

        if (!$dailyMenuItem) {
            return response()->json(['error' => 'Item not found'], 404);
        }

        $validated = $request->validated();


        $dailyMenuItem->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Item updated successfully.',
            'admin' => $dailyMenuItem
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dailyMenuItem = DailyMenuItem::find($id);

        if (!$dailyMenuItem) {
            return response()->json(['error' => 'Item not found'], 404);
        }

        $dailyMenuItem->delete();

        return response()->json(['message' => 'Item deleted']);
    }
}
