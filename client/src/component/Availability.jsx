import { useState } from "react";
import { Button } from "@chakra-ui/react";

const Availability = () => {
  const [availability, setAvailability] = useState([
    { day: "Monday", start: "10:00 AM", end: "3:00 PM" },
    { day: "Tuesday", start: "All Day", end: "" },
  ]);

  const addSlot = () => {
    setAvailability([...availability, { day: "New Day", start: "", end: "" }]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Manage Availability</h1>
      <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
        {availability.map((slot, index) => (
          <div key={index} className="bg-white p-4 shadow rounded-lg">
            <div className="font-semibold">{slot.day}</div>
            <div>Start: {slot.start}</div>
            <div>End: {slot.end}</div>
          </div>
        ))}
      </div>
      <Button colorScheme="blue" className="mt-4" onClick={addSlot}>
        Add Slot
      </Button>
    </div>
  );
};

export default Availability;
