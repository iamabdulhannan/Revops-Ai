"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ChatMessage as ChatMessageType } from "@/types";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

const initialMessages: ChatMessageType[] = [
  {
    id: "1",
    role: "user",
    content: "Why did churn spike in January?",
    timestamp: "10:23 AM",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "January churn rose to 4.1%, primarily driven by 3 enterprise accounts (DataSync Ltd, CloudOps Inc, NetFlow Systems) that did not renew. Common factors: all three had declining product usage over the prior 60 days and unresolved support tickets. Recommendation: implement a health-score alert at the 30-day mark to trigger proactive outreach before renewal windows.",
    timestamp: "10:23 AM",
  },
  {
    id: "3",
    role: "user",
    content: "Which rep has the best pipeline?",
    timestamp: "10:25 AM",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Mike Ross leads with $213K across 4 active deals and a 91% average health score. His largest opportunity is a $120K multi-year deal with NetBridge currently in negotiation. Sarah Chen follows with $149K across 5 deals but has a lower average health score of 68%, largely due to an aging proposal with BrandForge (22 days in stage).",
    timestamp: "10:25 AM",
  },
];

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessageType[]>(initialMessages);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = useCallback((content: string) => {
    const userMessage: ChatMessageType = {
      id: `u-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const assistantMessage: ChatMessageType = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content:
          "I am analyzing your data to provide an accurate response. This is a placeholder -- in production, this would connect to your RevOps AI engine for real-time insights.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 800);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <div className="border-t border-border-light p-4">
        <ChatInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
