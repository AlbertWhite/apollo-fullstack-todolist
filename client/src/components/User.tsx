import React, {useState, useRef} from 'react'
import { useMutation } from '@apollo/react-hooks'
import {GET_USER, DELETE_USER, EDIT_USER} from '../query'

interface UserProps { 
  name: string
  id: string 
}

const User: React.FC<UserProps> = ({ name, id }: UserProps) => {

  const [isEditMode, setIsEditMode] = useState(false)
  const inputRef = useRef<any>(null)

  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache, { data }) {
      cache.writeQuery({
        query: GET_USER,
        data: {users: data.deleteUser.users}
      })
    }
  })

  const [editUser] = useMutation(EDIT_USER, {
    update(cache, { data }) {
      cache.writeQuery({
        query: GET_USER,
        data: {users: data.deleteUser.users}
      })
    }
  })

  return (
    <div>
      {isEditMode ? <input type="text" ref={inputRef} /> : name}
      <button onClick={() => {if(isEditMode) {editUser({variables: {id, name: inputRef.current.value}}); setIsEditMode(false)} else {setIsEditMode(true)}}}>Edit</button>
      <button onClick={e => {deleteUser({variables: {id}})}}>Delete</button>
    </div >
  )
}

export default User