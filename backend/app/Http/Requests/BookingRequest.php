<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;


class BookingRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'phone_num' => 'required|string|max:20',
            'email' => 'required|string|email|max:255',
            'faculty' => 'required|in:Agricultural Sciences,Applied Sciences,Computing,Geomatics,Management Studies,Medicine,Social Sciences & Languages,Technology,Graduate Studies',
            'status'=> 'required| in: Confirmed,Rejected,Completed',
            'start_time' => 'required|date|before:end_time',
            'end_time' => 'required|date|after:start_time',
            'event_name' => 'required|string|max:255',
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
            'email.required' => 'The email is required.',
            'email.string' => 'The email must be a string.',
            'email.email' => 'The email must be a valid email address.',
            'email.max' => 'The email may not be greater than 255 characters.',
            'faculty.required' => 'The faculty is required.',
            'faculty.in' => 'The selected faculty is invalid.',
            'start_time.required' => 'The start time is required.',
            'start_time.date' => 'The start time must be a valid date.',
            'start_time.before' => 'The start time must be before the end time.',
            'end_time.required' => 'The end time is required.',
            'end_time.date' => 'The end time must be a valid date.',
            'end_time.after' => 'The end time must be after the start time.',
            'event_name.required' => 'The event name is required.',
            'event_name.string' => 'The event name must be a string.',
            'event_name.max' => 'The event name may not be greater than 255 characters.',
        ];
    }
}
