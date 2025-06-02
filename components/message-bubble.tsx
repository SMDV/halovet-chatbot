import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type MessageBubbleProps = {
  role: "user" | "bot"
  content: string
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user"
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3",
          isUser
            ? "bg-primary text-primary-foreground" // This sets the background and default text color for the bubble
            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
        )}
      >
        {/* Apply prose classes for better Markdown styling, and force text color for user messages */}
        <div className={cn("prose dark:prose-invert max-w-none", isUser && "!text-primary-foreground")}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
