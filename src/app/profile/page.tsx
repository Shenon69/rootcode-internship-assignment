"use client"

import { getUserDetails } from "@/utils/getUserDetails";
import { useEffect, useState } from "react";
import { IProfile } from "@/types/profile";

export default function Profile() {
  const [user, setUser] = useState<IProfile | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const userData = await getUserDetails();
    setUser(userData);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full shadow-lg rounded-lg p-6 border border-white">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Name</h2>
            <p>{user.name}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Username</h2>
            <p>{user.username}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <p>{user.email}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Phone</h2>
            <p>{user.phone}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Company</h2>
            <p>{user.company.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
