import React from 'react'

const Checkbox = ({title,state,onChange}) => {
  return (
    <div>
            <input type="checkbox" onClick={onChange} checked={state} />
            <label>{title}</label>
    </div>
  )
}

export default Checkbox
