import React from 'react'

const Layout : React.FC<{
    children: React.JSX.Element | React.JSX.Element[]
}> = ({children}) => {
  return (
    <div className='grid h-dvh grid-rows-[auto_1fr_auto]'>
        {children}
    </div>
  )
}

export default Layout