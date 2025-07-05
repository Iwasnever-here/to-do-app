import React from 'react'

const DateSection = () => {
    const today = new Date();
    const day = today.toLocaleString('en-GB', {weekday: 'long'})
    const month = today.toLocaleString('en-GB', {month: 'long'});
    const date =today.getDate();
  return (
    <div className='part all bg-babypowder flex flex-col items-center gap-1 p-3'>
      <div className='text-2xl'>{day}</div>
      <div > <div className='bg-asparagus w-16 h-16 flex items-center justify-center rounded-full text-2xl text-babypowder'>{date}</div></div>
      <div>{month}</div>
    </div>
  )
}

export default DateSection
