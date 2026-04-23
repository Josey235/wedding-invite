import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

export default function Invite() {
  const { slug } = useParams();

  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guestCount, setGuestCount] = useState(1);

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

    if (error) console.log(error);

    setInvite(data);
    setLoading(false);
  }

  async function handleRSVP(status) {
    const { error } = await supabase
      .from("invitees")
      .update({
        rsvp: status,
        guest_count: status === "attending" ? guestCount : 0,
        responded_at: new Date(),
      })
      .eq("slug", slug);

    if (!error) fetchInvite();
  }

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  if (!invite) return <h2 style={{ textAlign: "center" }}>Invite not found</h2>;

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      
      {/* HEADER */}
      <div className="card">
        <h1 style={{ color: "red", textAlign: "center" }}>
          Welcome, {invite.name}
        </h1>
        <p style={{ textAlign: "center" }}>
          You are invited to Rahul & Anjali's wedding
        </p>
      </div>

      {/* RSVP SECTION */}
      <div className="card">
        <h3 style={{ textAlign: "center", color: "red" }}>
          Will you be joining us?
        </h3>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button
            style={{ flex: 1, background: "green", color: "white" }}
            onClick={() => handleRSVP("attending")}
          >
            Yes 🎉
          </button>

          <button
            style={{ flex: 1, background: "gray", color: "white" }}
            onClick={() => handleRSVP("declined")}
          >
            No 😔
          </button>
        </div>

        {invite.rsvp === "attending" && (
          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <p>Number of guests</p>

            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setGuestCount(n)}>
                  {n}
                </button>
              ))}
            </div>

            <p style={{ marginTop: "10px", color: "green" }}>
              We’ll be expecting {guestCount} guest(s)
            </p>
          </div>
        )}
      </div>

      {/* LOCATION */}
      <div className="card">
        <h3 style={{ color: "red", textAlign: "center" }}>
          Wedding Ceremony
        </h3>

        <p style={{ textAlign: "center" }}>
          Sunday, 12th May 2026 <br />
          10:30 AM onwards <br />
          St. Mary's Church, Kochi
        </p>

        <button
          style={{
            width: "100%",
            background: "red",
            color: "white",
            marginTop: "10px",
          }}
          onClick={() =>
            window.open(
              "https://www.google.com/maps?q=St+Marys+Church+Kochi",
              "_blank"
            )
          }
        >
          View Location
        </button>
      </div>
    </div>
  );
}