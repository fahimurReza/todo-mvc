import React from 'react';

import { ReactComponent as CheckMark } from './Asset/checkmark02.svg';
import { ReactComponent as DeleteIcon } from './Asset/delete01.svg';

import './styles.css'

class TodoItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showDelete: null, isEditable: false, editedValue: this.props.item }
  }

  handleSubmit = (event) => {
    event && event.preventDefault()
    this.props.updateEditedValue(this.state.editedValue, this.props.index)
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  handleClick = (e) => {
    if (this.state.isEditable === true) {
      if (!this.node.contains(e.target)) {
        this.setState({ isEditable: false })
        this.props.updateEditedValue(this.state.editedValue, this.props.index)
      }
    }
  }
  
  render() {
    return (
      <div
        ref={node => this.node = node}
        className='item'
        onMouseOver={() => this.setState({ showDelete: true })}
        onMouseLeave={() => this.setState({ showDelete: false })}
        onDoubleClick={() => this.setState({ isEditable: true })}
      >
        <div
          className={`round ${this.state.isEditable ? "disappear" : ""}`}
          onClick={() => this.props.toggleIsCompleted(this.props.index)}
        >
          {this.props.isCompleted && <span> <CheckMark className='markIcon' /> </span>}
        </div>

        {
          this.state.isEditable ? (
            <form onSubmit={this.handleSubmit} className='editForm'>
              <input
                className='editInput'
                value={this.state.editedValue}
                onChange={(e) => this.setState({ editedValue: e.target.value })}
                autoFocus={true}
              />
            </form>
          ) : (
              <div className='itemContainer'>
                <span className={`itemContent ${this.props.isCompleted ? "completed" : ""}`} >{this.props.item}</span>
                {this.state.showDelete &&
                  <span>
                    <DeleteIcon
                      className='deleteIcon'
                      onClick={() => this.props.deleteItem(this.props.index)}
                    />
                  </span>
                }
              </div>
            )
        }
      </div>
    )
  }
}

export default TodoItem
