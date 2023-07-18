import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SideNav from "../../../src/SideNav";
import Header from "../../Header";

function ProfilePage(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");

  const [profile, setProfile] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    degree: "",
    interest: [],
    skills: [],
    department: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [navigationItems, setNavigationItems] = useState([]);

  const handleToggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
    document.body.classList.toggle("nav-open");
  };

  useEffect(() => {
    if (userType === "Staff") {
      setNavigationItems([
        { id: 1, label: "Home", url: "/loggedin" },
        { id: 2, label: "Add Project", url: "/Project" },
        { id: 3, label: "Profile", url: "/Profile" },
        { id: 4, label: "SignOut", url: "/signout" },
      ]);
    } else if (userType === "Student") {
      setNavigationItems([
        { id: 1, label: "Home", url: "/loggedin" },
        { id: 2, label: "Profile", url: "/Profile" },
        { id: 3, label: "Favourites", url: "/favourites" },
        { id: 4, label: "SignOut", url: "/signout" },
      ]);
    }
  }, [userType]);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    const loggedInUserType = localStorage.getItem("userType");
    console.log("Logged In User Type:", loggedInUserType);
    const navStorage = localStorage.getItem("navigationItems");

    if (!loggedInUserId) {
      // Redirect the user to login if not logged in
      navigate("/login");
    } else {
      setUserId(loggedInUserId);
      setUserType(loggedInUserType);
      setNavigationItems(navigationItems);

      if (loggedInUserType) {
        fetchProfileData(loggedInUserId, loggedInUserType);
      }
    }
  }, [navigate, location]);

  const fetchProfileData = async (userId, userType) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/profile/${userId}`
      );
      const profileData = response.data;

      console.log("Profile Data:", profileData);
      console.log("User Type:", userType);

      setProfile(profileData);
      setFirstName(profileData.firstName);
      setLastName(profileData.lastName);
      setEmail(profileData.email);

      if (userType === "Student") {
        console.log("Student Profile");
        setFormData((prevFormData) => ({
          ...prevFormData,
          degree: profileData.degree,
          interest: profileData.interest.join(", "),
          skills: profileData.skills.join(", "),
          department: "",
        }));
      } else if (userType === "Staff") {
        console.log("Staff Profile");
        setFormData((prevFormData) => ({
          ...prevFormData,
          degree: "",
          interest: [],
          skills: [],
          department: profileData.department,
        }));
      } else {
        console.log("Unknown User Type");
      }
    } catch (error) {
      console.log("Error fetching profile data:", error);
      setError("Profile not found");
    }
  };

  const handleEdit = () => {
    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      degree: userType === "Student" ? profile.degree : "",
      interest: userType === "Student" ? profile.interest.join(", ") : "",
      skills: userType === "Student" ? profile.skills : "",
      department: userType === "Staff" ? profile.department : "",
    });

    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      let updatedProfile = {
        ...profile,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      if (userType === "Student") {
        updatedProfile.degree = formData.degree;
        updatedProfile.interest = formData.interest
          .split(",")
          .map((item) => item.trim());
        updatedProfile.skills = formData.skills;
      } else if (userType === "Staff") {
        updatedProfile.department = formData.department;
      }

      console.log("Updated Profile:", updatedProfile); // Added console.log

      await axios.put(
        `http://localhost:8080/api/profile/${userId}`,
        updatedProfile
      );

      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      degree: userType === "Student" ? profile.degree : "",
      interest: userType === "Student" ? profile.interest.join(", ") : "",
      skills: userType === "Student" ? profile.skills : "",
      department: userType === "Staff" ? profile.department : "",
    });

    setIsEditing(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      console.log("Deleting user with ID:", userId);
      const url = `http://localhost:8080/api/delete/${userId}`;
      const response = await axios.delete(url, { data: { userId } });
      console.log("User deleted successfully");
      localStorage.setItem("token", response.data);
      navigate("/");
    } catch (error) {
      console.log("Error deleting user:", error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header onToggleNav={handleToggleNav} />
      <SideNav
        isNavOpen={isNavOpen}
        navigationItems={navigationItems}
        onItemClick={(selectedItem) => setSelectedItem(selectedItem)}
        setIsNavOpen={setIsNavOpen}
      />{" "}
      <div style={styles.profileBox}>
        <h2 style={styles.heading}>User Profile</h2>
        {!isEditing ? (
          <div style={styles.profileInfo}>
            <p>
              <strong>First Name:</strong> {firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {lastName}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            {userType === "Student" && (
              <>
                <p>
                  <strong>Interest:</strong>{" "}
                  {profile.interest ? profile.interest.join(", ") : ""}
                </p>
                <p>
                  <strong>Degree:</strong> {profile.degree || ""}
                </p>
                <p>
                  <strong>Skills:</strong>{" "}
                  {profile.skills ? profile.skills.join(", ") : ""}
                </p>
              </>
            )}

            {userType === "Staff" && (
              <p>
                <strong>Department:</strong> {profile.department || ""}
              </p>
            )}
            <button style={styles.editButton} onClick={handleEdit}>
              Edit
            </button>
            <button style={styles.deleteButton} onClick={handleDelete}>
              Delete
            </button>
          </div>
        ) : (
          <div style={styles.profileInfo}>
            <label style={styles.label}>
              First Name:
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstName: e.target.value,
                  })
                }
                style={styles.input}
              />
            </label>
            <br />
            <label style={styles.label}>
              Last Name:
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastName: e.target.value,
                  })
                }
                style={styles.input}
              />
            </label>
            <br />
            <label style={styles.label}>
              Email:
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                style={styles.input}
              />
            </label>
            <br />
            {userType === "Student" && (
              <>
                <label style={styles.label}>
                  Interest (comma-separated):
                  <input
                    type="text"
                    value={formData.interest}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        interest: e.target.value,
                      })
                    }
                    style={styles.input}
                  />
                </label>
                <br />
                <label style={styles.label}>
                  Degree:
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        degree: e.target.value,
                      })
                    }
                    style={styles.input}
                  />
                </label>
                <br />
                <label style={styles.label}>
                  Skills:
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        skills: e.target.value,
                      })
                    }
                    style={styles.input}
                  />
                </label>
              </>
            )}
            {userType === "Staff" && (
              <label style={styles.label}>
                Department:
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      department: e.target.value,
                    })
                  }
                  style={styles.input}
                />
              </label>
            )}
            <br />
            <button style={styles.saveButton} onClick={handleSave}>
              Save
            </button>
            <button style={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    // backgroundColor: "#f1f3f8",
  },
  profileBox: {
    padding: "20px",
    margin: "auto",
    background: "#f5f5f5",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#00467f",
  },
  profileInfo: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#00467f",
  },
  input: {
    width: "100%",
    padding: "5px",
    marginBottom: "10px",
  },
  editButton: {
    backgroundColor: "#00467f",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    marginRight: "10px",
    transition: "background-color 0.3s ease",
  },
};

export default ProfilePage;
