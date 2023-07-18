// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SideNav from "../../SideNav";
// import Header from "../../Header";
// import axios from "axios";
// function DeleteUser() {
//   const setSelectedItem = useState(null);
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     email: "",
//   });
//   const [email, setEmail] = useState({
//     email: "",
//   });

//   const [data, setData] = useState({
//     email: "",
//   });
//   // con
//   const [isNavOpen, setIsNavOpen] = useState(false);

//   const navigationItems = [
//     { id: 1, label: "Home", url: "/" },
//     { id: 2, label: "About", url: "/about" },
//     { id: 3, label: "Add Project", url: "/Project" },
//     { id: 4, label: "Log In", url: "/Login" },
//     { id: 5, label: "Sign Up", url: "/SignUp" },
//     { id: 6, label: "Profile", url: "/Profile" },

//     { id: 7, label: "TEST", url: "/test" },
//   ];
//   const handleToggleNav = () => {
//     setIsNavOpen((prevState) => !prevState);
//     document.body.classList.toggle("nav-open");
//   };

//   const handleEmailChange = (event) => {
//     setData({ ...data, email: event.target.value });
//   };

//   const handleDeleteUser = async (e) => {
//     e.preventDefault();
//     const email = formData.email;
//     try {
//       const url = `http://localhost:8080/api/delete`;
//       const response = await axios.post(url, JSON.stringify(email), {
//         headers: { "Content-Type": "application/json" },
//       });
//       localStorage.setItem("token", response.data);
//       navigate("/");
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.status >= 400 &&
//         error.response.status <= 500
//       ) {
//         setError(error.response.data.message);
//       }
//     }
//   };

//   return (
//     <div>
//       <Header onToggleNav={handleToggleNav} />
//       <SideNav
//         isNavOpen={isNavOpen}
//         navigationItems={navigationItems}
//         onItemClick={setSelectedItem}
//         setIsNavOpen={setIsNavOpen}
//       />
//       <div className="container">
//         <label htmlFor="title">
//           <b>Enter Email</b>
//         </label>
//         <input
//           type="text"
//           placeholder="Enter Email to delete"
//           name="email"
//           value={data.email}
//           onChange={handleEmailChange}
//           required
//         />
//       </div>
//       <input className="submitBtn" type="submit" onClick={handleDeleteUser} />
//     </div>
//   );
// }

// export default DeleteUser;
