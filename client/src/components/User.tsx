import React from 'react'

interface UserProps { 
  name: string
  id: string 
}


const User: React.FC<UserProps> = ({ name, id }: UserProps) => {
  return (
    <div>
      {name}
      <button onClick={() => { }}>Edit</button>
      <button onClick={() => { }}>Delete</button>
    </div >
  )
}

export default User