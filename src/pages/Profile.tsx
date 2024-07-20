import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CartCarousel from "../components/CartCarousel";
import LikesCarousel from "../components/LikesCarousel";
import Loading from "../components/Loading";
import Navbar2 from "../components/NavBar2";
import "../styles/profile.css";
import { supabaseClient } from "../utils/supabaseClient";

const Profile = () => {
  const [user, setUser] = useState(null); // Inicializa el estado como null
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation("global");

  useEffect(() => {
    async function getUserData() {
      const { data, error } = await supabaseClient.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setUser(data.user);
        console.log(data); // Asegúrate de que los datos del usuario se establecen correctamente
        getUserInfo(data.user.id); // Llama a getUserInfo con el ID del usuario
      }
    }

    async function getUserInfo(userId) {
      try {
        const response = await fetch(
          `http://localhost:3000/users/getById/${userId}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const userData = await response.json();
        setUserInfo(userData);
        console.log(userData.likes);
      } catch (error) {
        console.error("Error fetching user data:", error);
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
            <div className="formCard profileCard">
              <div className="formCircle"></div>
              <div className="formCircle"></div>
              <div className="formCardInner profile">
                <div className="profile-information-container">
                  <div className="profile-information">
                    <div>
                      <h2 className="profile-title">{t("profile.header")}</h2>
                      <p>{t("profile.name")}:</p>
                      <p>{t("profile.user")}:</p>
                      <p>{t("profile.email")}:</p>
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
                    {t("profile.button")}{" "}
                  </button>
                </div>
              </div>
            </div>
            <div className="profileFavorites">
              {userInfo ? (
                <CartCarousel productIds={userInfo.cart || []} />
              ) : (
                <p>Loading cart products...</p>
              )}
            </div>
            <div className="profileFavorites">
              {userInfo ? (
                <LikesCarousel productIds={userInfo.likes || []} />
              ) : (
                <p>Loading favorites...</p>
              )}
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
