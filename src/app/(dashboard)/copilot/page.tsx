"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { PageHeader } from "@/components/layout/PageHeader";
import { getResponse } from "@/data/copilot-responses";
import type { ChatMessage } from "@/types";

const suggestedPrompts = [
  "Which accounts are most likely to churn this quarter?",
  "Summarize pipeline health for the current month",
  "What playbooks should I activate for at-risk accounts?",
  "Show me revenue trends over the last 6 months",
];

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm your AI Co-Pilot. I can help you analyze revenue data, predict churn risk, and suggest actions for your accounts. What would you like to explore?",
    timestamp: "Just now",
  },
];

export default function CopilotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = useCallback(
    (text?: string) => {
      const content = (text ?? input).trim();
      if (!content) return;

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        content,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      const delay = 800 + Math.random() * 700;
      setTimeout(() => {
        const assistantMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: getResponse(content),
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsTyping(false);
      }, delay);
    },
    [input]
  );

  const showSuggestions = messages.length <= 1;

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.topbar)-3rem)] lg:h-[calc(100vh-theme(spacing.topbar)-4rem)]">
      <PageHeader
        title="AI Co-Pilot"
        subtitle="Your intelligent revenue assistant"
      />

      {/* Chat container */}
      <div className="flex-1 flex flex-col rounded-[6px] bg-white shadow-card overflow-hidden">
        {/* Messages area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-3",
                  message.role === "user"
                    ? "bg-black text-white"
                    : "bg-grey-50 text-black border border-border-light"
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="mt-1 text-xs text-grey-400">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-grey-50 border border-border-light rounded-lg px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-grey-400 animate-pulse" />
                  <span className="h-2 w-2 rounded-full bg-grey-400 animate-pulse [animation-delay:150ms]" />
                  <span className="h-2 w-2 rounded-full bg-grey-400 animate-pulse [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested prompts */}
        {showSuggestions && (
          <div className="px-6 pb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="h-3 w-3 text-grey-400" />
              <span className="text-xs text-grey-400 font-medium">
                Suggested prompts
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="text-xs text-grey-600 bg-grey-50 border border-border-light rounded-pill px-3 py-1.5 hover:bg-grey-100 transition-colors duration-150"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask the AI Co-Pilot anything..."
              className="flex-1 h-10 px-4 border border-grey-300 rounded-sm bg-white text-base placeholder:text-grey-400 transition-colors duration-150 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={cn(
                "h-10 w-10 flex items-center justify-center rounded-sm transition-colors duration-150 shrink-0",
                input.trim()
                  ? "bg-black text-white hover:bg-grey-800"
                  : "bg-grey-200 text-grey-400 cursor-not-allowed"
              )}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
