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
    } else {
      setInvite(data);
      setEvent(data?.events);
    }

    setLoading(false);
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!invite) return <p className="text-center mt-10">Invite not found</p>;

  const eventType = event?.event_type?.toLowerCase();
  const isWedding = eventType === "wedding";

  return (
    <div className="relative min-h-screen bg-secondary overflow-hidden">

      {isWedding && <Petals />}

      {/* 🔥 FIXED RESPONSIVE CONTAINER */}
      <motion.div
        className="relative z-10 w-full 
                   px-3 sm:px-4 
                   max-w-none sm:max-w-lg 
                   mx-auto 
                   flex flex-col gap-8 py-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* Invite Card */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {eventType === "communion" ? (
            <CommunionInviteCard name={invite.name} event={event} />
          ) : (
            <WeddingInviteCard name={invite.name} event={event} />
          )}
        </motion.div>

        {/* RSVP */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <RSVPSection invite={invite} setInvite={setInvite} />
        </motion.div>

        {/* Location */}
        <motion.div
          className="w-full"
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