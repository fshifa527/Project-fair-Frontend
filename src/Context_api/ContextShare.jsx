import React from 'react'
import { createContext,useState} from 'react'

export const addProjectResponseContext=createContext()
export const editProjectResponseContext=createContext()
export const deleteProjectResponseContext=createContext()



function ContextShare({children}) {
    const [addResponse,setAddResponse]=useState("")
    const [editResponse,SetEditResponse]=useState("")
    const [deleteResponse,SetDeleteResponse]=useState("")
  return (
    <>
    <addProjectResponseContext.Provider value={{addResponse,setAddResponse}}>
      <editProjectResponseContext.Provider value={{editResponse, SetEditResponse}}>
        <deleteProjectResponseContext.Provider value={{deleteResponse, SetDeleteResponse}}>
        {children}
        </deleteProjectResponseContext.Provider>
     
      </editProjectResponseContext.Provider>
      
    </addProjectResponseContext.Provider>

    </>
  )
}

export default ContextShare