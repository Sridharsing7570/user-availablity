const Dashboard = () => {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="mt-4">
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
            <ul className="mt-2">
              <li>Session with John Doe on Monday 10:00 AM - 10:30 AM</li>
              {/* You can add more items dynamically from API data */}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  