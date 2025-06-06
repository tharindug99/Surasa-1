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
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $validator->errors()->getMessages()
        ], 422));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isCreating = $this->isMethod('POST'); // Check if it's a POST request (store method)

        return [
            'user_id' => ($isCreating ? 'required' : 'sometimes|required') . '|exists:users,id',
            'product_id' => ($isCreating ? 'required' : 'sometimes|required') . '|exists:products,id',
            'review_image' => 'sometimes|nullable|file|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'no_of_stars' => ($isCreating ? 'required' : 'sometimes|required') . '|integer|min:1|max:5',
            'full_name' => 'sometimes|nullable|string|max:255',
            'comment' => 'sometimes|nullable|string',
            'status' => 'sometimes|nullable|string|in:approved,rejected,pending'
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'The user ID is required.',
            'user_id.exists' => 'The selected user ID is invalid.',
            'product_id.required' => 'The product ID is required.',
            'product_id.exists' => 'The selected product ID is invalid.',

            'review_image.file' => 'The review image must be a file.',
            'review_image.image' => 'The review image must be an image file.',
            'review_image.mimes' => 'The review image must be a file of type: jpeg, png, jpg, gif, svg.',
            'review_image.max' => 'The review image may not be greater than 2048 kilobytes (2MB).',

            'no_of_stars.required' => 'The number of stars is required.',
            'no_of_stars.integer' => 'The number of stars must be an integer.',
            'no_of_stars.min' => 'The number of stars must be at least 1.',
            'no_of_stars.max' => 'The number of stars must not be greater than 5.',

            'full_name.string' => 'The full name must be a string.',
            'full_name.max' => 'The full name may not be greater than 255 characters.',

            'comment.string' => 'The comment must be a string.',

            'status.string' => 'The status must be a string.',
            'status.in' => 'The status must be one of: approved, rejected, pending.',
        ];
    }
}