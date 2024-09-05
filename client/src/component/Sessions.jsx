import { useState } from "react";
import { Button } from "@chakra-ui/react";

const Sessions = () => {
  const [sessionType, setSessionType] = useState("one-on-one");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Schedule a Session</h1>
      <div className="mt-4 bg-white p-4 shadow rounded-lg">
        <div className="flex flex-col space-y-4">
          <label>
            Select User: <input type="text" placeholder="User's email" />
          </label>
          <label>
            Select Slot: <input type="time" />
          </label>
          <label>
            Session Type:
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
            >
              <option value="one-on-one">One-on-One</option>
              <option value="multi-participant">Multi-Participant</option>
            </select>
          </label>
          <Button colorScheme="blue">Schedule Session</Button>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
