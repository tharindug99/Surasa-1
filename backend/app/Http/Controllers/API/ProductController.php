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


public function update(ProductRequest $request, $id)
{
    $product = Product::findOrFail($id);

    // Corrected log statement
    Log::info('Avatar uploaded for product', [
        'product_id' => $id,
        'request_data' => $request->all(),
        'product' => $product->toArray()
    ]);

    if ($request->has('category_id')) {
        $category = Category::find($request->category_id);
        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }
        $product->category_id = $category->id;
    }

    $product->fill($request->only(['name', 'description', 'price']));

    // Log after changes
    Log::info('After update', $product->toArray());

    if ($request->hasFile('avatar')) {
        $avatar = $request->file('avatar');
        $filename = time() . '.' . $avatar->getClientOriginalExtension();
        $avatar->storeAs('public/products', $filename);
        $product->avatar = $filename;
    }

     Log::info('After update 2', $product->toArray());

    $product->save(); // This will now execute

    return response()->json([
        'success' => true,
        'message' => 'Product updated successfully.',
        'product' => $product
    ], 200);
}

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'product deleted']);
    }
}
