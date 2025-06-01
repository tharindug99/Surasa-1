<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Log;

class ProductRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $productId = $this->route('id');

        // Log the request data for debugging
        \Log::info('ProductRequest Validation:', [
            'all_data' => $this->all(),
            'has_file' => $this->hasFile('avatar'),
            'content_type' => $this->header('Content-Type'),
            'method' => $this->method()
        ]);

        return [
            'name' => 'sometimes|string|max:255|unique:products,name,' . $productId,
            'description' => 'sometimes|string|nullable',
            'category_id' => 'sometimes|exists:categories,id|nullable',
            'price' => 'sometimes|numeric|nullable',
            'avatar' => 'sometimes|image|max:2048|nullable',
        ];
    }

    public function messages(): array
    {
        return [
            'name.string' => 'The product name must be a string.',
            'name.unique' => 'This product name has already been taken.',
            'name.max' => 'The product name cannot exceed 255 characters.',
            'description.string' => 'The description must be a string.',
            'category_id.exists' => 'The selected category does not exist.',
            'price.numeric' => 'The price must be a number.',
            'avatar.image' => 'The file must be an image.',
            'avatar.max' => 'The image size cannot exceed 2MB.',
        ];
    }
}
