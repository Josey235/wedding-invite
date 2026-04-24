import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

import InviteCard from "../components/InviteCard";
import RSVPSection from "../components/RSVPSection";
import LocationCard from "../components/LocationCard";
import Petals from "../components/Petals";

function Invite() {
  const { slug } = useParams();

  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvite();
  }, [slug]);

  async function fetchInvite() {
    const { data, error } = await supabase
      .from("invitees")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching invite:", error);
    } else {
      setInvite(data);
    }

    setLoading(false);
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!invite) return <p className="text-center mt-10">Invite not found</p>;

  return (
    <div className="relative min-h-screen bg-secondary overflow-hidden">

      {/* 🌸 ATMOSPHERE LAYER (FRONT PETALS) */}
      <Petals />

      {/* 📦 CONTENT LAYER */}
      <div className="relative z-10 flex flex-col items-center gap-6 py-10 px-4">

        <InviteCard name={invite.name} />

        <RSVPSection invite={invite} setInvite={setInvite} />

        <LocationCard />

      </div>

    </div>
  );
}

export default Invite;