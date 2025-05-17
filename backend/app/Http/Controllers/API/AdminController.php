<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequest;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Admin::all();
        return response()->json($admins);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AdminRequest $request)
    {
        $validated = $request->validated();
        $admin = new Admin();
        $admin->name = $validated['name'];
        $admin->phone_num = $validated['phone_num'];
        $admin->password = Hash::make($validated['password']);
        $admin->save();

        return response()->json([
            'success' => true,
            'message' => 'Admin created successfully.',
            'admin' => $admin
        ], 201);


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): \Illuminate\Http\JsonResponse
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['error' => 'Admin not found'], 404);
        }

        return response()->json($admin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AdminRequest $request,  $id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['error' => 'Admin not found'], 404);
        }

        $validated = $request->validated();

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $admin->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Admin updated successfully.',
            'admin' => $admin
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json(['error' => 'Admin not found'], 404);
        }

        $admin->delete();

        return response()->json(['message' => 'Admin deleted']);
    }

    /**
     * Admin Login
     */
    public function adminLogin(Request $request)
    {
        $credentials = $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::guard('admin')->attempt($credentials)) {
            $admin = Auth::guard('admin')->user();
            $token = $admin->createToken('admin_auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'token' => $token,
                'admin' => $admin
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }

    /**
     * Admin Logout
     */
    public function adminLogout(Request $request)
    {
        $admin = $request->user();
        $token = $request->bearerToken(); // Get raw token from Authorization header

        Log::info('Admin Logout request user:', ['admin' => $admin]);

        if ($admin) {
            try {
                $admin->tokens()->where('id', explode('|', $token)[0])->delete();
                return response()->json([
                    'success' => true,
                    'message' => 'Admin logout successful.'
                ]);
            } catch (\Exception $e) {
                Log::error('Admin Logout failed:', ['error' => $e->getMessage()]);
                return response()->json([
                    'success' => false,
                    'message' => 'Logout failed. Please try again.'
                ], 500);
            }
        }

        Log::warning('Unauthenticated admin logout attempt');
        return response()->json([
            'success' => false,
            'message' => 'Admin not authenticated.'
        ], 401);
    }

}

