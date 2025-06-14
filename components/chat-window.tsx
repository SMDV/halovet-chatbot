"use client"

import type React from "react"
import type { HTMLDivElement } from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import MessageBubble from "./message-bubble"
import type { AgentResponse, Message, Session, JadwalData } from "@/lib/chat-types"
import { Loader2, RefreshCcw, Info } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const API_BASE_URL = process.env.NEXT_PUBLIC_HALOVET_API_BASE_URL
const USER_ID = process.env.NEXT_PUBLIC_HALOVET_USER_ID || "demo-user-1"

// Keys for localStorage
const MESSAGES_STORAGE_KEY = "halovet_chat_messages"
const SESSION_STORAGE_KEY = "halovet_chat_session"

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showGuideTooltip, setShowGuideTooltip] = useState(true)
  const [quickActionOptions, setQuickActionOptions] = useState<string[] | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const formatJadwalData = (jadwal: JadwalData[]) => {
    if (!jadwal || jadwal.length === 0) {
      return "Tidak ada jadwal dokter yang tersedia."
    }
    let markdown = "Berikut jadwal dokter yang tersedia:\n\n"
    jadwal.forEach((item, index) => {
      markdown += `**${index + 1}. drh. ${item.nama_dokter}**\n`
      markdown += `- Tanggal: ${item.tanggal}\n`
      markdown += `- Jam: ${item.jam_mulai} - ${item.jam_selesai}\n`
      markdown += `- Kuota Tersedia: ${item.kuota_total - item.kuota_terpakai}/${item.kuota_total}\n\n`
    })
    return markdown
  }

  // Helper function to determine quick action options based on bot's latest reply
  const getQuickActionOptions = useCallback((botReply: string): string[] | null => {
    if (!botReply) return null

    // Check for initial welcome message (more robust check)
    if (
      botReply.includes("Halo! Selamat datang di HaloVet 🐾") &&
      botReply.includes("Apa yang bisa saya bantu hari ini?")
    ) {
      return ["Konsultasi", "Lihat Jadwal Dokter", "Daftar"]
    }

    // Check for gender question
    if (botReply.includes("Apakah hewan Anda jantan atau betina?")) {
      return ["Jantan", "Betina"]
    }

    // Check for animal type question
    if (botReply.includes("Termasuk jenis hewan apakah")) {
      return ["kucing", "babi", "kelinci", "kambing", "kuda", "anjing", "domba", "sapi"]
    }

    // Yes/No questions (using keywords for robustness against dynamic pet_name)
    const yesNoQuestionKeywords = [
      "produksi susu terganggu",
      "mengalami demam",
      "mengeluarkan cairan dari hidung",
      "sering bersin-bersin",
      "terdapat luka pada kulit",
      "terlihat pincang atau sulit berjalan",
      "ada masalah pada bulu atau kulit",
      "tampak lemas atau tidak aktif",
      "mengalami diare",
      "tampak kesulitan bernapas",
      "gerakan menjadi terbatas",
      "menunjukkan tanda-tanda dehidrasi",
      "berat badan menurun",
    ]

    const lowerCaseBotReply = botReply.toLowerCase()
    const isYesNoQuestion = yesNoQuestionKeywords.some((keyword) => lowerCaseBotReply.includes(keyword.toLowerCase()))

    if (isYesNoQuestion) {
      return ["Ya", "Tidak"]
    }

    return null
  }, [])

  // Function to send the initial "test" prompt to the server
  const sendInitialTestPrompt = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: USER_ID,
          message: "test", // Send "test" as the initial prompt
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: AgentResponse = await response.json()
      let botReplyContent = data.reply

      if (data.jadwal_data && data.jadwal_data.length > 0) {
        botReplyContent += "\n\n" + formatJadwalData(data.jadwal_data)
      }

      const botMessage: Message = { id: Date.now().toString(), role: "bot", content: botReplyContent }
      setMessages([botMessage]) // Set only the bot's initial message
      setSession(data.session)
      setQuickActionOptions(getQuickActionOptions(botReplyContent)) // Set options based on initial reply
    } catch (error) {
      console.error("Error sending initial test prompt:", error)
      let errorMessage = "Maaf, terjadi kesalahan saat memuat chat. Silakan coba lagi."
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        errorMessage = "Koneksi ke server gagal. Mohon periksa koneksi internet Anda atau hubungi administrator API."
      } else if (error instanceof Error) {
        errorMessage = `Terjadi kesalahan: ${error.message}.`
      }
      setMessages([{ id: Date.now().toString(), role: "bot", content: errorMessage }])
      setQuickActionOptions(null) // Hide options on error
    } finally {
      setIsLoading(false)
    }
  }, [getQuickActionOptions])

  // Load messages and session from localStorage on initial mount
  useEffect(() => {
    const storedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY)
    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY)

    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages)
      setMessages(parsedMessages)
      if (parsedMessages.length > 0) {
        setShowGuideTooltip(false)
        // Re-evaluate quick action options for the last bot message if available
        const lastBotMessage = parsedMessages.findLast((msg: Message) => msg.role === "bot")
        if (lastBotMessage) {
          setQuickActionOptions(getQuickActionOptions(lastBotMessage.content))
        }
      }
    } else {
      sendInitialTestPrompt()
      setShowGuideTooltip(true)
    }

    if (storedSession) {
      setSession(JSON.parse(storedSession))
    }
  }, [sendInitialTestPrompt, getQuickActionOptions])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  // Save session to localStorage whenever it changes
  useEffect(() => {
    if (session) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
    }
  }, [session])

  // Scroll to bottom on new messages using messagesEndRef
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent, messageContent?: string) => {
    e?.preventDefault()
    const contentToSend = messageContent || input.trim()

    if (!contentToSend || isLoading) return

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: contentToSend }
    setMessages((prev) => [...prev, userMessage])
    setInput("") // Clear input field regardless of how message was sent
    setIsLoading(true)
    setShowGuideTooltip(false) // Hide tooltip after first user message
    setQuickActionOptions(null) // Hide options immediately after user sends message

    try {
      const response = await fetch(`${API_BASE_URL}/api/agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: USER_ID,
          message: userMessage.content,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: AgentResponse = await response.json()
      let botReplyContent = data.reply

      if (data.jadwal_data && data.jadwal_data.length > 0) {
        botReplyContent += "\n\n" + formatJadwalData(data.jadwal_data)
      }

      const botMessage: Message = { id: Date.now().toString(), role: "bot", content: botReplyContent }
      setMessages((prev) => [...prev, botMessage])
      setSession(data.session)
      setQuickActionOptions(getQuickActionOptions(botReplyContent)) // Set new options based on bot's reply
    } catch (error) {
      console.error("Error sending message:", error)
      let errorMessage = "Maaf, terjadi kesalahan. Silakan coba lagi."
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        errorMessage = "Koneksi ke server gagal. Mohon periksa koneksi internet Anda atau hubungi administrator API."
      } else if (error instanceof Error) {
        errorMessage = `Terjadi kesalahan: ${error.message}.`
      }
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: "bot", content: errorMessage }])
      setQuickActionOptions(null) // Hide options on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickActionClick = (option: string) => {
    // Directly pass the option to handleSendMessage
    handleSendMessage(undefined, option)
  }

  const handleResetChat = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: USER_ID,
          message: "", // As per your instruction, message is an empty string on reset
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // After successful reset, trigger the initial test prompt to get a new welcome message
      await sendInitialTestPrompt()
      // Clear localStorage on reset (sendInitialTestPrompt will then save the new state)
      localStorage.removeItem(MESSAGES_STORAGE_KEY)
      localStorage.removeItem(SESSION_STORAGE_KEY)
      setShowGuideTooltip(true) // Show tooltip again after reset
      // Removed: setQuickActionOptions(null); // This was causing the issue
    } catch (error) {
      console.error("Error resetting chat:", error)
      setMessages([{ id: Date.now().toString(), role: "bot", content: "Maaf, gagal mereset chat. Silakan coba lagi." }])
      setQuickActionOptions(null) // Hide options on error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl h-[80vh] flex flex-col mx-auto my-8 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between border-b p-4 bg-green-50 dark:bg-gray-800">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Halovet Chatbot</CardTitle>
        <div className="flex gap-2">
          <TooltipProvider delayDuration={0}>
            <Tooltip open={showGuideTooltip} onOpenChange={setShowGuideTooltip}>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <Link href="/guide" aria-label="User Guide">
                    <Info className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="end" className="max-w-xs text-center">
                <p>Baru di sini? Klik untuk melihat panduan penggunaan chatbot!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="outline" size="icon" onClick={handleResetChat} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            <span className="sr-only">Reset Chat</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <ScrollArea className="h-full pr-4" viewportRef={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 max-w-[70%] rounded-lg p-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Dummy div to scroll to */}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        {quickActionOptions && quickActionOptions.length > 0 ? (
          <div className="flex flex-wrap gap-2 w-full justify-center">
            {quickActionOptions.map((option) => (
              <Button
                key={option}
                onClick={() => handleQuickActionClick(option)}
                disabled={isLoading}
                variant="outline"
                className="flex-1 min-w-[100px] sm:flex-none"
              >
                {option}
              </Button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
            <Input
              placeholder="Ketik pesan Anda..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 text-foreground"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Kirim"}
            </Button>
          </form>
        )}
      </CardFooter>
    </Card>
  )
}
