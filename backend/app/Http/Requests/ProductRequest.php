<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

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
        $productId = $this->route('id'); // Use this instead of $this->route('id')

        return [
            'name' => 'sometimes|unique:products,name,' . $productId,
            'description' => 'nullable',
            'category_id' => 'nullable|numeric|exists:categories,id',
            'price' => 'nullable|numeric',
            'avatar' => 'nullable|image|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name' => 'sometimes|unique:products,name,' . $this->route('id'),
            'name.unique' => 'The Product name has already been taken.',
            'description.required' => 'The Product description is required.',
            'avatar.image' => 'The Product avatar must be an image file.',
            'avatar.max' => 'The Product avatar may not be greater than 2MB.',
            'category_id.required' => 'The Product must have a category',
            'price.required' => 'The Product must have a price',
            'category_id.numeric' => 'The Category Id must be a numeric value',
            'price.numeric' => 'The Product Price must be a numeric value',
        ];
    }
}
