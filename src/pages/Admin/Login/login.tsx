import React, { useState } from "react";
import "./Login.scss"; // Component-specific SCSS file
import {
  signInFailure,
  signInStart,
  signInSuccess,
  UserState,
} from "../../../redux/user/userslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import config from "../../../Config/config";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error,setError]=useState("");


  const { loading} = useSelector(
    (state: { user: UserState }) => state.user
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);

    try {
      dispatch(signInStart());

      const response = await fetch(`${config.apiBaseUrl}admin/auth/log-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(`${data.message}`);
      }

      if (data.success === false) {
        setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }

      console.log(data.user);
      console.log("get");
      dispatch(signInSuccess(data.user));
      navigate("/admin/dashboard");
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <section className="login-section vh-80 gradient-custom">
      <div className="row d-flex justify-content-center align-items-center h-80">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            className="card bg-dark text-white"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your email, phone number, and password!
                </p>

                {/* Email Input */}
                <div className="form-outline form-white mb-4">
                  <input
                    onChange={changeHandler}
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                </div>

                {/* Phone Input */}
                {/* <div className="form-outline form-white mb-4">
                  <input type="tel" id="phoneInput" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="phoneInput">Phone</label>
                </div> */}

                {/* Password Input */}
                <div className="form-outline form-white mb-4">
                  <input
                    onChange={changeHandler}
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>

                {/* Forgot Password */}
                <p className="small mb-5 pb-lg-2">
                  <a className="text-white-50" href="#!">
                    Forgot password?
                  </a>
                </p>

                <p>{error}</p>

                {/* Login Button */}
                <button
                  onClick={submitHandler}
                  className="btn btn-outline-light btn-lg px-5"
                  type="submit"
                >
                  Login
                </button>

                {/* Social Media Icons */}
                <div className="d-flex justify-content-center text-center mt-4 pt-1">
                  <a href="#!" className="text-white">
                    <i className="fab fa-facebook-f fa-lg"></i>
                  </a>
                  <a href="#!" className="text-white">
                    <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                  </a>
                  <a href="#!" className="text-white">
                    <i className="fab fa-google fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
