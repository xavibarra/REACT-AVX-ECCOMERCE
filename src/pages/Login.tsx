import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/NavBar2";
import "../styles/login.css"; // Importa tu hoja de estilos personalizada

const supabase = createClient(
  "https://dtchhmivnblzqzsmodfa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0Y2hobWl2bmJsenF6c21vZGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4MTI5NTQsImV4cCI6MjAzMTM4ODk1NH0.mGFqzugUYSJ393JWZiG5KQDIPyXA5YvB-Bxc3Bvr-9k"
);

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        try {
          const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: null, // Deja que Supabase genere el ID automáticamente
              admin: false, // Ajusta según tus necesidades
              cart: [], // Ajusta según tus necesidades
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to create user");
            console.log("error");
          }

          navigate("/"); // Redirigir después del registro exitoso
        } catch (error) {
          console.error("Error creating user:", error);
          // Manejar el error según tu lógica de la aplicación
        }
      }
    });
  }, [navigate]);

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
    <section>
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
