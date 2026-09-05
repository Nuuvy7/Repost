<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'         => ['required', 'string', 'max:255'],
            'body'          => ['nullable', 'string'],
            'media_url'     => ['nullable', 'max:500'],
            'media_type'    => ['nullable', 'in:image,text'],
            'status'        => ['nullable', 'in:selesai,diproses,ditolak'],
            'category'      => ['nullable', 'string', 'max:255'],
            'latitude'      => ['nullable', 'numeric', 'between:-90,90'],
            'longitude'     => ['nullable', 'numeric', 'between:-180,180'],
            'location_name' => ['nullable', 'string', 'max:255'],
        ];
    }
}
