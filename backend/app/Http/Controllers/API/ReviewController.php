<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewRequest;
use App\Models\Order;
use App\Models\Review;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Eager load relationships if frequently accessed
        // $reviews = Review::with(['user', 'product'])->get();
        $reviews = Review::all();
        return response()->json($reviews); // Accessor will provide full image URL
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReviewRequest $request)
    {
        try {
            $validated = $request->validated();

            Log::info('Review submission data:', [
                'validated_data' => $validated,
                'has_file' => $request->hasFile('review_image'),
                'all_data' => $request->all()
            ]);

            $review = new Review();
            $review->user_id = $validated['user_id'];
            $review->product_id = $validated['product_id'];
            $review->no_of_stars = $validated['no_of_stars'];
            $review->order_id = $validated['order_id'];
            $review->status = $validated['status'] ?? 'pending';
            $review->full_name = $validated['full_name'] ?? null;
            $review->comment = $validated['comment'] ?? null;

            if ($request->hasFile('review_image')) {
                try {
                    $image = $request->file('review_image');
                    Log::info('Image details:', [
                        'original_name' => $image->getClientOriginalName(),
                        'mime_type' => $image->getMimeType(),
                        'size' => $image->getSize()
                    ]);

                    // Generate a unique filename
                    $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

                    // Ensure the directory exists
                    $path = storage_path('app/public/reviews');
                    if (!file_exists($path)) {
                        mkdir($path, 0755, true);
                    }

                    // Store the image
                    $image->storeAs('public/reviews', $filename);
                    $review->review_image = $filename;

                    Log::info('Image stored successfully:', ['filename' => $filename]);
                } catch (\Exception $e) {
                    Log::error('Error storing image: ' . $e->getMessage());
                    throw new \Exception('Error storing image: ' . $e->getMessage());
                }
            }

            $review->save();
            Log::info('Review saved successfully', ['review_id' => $review->id]);

            return response()->json([
                'success' => true,
                'message' => 'Review created successfully.',
                'review' => $review
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating review: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Error creating review: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Eager load relationships if needed
        $review = Review::with(['user', 'product', 'order'])->find($id);
        //$review = Review::find($id);

        if (!$review) {
            return response()->json(['error' => 'Review not found'], 404);
        }

        return response()->json($review); // Accessor will provide full image URL
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ReviewRequest $request, string $id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['error' => 'Review not found'], 404);
        }

        $validated = $request->validated();

        // Update textual/scalar fields from validated data
        // array_key_exists is used because 'sometimes' rule means key might not be in $validated
        if (array_key_exists('user_id', $validated)) {
            $review->user_id = $validated['user_id'];
        }
        if (array_key_exists('product_id', $validated)) {
            $review->product_id = $validated['product_id'];
        }
        if (array_key_exists('no_of_stars', $validated)) {
            $review->no_of_stars = $validated['no_of_stars'];
        }
        if (array_key_exists('order_id', $validated)) { // Handle order_id update
            $review->order_id = $validated['order_id'];
        }
        if (array_key_exists('status', $validated)) {
            $review->status = $validated['status'];
        }
        if (array_key_exists('full_name', $validated)) {
            $review->full_name = $validated['full_name'];
        }
        if (array_key_exists('comment', $validated)) {
            $review->comment = $validated['comment'];
        }

        // Handle image update
        if ($request->hasFile('review_image')) {
            // Delete old image if it exists
            if ($review->getRawOriginal('review_image')) { // Get raw filename
                Storage::delete('public/reviews/' . $review->getRawOriginal('review_image'));
            }

            // Store new image
            $image = $request->file('review_image');
            $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/reviews', $filename);
            $review->review_image = $filename;
        } elseif (array_key_exists('review_image', $validated) && is_null($validated['review_image'])) {
            // This handles if 'review_image' was explicitly sent as null (e.g., to remove the image)
            // and it passed validation (e.g., 'nullable' rule)
            if ($review->getRawOriginal('review_image')) {
                Storage::delete('public/reviews/' . $review->getRawOriginal('review_image'));
            }
            $review->review_image = null; // Set to null to remove image
        }
        // If 'review_image' is not in $request and not a file, the existing image is untouched.

        $review->save();

        return response()->json([
            'success' => true,
            'message' => 'Review updated successfully.',
            'review' => $review->fresh() // Get fresh model with accessor applied
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['error' => 'Review not found'], 404);
        }

        // Delete the associated image file from storage if it exists
        // This is handled by the boot method in the model if you uncomment it.
        // If not using boot method, delete it here:
        if ($review->getRawOriginal('review_image')) {
            Storage::delete('public/reviews/' . $review->getRawOriginal('review_image'));
        }

        $review->delete(); // This will trigger the 'deleting' event if boot method is used

        return response()->json(['message' => 'Review deleted']);
    }
}
