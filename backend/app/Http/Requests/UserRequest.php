<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users,email,' . $this->user, // Ignore unique rule for the current user during updates
            'phone_num' => 'required|string|max:20|unique:users,phone_num,' . $this->user, // Ignore unique rule for the current user during updates
            'image' => 'nullable|string|max:255',
            'password' => 'required|string|min:8', // Example: Minimum 8 characters
            'loyalty_points' => 'integer|min:0',
            // 'email_verified_at' => 'nullable|date', // Uncomment if you want to validate date format
        ];
    }


    public function messages(): array
    {
        return [
            'first_name.required' => 'The first name is required.',
            'first_name.string' => 'The first name must be a string.',
            'last_name.required' => 'The last name is required.',
            'last_name.string' => 'The last name must be a string.',
            'email.required' => 'The email address is required.',
            'email.string' => 'The email address must be a string.',
            'email.email' => 'The email address must be valid.',
            'email.unique' => 'The email address has already been taken.',
            'phone_num.required' => 'The phone number is required.',
            'phone_num.string' => 'The phone number must be a string.',
            'phone_num.max' => 'The phone number may not be greater than 20 characters.',
            'phone_num.unique' => 'The phone number has already been taken.',
            'image.string' => 'The image must be a string.',
            'image.max' => 'The image may not be greater than 255 characters.',
            'password.required' => 'The password is required.',
            'password.string' => 'The password must be a string.',
            'password.min' => 'The password must be at least :min characters.', // Example: Minimum 8 characters
            'loyalty_points.integer' => 'The loyalty points must be an integer.',
            'loyalty_points.min' => 'The loyalty points must be at least 0.',
            // 'email_verified_at.date' => 'The email verified at must be a valid date.', // Uncomment if you want to validate date format
        ];
    }
}
