import React from 'react'

const Header = ({title, subtitle}: {title: string, subtitle?: string}) => {
  return (
    <>
<h2 className='font-bold text-2xl'>{title}</h2>
      {subtitle && <p className='p-16-reqular mt-4'>{subtitle}</p>}
    </>
  )
}

export default Header