import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Navbar2 from "../components/NavBar2";
import "../styles/profile.css";
import { supabaseClient } from "../utils/supabaseClient";

const Profile = () => {
  const [user, setUser] = useState(null); // Inicializa el estado como null
  const navigate = useNavigate();
  useEffect(() => {
    async function getUserData() {
      const { data, error } = await supabaseClient.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setUser(data.user);
        console.log(data); // Asegúrate de que los datos del usuario se establecen correctamente
      }
    }

    getUserData();
  }, []);

  async function singOutUser() {
    await supabaseClient.auth.signOut();
    navigate("/");
  }

  const getEmailPrefix = (email) => {
    if (!email) return "No disponible";
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return email; // Por si acaso no hay @ en el email
    return email.substring(0, atIndex);
  };

  return (
    <>
      <Navbar2 />
      <div>
        {user ? (
          <div>
            <div className="profileCard">
              <div className="formCircle"></div>
              <div className="formCircle"></div>
              <div className="formCardInner profile">
                <div className="profile-information-container">
                  <div className="profile-information">
                    <div>
                      <p>Name:</p>
                      <p>User Name:</p>
                      <p>Email:</p>
                    </div>
                    <div>
                      <b>{user.user_metadata?.full_name || "No disponible"}</b>
                      <b>{getEmailPrefix(user.email)}</b>
                      <b>{user.email}</b>
                    </div>
                  </div>
                  <div className="profile-image-container">
                    <img src={user.user_metadata.picture} alt="user avatar" />
                  </div>
                </div>
                <div className="profile-button-container">
                  <button
                    className="singout-button"
                    onClick={() => singOutUser()}
                  >
                    Sing Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Profile;
