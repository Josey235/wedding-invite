import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

function Dashboard() {
  const { eventId } = useParams();

  const [name, setName] = useState("");
  const [guests, setGuests] = useState([]);

  const fetchGuests = async () => {
    const { data, error } = await supabase
      .from("invitees")
      .select("*")
      .eq("event_id", eventId)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("FETCH ERROR:", error);
      return;
    }

    setGuests(data || []);
  };

  useEffect(() => {
    if (!eventId) return;

    fetchGuests();

    const channel = supabase
      .channel("invitees-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "invitees",
        },
        () => {
          fetchGuests();
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [eventId]);

  const createInvite = async () => {
    if (!name.trim()) return alert("Enter a name");

    const slug =
      name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

    const { error } = await supabase.from("invitees").insert([
      {
        name,
        slug,
        rsvp: null,
        guest_count: 0,
        event_id: eventId,
      },
    ]);

    if (error) {
      console.error("INSERT ERROR FULL:", error);
      alert(error.message);
      return;
    }

    alert("Invite created!");
    setName("");
    fetchGuests();
  };

  // ✅ PERSONAL LINK
  const copyLink = (slug) => {
    const url = `${window.location.origin}/invite/${slug}`;
    navigator.clipboard.writeText(url);
    alert("Personal link copied!");
  };

  // ✅ GROUP LINK
  const copyGroupLink = (slug) => {
    const url = `${window.location.origin}/invite/${slug}?mode=group`;
    navigator.clipboard.writeText(url);
    alert("Group link copied!");
  };

  // 🔥 FIXED COMMON LINK (WITH FEEDBACK)
  const copyCommonLink = async () => {
    try {
      const url = `${window.location.origin}/invite/event/${eventId}`;
      await navigator.clipboard.writeText(url);
      alert("Common invite link copied!");
    } catch (err) {
      console.error("Clipboard error:", err);
      alert("Failed to copy link");
    }
  };

  const openInvite = (slug) => {
    window.open(`/invite/${slug}`, "_blank");
  };

  const totalGuests = guests.length;
  const attending = guests.filter((g) => g.rsvp === "attending");
  const declined = guests.filter((g) => g.rsvp === "declined");

  const totalPeople = attending.reduce(
    (sum, g) => sum + (g.guest_count || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-6">
        Admin Dashboard
      </h1>

      <p className="text-center text-sm text-gray-500 mb-2">
        Event ID: {eventId}
      </p>

      {/* 🔥 COMMON LINK BUTTON */}
      <div className="text-center mb-4">
        <button
          onClick={copyCommonLink}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Copy Common Invite Link
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-6">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p>Total Guests</p>
          <h2 className="text-xl font-bold">{totalGuests}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p>Attending</p>
          <h2 className="text-xl font-bold text-green-600">
            {attending.length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p>Declined</p>
          <h2 className="text-xl font-bold text-gray-600">
            {declined.length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p>Total People</p>
          <h2 className="text-xl font-bold text-pink-600">
            {totalPeople}
          </h2>
        </div>
      </div>

      {/* CREATE */}
      <div className="bg-white p-5 rounded-xl shadow max-w-md mx-auto text-center mb-6">
        <h2 className="font-semibold mb-3">Create Invite</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Guest name"
          className="border p-2 rounded w-full mb-3"
        />

        <button
          onClick={createInvite}
          className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
        >
          Generate Invite
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-5 rounded-xl shadow max-w-5xl mx-auto overflow-x-auto">
        <h2 className="font-semibold mb-4">Guest List</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Name</th>
              <th>Status</th>
              <th>Guests</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {guests.map((g) => (
              <tr key={g.id} className="border-b">
                <td className="py-2">{g.name}</td>

                <td>
                  {g.rsvp === "attending" && (
                    <span className="text-green-600">Attending</span>
                  )}
                  {g.rsvp === "declined" && (
                    <span className="text-gray-500">Declined</span>
                  )}
                  {!g.rsvp && (
                    <span className="text-yellow-600">Pending</span>
                  )}
                </td>

                <td>{g.guest_count || 0}</td>

                <td className="flex gap-2 py-2 flex-wrap">
                  <button
                    onClick={() => openInvite(g.slug)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Open
                  </button>

                  <button
                    onClick={() => copyLink(g.slug)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Copy Personal
                  </button>

                  <button
                    onClick={() => copyGroupLink(g.slug)}
                    className="bg-purple-500 text-white px-3 py-1 rounded"
                  >
                    Copy Group
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;