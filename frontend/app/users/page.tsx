"use client"
import getRequestClient from "@/app/lib/getRequestClient";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { auth } from "../lib/client";
import Link from "next/link";

export default function Users() {
  const { getToken, isSignedIn } = useAuth();
  const [data, setData] = useState<auth.GetUserResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      const token = await getToken();
      const client = getRequestClient(token ?? undefined);
      setData(await client.auth.GetUsers());
      setLoading(false);
    };
    if (isSignedIn) getDashboardData();
  }, [isSignedIn]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No users found</p>;
  }

  return (
    <section>
      <h1>Users List</h1>
      <p>Click a user to view details</p>
      <br />
      <ul>
        {data.Data.map((user) => (
          <li key={user.id}>
            <Link href="/users/[id]" as={`/users/${user.id}`}>
              {user.username} ({user.id})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
