import { axiosInstance } from "@/lib/axios";
//import { useAuthStore } from "@/stores/useAuthStore";
//import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken} = useAuth();
  const [loading, setLoading] = useState(true);
  //const { checkAdminStatus } = useAuthStore();
  //const { initSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        
        
      } catch (error) {
        // Handle error and clear token
        updateApiToken(null);
        console.log("Error in auth provider", error);
      } finally {
        // Set loading state to false when the auth process is complete
        setLoading(false);
      }
    };

    initAuth();
},[getToken]);

    // Cleanup function: disconnect socket when component unmounts
   

  // Loading state while the authentication process is ongoing
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
