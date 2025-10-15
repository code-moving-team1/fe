// components/common/spinner/Spinner
"use client";

import React from "react";

export function Spinner({ className }: { className?: string }) {
  return (
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
  );
}
