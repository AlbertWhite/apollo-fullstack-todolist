import React, { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { GET_USER, ADD_USER, ADD_TODO } from '../query'
import { InterfaceAddUserVars, InterfaceAddUserResponse } from '../types'
import Add from './Add'

const AddUser: React.FC = () => {
  // options for useMutation: https://www.apollographql.com/docs/react/api/react-hooks/#options-2
  const [addUser] = useMutation<
    { addUser: InterfaceAddUserResponse },
    InterfaceAddUserVars
  >(ADD_USER, {
    update(cache, { data: { addUser } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { users: addUser.users }
      })
    }
  })

  const onAdd = useCallback(
    (input: React.MutableRefObject<HTMLInputElement>): void => {
      addUser({
        variables: { name: input.current!.value || 'default name' }
      })
      input.current!.value = 'default name'
    },
    []
  )

  return <Add onAdd={onAdd}>Add User</Add>
}

export default AddUser
