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

    public function store(ProductRequest $request)
    {
        $category = Category::where('id', $request->category_id)->first();
        if(!$category){
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
            $product->avatar = $filename;
        }

        $product->save();

        return response()->json([
            'success' => true,
            'message' => 'product created successfully.',
            'product' => $product
        ], 201);
    }



//     public function update(ProductRequest $request, $id)
// {
//     $product = Product::findOrFail($id);

//     Log::info('Log 1', [
//         'request' => $request,
//         'product_id' => $id
//     ]);
    
//     $newProduct = $product; // Use the existing product instance

//     // Validate and update category if provided
//     if ($request->has('category_id')) {
//         $category = Category::find($request->category_id);
//         if (!$category) {
//             return response()->json(['error' => 'Category not found'], 404);
//         }
//         $newProduct->category_id = $category->id;
//     }

//     Log::info('Log 2 ' . $newProduct);

//     // Update other fields only if present in the request
//     $newProduct->fill($request->only(['name', 'description', 'price']));

//     Log::info('Log 3' . $newProduct);
//     // Handle avatar upload
//     if ($request->hasFile('avatar')) {
//         $avatar = $request->file('avatar');
//         $filename = time() . '.' . $avatar->getClientOriginalExtension();
//         $avatar->storeAs('public/products', $filename);
//         $newProduct->avatar = $filename;
//     }

//        Log::info('Log 4' . $newProduct);

//     $newProduct->save();

//     return response()->json([
//         'success' => true,
//         'message' => 'Product updated successfully.',
//         'product' => $newProduct
//     ], 200);
// }


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
