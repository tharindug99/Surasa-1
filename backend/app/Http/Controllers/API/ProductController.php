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

        // Log raw request data
        Log::info('Raw Request Data:', [
            'all_data' => $request->all(),
            'content_type' => $request->header('Content-Type'),
            'method' => $request->method(),
            'has_file' => $request->hasFile('avatar')
        ]);

        // Get data directly from request
        $data = $request->all();
        Log::info('Request Data:', $data);

        // Update fields if they exist in the request
        if (isset($data['name'])) {
            $product->name = $data['name'];
        }
        if (isset($data['description'])) {
            $product->description = $data['description'];
        }
        if (isset($data['price'])) {
            $product->price = $data['price'];
        }
        if (isset($data['category_id'])) {
            $category = Category::find($data['category_id']);
            if (!$category) {
                return response()->json(['error' => 'Category not found'], 404);
            }
            $product->category_id = $data['category_id'];
        }

        // Handle image update
        if ($request->hasFile('avatar')) {
            // Delete old image if exists
            if ($product->avatar) {
                $oldPath = storage_path('app/public/products/' . $product->avatar);
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

        // Log the product data before saving
        Log::info('Product Data Before Save:', $product->toArray());

        $product->save();

        // Log the product data after saving
        Log::info('Product Data After Save:', $product->fresh()->toArray());

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'product' => $product->fresh()
        ]);
    }
}
