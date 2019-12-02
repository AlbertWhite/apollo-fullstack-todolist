import React, {useState, useRef} from 'react'

interface todo {
  content: String
  id: String
  finished: Boolean
}

interface TodoProps{
  todo: todo
  userId: null | String
}

const Todo: React.FC<TodoProps> = ({todo, userId}) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isFinished, setIsFinished] = useState(todo.finished)
  const inputRef = useRef<any>(null)
  const checkBoxRef = useRef<any>(null)
  
  return 'hello world'
  // const [editTodo] = useMutation(EDIT_TODO, {
  //   update(cache, {data}) {
  //     query: GET_USER,
  //       data: {users: data.deleteUser.users}
  //   }
  // })

  // return (<div>
  //     <div className="name">{isEditMode ? <input type="text" ref={inputRef} placeholder="default name" /> : name}</div>
  //     <button onClick={() => {if(isEditMode) {editTodo({variables: {userId, id: todo.id, content: inputRef.current.value}}); setIsEditMode(false)} else {setIsEditMode(true)}}}>Edit</button>
  //     <button onClick={e => {deleteTodo({variables: {userId, id: todo.id}})}}>Delete</button>  
  //     <select onClick={() => {editTodo({variables: {userId, id: todo.id, finished: checkBoxRef.current.value}})}}
  //   </div>)
}

export default Todo