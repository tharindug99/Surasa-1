<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewRequest;
use App\Models\Review;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reviews = Review::all();
        return response()->json($reviews);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReviewRequest $request)
    {
        $validated = $request->validated();
        $reviews = new Review();
        $reviews->user_id = $validated['user_id'];
        $reviews->product_id = $validated['product_id'];
        $reviews->review_image = $validated['review_image'];
        $reviews->no_of_stars = $validated['no_of_stars'];
        $reviews->full_name = $validated['full_name'];
        $reviews->comment = $validated['comment'];

        $reviews->save();

        return response()->json([
            'success' => true,
            'message' => 'Review created successfully.',
            'reviews' => $reviews
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reviews = Review::find($id);

        if (!$reviews) {
            return response()->json(['error' => 'Review not found'], 404);
        }

        return response()->json($reviews);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ReviewRequest $request, string $id)
    {
        $reviews = Review::find($id);

        if (!$reviews) {
            return response()->json(['error' => 'Review not found'], 404);
        }

        $validated = $request->validated();


        $reviews->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Review updated successfully.',
            'reviews' => $reviews
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reviews = Review::find($id);

        if (!$reviews) {
            return response()->json(['error' => 'Review not found'], 404);
        }

        $reviews->delete();

        return response()->json(['message' => 'Review deleted']);
    }
}
