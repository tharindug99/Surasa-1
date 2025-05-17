<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true; // Assuming you have your authorization logic here
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors()->getMessages(), 422));
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'full_name' => 'required|string',
            'mobile_number' => 'required|string|max:12',
            'address' => 'required|string',
            'status' => 'sometimes|in:Pending,Ready,OutforDelivery,Completed,Cancelled',
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'The user ID is required.',
            'user_id.exists' => 'The selected user ID is invalid.',
            'full_name.required' => 'The full name is required.',
            'full_name.string' => 'The full name must be a string.',
            'mobile_number.required' => 'The mobile number is required.',
            'mobile_number.string' => 'The mobile number must be a string.',
            'mobile_number.max' => 'The mobile number must not exceed 20 characters.',
            'address.required' => 'The address is required.',
            'address.string' => 'The address must be a string.',
        ];
    }
}
