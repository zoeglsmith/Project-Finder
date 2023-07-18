import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../src/Header";
import "./Login.css";
import SideNav from "../../../src/SideNav";

const Login = () => {
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
    document.body.classList.toggle("nav-open");
  };
  const navigationItems = [
    { id: 1, label: "Home", url: "/" },
    { id: 2, label: "Log In", url: "/Login" },
    { id: 3, label: "Sign Up", url: "/SignUp" },
  ];

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setData({ ...data, email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setData({ ...data, password: event.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const email = data.email.trim();
    const password = data.password.trim();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("token", res.data);

      // Store the user ID in the local storage
      localStorage.setItem("userId", res.userId);
      localStorage.setItem("userType", res.userType);

      navigate("/loggedin", {
        state: {
          firstName: res.firstName,
          userId: res.userId,
          userType: res.userType,
        },
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <title>Login</title>
      <Header onToggleNav={handleToggleNav} />
      <SideNav
        isNavOpen={isNavOpen}
        navigationItems={navigationItems}
        onItemClick={(selectedItem) => setSelectedItem(selectedItem)}
        setIsNavOpen={setIsNavOpen}
      />

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={data.email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={handlePasswordChange}
          />
        </div>
        <input className="submitBtn" type="submit" />
      </form>
      <footer></footer>
    </>
  );
};

export default Login;
