<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Log;


class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get();
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::with('category')->find($id);
        if (!$product) {
            return response()->json(['error' => 'product not found'], 404);
        }
        return response()->json($product);
    }

    // public function store(ProductRequest $request)
    // {
    //     $category = Category::where('id', $request->category_id)->first();
    //     if(!$category){
    //         return response()->json(['error' => 'Category not found'], 404);
    //     }

    //     $product = new Product();
    //     $product->name = $request->name;
    //     $product->description = $request->description;
    //     $product->category_id = $category->id;
    //     $product->price = $request->price;

    //     if ($request->hasFile('avatar')) {
    //         $avatar = $request->file('avatar');
    //         $filename = time() . '.' . $avatar->getClientOriginalExtension();
    //         $avatar->storeAs('public/products', $filename);
    //         $product->avatar = $filename;
    //     }

    //     $product->save();

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'product created successfully.',
    //         'product' => $product
    //     ], 201);
    // }

public function store(ProductRequest $request)
{
    $category = Category::find($request->category_id);
    if (!$category) {
        return response()->json(['error' => 'Category not found'], 404);
    }

    $product = new Product();
    $product->name = $request->name;
    $product->description = $request->description;
    $product->category_id = $category->id;
    $product->price = $request->price;

    if ($request->hasFile('avatar')) {
        $avatar = $request->file('avatar');
        $filename = time() . '.' . $avatar->getClientOriginalExtension();
        $avatar->storeAs('public/products', $filename);
        // Store ONLY FILENAME (not full URL)
        $product->avatar = $filename;
    }

    $product->save();

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully.',
            // Return full URL in response for frontend use
            'product' => $product->makeHidden('avatar')->toArray() + [
                'avatar_url' => $product->avatar ? asset('storage/products/' . $product->avatar) : null
            ]
        ], 201);
    }
    
        /**
         * Update the specified resource in storage.
         */
        public function update(ProductRequest $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        // Validate category if provided
        if ($request->has('category_id')) {
            $category = Category::find($request->category_id);
            if (!$category) {
                return response()->json(['error' => 'Category not found'], 404);
            }
            $product->category_id = $request->category_id;
        }

        // Update fields - handle both JSON and form-data
        $product->name = $request->input('name', $product->name);
        $product->description = $request->input('description', $product->description);
        $product->price = $request->input('price', $product->price);

        // Handle image update
        if ($request->hasFile('avatar')) {
            // Get raw filename without URL
            $oldAvatar = $product->getRawOriginal('avatar');

            // Delete old image if exists
            if ($oldAvatar) {
                $oldPath = storage_path('app/public/products/' . $oldAvatar);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            // Store new image
            $avatar = $request->file('avatar');
            $filename = time() . '.' . $avatar->getClientOriginalExtension();
            $avatar->storeAs('public/products', $filename);
            $product->avatar = $filename;
        }

        $product->save();

        Log::debug('Update Request:', [
            'method' => $request->method(),
            'content_type' => $request->header('Content-Type'),
            'all_data' => $request->all(),
            'files' => $request->file() ? array_keys($request->file()) : 'none',
            'avatar_exists' => $request->hasFile('avatar') ? 'yes' : 'no'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'product' => $product
        ]);
    }
}
