import React from 'react';
import './styles.css'
import { ReactComponent as CheckMark } from './Asset/checkmark02.svg';
import { ReactComponent as DeleteIcon } from './Asset/delete01.svg';

const TodoItem = ({item, index, isCompleted, toggleIsCompleted, deleteItem}) => {

  const [showDelete, setShowDelete] = React.useState(null)
  const handleClick = () => toggleIsCompleted(index)
  const removeItem = () => deleteItem(index)
    
  return(
    <div 
      className='item'
      onMouseOver={() => setShowDelete(true) }
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className='round' onClick={handleClick}>
        {isCompleted && <span> <CheckMark className='markIcon' /> </span>}
      </div> 
      <span className={`itemContent ${isCompleted ? "completed" : ""}`} >{item}</span>
      { showDelete && 
        <span> 
          <DeleteIcon 
            className='deleteIcon' 
            onClick = {removeItem}
          /> 
        </span> 
      }
    </div>
  )
}

export default TodoItem
