import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import { Header, List } from 'semantic-ui-react';

interface Activity {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  city: string;
  venue: string;
}

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5001/api/activities')
      .then(response => {
        console.log(response);
        setActivities(response.data);
      })
  }, []);

  return (
    <>
      <Header as='h2' icon='users' content='Reactivities' />

      <List>
        {activities.map((activity) => (
          <List.Item key={activity.id}>
            {activity.title} {activity.description}
          </List.Item>
        ))}
      </List>

    </>
  )
}

export default App
