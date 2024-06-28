<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;

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
        $users = new User();
        $users->first_name = $validated['first_name'];
        $users->last_name = $validated['last_name'];
        $users->phone_num = $validated['phone_num'];
        $users->email = $validated['email'];
        $users->image = $validated['image'];
        $users->password = $validated['password'];
        $users->loyalty_points = $validated['loyalty_points'];


        $users->save();

        return response()->json([
            'success' => true,
            'message' => 'User created successfully.',
            'users' => $users
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
        $users = User::find($id);

        if (!$users) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $validated = $request->validated();


        $users->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully.',
            'users' => $users
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
