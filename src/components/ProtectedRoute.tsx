import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import Login from "../pages/Login";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const supabase = createClient(
  "https://jsqxokafxiujbnflycuz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzcXhva2FmeGl1amJuZmx5Y3V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNzk2MzEsImV4cCI6MjEwNDk1NTYzMX0.NInfUOtMl7p-cJ2itemAK4IsM563jdQu2-fCdoYSxk8",
);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;

        const user = data.user;
        if (user) {
          setUserId(user.id);
        } else {
          setUserId(null);
        }
      } catch (error) {
        return <Navigate to="/login" />;
        console.error("Error fetching user:", error);
        setUserId(null);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userId) {
      const checkAdminStatus = async () => {
        try {
          console.log("Checking admin status for user:", userId);
          const response = await axios.get(
            `https://node-avx-eccomerce-0utq.onrender.com/users/is-admin`,
            {
              params: { userId },
            },
          );
          console.log("Response from /users/is-admin:", response.data);
          setIsAdmin(response.data.isAdmin);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      };

      checkAdminStatus();
    }
  }, [userId]);

  if (userId === null || isAdmin === null) {
    return <Login />;
  }

  return isAdmin ? <>{element}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
