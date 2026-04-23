import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

import InviteCard from "../components/InviteCard";
import RSVPSection from "../components/RSVPSection";
import LocationCard from "../components/LocationCard";

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
      setLoading(false);
      return;
    }

    setInvite(data);
    setLoading(false);
  }

  async function handleRSVP(status, guestCount = 0) {
    const { error } = await supabase
      .from("invitees")
      .update({
        rsvp: status,
        guest_count: guestCount,
        responded_at: new Date(),
      })
      .eq("slug", slug);

    if (!error) fetchInvite();
  }

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!invite) return <h2 style={{ textAlign: "center" }}>Invite not found</h2>;

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      
      {/* 🔴 HEADER + COUNTDOWN */}
      <InviteCard name={invite.name} />

      {/* 🟢 RSVP SECTION */}
      <RSVPSection
        invite={invite}
        onSubmit={handleRSVP}
      />

      {/* 📍 LOCATION */}
      <LocationCard />

    </div>
  );
}