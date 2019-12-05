import React, { useState, useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { GET_USER, DELETE_USER, EDIT_USER } from '../query'
import { InterfaceTodo } from './Todo'

export interface InterfaceUser {
  name: string
  id: string
  todos: Array<InterfaceTodo>
}

interface UserProps {
  name: string
  id: string
  selectTodoList: (id: string) => void
}

const User: React.FC<UserProps> = ({ name, id, selectTodoList }: UserProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const inputRef = useRef<any>(null)

  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache, { data }) {
      cache.writeQuery({
        query: GET_USER,
        data: { users: data.deleteUser.users }
      })
    }
  })

  const [editUser] = useMutation(EDIT_USER, {
    update(cache, { data }) {
      cache.writeQuery({
        query: GET_USER,
        data: { users: data.editUser.users }
      })
    }
  })

  return (
    <div className="nameContainer">
      <div className="name">
        {isEditMode ? (
          <input type="text" ref={inputRef} placeholder="default name" />
        ) : (
          name
        )}
      </div>
      <button
        onClick={() => {
          if (isEditMode) {
            editUser({ variables: { id, name: inputRef.current.value } })
            setIsEditMode(false)
          } else {
            setIsEditMode(true)
          }
        }}
      >
        {isEditMode ? 'Save' : 'Edit'}
      </button>
      <button
        onClick={e => {
          deleteUser({ variables: { id } })
        }}
      >
        Delete
      </button>
      <button
        onClick={e => {
          selectTodoList(id)
        }}
      >
        Todo List
      </button>
    </div>
  )
}

export default User
