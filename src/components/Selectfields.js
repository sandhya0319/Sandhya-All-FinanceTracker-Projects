import React from 'react'
export const Selectfields = ({name,register,error,label,options}) => {
  return (
      <div className="form-group row">  
            <label className="col-sm-2 col-form-label">{label} </label>
            <select
                id="monthyear"
                name={name}
                className="form-control"
                {...register(name)}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div style={{ color: "red" }}>{error && error.message}</div>
    </div>
  )
}


