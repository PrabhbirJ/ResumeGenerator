'use client'

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [resume, setResume] = useState('')
  const [history, setHistory] = useState([])

  const generateResume = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      const newResume = data.resume || 'No resume returned.'
      setResume(newResume)
      setHistory((prev) => [newResume, ...prev])
    } catch (err) {
      setResume('❌ Error generating resume.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 pt-4 pb-4 flex flex-row gap-10">
  {/* LEFT SIDEBAR – HISTORY */}
  <aside className="w-1/4 bg-gray-900 p-4 rounded-xl h-[calc(100vh-2rem)] overflow-y-auto border border-gray-800">
    <h2 className="text-lg font-bold mb-4">📜 Historical Resumes</h2>
    <ul className="space-y-4 text-sm">
      {history.length === 0 && (
        <li className="text-gray-500 italic">No resumes yet.</li>
      )}
      {history.map((item, idx) => (
        <li
          key={idx}
          className="bg-gray-800 p-2 rounded cursor-pointer hover:bg-gray-700 transition"
          onClick={() => setResume(item)}
        >
          <div className="line-clamp-3">{item.slice(0, 200)}...</div>
        </li>
      ))}
    </ul>
  </aside>

  {/* RIGHT MAIN SECTION */}
  <section className="flex-1 flex flex-col h-[calc(100vh-2rem)] overflow-hidden">
    {/* TOP FORMAT */}
    <div className="flex-grow w-full bg-gray-900 p-6 rounded-xl border border-gray-800 overflow-auto">
      <h2 className="text-lg font-bold mb-4">🖋 Resume Format</h2>
      <div className="space-y-4 animate-pulse">
        <div className="h-5 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-800 rounded w-2/3"></div>
        <div className="h-4 bg-gray-800 rounded w-full"></div>
        <div className="h-4 bg-gray-800 rounded w-[90%]"></div>
        <div className="h-4 bg-gray-800 rounded w-[60%]"></div>
      </div>
    </div>

    {/* BOTTOM FIXED INPUT */}
    <div className="w-full py-4 bg-gray-950 flex flex-col space-y-4 shrink-0">
      <textarea
        className="w-full h-36 p-4 bg-gray-800 border border-gray-700 rounded-xl resize-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
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
  </section>
</main>

  )
}
