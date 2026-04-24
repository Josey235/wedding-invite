import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { motion } from "framer-motion";

import WeddingInviteCard from "../components/wedding/WeddingInviteCard";
import CommunionInviteCard from "../components/communion/CommunionInviteCard";
import RSVPSection from "../components/shared/RSVPSection";
import LocationCard from "../components/shared/LocationCard";
import Petals from "../components/wedding/Petals";

function Invite() {
  const { slug } = useParams();

  const [invite, setInvite] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvite();
  }, [slug]);

  async function fetchInvite() {
    const { data, error } = await supabase
      .from("invitees")
      .select(`
        *,
        events:event_id (*)
      `)
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("ERROR 👉", error);
      setLoading(false);
      return;
    }

    if (!data || !data.events) {
      console.error("🚨 Event not linked properly");
      setLoading(false);
      return;
    }

    setInvite(data);
    setEvent(data.events);
    setLoading(false);
  }

  // 🔥 Loading
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // 🔥 Fail-safe
  if (!invite || !event) {
    return (
      <p className="text-center mt-10 text-red-500">
        Invalid invite or event not found
      </p>
    );
  }

  // 🔥 Decide UI type FIRST (clean logic)
  const isCommunion = event.event_type === "communion";
  const isWedding = event.event_type === "wedding";

  return (
    <div className="relative min-h-screen bg-secondary overflow-hidden">

      {/* 🌸 Only show petals for wedding */}
      {isWedding && <Petals />}

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 py-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* Invite Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isCommunion && (
            <CommunionInviteCard
              name={invite.name}
              event={event}
            />
          )}

          {isWedding && (
            <WeddingInviteCard
              name={invite.name}
              event={event}
            />
          )}
        </motion.div>

        {/* RSVP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <RSVPSection invite={invite} setInvite={setInvite} />
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <LocationCard event={event} />
        </motion.div>

      </motion.div>
    </div>
  );
}

export default Invite;