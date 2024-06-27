<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;


class DailyMenuItemRequest extends FormRequest
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
            'product_id' => 'required|exists:products,id',
            'description' => 'required|string',
            'image' => 'required|string|max:255',
            'date' => 'required|date',
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required' => 'The product ID is required.',
            'product_id.exists' => 'The selected product ID is invalid.',
            'description.required' => 'The description is required.',
            'description.string' => 'The description must be a string.',
            'image.required' => 'The image is required.',
            'image.string' => 'The image must be a string.',
            'image.max' => 'The image may not be greater than 255 characters.',
            'date.required' => 'The date is required.',
            'date.date' => 'The date must be a valid date.',
        ];
    }
}
