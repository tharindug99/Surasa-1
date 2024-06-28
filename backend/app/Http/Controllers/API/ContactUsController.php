<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactUsRequest;
use App\Models\ContactUs;

class ContactUsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contactus = ContactUs::all();
        return response()->json($contactus);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ContactUsRequest $request)
    {
        $validated=$request->validated();
        $contactus = new ContactUs();
        $contactus->name = $validated['name'];
        $contactus->email = $validated['email'];
        $contactus->message = $validated['message'];

        $contactus->save();
        return response()->json([
            'message' => 'Contact Us message sent successfully',
            'success' => true,
            'contactus' => $contactus
        ],201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $contactus = ContactUs::find($id);

        if (!$contactus) {
            return response()->json(['error' => 'Contact Us message not found'], 404);
        }

        return response()->json($contactus);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ContactUsRequest $request, string $id)
    {
        $contactus = ContactUs::find($id);



        if (!$contactus) {
            return response()->json(['error' => 'Contact Us message not found'], 404);
        }
        $validated = $request->validated();

        $contactus->update($validated);

        return response()->json([
            'message' => 'Contact Us message updated successfully',
            'success' => true,
            'contactus' => $contactus
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $contactus = ContactUs::find($id);
        if (!$contactus) {
            return response()->json(['error' => 'Contact Us message not found'], 404);
        }
        $contactus->delete();
        return response()->json([
            'message' => 'Contact Us message deleted successfully',
            'success' => true,
        ],200);
    }
}
