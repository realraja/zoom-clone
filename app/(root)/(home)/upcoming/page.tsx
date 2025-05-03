import CallList from '@/components/page-components/callList'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Upcoming Calls</h1>
      <CallList type='upcoming' /></div>
  )
}

export default page