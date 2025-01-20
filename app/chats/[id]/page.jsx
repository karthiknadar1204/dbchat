"use client"

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { fetchFromEmbeddings } from '@/app/actions/chat'
import { useParams, useRouter } from 'next/navigation'
import { Bot, Loader2, Copy, Database, ArrowLeft } from 'lucide-react'
import { UserButton } from "@clerk/nextjs"
import { getDbLink } from '@/app/actions/user'
import SchemaDialog from '@/app/components/SchemaDialog'

const page = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [dbLink, setDbLink] = useState(null)
  const [schemaOpen, setSchemaOpen] = useState(false)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchDbLink = async () => {
      const link = await getDbLink(params.id)
      console.log('Database link:', link)
      setDbLink(link)
    }
    fetchDbLink()
  }, [params.id])

  const handleSubmit = async () => {
    if (!message.trim() || isLoading) return

    const userMessage = {
      content: message,
      role: 'user'
    }
    setMessages(prev => [...prev, userMessage])
    
    const loadingMessage = {
      content: '',
      role: 'assistant',
      isLoading: true
    }
    setMessages(prev => [...prev, loadingMessage])
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetchFromEmbeddings({
        message,
        connectionId: params.id
      })
      
      setMessages(prev => prev.map((msg, index) => {
        if (index === prev.length - 1) {
          return {
            content: response,
            role: 'assistant'
          }
        }
        return msg
      }))
    } catch (error) {
      console.error('Error fetching response:', error)

      setMessages(prev => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
    }
  }

  const copyDbUrl = async () => {
    if (dbLink) {
      await navigator.clipboard.writeText(dbLink)
    }
  }

  return (
    <div className="min-h-screen bg-[#262626] p-8">
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          className="text-white hover:bg-gray-700 flex items-center gap-2"
          onClick={() => router.push('/chats')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Button
          variant="outline"
          className="bg-gray-800 text-white border-green-400/20 hover:bg-gray-700"
          onClick={copyDbUrl}
        >
          DB URL
          <Copy className="ml-2 h-4 w-4 cursor-pointer" />
        </Button>
        <Button
          variant="outline"
          className="bg-gray-800 text-white border-green-400/20 hover:bg-gray-700"
          onClick={() => setSchemaOpen(true)}
        >
          Schema
          <Database className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index}
              className={`flex items-start gap-2 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className="flex-shrink-0">
                {msg.role === 'user' ? (
                  <UserButton />
                ) : (
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-black" />
                  </div>
                )}
              </div>
              <div 
                className={`max-w-[80%] rounded-lg p-4 ${
                  msg.role === 'user' 
                    ? 'bg-green-400 text-black ml-auto' 
                    : 'bg-gray-800 text-white'
                }`}
              >
                {msg.isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 mt-4">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type your message..."
            disabled={isLoading}
            className="w-full h-12 bg-gray-800 border-2 border-green-400/20 focus:border-green-400 text-white rounded-lg shadow-lg focus:ring-2 focus:ring-green-400/50 focus:ring-offset-2 focus:ring-offset-black"
          />
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !message.trim()}
            className="h-12 px-6 bg-green-400 hover:bg-green-500 text-black disabled:opacity-50"
          >
            Send
          </Button>
        </div>
      </div>
      <SchemaDialog 
        open={schemaOpen} 
        onOpenChange={setSchemaOpen}
        schema={dbLink}
      />
    </div>
  )
}

export default page