import React, { useState } from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addUsers } from '../../../redux/slices/usersSlice';
import { Link } from 'react-router-dom';


const schema=yup.object().shape({
  username:yup.string().required("username is required"),
  email:yup.string().email().required("email is required"),
  password:yup.string().required("password is required").min(4).max(8)
});

const RegisterPage = () => {
  const usersredux = useSelector((state) => state.users.value);

  //console.log("users", usersredux);
  
  const dispatch = useDispatch();

  const [totalusers, setTotalUsers] = useState({
    email:"",
    password:""
})


  const navigate = useNavigate();
 
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver:yupResolver(schema)

  });

  const onSubmit = (data) => {
    //console.log(data);
      const usersdata={...data};
      // if(!usersdata.email)
      // {
      //   alert("Email already exists");
      // }
      const existsusers = dispatch(addUsers(usersdata));
      //console.log("exixtsusersss",existsusers);
      setTotalUsers(existsusers);
      navigate("/login");
  };

  return (
    <div className='container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Username</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="username" {...register("username")}  />
            <p>{errors.username?.message}</p>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="email" {...register("email")}  />
            <p>{errors.email?.message}</p>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" name="password" {...register("password")}  />
            <p>{errors.password?.message}</p>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">Sign up</button>
            <div>
            <p>Already have an account? 
                <Link to="/login" className='alink'>login</Link>
            </p>
            </div>
          </div>
        </div>
      </form>

    </div>
  )
}

export default RegisterPage