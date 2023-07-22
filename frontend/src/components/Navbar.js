import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout"; //ch n11 get useLogout fountion
import { useAuthContext } from "../hooks/useAuthContext"; // ch n3
const Navbar = () => {
  // ch n11  call useLogout function to delete the local storage
  const { logout } = useLogout();
  const { user } = useAuthContext(); //ch n13 從useAuthContext抓user(在local storage的资料)

  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container navbar">
        <div className="left_navbar">
          <Link to="/">
            {/* <h1>Nijisanji Scheduler</h1> */}
          </Link>
        </div>
        {/* ch n9展示signup和login的html */}
        <nav>
          {/*ch n11 make a logout botton */}
          {/*ch n13 check do user login (check local storage ,do there have data)*/}
          {user && (
            <div>
              {/* ch n13 then show user email in web */}
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {/*ch n13 if people don't login then show(local storage do not have data) */}
          {!user && (
            <div className="right_navbar">
              {/* /login,/signup match the route,we make in app  */}
              <Link to="/login">
                {" "}
                <button>Login</button>
              </Link>
              <Link to="/signup">
                <button>Signup</button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
