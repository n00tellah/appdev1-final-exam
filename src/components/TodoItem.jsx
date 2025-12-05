import { useDispatch } from "react-redux"
import { updateTodo, deleteTodo } from "../Reducer/todosSlice.js"
import { useEffect, useState } from "react"

function TodoItem ({ todo }) {
  const dispatch = useDispatch()
  const [theme, setTheme] = useState('standard')

  useEffect(() => {
    const savedTheme = localStorage.getItem('savedTheme') || 'standard'
    setTheme(savedTheme)
  }, [])

  const toggleComplete = () => {
    dispatch(updateTodo({ ...todo, completed: !todo.completed }))
  }

  const handleDelete = () => {
    const todoElement = document.querySelector(`[data-id="${todo.id}"]`)
    if (todoElement) {
      todoElement.classList.add('fall')
      setTimeout(() => {
        dispatch(deleteTodo(todo.id))
      }, 500)
    } else {
      dispatch(deleteTodo(todo.id))
    }
  }

  const todoClass = todo.completed 
    ? `todo ${theme}-todo completed` 
    : `todo ${theme}-todo`

  return (
    <div className={todoClass} data-id={todo.id}>
      <li className="todo-item">
        {todo.title}
      </li>
      <button className={`check-btn ${theme}-button`} onClick={toggleComplete}>
        <i className="fas fa-check"></i>
      </button>
      <button className={`delete-btn ${theme}-button`} onClick={handleDelete}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  )
}

export default TodoItem
