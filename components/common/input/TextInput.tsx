"use client";

import React from "react";

type TextInputProps = {
  type?: string; // 기본은 text
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function TextInput({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-5 ml-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
  );
}
