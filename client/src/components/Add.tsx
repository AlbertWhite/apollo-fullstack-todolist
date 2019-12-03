import React, {useRef} from 'react'
import { useMutation } from '@apollo/react-hooks'
import { GET_USER, ADD_USER, ADD_TODO } from '../query'
import {InterfaceUser} from './User'
import './App.css'

interface AddProps {
  shouldAddUser?: boolean
  shouldAddTodo?: boolean
  userId?: string | null
}

const Add: React.FC<AddProps> = ({shouldAddTodo, shouldAddUser, userId}) => {
  // options for useMutation: https://www.apollographql.com/docs/react/api/react-hooks/#options-2
  const [addUser] = useMutation(ADD_USER, {
    update(cache, { data }) {
      cache.writeQuery({
        query: GET_USER,
        data: {users: data.addUser.users}
      })
    }
  })

  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data }) {
      const users:any = cache.readQuery({query: GET_USER})
      console.warn('alb',{users});
      console.warn('alb',{data});
      cache.writeQuery({
        query: GET_USER,
        data: {users : users.users.map((user:any) => {
          if(user.id == userId){
            return {
              ...user,
              todos: data.addTodo.todos,
            }
          }
          return user
        })}
      })
    }
  })

  

  const input = useRef<HTMLInputElement>(null)

  return (
    <div className="nameContainer">
      <input ref={input} type="text" className="nameInput"/>
      <button
        onClick={e => {
          shouldAddUser && addUser({ variables: { name: input.current!.value || 'default name'} })
          shouldAddTodo && addTodo({variables: { content: input.current!.value || 'default name', userId}}) 
        }}
      >
        {shouldAddUser && 'Add User'}
        {shouldAddTodo && 'Add Todo'}
      </button>
    </div>
  )
}
export default Add
