"use client";

import { cn } from "@/lib/cn";

interface TeamMemberRowProps {
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  avatar?: string;
}

const roleBadgeStyles: Record<TeamMemberRowProps["role"], string> = {
  admin: "bg-black text-white",
  member: "bg-grey-200 text-grey-700",
  viewer: "bg-grey-100 text-grey-500",
};

export function TeamMemberRow({ name, email, role, avatar }: TeamMemberRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-border-light py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-grey-200 text-xs font-semibold text-grey-700">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-black">{name}</p>
          <p className="text-xs text-grey-500">{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "rounded-pill px-2.5 py-0.5 text-2xs font-medium capitalize",
            roleBadgeStyles[role]
          )}
        >
          {role}
        </span>
        <button
          type="button"
          className="text-xs font-medium text-grey-500 transition-colors hover:text-danger"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
