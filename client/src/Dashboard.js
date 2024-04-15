import React from 'react';

const Dashboard = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.displayName}!</h1>
      {/* Add any dashboard content here */}
    </div>
  );
}

export default Dashboard;
