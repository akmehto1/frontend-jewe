/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import config from '../../../Config/config';
import { signInFailure, signInStart, signInSuccess, UserState } from '../../../redux/user/userslice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: { user: UserState }) => state.user);
  
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'user'
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value,} = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    
    try {
      dispatch(signInStart());

      const response = await fetch(`${config.apiBaseUrl}user/auth/log-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
     

      if (!response.ok) {

        throw new Error(`${data.message}`);
      }

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
       
console.log(data.user);
console.log("get");
      dispatch(signInSuccess(data.user));
      navigate('/user/dashboard');
    } catch (error:any) {
      console.log(error);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  value={form.email}
                  onChange={changeHandler}
                  required
                />
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  value={form.password}
                  onChange={changeHandler}
                  required
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    // checked={form.rememberMe}
                    onChange={changeHandler}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div> */}
                <a href="#!">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                {loading ? 'Loading...' : 'Sign in'}
              </button>
            </form>
            {error && <div className="text-danger mt-3">{error}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
