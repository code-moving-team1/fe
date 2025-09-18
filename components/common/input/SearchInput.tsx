"use client";

import React, { useState } from "react";
import Image from "next/image";

type SearchInputProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
};

export default function SearchInput({
  placeholder = "검색어를 입력하세요",
  onSearch,
  className = "",
}: SearchInputProps) {
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
    if (onSearch) onSearch("");
  };

  const handleSearch = () => {
    if (onSearch) onSearch(value);
  };

  return (
    <div
      className={`flex items-center bg-gray-200 rounded-md px-3 py-2 ${className}`}
    >
      <button onClick={handleSearch}>
        <Image
          src="/icons/ic_search.svg"
          alt="검색"
          width={30}
          height={30}
          className="mr-2"
        />
      </button>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      {value && (
        <button onClick={handleClear} className="ml-2">
          <Image src="/icons/ic_X.svg" alt="지우기" width={30} height={30} />
        </button>
      )}
    </div>
  );
}
