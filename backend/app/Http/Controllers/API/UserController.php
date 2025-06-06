<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

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
    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $rules = [
            'first_name' => 'nullable|string',
            'last_name' => 'nullable|string',
            'email' => 'nullable|string|email|unique:users,email,' . $id,
            'phone_num' => 'nullable|string|max:20|unique:users,phone_num,' . $id,
            'password' => 'nullable|string|min:8',
            'loyalty_points' => 'nullable|integer|min:0',
            //'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        // Handle image upload separately
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($user->image && $user->image !== 'https://placehold.co/40x40') {
                Storage::disk('public')->delete($user->image);
            }
            // Store new image
            $path = $request->file('image')->store('users', 'public');
            $validated['image'] = $path;
        } else {
            // Only remove 'image' key if it exists in validated data
            if (array_key_exists('image', $validated)) {
                unset($validated['image']);
            }
        }

        // Hash password if provided
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully.',
            'user' => $user
        ]);
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

    /**
     * User Login
     */
    public function login(Request $request)
    {
        $requestData = $request->all();
        Log::info('Request Data:', $requestData);

        $email = $requestData['email'] ?? null;
        $password = $requestData['password'] ?? null;

        if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json([
                'success' => false,
                'message' => 'The email field is required and must be a valid email address.',
            ], 422);
        }

        if (!$password) {
            return response()->json([
                'success' => false,
                'message' => 'The password field is required.',
            ], 422);
        }

        $credentials = [
            'email' => $email,
            'password' => $password,
        ];

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // Generate JWT token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login successful.',
                'userId' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone_num' => $user->phone_num,
                'image' => $user->image,
                'loyalty_points' => $user->loyalty_points,
                'token' => $token,
                'tokenType' => config('auth.token_type'), // Use a configuration value
                'expiresIn' => config('jwt.ttl') * 60, // Token expiration time in minutes
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials.',
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $token = $request->bearerToken(); // Get raw token from Authorization header

        Log::info('Logout request user:', ['user' => $user]);

        if ($user) {
            try {
                $user->tokens()->where('id', explode('|', $token)[0])->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Logout successful.'
                ]);
            } catch (\Exception $e) {
                Log::error('Logout failed:', ['error' => $e->getMessage()]);
                return response()->json([
                    'success' => false,
                    'message' => 'Logout failed. Please try again.'
                ], 500);
            }
        }

        Log::warning('Unauthenticated logout attempt');
        return response()->json([
            'success' => false,
            'message' => 'User not authenticated.'
        ], 401);
    }



    /**
     * Add loyalty points to user
     */
    public function addLoyaltyPoints(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        // Admin check
        //        if (!auth()->user()->is_admin) {
        //            return response()->json([
        //                'success' => false,
        //                'message' => 'Unauthorized - Admin access required'
        //            ], 403);
        //        }


        $request->validate([
            'points' => 'required|integer|min:1',
        ]);

        $user->increment('loyalty_points', $request->points);

        return response()->json([
            'success' => true,
            'message' => 'Loyalty points added successfully.',
            'user' => $user->fresh()
        ]);
    }

    /**
     * Deduct loyalty points from user
     */
    public function deductLoyaltyPoints(Request $request, User $user)
    {
        //        // Admin check
        //        if (!auth()->user()->is_admin) {
        //            return response()->json([
        //                'success' => false,
        //                'message' => 'Unauthorized - Admin access required'
        //            ], 403);
        //        }


        $request->validate([
            'points' => 'required|integer|min:1',
        ]);

        if ($user->loyalty_points < $request->points) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient loyalty points.',
            ], 422);
        }

        $user->decrement('loyalty_points', $request->points);

        return response()->json([
            'success' => true,
            'message' => 'Loyalty points deducted successfully.',
            'user' => $user->fresh()
        ]);
    }
}
