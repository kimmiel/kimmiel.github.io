import { useState } from "react";
import { useLogin } from "../hooks/useLogin"; //ch n12

// navbar
import { Link } from "react-router-dom";

// ch n9 1 看user輸入了甚麼
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin(); //ch n12 get function and data form useLogin
  //ch n9 3 把form傳到後端
  const handleSubmit = async (e) => {
    //傳form時會refesh，所以一定要用preventDefault阻止
    e.preventDefault();

    await login(email, password); //ch n12
  };

  // ch n9 2 造signup的表格,login的表格
  return (
    <div className="pages loginSignup">
      {/*  navbar */}
      <div className="right_navbar">
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>

      <form className="login" onSubmit={handleSubmit}>
        <h3>Log in</h3>

        <div className="email">
          <label>Email</label> <br />
          {/* 当email的值改傳入的也跟著改 */}
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="enter your email"
          />
        </div>

        <div className="password">
          <label>Password</label> <br />
          {/* 当password的值改傳入的也跟著改 */}
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="enter your password"
          />
        </div>

        {/* ch n10 4 如果isLoading=true=在傳资料,sign up button會失效 */}
        <center>
          {" "}
          <button disabled={isLoading}>Log in</button>
        </center>
        {/*ch n12 show error in web */}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

//ch n9 3 把function export
export default Login;
