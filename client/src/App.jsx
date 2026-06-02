import { useEffect } from 'react'
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

import { socket } from './socket'

export default function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected:', socket.id)
    })

    return () => {
      socket.off('connect')
    }
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw />
    </div>
  )
}