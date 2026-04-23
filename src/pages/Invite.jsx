import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

import InviteCard from "../components/InviteCard";
import RSVPSection from "../components/RSVPSection";
import LocationCard from "../components/LocationCard";

function Invite() {
  const { slug } = useParams();

  const [guest, setGuest] = useState(null);

  useEffect(() => {
    const fetchGuest = async () => {
      const { data } = await supabase
        .from("invitees")
        .select("*")
        .eq("slug", slug)
        .single();

      setGuest(data);
    };

    fetchGuest();
  }, [slug]);

  if (!guest) return <div>Loading...</div>;

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <InviteCard name={guest.name} />
      <RSVPSection guest={guest} slug={slug} />
      <LocationCard />
    </div>
  );
}

export default Invite;