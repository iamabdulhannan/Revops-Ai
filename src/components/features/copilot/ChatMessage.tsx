"use client";

import { cn } from "@/lib/cn";
import type { ChatMessage as ChatMessageType } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-lg px-4 py-3",
          isUser ? "bg-black text-white" : "bg-grey-50 text-black"
        )}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p
          className={cn(
            "mt-1.5 text-2xs",
            isUser ? "text-grey-400" : "text-grey-400"
          )}
        >
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}
