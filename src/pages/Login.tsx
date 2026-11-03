import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar2 from "../components/NavBar2";
import "../styles/login.css"; // Importa tu hoja de estilos personalizada

const supabase = createClient(
  "https://jsqxokafxiujbnflycuz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzcXhva2FmeGl1amJuZmx5Y3V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNzk2MzEsImV4cCI6MjEwNDk1NTYzMX0.NInfUOtMl7p-cJ2itemAK4IsM563jdQu2-fCdoYSxk8",
);

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [redirectPath, setRedirectPath] = useState("/");

  useEffect(() => {
    const path = location.state?.from?.pathname || "/";
    setRedirectPath(path);
  }, [location]);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        try {
          const response = await fetch(
            "https://node-avx-eccomerce-0utq.onrender.com/users",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: null, // Deja que Supabase genere el ID automáticamente
                admin: false, // Ajusta según tus necesidades
                cart: [], // Ajusta según tus necesidades
              }),
            },
          );

          if (!response.ok) {
            throw new Error("Failed to create user");
            console.log("error");
          }

          navigate(redirectPath); // Redirigir después del registro exitoso
        } catch (error) {
          console.error("Error creating user:", error);
          // Manejar el error según tu lógica de la aplicación
        }
      }
    });
  }, [navigate, redirectPath]);

  const customTheme = {
    ...ThemeSupa,
    colors: {
      ...ThemeSupa.colors,
      brand: "var(--color-primary)",
      brandAccent: "var(--color-primary)",
      inputBorderFocus: "var(--color-primary)",
    },
  };

  return (
    <section className="loginContainer">
      <Navbar2 />
      <div className="supabase-auth-container">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: customTheme }}
          providers={["discord", "google"]}
        />
      </div>
    </section>
  );
}

export default Login;
