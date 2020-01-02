import React, { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { GET_USER, ADD_TODO } from '../query'
import { InterfaceUser } from '../types'
import Add from './Add'

interface AddTodoProps {
  userId: string
}

const AddTodo: React.FC<AddTodoProps> = ({ userId }) => {
  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data }) {
      const users: { users: [InterfaceUser] } = cache.readQuery({
        query: GET_USER
      })
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

  const onAdd = useCallback(
    (input: React.MutableRefObject<HTMLInputElement>): void => {
      addTodo({
        variables: {
          content: input.current!.value || 'default name',
          userId
        }
      })
      input.current!.value = 'default name'
    },
    []
  )

  return <Add onAdd={onAdd}>Add Todo</Add>
}

export default AddTodo
