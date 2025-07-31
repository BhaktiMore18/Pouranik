import React from 'react'
import { FaStar } from 'react-icons/fa';

const ReviewStats = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 !mb-10">
      <div className="bg-white shadow rounded-xl !p-6 w-full md:w-1/3">
        <p className="text-gray-500 text-sm !mb-1">Total Reviews</p>
        <h2 className="text-2xl font-bold">10.0k</h2>
        <p className="text-green-500 text-sm !mt-1">📈 21% up from last year</p>
      </div>

      <div className="bg-white shadow rounded-xl !p-6 w-full md:w-1/3">
        <p className="text-gray-500 text-sm !mb-1">Average Rating</p>
        <div className="flex items-center">
          <h2 className="text-2xl font-bold !mr-2">4.0</h2>
          <div className="flex text-yellow-400">
            {Array(4).fill(0).map((_, i) => <FaStar key={i} />)}
          </div>
        </div>
        <p className="text-gray-500 text-sm !mt-1">Avg rating this year</p>
      </div>

      <div className="bg-white shadow rounded-xl !p-6 w-full md:w-1/3">
        <p className="text-gray-500 text-sm !mb-2">Rating Distribution</p>
        <div className="space-y-2 text-xs">
          <div><p className="flex items-center text-yellow-400">
            {Array(5).fill(0).map((_, i) => <FaStar key={i} />)} ▓▓▓▓▓▓▓▓▓ 2.1k
          </p> </div>
          <div><p className="flex items-center text-yellow-400">
            {Array(4).fill(0).map((_, i) => <FaStar key={i} />)} ▓▓▓▓▓▓▓▓ 1.6k
          </p> </div>
          <div><p className="flex items-center text-yellow-400">
            {Array(3).fill(0).map((_, i) => <FaStar key={i} />)} ▓▓▓▓▓▓ 800
          </p> </div>
          <div><p className="flex items-center text-yellow-400">
            {Array(2).fill(0).map((_, i) => <FaStar key={i} />)} ▓▓▓ 300
          </p> </div>
          <div><p className="flex items-center text-yellow-400">
            {Array(1).fill(0).map((_, i) => <FaStar key={i} />)} ▓ 100
          </p> </div>
        </div>
        <p className="text-gray-400 !mt-2 text-[10px]">Mar 2021 - Feb 2022</p>
      </div>
    </div>
  )
}

export default ReviewStats
