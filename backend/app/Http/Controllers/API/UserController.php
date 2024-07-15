<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(UserRequest $request)
{
    $validated = $request->validated();
    $user = new User();
    $user->first_name = $validated['first_name'];
    $user->last_name = $validated['last_name'];
    $user->phone_num = $validated['phone_num'];
    $user->email = $validated['email'];
    $user->image = $request->has('image') ? $validated['image'] : 'https://placehold.co/40x40';
    $user->password = Hash::make($validated['password']);
    $user->loyalty_points = $validated['loyalty_points'] ?? 0;

    $user->save();

    return response()->json([
        'success' => true,
        'message' => 'User created successfully.',
        'user' => $user
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $users = User::find($id);

        if (!$users) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json($users);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(UserRequest $request, string $id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    $validated = $request->validated();

    if (isset($validated['password'])) {
        $validated['password'] = Hash::make($validated['password']);
    }

    $user->update($validated);

    return response()->json([
        'success' => true,
        'message' => 'User updated successfully.',
        'user' => $user
    ], 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $users = User::find($id);

        if (!$users) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $users->delete();

        return response()->json(['message' => 'User deleted']);
    }
}
