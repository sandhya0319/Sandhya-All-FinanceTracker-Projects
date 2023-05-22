import React, { useState } from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
//import { useSelector, useDispatch } from 'react-redux';
//import { RootState } from '../../../redux/store';
import { addUsers } from '../../../redux/slices/usersSlice';
import { useAppDispatch,useAppSelector } from '../../../redux/hooks';
import { Link } from 'react-router-dom';
//import { RootState } from '../../../redux/store';

interface TotalUsers{
  username:string;
  email:string;
  password:string;
}

const schema=yup.object().shape({
  username:yup.string().required("username is required"),
  email:yup.string().email().required("email is required"),
  password:yup.string().required("password is required").min(4).max(8)
});

const Register:React.FC = () => {
 // const usersredux = useAppSelector((state:RootState) => state.users.value);

  //console.log("userssss", usersredux);
  
 const dispatch = useAppDispatch();
 console.log(dispatch,"dispatch")

  const [totalusers, setTotalUsers] = useState<TotalUsers>({
    username:"",
    email:"",
    password:"",
});

  const navigate = useNavigate();
 
  const {register,handleSubmit,formState:{errors}} = useForm<TotalUsers>({
    resolver:yupResolver(schema)

  });

  const onSubmit = (data:TotalUsers) => {
    console.log("data");
      const usersdata={...data};
      const existsusers = dispatch(addUsers(usersdata));
      //setTotalUsers(existsusers);
      navigate("/login");
      
 };

  return (
    <div className='container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Username</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" {...register("username")}  />
            <p>{errors.username?.message}</p>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" {...register("email")}  />
            <p>{errors.email?.message}</p>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" {...register("password")}  />
            <p>{errors.password?.message}</p>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">Sign up</button>
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

export default Register