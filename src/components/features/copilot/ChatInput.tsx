"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/cn";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSubmit: (message: string) => void;
}

export function ChatInput({ onSubmit }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, []);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="flex items-end gap-2 rounded-lg border border-border bg-white px-4 py-3">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about your revenue..."
        rows={1}
        className="max-h-[160px] min-h-[24px] flex-1 resize-none bg-transparent text-sm text-black placeholder:text-grey-400 focus:outline-none"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!value.trim()}
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
          value.trim()
            ? "bg-black text-white hover:bg-grey-800"
            : "bg-grey-200 text-grey-400"
        )}
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}
