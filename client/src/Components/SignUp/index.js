import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SideNav from "../../../src/SideNav";
import Header from "../../Header";
import "./Login.css";

const Signup = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userType, setUserType] = useState("Student");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    degree: "",
    skills: [], // Add this line to include the skills field
    interest: [],
    department: "",
    newInterest: "",
    newSkill: "",
  });

  const navigate = useNavigate();

  const navigationItems = [
    { id: 1, label: "Home", url: "/" },
    { id: 2, label: "Log In", url: "/Login" },
    { id: 3, label: "Sign Up", url: "/SignUp" },
  ];

  const handleToggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
    document.body.classList.toggle("nav-open");
  };
  const handleUserTypeChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "Student") {
      setUserType("Student");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        degree: "",
        interest: [],
        skills: [],
        newInterest: "", // Reset newInterest field
        newSkill: "", // Reset newSkill field
      });
    } else if (selectedValue === "Staff") {
      setUserType("Staff");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        department: "",
        newInterest: "", // Reset newInterest field
        newSkill: "", // Reset newSkill field
      });
    }
    console.log("Selected userType:", selectedValue);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleAddInterest = (e) => {
    e.preventDefault(); // Prevent form submission
    const { newInterest } = formData;
    if (newInterest.trim() !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        interest: [...prevFormData.interest, newInterest.trim()],
        newInterest: "",
      }));
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      interest: prevFormData.interest.filter(
        (interest) => interest !== interestToRemove
      ),
    }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault(); // Prevent form submission

    const { newSkill } = formData;
    if (newSkill.trim() !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        skills: [...prevFormData.skills, newSkill.trim()],
        newSkill: "",
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: prevFormData.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const skillsString = formData.skills.join(", ");
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
      }
    }
  };

  const renderSignUpForm = () => {
    const commonFields = (
      <div>
        <label htmlFor="firstName">
          <b>First Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">
          <b>Last Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
    );

    if (userType === "Student") {
      return (
        <div>
          <form onSubmit={handleSubmit} action="/Student">
            <h3>Student Sign Up</h3>
            {commonFields}
            <label htmlFor="degree">
              <b>Degree</b>
            </label>
            <input
              type="text"
              placeholder="Enter Degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
            />
            <label htmlFor="interests">
              <b>Interests</b>
            </label>
            <div>
              {formData.interest.map((interest, index) => (
                <span key={index} className="tag">
                  {interest}
                  <button
                    className="tag-remove"
                    onClick={() => handleRemoveInterest(interest)}
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
            <span className="add-interest-container">
              <input
                type="text"
                placeholder="Enter Interest"
                name="newInterest"
                value={formData.newInterest}
                onChange={handleChange}
              />
              <button
                className="add-interest-button"
                onClick={handleAddInterest}
              >
                Add
              </button>
            </span>
            <label htmlFor="skills">
              <b>Skills</b>
            </label>
            <div>
              {formData.skills.map((skills, index) => (
                <span key={index} className="tag">
                  {skills}
                  <button
                    className="tag-remove"
                    onClick={() => handleRemoveSkill(skills)}
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
            <span className="add-skills-container">
              <input
                type="text"
                placeholder="Enter Skills"
                name="newSkill" // <-- Change the name attribute to "newSkill"
                value={formData.newSkill}
                onChange={handleChange}
              />
              <button className="add-skills-button" onClick={handleAddSkill}>
                Add
              </button>
            </span>
            <div></div>
            <button className="submitBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      );
    } else if (userType === "Staff") {
      return (
        <div>
          <form onSubmit={handleSubmit} action="/Staff">
            <h3>Staff Sign Up</h3>
            {commonFields}
            {/* Staff-specific fields */}
            {/* ... */}
            <label htmlFor="department">
              <b>Department</b>
            </label>
            <input
              type="text"
              placeholder="Enter Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />

            <button className="submitBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      );
    }
  };
  return (
    <div>
      <Header onToggleNav={handleToggleNav} />
      <SideNav
        isNavOpen={isNavOpen}
        navigationItems={navigationItems}
        onItemClick={(selectedItem) => setSelectedItem(selectedItem)}
        setIsNavOpen={setIsNavOpen}
      />
      <div className="container">
        <h3>Are you a student or staff member?</h3>
        <div className="labels">
          <label>
            <input
              type="radio"
              name="userType"
              value="Student"
              onChange={handleUserTypeChange}
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="Staff"
              onChange={handleUserTypeChange}
            />
            Staff
          </label>
        </div>
        {renderSignUpForm()}
      </div>
    </div>
  );
};

export default Signup;
