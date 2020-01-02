import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_USER } from '../query'
import User from './User'
import AddUser from './AddUser'
import AddTodo from './AddTodo'
import Todo from './Todo'
import { InterfaceTodo, InterfaceUser } from '../types'

// https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates how to make add and get work together
const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER)
  const [todoList, setTodoList] = useState([])
  const [selectedUserId, setSelectedUserId] = useState<null | string>(null)

  const selectTodoList = (userId: string) => {
    setSelectedUserId(userId)
    setTodoList(
      data.users.find((user: InterfaceUser) => userId === user.id).todos
    )
  }

  // reselect todo list after user data is updated
  useEffect(() => {
    if (selectedUserId) {
      selectTodoList(selectedUserId)
    }
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const selectedUser = data.users.find((user: InterfaceUser) => {
    return user.id == selectedUserId
  })

  return (
    <div className="App">
      <div>
        {data.users.map((user: InterfaceUser) => {
          return (
            <User
              name={user.name}
              id={user.id}
              selectTodoList={selectTodoList}
            />
          )
        })}
        <AddUser />
      </div>
      <div>
        {selectedUser && <h4>Todo List of {selectedUser.name}</h4>}
        {todoList.map((todo: InterfaceTodo) => {
          return <Todo todo={todo} userId={selectedUserId} />
        })}
        {selectedUser && <AddTodo userId={selectedUserId} />}
      </div>
    </div>
  )
}

export default App
