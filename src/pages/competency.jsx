import React from 'react'
import { Link } from 'react-router-dom'

const competency = () => {
  return (
    <div>
      <h1>Competency</h1>
      <Link to="/create-competency"><button className="bg-blue-500 w-24 text-white rounded-2xl py-1 px-2 text-base hover:scale-105 hover:bg-green-600">
              Create Competency
            </button></Link>
    </div>
  )
}

export default competency
