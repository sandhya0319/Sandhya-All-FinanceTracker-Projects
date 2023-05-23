import React, { useState } from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import {  Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Cookies, useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { addUsers } from '../../../redux/slices/usersSlice';
import { InputFields } from '../../../components/InputFields';
import { RootState } from '../../../redux/store';
import { UsersInterface } from '../../../model';


const schema=yup.object().shape({
  email:yup.string().email().required("email is required"),
  password:yup.string().required("password is required").min(4).max(8)
});

const Login:React.FC = () => {
  const navigate = useNavigate();
 
  //const usersredux = useSelector((state) => state.users.value);
  const usersredux = useSelector((state: RootState) => state.rootReducer.users);

  console.log("userslogin", usersredux);
  
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies<any>(['user']);

 
  const {register,handleSubmit,formState:{errors}} = useForm<any>({
    resolver:yupResolver(schema)

  });

  const onSubmit = (data:any) => {
    console.log(data,"logindtaaaa")
    const token = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString(36).substr(0, 10);

    const loginValues=usersredux;
    // if(loginValues(typeof)==)
    // {

    // }
    

      // let user= loginValues.find(elem => elem.email == data.email && elem.password == data.password);
      // if (user) {
      //   setCookie('auth-token',token, 
      //   {maxAge: 3600},
      //   { path: '/' });
      //   //localStorage.setItem("loggedintoken",  JSON.stringify(token));
      //   alert(`Welcome ${user.username}!`);
        
      //   navigate("/viewdata");
      // } else {
      //   alert("Wrong email or password.");
      // }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
       
      <div>
            <InputFields
              type="email"
              name="email"
              register={register}
              error={errors.email}
              label="email"
            />
          </div>
          <div>
            <InputFields
              type="password"
              name="password"
              register={register}
              error={errors.password}
              label="password"
            />
          </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">Sign in</button>
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

export default Login