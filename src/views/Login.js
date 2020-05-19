import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions';
import { Notifier } from '../components/utils';

export const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: '', password: '' });
  const { userFetched, info, userLoading, errorMesg } = useSelector(
    ({ user }) => user
  );
  const onInputChange = ({ target }) => {
    const theUser = { ...user };
    theUser[target.name] = target.value;
    setUser(theUser);
  };
  const onLogin = () => {
    dispatch(loginUser(user));
  };
  useEffect(() => {
    if (userFetched) {
      localStorage.setItem('user', JSON.stringify(info));
      window.location.href = '/admin';
    }
  }, [userLoading, userFetched, errorMesg]);
  return (
    <Container>
      <Notifier message={errorMesg} />
      <div className='text-center'>
        <img
          className='mb-4'
          src='/docs/4.5/assets/brand/bootstrap-solid.svg'
          alt=''
          width='72'
          height='72'
        />
        <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
        <label htmlFor='inputEmail' className='sr-only'>
          Email address
        </label>
        <input
          type='email'
          name='email'
          value={user.email}
          className='form-control'
          placeholder='Email address'
          autoFocus
          onChange={onInputChange}
        />
        <label htmlFor='inputPassword' className='sr-only'>
          Password
        </label>
        <input
          type='password'
          name='password'
          value={user.password}
          className='form-control'
          placeholder='Password'
          onChange={onInputChange}
        />
        <div className='checkbox mb-3'>
          <label>
            <input type='checkbox' value='remember-me' /> Remember me
          </label>
        </div>
        <button className='btn btn-lg btn-primary btn-block' onClick={onLogin}>
          {userLoading ? 'Loading, please wait,...' : 'Sign in'}
        </button>
      </div>
    </Container>
  );
};
