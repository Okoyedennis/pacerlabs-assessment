// auth.js
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      router.push("/login");
    }
  }, [router]);
};
