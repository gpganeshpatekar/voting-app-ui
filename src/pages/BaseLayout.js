import React from 'react'
import Header from '../components/Header'

const BaseLayout = ({children}) => {
  return (
      <>
          <Header />
          {children}

      </>
  )
}

export default BaseLayout