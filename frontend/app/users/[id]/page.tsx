"use client"
import getRequestClient from "@/app/lib/getRequestClient";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { auth } from "@/app/lib/client";

export default function UserDetails({
  params,
}: {
  params: { id: string };
}) {
  const { getToken, isSignedIn } = useAuth();
  const [data, setData] = useState<auth.UserData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      const token = await getToken();
      const client = getRequestClient(token ?? undefined);
      setData(await client.auth.GetUser(params.id));
      setLoading(false);
    };
    if (isSignedIn) getDashboardData();
  }, [isSignedIn]);

  if (!data || loading) {
    return <p>{loading ? "Loading..." : "User not found"}</p>;
  }

  return (
    <section>
      <h1>Detail for {data.username}</h1>
      <p>ID: {data.id}</p>
    </section>
  );
}
