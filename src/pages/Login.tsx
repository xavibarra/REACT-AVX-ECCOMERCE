import { Auth } from "@supabase/auth-ui-react";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    default: {
      colors: {
        brand: "#404040",
        brandAccent: "#3ecf8e",
        brandButtonText: "#ffffff",
        defaultButtonBackground: "#404040",
        defaultButtonBackgroundHover: "#333333",
        defaultButtonBorder: "transparent",
        defaultButtonText: "#ffffff",
        dividerBackground: "#404040",
        inputBackground: "#fff",
        inputBorder: "#ddd",
        inputBorderHover: "#aaa",
        inputBorderFocus: "#3ecf8e",
        inputText: "#000",
        inputLabelText: "#404040",
        inputPlaceholder: "#404040",
        messageText: "#000",
        messageTextDanger: "#ff0000",
        anchorTextColor: "#3ecf8e",
        anchorTextHoverColor: "#3ecf8e",
      },
      fontSizes: {
        baseBodySize: "13px",
        baseInputSize: "14px",
        baseLabelSize: "12px",
        baseButtonSize: "14px",
      },
      borderRadii: {
        borderRadiusButton: "4px",
        buttonBorderRadius: "4px",
        inputBorderRadius: "4px",
      },
    },
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: customTheme }}
        theme="dark"
        providers={["discord", "google"]}
      />
    </div>
  );
}

export default Login;
