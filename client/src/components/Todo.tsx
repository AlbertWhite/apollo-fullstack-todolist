import React, {useState, useRef} from 'react'

export interface InterfaceTodo {
  content: string
  id: string
  finished: boolean
}

interface TodoProps{
  todo: InterfaceTodo
  userId: null | string
}

const Todo: React.FC<TodoProps> = ({todo, userId}) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isFinished, setIsFinished] = useState(todo.finished)
  const inputRef = useRef<any>(null)
  const checkBoxRef = useRef<any>(null)
  
  // const [editTodo] = useMutation(EDIT_TODO, {
  //   update(cache, {data}) {
  //     query: GET_USER,
  //       data: {users: data.deleteUser.users}
  //   }
  // })

  return (<div>
      <div className="name">{isEditMode ? <input type="text" ref={inputRef} placeholder="default name" /> : todo.content}</div>
      {/* <button onClick={() => {if(isEditMode) {editTodo({variables: {userId, id: todo.id, content: inputRef.current.value}}); setIsEditMode(false)} else {setIsEditMode(true)}}}>Edit</button>
      <button onClick={e => {deleteTodo({variables: {userId, id: todo.id}})}}>Delete</button>  
      <select onClick={() => {editTodo({variables: {userId, id: todo.id, finished: checkBoxRef.current.value}})}} */}
    </div>)
}

export default Todo