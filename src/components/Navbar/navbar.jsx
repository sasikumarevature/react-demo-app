import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearToken, setToken, selectIsLoggedIn } from "../../redux/slices/authSlice";
import Button from "react-bootstrap/Button";
import LoginModal from "../loginModal";

const NavComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access Redux state
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [show, setShow] = React.useState(false);

  // Redirect after login/logout or when token changes
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/competency");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  

  const handleLogin = () => {
    const tokenFromEnv = process.env.REACT_APP_ENCRYPTED_TOKEN; // Secure token from environment
    dispatch(setToken(tokenFromEnv));
    setShow(false);
  };

  const handleLogout = () => {
    dispatch(clearToken());
  };

  const toggleModal = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      {/* Navbar */}
      <div className="fluid-container h-14 bg-slate-100 flex items-center px-3">
        <div>
          <svg
            className="w-20"
            viewBox="0 0 57 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.3125 11V0.5H1.67969L12.2275 9.37988H12.2412V0.5H13.5537V11H12.1865L1.63867 2.04492H1.625V11H0.3125ZM16.1855 11V0.5H26.4941V1.59375H17.498V5.09375H26.1182V6.1875H17.498V9.90625H26.6855V11H16.1855ZM27.5605 11L33.5283 5.46289L27.998 0.5H29.8574L34.4375 4.61523L38.874 0.5H40.7334L35.3877 5.46289L41.5605 11H39.7012L34.4717 6.31055L29.4199 11H27.5605ZM42.4355 11L48.5605 0.5H50.3105L56.4355 11H54.9043L53.5918 8.59375H45.2793L43.9668 11H42.4355ZM45.9355 7.5H52.9355L49.4355 1.375L45.9355 7.5Z"
              fill="black"
            />
          </svg>
        </div>

        {/* Menu Items */}
        <ul className="w-full flex justify-end gap-3 items-center m-0">
          {isLoggedIn && (
            <NavLink
              className={({ isActive }) =>
                `cursor-pointer no-underline ${isActive ? "text-blue-500" : "text-black"}`
              }
              to="/competency"
            >
              Competency
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink
              className={({ isActive }) =>
                `cursor-pointer no-underline ${isActive ? "text-blue-500" : "text-black"}`
              }
              to="/unit"
            >
              Unit
            </NavLink>
          )}

          {/* Login Button */}
          {!isLoggedIn && (
            <Button variant="success" onClick={toggleModal}>
              Login
            </Button>
          )}

          {/* Logout Button */}
          {isLoggedIn && (
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </ul>
      </div>

      {/* Login Modal */}
      <LoginModal
        show={show}
        hide={() => setShow(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default NavComponent;
