import React, { useRef, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { GET_USER, ADD_USER, ADD_TODO } from '../query'
import { InterfaceUser, InterfaceAddUserVars, InterfaceAddUserResponse } from '../types'
import './App.css'

interface AddProps {
  shouldAddUser?: boolean
  shouldAddTodo?: boolean
  userId?: string | null
}

const Add: React.FC<AddProps> = ({ shouldAddTodo, shouldAddUser, userId }) => {
  // options for useMutation: https://www.apollographql.com/docs/react/api/react-hooks/#options-2
  const [addUser] = useMutation<{addUser: InterfaceAddUserResponse},InterfaceAddUserVars>(ADD_USER, {
    update(cache, { data: { addUser } } ) {
      cache.writeQuery({
        query: GET_USER,
        data: { users: addUser.users }
      })
    }
  })

  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data }) {
      const users: {users: [InterfaceUser]} = cache.readQuery({ query: GET_USER })
      cache.writeQuery({
        query: GET_USER,
        data: {
          users: users.users.map((user: InterfaceUser) => {
            if (user.id == userId) {
              return {
                ...user,
                todos: data.addTodo.todos
              }
            }
            return user
          })
        }
      })
    }
  })

  const input = useRef<HTMLInputElement>(null)

  const addCallback = useCallback(() => {
    shouldAddUser &&
      addUser({
        variables: { name: input.current!.value || 'default name' }
      })
    shouldAddTodo &&
      addTodo({
        variables: {
          content: input.current!.value || 'default name',
          userId
        }
      })
    input.current!.value = 'default name'
  }, [])

  return (
    <div className="nameContainer">
      <input ref={input} type="text" className="nameInput" />
      <button onClick={addCallback}>
        {shouldAddUser && 'Add User'}
        {shouldAddTodo && 'Add Todo'}
      </button>
    </div>
  )
}
export default Add
