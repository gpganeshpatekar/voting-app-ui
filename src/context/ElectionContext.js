
import React, { createContext, useState } from 'react'

export const ElectionList = createContext();

const ElectionContext = ({children}) => {
    const [elections, setElections] = useState([]);

  return (
    <ElectionList.Provider value={{elections,setElections}}>
        {children}
    </ElectionList.Provider>
  )
}

export default ElectionContext