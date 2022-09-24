import React from 'react'

export default function Textarea({ name, type, placeholder, ...rest }) {
    return (
        <textarea
            {...rest} name={name}
            type={type}
            class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder={placeholder}
            rows="6"
        />

    )
}
