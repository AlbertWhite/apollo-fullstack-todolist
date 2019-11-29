import React, {useRef} from 'react'
import { useMutation } from '@apollo/react-hooks'
import { GET_USER, ADD_USER } from '../query'
import './App.css'

const Add: React.FC = () => {
  // options for useMutation: https://www.apollographql.com/docs/react/api/react-hooks/#options-2
  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    update(cache, { data }) {
      cache.writeQuery({
        query: GET_USER,
        data: {users: data.addUser.users}
      })
    }
  })

  const input = useRef<HTMLInputElement>(null)

  if (loading) return <p>Loading...</p>
  if (error) return <p>An error occurred</p>

  return (
    <div className="nameContainer">
      <input ref={input} type="text" className="nameInput"/>
      <button
        onClick={e => {
          addUser({ variables: { name: input.current!.value || 'default name'} })
        }}
      >
        Add User
      </button>
    </div>
  )
}
export default Add
