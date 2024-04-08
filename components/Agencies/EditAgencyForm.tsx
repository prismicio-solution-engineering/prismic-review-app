"use client";
import { useState } from "react";
import { Button } from "../Button";
import Notification from "../Notification";

export const EditAgencyForm = ({ agencyData, onSubmit, isLoading }) => {
  const [name, setName] = useState(agencyData.name);
  const [notification, setNotification] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      name: name,
    };

    const success = await onSubmit(agencyData.id, updateData);

    if (success) {
      setNotification({
        type: "success",
        message: "Agency successfully edited!",
      });
    } else {
      setNotification({
        type: "success",
        message: "Failed to edit the agency. Check console",
      });
    }
  };

  return (
    <div className="flex flex-col items-left my-16  max-w-screen-sm shadow-sm">
      <h3 className="text-2xl font-sans font-bold text-gray-darker mb-6">
        Edit Agency
      </h3>
      {notification.message && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 w-full">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Agency name"
              className="p-4 text-gray-darker bg-white rounded-lg border-2 border-gray-darker flex-grow"
              disabled={isLoading}
            />
            <Button
              submit
              color="black"
              variant="primary"
              disabled={isLoading}
              className="w-fit"
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
