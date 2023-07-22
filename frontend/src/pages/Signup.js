import { useState } from "react";
import { useSignup } from "../hooks/useSignup.js"; //ch n10 2 匯入useSignup function去把资料傳到後端
// navbar
import { Link } from "react-router-dom";

// ch n9 1 看user輸入了甚麼
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup(); //ch 3 n10  error, isLoading

  //ch n9 3 把form傳到後端
  const handleSubmit = async (e) => {
    //傳form時會refesh，所以一定要用preventDefault阻止
    e.preventDefault();
    // ch n10 3把email password傳到後端
    await signup(email, password);
  };

  // ch n9 2 造signup的表格,login的表格
  return (
    <div className="wrap">
      <div className="loginSignup_left"></div>
      
      <div className="pages loginSignup_right">
        {/*  navbar */}
        <div className="right_navbar">
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>

        <form className="signup" onSubmit={handleSubmit}>
          <h3>Sign up</h3>
          <label>Email</label> <br />
          {/* 当email的值改傳入的也跟著改 */}
          <div className="email">
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
          {/* ch n10 4 如果isLoading=true=在傳资料,sign up button會消失 */}
          <button disabled={isLoading}>Sign up</button>
          {/* ch n10 4 如果有error如果在網頁顯示*/}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

//ch n9 3 把function export
export default Signup;
