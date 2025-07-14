'use client'

import { useState } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [resume, setResume] = useState('')

  const generateResume = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      setResume(data.resume || 'No resume returned.')
    } catch (err) {
      setResume('❌ Error generating resume.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-8 flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold tracking-tight text-center">
        AI Resume Generator
      </h1>

      <div className="w-full max-w-2xl space-y-10">
        <textarea
          className="w-full h-40 p-4 bg-gray-800 border border-gray-700 rounded-xl resize-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Describe yourself, your experience, skills, or what kind of resume you need..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={generateResume}
          disabled={loading || !prompt.trim()}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-bold text-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Resume'}
        </button>
      </div>

      
    </main>
  )
}
