import React from 'react'

export const InputFields = ({ name, type, register, error, label }) => {
  return (
         <div className="form-group row">
            <label className="col-sm-2 col-form-label">{label} </label>
            <input className="col-sm-10"
                {...register(name)}
                type={type}
                name={name}
            />
            <div style={{ color: "red" }}>{error && error.message}</div>
        </div>
  )
}
