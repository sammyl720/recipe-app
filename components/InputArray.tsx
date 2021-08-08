import React from 'react'

const InputArray = ({ fieldName, array, fields, setFields, ...rest }) => {
  const onAdd = () => {
    setFields({
      ...fields,
      [fieldName]: [...fields[fieldName], '']
    })
  }

  const onRemove = (index) => {
    setFields({
      ...fields,
      [fieldName]: [
        ...fields[fieldName].slice(0, index),
        ...fields[fieldName].slice(index + 1)
      ]
    })
  }

  const onChange = (index, e) => {
    setFields({
      ...fields,
      [fieldName]: [
        ...fields[fieldName].slice(0, index),
        e.target.value,
        ...fields[fieldName].slice(index + 1)
      ]
    })
  }
  return (
    <div className='p-2 border-4 border-solid border-gray-300 border-opacity-30 shadow rounded'>
      <h3 className='font-semibold'>{fieldName[0].toUpperCase() + fieldName.substr(1)}</h3>
      {
        array.map((item, index) => {
          return (
            <div key={index} className='flex items-center gap-2'>
              <input className='form-group' type="text" name={fieldName} value={item} onChange={e => onChange(index, e) } required={index === 0} {...rest} />
              {
                index > 0 &&
                (
                  <button className='bg-danger w-10 rounded h-10 text-light' onClick={() => onRemove(index)}>
                <i className='fa fa-times' />
              </button>
                )
              }
              <button className='bg-success w-10 rounded h-10 text-light' onClick={() => onAdd()} disabled={item.length === 0} type='button'>
                <i className='fa fa-plus' />
              </button>
            </div>
          )
        })
      }
    </div>
  )
}

export default InputArray
