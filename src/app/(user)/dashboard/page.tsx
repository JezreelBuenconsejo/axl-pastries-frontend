"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";

const CustomerDashboard = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8080/user/details",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data)
        setUserDetails({
          username: response.data.username || "",
          firstName: response.data.first_name || "",
          lastName: response.data.last_name || "",
          email: response.data.email || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        router.push("/login");
      }
    };

    fetchUserDetails();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome, {userDetails.firstName} {userDetails.lastName}
      </h1>
      <p className="text-center text-lg mb-4">Username: {userDetails.username}</p>
      <p className="text-center text-lg mb-4">Email: {userDetails.email}</p>
      <div className="text-center mt-6">
        <Button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
