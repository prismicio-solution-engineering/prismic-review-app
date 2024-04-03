"use client";
import { useState } from "react";
import { Button } from "../Button";

export const AgencyForm = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    const success = await onSubmit(name); // Call the passed onSubmit function

    if (success) {
      setMessage("Agency successfully added!");
      setName(""); // Reset the name field on successful submission
    } else {
      setMessage("Failed to add the agency. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-left my-16 bg-silver-light rounded-lg p-8 max-w-screen-sm shadow-sm">
      <h3 className="text-2xl font-sans font-bold text-gray-darker mb-6">
        Add New Agency
      </h3>
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
          {message && <div className="text-sm text-primary-green">{message}</div>}
        </div>
      </form>
    </div>
  );
};
