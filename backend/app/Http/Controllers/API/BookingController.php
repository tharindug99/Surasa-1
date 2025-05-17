<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Models\Booking;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::all();
        return response()->json($bookings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BookingRequest $request)
    {
        $validated = $request->validated();
        $booking = new Booking();
        $booking->name = $validated['name'];
        $booking->phone_num = $validated['phone_num'];
        $booking->email = $validated['email'];
        $booking->faculty = $validated['faculty'];
        $booking->status = $validated['status'];
        $booking->start_time = $validated['start_time'];
        $booking->end_time = $validated['end_time'];
        $booking->event_name = $validated['event_name'];

        $booking->save();

        return response()->json([
            'success' => true,
            'message' => 'Booking created successfully.',
            'booking' => $booking
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $bookings = Booking::find($id);

        if(!$bookings) {
            return response()->json(['error' => 'Booking not found'], 404);
        }
        return response()->json($bookings);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BookingRequest $request, string $id)
    {
        $booking = Booking::find($id);

        if(!$booking) {
            return response()->json(['error' => 'Booking not found'], 404);
        }

        $validated = $request->validated();
        $booking->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Booking updated successfully.',
            'booking' => $booking
        ],200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $booking = Booking::find($id);
        if(!$booking) {
            return response()->json(['error' => 'Booking not found'], 404);
        }
        $booking->delete();
        return response()->json([
            'success' => true,
            'message' => 'Booking deleted successfully.',
        ]);
    }
}
