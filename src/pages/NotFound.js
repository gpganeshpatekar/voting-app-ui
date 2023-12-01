import React from 'react'
import BaseLayout from './BaseLayout';

const NotFound = () => {
  return (
      <>
          <BaseLayout>
              <div className='notFound'>
                <h1>404 - Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
            </div>
          </BaseLayout>

      </>
  )
}

export default NotFound;