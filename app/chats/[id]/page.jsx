"use client"

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { fetchFromEmbeddings, saveMessage, loadChatHistory } from '@/app/actions/chat'
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
    const initializeChat = async () => {
      const link = await getDbLink(params.id)
      setDbLink(link)
      const history = await loadChatHistory(params.id)
      setMessages(history)
    }
    initializeChat()
  }, [params.id])

  const handleSubmit = async () => {
    if (!message.trim() || isLoading) return

    const userMessage = {
      content: message,
      role: 'user'
    }
    
    await saveMessage({
      content: message,
      role: 'user',
      connectionId: params.id
    })
    
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
      
      await saveMessage({
        content: response,
        role: 'assistant',
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
      await navigator.clipboard.writeText(dbLink.postgresUrl)
    }
  }

  const formatMessage = (content) => {
    if (content.startsWith('```sql')) {
      const sqlQuery = content.replace('```sql\n', '').replace('\n```', '')
      return (
        <div className="relative bg-gray-900 rounded-md p-4">
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-800"
              onClick={() => navigator.clipboard.writeText(sqlQuery)}
            >
              <Copy className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
          <pre className="text-green-400 font-mono text-sm overflow-x-auto">
            {sqlQuery}
          </pre>
        </div>
      )
    }


    if (content.match(/^\d+\./m)) {
      const items = content.split(/\n(?=\d+\.)/).filter(Boolean)
      return (
        <div className="space-y-2">
          {items.map((item, index) => {
            const [number, ...contentParts] = item.split('.')
            const itemContent = contentParts.join('.').trim()
            

            const subItems = itemContent.split('\n-').filter(Boolean)
            
            return (
              <div key={index} className="pl-4">
                <div className="flex gap-2">
                  <span className="text-green-400 font-medium">{number}.</span>
                  <div className="space-y-1">
                    <span>{subItems[0]}</span>
                    {subItems.length > 1 && (
                      <ul className="list-disc list-inside pl-4 space-y-1 text-gray-300">
                        {subItems.slice(1).map((subItem, subIndex) => (
                          <li key={subIndex}>{subItem.trim()}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    }


    if (content.includes('tables') && content.includes('columns')) {
      const sentences = content.split('. ')
      return (
        <div className="space-y-2">
          {sentences.map((sentence, index) => (
            <div 
              key={index}
              className={`${
                sentence.includes('tables') || sentence.includes('columns') 
                  ? 'text-green-400 font-medium' 
                  : 'text-gray-200'
              }`}
            >
              {sentence}.
            </div>
          ))}
        </div>
      )
    }


    return <div className="whitespace-pre-wrap">{content}</div>
  }

  return (
    <div className="min-h-screen bg-[#262626]">

      <div className="fixed top-0 left-0 right-0 bg-[#262626] z-10 px-8 py-4 border-b border-gray-700">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-gray-700 flex items-center gap-2"
            onClick={() => router.push('/chats')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
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
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="pt-20 pb-24 px-8">
        <div className="max-w-6xl mx-auto">
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
                    formatMessage(msg.content)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#262626] border-t border-gray-700 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2">
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
      </div>

      {dbLink && (
        <SchemaDialog 
          open={schemaOpen} 
          onOpenChange={setSchemaOpen}
          schema={dbLink}
        />
      )}
    </div>
  )
}

export default page