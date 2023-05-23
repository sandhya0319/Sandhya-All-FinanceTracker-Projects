import React from 'react'

interface SelectTypes{
    name:string;
    register:any;
    error:any;
    label:string;
    options:any;
}
export const Selectfields = ({name,register,error,label,options}:SelectTypes) => {
  return (
      <div className="form-group row">  
            <label className="col-sm-2 col-form-label">{label} </label>
            <select
                id="monthyear"
                name={name}
                className="form-control"
                {...register(name)}
              >
                {options.map((option:any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div style={{ color: "red" }}>{error && error.message}</div>
    </div>
  )
}


