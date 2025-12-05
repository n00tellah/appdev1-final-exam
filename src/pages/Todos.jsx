import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTodos } from "../Reducer/todosSlice.js";
import AddTodoForm from "../components/AddTodoForm"
import TodoList from "../components/TodoList"

export default function Todos () {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos.items)
    const [currentTime, setCurrentTime] = useState('')
    const [theme, setTheme] = useState('standard')

    useEffect(() => {
        dispatch(fetchTodos())
        
        // Check if theme was saved previously
        const savedTheme = localStorage.getItem('savedTheme')
        const initialTheme = savedTheme || 'standard'
        changeTheme(initialTheme)
        
        // Update time every second
        const updateTime = () => {
            const now = new Date()
            setCurrentTime(now.toLocaleString())
        }
        updateTime()
        const interval = setInterval(updateTime, 1000)
        
        return () => clearInterval(interval)
    }, [dispatch])

    const changeTheme = (color) => {
        localStorage.setItem('savedTheme', color)
        setTheme(color)
        document.body.className = color
        
        // Handle darker theme title
        const titleElement = document.getElementById('title')
        if (color === 'darker') {
            titleElement?.classList.add('darker-title')
        } else {
            titleElement?.classList.remove('darker-title')
        }
        
        // Update input theme
        const inputElement = document.querySelector('input')
        if (inputElement) {
            inputElement.className = `todo-input ${color}-input`
        }
        
        // Update button theme
        const buttonElement = document.querySelector('.todo-btn')
        if (buttonElement) {
            buttonElement.className = `todo-btn ${color}-button`
        }
        
        // Update existing todos theme
        document.querySelectorAll('.todo').forEach((todo) => {
            const isCompleted = todo.classList.contains('completed')
            todo.className = isCompleted ? `todo ${color}-todo completed` : `todo ${color}-todo`
        })
        
        // Update todo buttons
        document.querySelectorAll('.check-btn, .delete-btn').forEach((button) => {
            if (button.classList.contains('check-btn')) {
                button.className = `check-btn ${color}-button`
            } else if (button.classList.contains('delete-btn')) {
                button.className = `delete-btn ${color}-button`
            }
        })
    }

    return (
        <>
            <div id="header">
                <div className="flexrow-container">
                    <div className="standard-theme theme-selector" onClick={() => changeTheme('standard')}></div>
                    <div className="light-theme theme-selector" onClick={() => changeTheme('light')}></div>
                    <div className="darker-theme theme-selector" onClick={() => changeTheme('darker')}></div>
                </div>
                <h1 id="title">
                    Just do it.
                    <div id="border"></div>
                </h1>
            </div>

            <div id="form">
                <AddTodoForm />
            </div>

            <div className="version">
                <div className="demo version-section">
                </div>
                <div>
                    <p>
                        <span id="datetime">{currentTime}</span>
                    </p>
                </div>

                <div id="myUnOrdList">
                    <TodoList todos={todos} />
                </div>
            </div>
        </>
    )
}
