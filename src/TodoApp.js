import React from 'react';
import './styles.css'
import { ReactComponent as DownIcon } from './Asset/down02.svg';

import TodoItem from './TodoItem'

const TodoApp = () => {

  const [inputValue, setInputValue] = React.useState('')
  const [inputArray, setInputArray] = React.useState([])
  const [isEverythingDone, setIsEverythingDone] = React.useState(false)
  const [status, setStatus] = React.useState('all')

  React.useEffect(() => {
    let data = localStorage.getItem('todoData')
    let parsedData = JSON.parse(data)
    if (parsedData) {
      setInputArray(parsedData)
    } else {
      setInputArray([])
    }
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (inputValue.trim()) {
      let newObject = { content: inputValue, isCompleted: false, contentEdit: false }
      inputArray.push(newObject)
      setInputArray(inputArray)
      localStorage.setItem('todoData', JSON.stringify(inputArray))
      setInputValue('')
    }
  }

  const toggleIsCompleted = (index) => {
    inputArray[index].isCompleted = !(inputArray[index].isCompleted)
    setInputArray([...inputArray])
    localStorage.setItem('todoData', JSON.stringify(inputArray))

    let checkTrue = obj => obj.isCompleted === true
    let checkFalse = obj => obj.isCompleted === false
    let checkSomeTrue = obj => obj.isCompleted === true

    let statusArray = inputArray
    let allTrue = statusArray.every(checkTrue)
    let allFalse = statusArray.every(checkFalse)
    let someTrue = statusArray.some(checkSomeTrue)

    if (allFalse) {
      setIsEverythingDone(false)
    } if (allTrue) {
      setIsEverythingDone(true)
    } else if (someTrue) {
      setIsEverythingDone(false)
    }
  }

  const deleteItem = (index) => {
    inputArray.splice(index, 1)
    setInputArray([...inputArray])
    localStorage.setItem('todoData', JSON.stringify(inputArray))

    if (inputArray.length === 0) {
      setIsEverythingDone(false)
    }
  }

  const handleShavDown = () => {
    let checkTrue = obj => obj.isCompleted === true
    let checkFalse = obj => obj.isCompleted === false
    let checkSomeTrue = obj => obj.isCompleted === true

    let allTrue = inputArray.every(checkTrue)
    let allFalse = inputArray.every(checkFalse)
    let someTrue = inputArray.some(checkSomeTrue)

    if (allFalse) {
      inputArray.map((value) => value.isCompleted = true)
      setInputArray([...inputArray])
      localStorage.setItem('todoData', JSON.stringify(inputArray))
      setIsEverythingDone(true)
    } if (allTrue) {
      inputArray.map((value) => value.isCompleted = false)
      setInputArray([...inputArray])
      localStorage.setItem('todoData', JSON.stringify(inputArray))
      setIsEverythingDone(false)
    } else if (someTrue) {
      inputArray.map((value) => value.isCompleted = true)
      setInputArray([...inputArray])
      localStorage.setItem('todoData', JSON.stringify(inputArray))
      setIsEverythingDone(false)
    }
  }

  const getArray = () => {
    if (status === 'all') {
      return inputArray
    } else if (status === 'active') {
      return inputArray.filter(value => value.isCompleted === false)
    } else if (status === 'completed') {
      return inputArray.filter(value => value.isCompleted === true)
    }
  }

  const handleAllClear = () => {
    let filteredArray = inputArray.filter(value => value.isCompleted === false)
    setInputArray([...filteredArray])
    localStorage.setItem('todoData', JSON.stringify(inputArray))
  }

  const updateEditedValue = (value, index) => {
    let obj = inputArray[index]
    obj.content = value
    inputArray.splice(index, 1, obj)
    setInputArray([...inputArray])
    localStorage.setItem('todoData', JSON.stringify(inputArray))
  }

  return (
    <React.Fragment>
      <header>
        <h1>todos</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div className='inputContainer'>
          <DownIcon
            className={`downIcon ${(isEverythingDone && inputArray.length > 0) ? "active" : ""}`}
            onClick={handleShavDown}
          />
          <input
            className='todoInput'
            placeholder='Whats needs to be done?'
            onChange={handleChange}
            value={inputValue}
          />
        </div>
      </form>
      {getArray().map((item, index) =>
        <TodoItem
          item={item.content}
          isCompleted={item.isCompleted}
          index={index}
          toggleIsCompleted={toggleIsCompleted}
          key={Math.random().toString()}
          deleteItem={deleteItem}
          updateEditedValue={updateEditedValue}
        />
      )}
      {(inputArray.length > 0) &&
        (<div className='container'>
          <div className='filterBox one'>
            <span className='activeItems'>
              {inputArray.filter((obj) => obj.isCompleted === false).length} items left
              </span>
            <div
              onClick={() => setStatus('all')}
              className={`button all ${status === 'all' && "selected"}`}
            > All
              </div>
            <div
              onClick={() => setStatus('active')}
              className={`button act ${status === 'active' && "selected"}`}
            > Active
              </div>
            <div
              onClick={() => setStatus('completed')}
              className={`button comp ${status === 'completed' && "selected"}`}
            > Completed
              </div>
            <span onClick={handleAllClear} className='clearCompleted'> Clear Completed </span>
          </div>
          <div className='filterBox two' />
          <div className='filterBox three' />
        </div>
        )}
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <span>Fahimur Reza</span></p>
        <p>Instructed by <span>Aman Deep Brar</span></p>
        <p>Part of <span>ProTek Consulting</span></p>
      </footer>
    </React.Fragment>
  )
}

export default TodoApp