"use client";

import React, { useState } from "react";
import { cn } from "@/lib/cn";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  className,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const initials = name ? getInitials(name) : "";

  return (
    <div
      className={cn(
        "relative inline-flex flex-shrink-0 items-center justify-center rounded-full overflow-hidden",
        !showImage && "bg-black text-white",
        sizeStyles[size],
        className
      )}
      role="img"
      aria-label={alt || name || "Avatar"}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-semibold leading-none select-none">
          {initials}
        </span>
      )}
    </div>
  );
}
