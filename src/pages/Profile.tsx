import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
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
    const { error } = await supabaseClient.auth.signOut();
    navigate("/");
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>Perfil de usuario</h1>
          <p>Nombre: {user.user_metadata?.full_name || "No disponible"}</p>
          <p>Email: {user.email}</p>
          {/* Añade otros campos según sea necesario */}
          <button onClick={() => singOutUser()}>Sign Out</button>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Profile;
