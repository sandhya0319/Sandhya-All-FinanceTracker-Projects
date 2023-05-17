import React, { useState } from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {  Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Cookies, useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { addUsers } from '../../../redux/slices/usersSlice';



const schema=yup.object().shape({
  email:yup.string().email().required("email is required"),
  password:yup.string().required("password is required").min(4).max(8)
});

const LoginPage = () => {
  const navigate = useNavigate();
 
  const usersredux = useSelector((state) => state.users.value);

  console.log("users", usersredux);
  
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(['user']);

 
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver:yupResolver(schema)

  });

  const onSubmit = (data) => {
    const token = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString(36).substr(0, 10);

    const loginValues=usersredux;

      let user = loginValues.find(elem => elem.email == data.email && elem.password == data.password);
      if (user) {
        setCookie('auth-token',token, 
        {maxAge: 3600},
        { path: '/' });
        //localStorage.setItem("loggedintoken",  JSON.stringify(token));
        alert(`Welcome ${user.username}!`);
        
        navigate("/viewdata");
      } else {
        alert("Wrong email or password.");
      }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" name="email" {...register("email")} />
            <p>{errors.email?.message}</p>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" name="password" {...register("password")} />
            <p>{errors.password?.message}</p>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">Sign in</button>
            <div>
            <p>Don't have an account? 
                <Link to="/register" className='alink'>Register</Link>
            </p>
            </div>
          </div>
        </div>
      </form>

    </div>
  )
}

export default LoginPage