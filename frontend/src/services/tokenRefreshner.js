import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes

function useTokenRefresher() {
  const [refresh, setRefresh] = useState(0);
    
  useEffect(() => {
    let activityDetected = false;

    const markActivity = () => (activityDetected = true);

    window.addEventListener("mousemove", markActivity);
    window.addEventListener("keydown", markActivity);

    const interval = setInterval(async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { exp } = jwtDecode(token);
        const timeLeft = exp * 1000 - Date.now();

        if (timeLeft < REFRESH_THRESHOLD && activityDetected) {
          // Attempt refresh
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${jwtDecode(token).id}/refreshToken`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const { token: newToken } = await res.json();
            localStorage.setItem("token", newToken);
            setRefresh((prev) => !prev);
            // console.log("Token refreshed!");
          } 
        }
        activityDetected = false; // reset after every check
      } catch (err) {
        console.error("Token refresh error", err);
      }
    }, 60 * 1000); // Check every 1 minute

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", markActivity);
      window.removeEventListener("keydown", markActivity);
    };
  }, []);

  return refresh;
}

export default useTokenRefresher;