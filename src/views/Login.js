import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { loginInitialValues, loginSchema } from '../utils/formikUtil';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions';
import { toast } from 'react-toastify';

export const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { userFetched, info, userLoading, isAuthenticated } = useSelector(
    ({ user }) => user
  );
  useEffect(() => {
    if (isAuthenticated) {
      toast('You are going to the Dashboard in 3 seconds');
      setTimeout(() => {
        history.replace('/admin');
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  useEffect(() => {
    if (userFetched) {
      localStorage.setItem('user', JSON.stringify(info));
      toast(`Welcome ${info.names}`);
      setTimeout(() => {
        window.location.href = '/admin';
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFetched]);
  return (
    <div className='page login-page'>
      <div className='container d-flex align-items-center'>
        <div className='form-holder has-shadow'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='info d-flex align-items-center'>
                <div className='content'>
                  <div className='logo'>
                    <h1>Ijwi ry Ubugorozi</h1>
                  </div>
                  <p>This is reserved to the ADMINISTRATOR</p>
                </div>
              </div>
            </div>
            <div className='col-lg-6 bg-white'>
              <div className='form d-flex align-items-center'>
                <div className='content'>
                  <Formik
                    initialValues={loginInitialValues}
                    validationSchema={loginSchema}
                    onSubmit={(user) => dispatch(loginUser(user))}
                  >
                    {({ handleSubmit, handleChange, values, errors }) => (
                      <form noValidate onSubmit={handleSubmit}>
                        <div className='form-group'>
                          <input
                            id='login-username'
                            type='email'
                            name='email'
                            className='input-material'
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                          />
                          <label
                            htmlFor='login-username'
                            className='label-material'
                          >
                            Email
                          </label>
                        </div>
                        <div className='form-group'>
                          <input
                            id='login-password'
                            type='password'
                            name='password'
                            className='input-material'
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                          />
                          <label
                            htmlFor='login-password'
                            className='label-material'
                          >
                            Type password
                          </label>
                        </div>
                        <button
                          className='btn btn-primary'
                          disabled={userLoading}
                        >
                          {userLoading ? 'Signing in...' : 'Log in'}
                        </button>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
