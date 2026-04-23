function InviteCard({ name }) {
  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <h1 className="text-2xl text-pink-600">Welcome, {name}</h1>
      <p>You are invited to Rahul & Anjali's wedding</p>
    </div>
  );
}

export default InviteCard;