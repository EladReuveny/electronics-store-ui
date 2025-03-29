import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUser } from "../api requests/user api's/user";
import ToggleSwitch from "../components/ToggleSwitch";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const [editProfileInformation, setEditProfileInformation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      alert("Please log in first.");
    }
  }, []);

  const toggleEditSettings = () => {
    setEditProfileInformation((prev) => !prev);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const newUserDetails = {
      newEmail: e.target.email.value.trim(),
      currentPassword: e.target.currentPassword.value.trim(),
      newPassword: e.target.newPassword.value.trim(),
      newAddress: e.target.address.value.trim(),
      newPhone: e.target.phone.value.trim(),
    };

    if (
      newUserDetails.newPassword &&
      newUserDetails.newPassword === newUserDetails.currentPassword
    ) {
      alert("New password cannot be the same as the current password.");
      return;
    }

    if (!newUserDetails.currentPassword && newUserDetails.newPassword) {
      alert("Please enter your current password to set a new password.");
      return;
    }

    try {
      const updatedUser = await updateUser(user.id, newUserDetails);
      setUser(updatedUser);
      alert("Successfully updated!");
      setEditProfileInformation(false);
    } catch (error) {
      alert(error.message);
      console.error("Error updating user:", error);
    }
  };

  return (
    <section id="profile" className="profile">
      <div className="section-title">
        <h1>Profile</h1>
      </div>

      <div className="profile-container">
        <aside className="settings-nav">
          <h2>Settings</h2>

          <ul className="nav-list">
            <li>
              <a
                href="#profile-information"
                className={
                  location.hash === "#profile-information" ? "active" : ""
                }
              >
                Profile Information
              </a>
            </li>
            <li>
              <a
                href="#display"
                className={location.hash === "#display" ? "active" : ""}
              >
                Display
              </a>
            </li>
          </ul>
        </aside>

        <main className="settings-content">
          {editProfileInformation ? (
            <div className="profile-information-edit" id="profile-information">
              <form className="form" onSubmit={handleUpdateUser}>
                <fieldset className="fieldset">
                  <legend>Edit Profile Information</legend>

                  <div className="email">
                    <div className="field">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder=""
                        autoFocus
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>

                  <div className="password">
                    <div className="field">
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        placeholder=""
                      />
                      <label htmlFor="currentPassword">Current Password</label>
                    </div>
                    <div className="field">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        placeholder=""
                      />
                      <label htmlFor="newPassword">New Password</label>
                      <i
                        className={`fa-solid fa-eye${
                          showPassword ? "-slash" : ""
                        }`}
                        onClick={toggleShowPassword}
                      ></i>
                    </div>
                  </div>

                  <div className="address">
                    <div className="field">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder=""
                      />
                      <label htmlFor="address">Address</label>
                    </div>
                  </div>

                  <div className="phone">
                    <div className="field">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder=""
                      />
                      <label htmlFor="phone">Phone</label>
                    </div>
                  </div>

                  <div className="actions">
                    <button className="btn btn--6" onClick={toggleEditSettings}>
                      Cancel
                    </button>
                    <button className="btn btn--2" type="submit">
                      Save Changes
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          ) : (
            <div className="profile-information form" id="profile-information">
              <fieldset className="fieldset">
                <legend>Profile Information</legend>

                <div className="email">
                  <div className="field">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user?.email}
                      placeholder=""
                      autoFocus
                      disabled
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>

                <div className="password">
                  <div className="field">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={user?.password}
                      placeholder=""
                      disabled
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>

                <div className="address">
                  <div className="field">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={user?.address}
                      placeholder=""
                      disabled
                    />
                    <label htmlFor="address">Address</label>
                  </div>
                </div>

                <div className="phone">
                  <div className="field">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={user?.phone}
                      placeholder=""
                      disabled
                    />
                    <label htmlFor="phone">Phone</label>
                  </div>
                </div>

                <div className="actions">
                  <button className="btn btn--4" onClick={toggleEditSettings}>
                    Edit
                  </button>
                </div>
              </fieldset>
            </div>
          )}

          <div className="display form" id="display">
            <fieldset className="fieldset">
              <legend>Display</legend>

              <ToggleSwitch purpose="dark-mode" text="Dark Mode: " />
            </fieldset>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Profile;
