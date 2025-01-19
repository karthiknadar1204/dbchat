"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { fetchFromEmbeddings } from '@/app/actions/chat'
import { useParams } from 'next/navigation'

const page = () => {
  const [message, setMessage] = useState('')
  const params = useParams()

  const handleSubmit = async () => {
    try {
      const response = await fetchFromEmbeddings({
        message,
        connectionId: params.id
      })
      console.log(response)
      setMessage('')
    } catch (error) {
      console.error('Error fetching response:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#262626] p-8">
      <div className="flex flex-col h-screen">
        <div className="flex-1">
          {/* Chat messages will go here */}
        </div>
        
        <div className="flex gap-2 mt-4">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full h-12 bg-gray-800 border-2 border-green-400/20 focus:border-green-400 text-white rounded-lg shadow-lg focus:ring-2 focus:ring-green-400/50 focus:ring-offset-2 focus:ring-offset-black"
          />
          <Button
            onClick={handleSubmit}
            className="h-12 px-6 bg-green-400 hover:bg-green-500 text-black"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

export default page