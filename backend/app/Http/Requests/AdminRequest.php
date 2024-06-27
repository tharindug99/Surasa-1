<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class AdminRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }



    protected function failedValidation(Validator $validator) {
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
            'name' => 'required|string|max:255',
            'phone_num' => 'required|string|max:20',
            'password' => 'required|string|min:8|max:255',
        ];
    }


    public function messages(): array
    {
        return [
            'name.required' => 'The name is required.',
            'name.string' => 'The name must be a string.',
            'name.max' => 'The name may not be greater than 255 characters.',
            'phone_num.required' => 'The phone number is required.',
            'phone_num.string' => 'The phone number must be a string.',
            'phone_num.max' => 'The phone number may not be greater than 20 characters.',
            'password.required' => 'The password is required.',
            'password.string' => 'The password must be a string.',
            'password.min' => 'The password must be at least 8 characters.',
            'password.max' => 'The password may not be greater than 255 characters.',
        ];
    }
}
