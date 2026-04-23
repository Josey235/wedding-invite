import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

export default function Invite() {
  const { slug } = useParams();

  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvite();
  }, [slug]);

  async function fetchInvite() {
    setLoading(true);

    const { data, error } = await supabase
      .from("invitees")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.log("ERROR:", error);
    }

    setInvite(data);
    setLoading(false);
  }

  // ✅ 1. Loading state (IMPORTANT)
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  // ✅ 2. Not found (ONLY after loading)
  if (!invite) {
    return <h2 style={{ textAlign: "center" }}>Invite not found</h2>;
  }

  // ✅ 3. Valid invite
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {invite.name}</h1>
      <p>You are invited to Rahul & Anjali's wedding</p>

      <p>Status: {invite.rsvp || "Not responded"}</p>
      <p>Guests: {invite.guest_count || 0}</p>
    </div>
  );
}