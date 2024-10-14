import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/header/h-logo.png";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart, UserState } from "../../redux/user/userslice";




const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to programmatically navigate

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );


  console.log(currentUser);
  const handleSignOut = () => {
    dispatch(signOutUserStart());
    
    // If you have an API call for sign-out, it should be handled here as well
    // After sign-out, navigate to the login page or home
    navigate("/user/log-in"); // Adjust as per your routes
  };

  return (
    <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary header sticky-top ">
      <div className="container-fluid">
        <NavLink className="w-10 navbar-brand" to="#">
          <img style={{ width: "50px" }} alt="Responsive image" src={logo} />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/price">
                Price
              </NavLink>
            </li>
            {currentUser && currentUser.role=='admin' && <li className="nav-item">
              <NavLink className="nav-link" to="/admin/filter">
                Filter
              </NavLink>
            </li>}

            {currentUser && currentUser.role=='admin' && <li className="nav-item">
              <NavLink className="nav-link" to="/admin/dashboard">
                Dashboard
              </NavLink>
            </li>}
            
          


            

            {currentUser && (
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Menu
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/user/dashboard">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/another-action">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/something-else">
                      Something else here
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}

            {/* <li className="nav-item">
                            <NavLink className="nav-link" aria-disabled="true" to="#">
                                Contact
                            </NavLink>
                        </li> */}
          </ul>
          <form className="d-flex" role="search">
            {currentUser ? (
              <>
                <button
                  className="pe-5 ps-5 btn btn-secondary me-2"
                  onClick={handleSignOut}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to={"/user/log-in"}
                  className="pe-5 ps-5 btn btn-secondary me-2"
                  type="submit"
                >
                  Login
                </NavLink>
                <NavLink
                  to={"/user/sign-in"}
                  className="btn btn-outline-success"
                >
                  Sign
                </NavLink>
                
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
