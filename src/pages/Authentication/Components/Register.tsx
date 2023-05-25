import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { addUsers } from '../../../redux/slices/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { UsersInterface } from '../../../model';
import { InputFields } from '../../../components/InputFields';


const schema = yup.object().shape({
  username: yup.string().required("username is required"),
  email: yup.string().email().required("email is required"),
  password: yup.string().required("password is required").min(4).max(8)
});

const Register: React.FC = () => {

  const usersredux = useSelector((state: RootState) => state.rootReducer.users);
  //console.log(data);

  const dispatch = useDispatch();

  const [totalusers, setTotalUsers] = useState<any>({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    resolver: yupResolver(schema)

  });

  const onSubmit = (data: UsersInterface) => {
    const usersdata = { ...data };
    const storedData = usersredux;
    let user = storedData.value.some(elem => elem.email == data.email);
    if (user) {
      alert(`User already exist`);
      navigate("/register");
    } else {
      const existsusers = dispatch(addUsers(usersdata));
      setTotalUsers(existsusers);
      navigate("/login");
    }

  };

  return (
    <div className='container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputFields
            type="text"
            name="username"
            register={register}
            error={errors.username}
            label="username"
          />
        </div>
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