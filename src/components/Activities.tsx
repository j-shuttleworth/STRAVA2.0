import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface Activity {
  id: number;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  start_date: string;
}

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchActivities = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');

      if (!code) {
        setError('No authorization code found');
        setLoading(false);
        return;
      }

      try {
        const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
          client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
          client_secret: import.meta.env.VITE_STRAVA_CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
        });

        const { access_token } = tokenResponse.data;

        const activitiesResponse = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        setActivities(activitiesResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch activities');
        setLoading(false);
      }
    };

    fetchActivities();
  }, [location]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Recent Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} className="bg-white shadow rounded-lg p-4 mb-4">
            <h3 className="text-xl font-semibold">{activity.name}</h3>
            <p>Type: {activity.type}</p>
            <p>Distance: {(activity.distance / 1000).toFixed(2)} km</p>
            <p>Duration: {Math.floor(activity.moving_time / 60)} minutes</p>
            <p>Date: {new Date(activity.start_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;