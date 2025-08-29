// src/components/TaskTextarea.jsx

import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";

// 1. Add `onSendMessage` to the component's props
export default function TaskTextarea({
  onSendMessage,
  isDisabled,
  placeholder,
}: {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
  placeholder: string;
}) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Use a local ref for DOM manipulation
  const MAX_HEIGHT = 160;

  const handleSendMessage = () => {
    if (message && !isDisabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setMessage(textarea.value);

    // Auto-resize logic remains the same
    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    if (scrollHeight > MAX_HEIGHT) {
      textarea.style.height = `${MAX_HEIGHT}px`;
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.height = `${scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Reset textarea height when the message is cleared
  useEffect(() => {
    if (!message && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.overflowY = "hidden";
    }
  }, [message]);

  return (
    <div className="relative w-full max-w-2xl p-4">
      <Textarea
        ref={textareaRef} // Use the local ref here
        value={message}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        rows={1}
        disabled={isDisabled}
        placeholder={placeholder}
        className="custom-scrollbar resize-none pe-15 bg-background"
        style={{
          lineHeight: "1.5rem",
          maxHeight: `${MAX_HEIGHT}px`,
        }}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSendMessage}
        disabled={!message || isDisabled}
        className="cursor-pointer absolute bottom-0 right-0 -translate-1/2 m-1 p-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed enabled:bg-primary text-white disabled:text-black dark:disabled:text-muted-foreground hover:text-white hover:bg-primary dark:hover:bg-primary
        "
        aria-label="Send message"
      >
        <SendIcon className="w-6 h-6" />
      </Button>
    </div>
  );
}
