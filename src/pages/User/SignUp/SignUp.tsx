import React, { useRef, useState } from 'react';

import { signup } from '../../../Service/Auth';
import { ISignupForm } from '../../../Interface/Auth/ISignup';


export default function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const userRefferalIdRef = useRef<HTMLInputElement>(null);
  const referredByRef = useRef<HTMLInputElement>(null);
  const isCheckedTCRef = useRef<HTMLInputElement>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     // Basic validation
     if (passwordRef.current?.value !== repeatPasswordRef.current?.value) {
      setError("Passwords do not match.");
      return;
    }

    // Store form values in a single object
    const formValues: ISignupForm = {
      firstName: firstNameRef.current?.value || '',
      lastName: lastNameRef.current?.value || '',
      email: emailRef.current?.value || '',
      phone: phoneRef.current?.value || '',
      password: passwordRef.current?.value || '',
      userRefferalId: userRefferalIdRef.current?.value || undefined,
      referredBy:referredByRef.current?.value || "null",
      isCheckedTC: isCheckedTCRef.current?.checked || false,
      role:"admin"
    };

    console.log(formValues);
    

   

    try {
      // Call the signup service
      const result = await signup(formValues);  // Use the API logic
      setSuccess("Signup successful!");
      setError("");  // Handle errors
      console.log(result);  // Handle the response
    } catch (error:any) {
      setSuccess("");
      setError(error.message);  // Handle errors
    }
  };

  return (
    <div>
      <section>
        {/* Jumbotron */}
        <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  The best offer <br />
                  <span className="text-primary">for your business</span>
                </h1>
                <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, itaque accusantium odio, soluta,
                  corrupti aliquam quibusdam tempora at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
                  aliquid ipsum atque?
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      {/* First and Last Names */}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" ref={firstNameRef} className="form-control" required />
                            <label className="form-label" htmlFor="firstName">First name</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" ref={lastNameRef} className="form-control" required />
                            <label className="form-label" htmlFor="lastName">Last name</label>
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="form-outline mb-4">
                        <input type="email" ref={emailRef} className="form-control" required />
                        <label className="form-label" htmlFor="email">Email address</label>
                      </div>

                      {/* Phone */}
                      <div className="form-outline mb-4">
                        <input type="tel" ref={phoneRef} className="form-control" placeholder="123-456-7890"  required />
                        <label className="form-label" htmlFor="phone">Phone</label>
                      </div>

                      {/* Password */}
                      <div className="form-outline mb-4">
                        <input type="password" ref={passwordRef} className="form-control" required />
                        <label className="form-label" htmlFor="password">Password</label>
                      </div>

                      {/* Repeat Password */}
                      <div className="form-outline mb-4">
                        <input type="password" ref={repeatPasswordRef} className="form-control" required />
                        <label className="form-label" htmlFor="repeatPassword">Repeat Password</label>
                      </div>

                      {/* User ID */}
                      <div className="form-outline mb-4">
                        <input type="text" ref={userRefferalIdRef} className="form-control" required />
                        <label className="form-label" htmlFor="userId">User ID</label>
                      </div>

                      {/* Referral ID */}
                      <div className="form-outline mb-4">
                        <input type="text" ref={referredByRef} className="form-control" />
                        <label className="form-label" htmlFor="referralId">Referral ID</label>
                      </div>

                      {/* Error message */}
                      {error && <div className="text-danger mb-3">{error}</div>}
                      {success && <div className="text-success mb-3">{success}</div>}

                      {/* Subscribe Checkbox */}
                      <div className="form-check d-flex justify-content-center mb-4">
                        <input className="form-check-input me-2" type="checkbox" ref={isCheckedTCRef} />
                        <label className="form-check-label" htmlFor="subscribe">
                          Subscribe to our newsletter
                        </label>
                      </div>

                      {/* Submit button */}
                      <button type="submit" className="btn btn-primary btn-block mb-4">
                        Sign up
                      </button>

                      {/* Social buttons */}
                      <div className="text-center">
                        <p>or sign up with:</p>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-facebook-f"></i>
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-google"></i>
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-github"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Jumbotron */}
      </section>
    </div>
  );
}
