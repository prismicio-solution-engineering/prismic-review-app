"use client";
import { useState } from "react";
import { Button } from "../Button";
import Notification from "../Notification";

export const AgencyForm = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState("");
  // const [message, setMessage] = useState("");
  const [notification, setNotification] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await onSubmit(name); // Call the passed onSubmit function

    const {error} = JSON.parse(result)

    if (!error?.message) {
      setNotification({
        type: "success",
        message: "Agency successfully added!",
      });
      setName(""); // Reset the name field on successful submission
    } else {
      setNotification({
        type: "error",
        message: `Failed to add the agency : ${error.details}`,
      });
    }

  };

  return (
    <div className="flex flex-col items-left my-16 bg-silver-light rounded-lg p-8 max-w-screen-sm shadow-sm">
      <h3 className="text-2xl font-sans font-bold text-gray-darker mb-6">
        Add New Agency
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
            Add Agency
          </Button>
          </div>
          {/* {message && <div className="text-sm text-primary-green">{message}</div>} */}
        </div>
      </form>
    </div>
  );
};
