import { VideoStreamProvider } from '@/providers/StreamClientProvider'
import React, { ReactNode } from 'react'

function RootLayout({children}:{children:ReactNode}) {
  return (
    <main>
      <VideoStreamProvider>

       {children}
      </VideoStreamProvider>
    </main>
  )
}

export default RootLayout
