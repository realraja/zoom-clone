import CallList from '@/components/page-components/callList'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Recorded Calls</h1>
      <CallList type='recordings' /></div>
  )
}

export default page