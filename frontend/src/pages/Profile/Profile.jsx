function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "40px" }}>
      <h1>My Profile</h1>

      <h2>Name: {user?.name}</h2>

      <h3>Email: {user?.email}</h3>

      <h3>Role: {user?.role}</h3>
    </div>
  );
}

export default Profile;