"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const page = () => {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const validateUrl = () => {

    const postgresUrlRegex = /^postgres(ql)?:\/\/[^\s]+$/
    
    if (!url) {
      setError('Please enter a PostgreSQL URL')
      return false
    }

    if (!postgresUrlRegex.test(url)) {
      setError('Please enter a valid PostgreSQL URL (starts with postgres:// or postgresql://)')
      return false
    }

    setError('')
    return true
  }

  const handleSubmit = () => {
    if (validateUrl()) {
      console.log('Valid PostgreSQL URL:', url)
    }
  }

  return (
    <div className="min-h-screen bg-black p-8 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full space-y-4">
        <h2 className="text-xl text-green-400 text-center">Step 1: Add PostgreSQL URL</h2>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="add your postgresql url here"
              className="w-full h-12 bg-gray-800 border-2 border-green-400/20 focus:border-green-400 text-white rounded-lg shadow-lg focus:ring-2 focus:ring-green-400/50 focus:ring-offset-2 focus:ring-offset-black"
            />
            <Button 
              onClick={handleSubmit}
              className="h-12 px-4 bg-green-400 hover:bg-green-500 text-black"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default page