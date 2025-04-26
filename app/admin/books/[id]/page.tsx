import React from 'react'

const Page = async ({ params }: { params: Promise<{ id: string }>}) => {
  const { id } = await params;
  // Fetch book details using the id from params
  return (
    <div>Book {id}</div>
  )
}

export default Page