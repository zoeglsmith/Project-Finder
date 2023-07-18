import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./Components/Main";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import LoggedIn from "./Components/LoggedIn";
import Project from "./Components/AddProject/index";
import About from "./Components/About";
import Deletesucess from "./Components/Delete/deleteSucess";
import AddedProject from "./Components/AddProject/AddedProject";
import ProfilePage from "./Components/Profile/index";
import ProjectList from "./Components/AddProject/ProjectList";
import ProjectDetail from "./Components/AddProject/ProjectDetail";
import SignOut from "./Components/SignOut/SignOut";
import Favourites from "./Components/Favourites";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Main />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/Project" exact element={<Project />} />
      <Route path="/addedproject" exact element={<AddedProject />} />
      <Route path="/Profile" element={<ProfilePage />} />
      <Route exact path="/" element={<ProjectList />} />
      <Route path="/:id" element={<ProjectDetail />} />
      <Route path="/about" exact element={<About />} />
      <Route path="/deletesucess" exact element={<Deletesucess />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/loggedin" element={<LoggedIn />} />
      <Route path="/signout" element={<SignOut />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  </BrowserRouter>
);

export default App;
