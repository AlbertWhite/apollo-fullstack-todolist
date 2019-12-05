import React, { useState, useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { GET_USER, DELETE_TODO, EDIT_TODO } from '../query'

export interface InterfaceTodo {
  content: string
  id: string
  finished: boolean
}

interface TodoProps {
  todo: InterfaceTodo
  userId: null | string
}

const Todo: React.FC<TodoProps> = ({ todo, userId }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const inputRef = useRef<any>(null)
  const checkBoxRef = useRef<any>(null)

  const [deleteTodo] = useMutation(DELETE_TODO, {
    update(cache, { data }) {
      const users: any = cache.readQuery({ query: GET_USER })
      cache.writeQuery({
        query: GET_USER,
        data: {
          users: users.users.map((user: any) => {
            if (user.id == userId) {
              return {
                ...user,
                todos: data.deleteTodo.todos
              }
            }
            return user
          })
        }
      })
    }
  })

  const [editTodo] = useMutation(EDIT_TODO, {
    update(cache, { data }) {
      const users: any = cache.readQuery({ query: GET_USER })
      cache.writeQuery({
        query: GET_USER,
        data: {
          users: users.users.map((user: any) => {
            if (user.id == userId) {
              return {
                ...user,
                todos: data.editTodo.todos
              }
            }
            return user
          })
        }
      })
    }
  })

  return (
    <div className="nameContainer">
      <div className="name todo">
        {isEditMode ? (
          <input type="text" ref={inputRef} placeholder="default name" />
        ) : (
          todo.content
        )}
      </div>
      <button
        onClick={e => {
          deleteTodo({ variables: { userId, id: todo.id } })
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          if (isEditMode) {
            editTodo({
              variables: {
                userId,
                id: todo.id,
                content: inputRef.current.value,
                finished: checkBoxRef.current.checked
              }
            })
            setIsEditMode(false)
          } else {
            setIsEditMode(true)
          }
        }}
      >
        {isEditMode ? 'Save' : 'Edit'}
      </button>
      Finished:{' '}
      <input
        type="checkbox"
        ref={checkBoxRef}
        checked={todo.finished}
        onClick={() => {
          if (checkBoxRef.current.checked !== todo.finished) {
            editTodo({
              variables: {
                userId,
                id: todo.id,
                content: todo.content,
                finished: checkBoxRef.current.checked
              }
            })
          }
        }}
      />
    </div>
  )
}

export default Todo
