import React, {useState, useReducer} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_USER } from '../query'
import User from './User'
import Add from './Add'
import Todo from './Todo'

// https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates how to make add and get work together 
const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER)
  const [todoList, setTodoList] = useState([])
  const [selectedUserId, setSelectedUserId] = useState<null|String>(null)
  const selectTodoList = (userId: String) => {
    setSelectedUserId(userId)
    setTodoList(data.users.find((user:any) => userId === user.id).items)
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  
  return (
    <div className="App">
      <div>
        {data.users.map((user: any) => {
          return <User name={user.name} id={user.id} selectTodoList={selectTodoList}/>
        })}
        <Add/>
      </div>
      <div>
        {
          todoList.map((todo: any) => {
            return <Todo todo={todo} userId={selectedUserId} />
          })
        }
      </div>
    </div>
  )
}

export default App
