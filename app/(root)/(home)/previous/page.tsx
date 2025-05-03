import CallList from '@/components/page-components/callList'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Previous Calls</h1>
      <CallList type='ended' />
      </div>
  )
}

export default page