import React from 'react';
export function Textarea({ ...props }) {
  return (
    <textarea
      className="border rounded px-3 py-2 w-full"
      rows={4}
      {...props}
    />
  );
}
