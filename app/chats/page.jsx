"use client"

import React, { useEffect, useState } from 'react'
import { Plus, ArrowRight, Loader2, ArrowLeft } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { embeddings } from '../actions/chat'

const page = () => {
  const [chats, setChats] = useState([])
  const [url, setUrl] = useState('')
  const [connectionName, setConnectionName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingChats, setIsLoadingChats] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const validateInputs = () => {
    const postgresUrlRegex = /^postgres(ql)?:\/\/[^\s]+$/
    
    if (!url) {
      setError('Please enter a PostgreSQL URL')
      return false
    }

    if (!connectionName) {
      setError('Please enter a connection name')
      return false
    }

    if (!postgresUrlRegex.test(url)) {
      setError('Please enter a valid PostgreSQL URL (starts with postgres:// or postgresql://)')
      return false
    }

    setError('')
    return true
  }

  const fetchChats = async () => {
    setIsLoadingChats(true)
    try {
      const response = await fetch('/api/chats')
      if (!response.ok) {
        throw new Error('Failed to fetch chats')
      }
      const data = await response.json()
      console.log("data", data)
      setChats(data)
    } catch (error) {
      console.error('Error fetching chats:', error)
    } finally {
      setIsLoadingChats(false)
    }
  }

  const handleSubmit = async () => {
    if (!validateInputs()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/connectdb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          postgresUrl: url,
          connectionName: connectionName 
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to connect to database')
      }

      const data = await response.json()
      console.log('Connection successful:', data)
      await embeddings(data)
      setOpen(false)
      setUrl('')
      setConnectionName('')
      await fetchChats()
      router.refresh()
      
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="flex items-center mb-8">
        <Button
          onClick={() => router.push('/')}
          variant="ghost"
          className="mr-4 hover:bg-transparent p-0"
        >
          <ArrowLeft className="h-6 w-6 text-white" />
        </Button>
        <h1 
          className="text-3xl font-bold text-white cursor-pointer hover:text-green-400 transition-colors"
          onClick={() => router.push('/')}
        >
          Chats
        </h1>
        <div className="ml-auto">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="inline-block">
                <div className="p-3 bg-[#1a4731] rounded-lg border-2 border-gray-600 hover:border-blue-500 transition-all duration-300 cursor-pointer">
                  <Plus className="w-6 h-6 text-white stroke-[1.5]" />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a] text-white w-[600px] max-w-[90vw] p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl">Add New Connection</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <Input 
                  type="text"
                  value={connectionName}
                  onChange={(e) => setConnectionName(e.target.value)}
                  placeholder="Enter connection name"
                  disabled={isLoading}
                  className="w-full h-14 bg-gray-800 border-2 border-green-400/20 focus:border-green-400 text-white rounded-lg shadow-lg focus:ring-2 focus:ring-green-400/50 focus:ring-offset-2 focus:ring-offset-black text-lg"
                />
                <div className="flex gap-3">
                  <Input 
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="add your postgresql url here"
                    disabled={isLoading}
                    className="w-full h-14 bg-gray-800 border-2 border-green-400/20 focus:border-green-400 text-white rounded-lg shadow-lg focus:ring-2 focus:ring-green-400/50 focus:ring-offset-2 focus:ring-offset-black text-lg"
                  />
                  <Button 
                    onClick={handleSubmit}
                    className="h-14 px-6 bg-green-400 hover:bg-green-500 text-black"
                    disabled={isLoading || !url || !connectionName}
                  >
                    {isLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <ArrowRight className="h-6 w-6" />
                    )}
                  </Button>
                </div>
                {error && <p className="text-red-400 text-base">{error}</p>}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {isLoadingChats ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-green-400" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => router.push(`/chats/${chat.id}`)}
                className="w-[350px] h-[350px] p-6 bg-[#171717] rounded-lg border-2 border-gray-600 hover:border-green-400/50 transition-all duration-300 cursor-pointer shadow-lg flex flex-col"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white">{chat.connectionName}</h2>
                  <p className="text-gray-400 mt-1">
                    Created: {new Date(chat.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {chats.length === 0 && (
            <div className="text-white text-center">No connections found</div>
          )}
        </>
      )}
    </div>
  )
}

export default page