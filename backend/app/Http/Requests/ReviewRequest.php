<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ReviewRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'review_image' => 'nullable|string|max:255',
            'no_of_stars' => 'required|integer|min:1|max:5',
            'full_name' => 'required|string',
            'comment' => 'required|string',
        ];
    }


    public function messages(): array
    {
        return [
            'user_id.required' => 'The user ID is required.',
            'user_id.exists' => 'The selected user ID is invalid.',
            'product_id.required' => 'The product ID is required.',
            'product_id.exists' => 'The selected product ID is invalid.',
            'review_image.string' => 'The review image must be a string.',
            'review_image.max' => 'The review image may not be greater than 255 characters.',
            'no_of_stars.required' => 'The number of stars is required.',
            'no_of_stars.integer' => 'The number of stars must be an integer.',
            'no_of_stars.min' => 'The number of stars must be at least 1.',
            'no_of_stars.max' => 'The number of stars must not be greater than 5.',
            'full_name.required' => 'The full name is required.',
            'full_name.string' => 'The full name must be a string.',
            'comment.required' => 'The comment is required.',
            'comment.string' => 'The comment must be a string.',
        ];
    }
}
