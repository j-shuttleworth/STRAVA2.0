import React from 'react';
import { Activity } from 'lucide-react';

const Home: React.FC = () => {
  const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
  const redirectUri = `${window.location.origin}/activities`;
  const scope = 'activity:read_all';

  const handleConnect = () => {
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <Activity className="w-24 h-24 text-orange-500 mb-4" />
      <h1 className="text-4xl font-bold mb-4">Welcome to Strava Activity Viewer</h1>
      <p className="text-xl mb-8">Connect your Strava account to view your recent activities</p>
      <button
        onClick={handleConnect}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
      >
        Connect with Strava
      </button>
    </div>
  );
};

export default Home;