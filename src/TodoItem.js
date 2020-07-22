import React, { useRef, useEffect } from 'react';

import { ReactComponent as CheckMark } from './Asset/checkmark02.svg';
import { ReactComponent as DeleteIcon } from './Asset/delete01.svg';

import './styles.css'

const TodoItem = (props) => {

  const {item, index, isCompleted, toggleIsCompleted, deleteItem, updateEditedValue} = props;

  const [showDelete, setShowDelete] = React.useState(null)
  const [isEditable, setIsEditable] = React.useState(false)
  const [editedValue, setEditedValue] = React.useState(item)

  const handleClick = () => toggleIsCompleted(index)
  const removeItem = () => deleteItem(index)

  const handleSubmit = (event) => {
    event && event.preventDefault()
    updateEditedValue(editedValue, index)
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsEditable(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div
      ref={wrapperRef}
      className='item'
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      onDoubleClick={() => setIsEditable(true)}
    >
      <div className={`round ${isEditable ? "disappear" : ""}`} onClick={handleClick}>
        {isCompleted && <span> <CheckMark className='markIcon' /> </span>}
      </div>

      {
        isEditable ? (
          <form onSubmit={handleSubmit} className='editForm'>
            <input
              className='editInput'
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              autoFocus={true}
            />
          </form>
        ) : (
            <div className='itemContainer'>
              <span className={`itemContent ${isCompleted ? "completed" : ""}`} >{item}</span>
              {showDelete &&
                <span>
                  <DeleteIcon
                    className='deleteIcon'
                    onClick={removeItem}
                  />
                </span>
              }
            </div>
          )
      }
    </div>
  )
}

export default TodoItem
