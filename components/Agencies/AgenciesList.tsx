"use client";
import { useState, useEffect } from "react";
import { addAgency, getAgencies } from "@/utils/agencies";
import { AgencyForm } from "./AgencyForm";

interface Agency {
  id: number;
  name: string;
}

export const AgenciesList = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    const fetchAgencies = async () => {
      const loadedAgencies = await getAgencies();
      setAgencies(loadedAgencies);
    };

    fetchAgencies();
  }, []);

  return (
    <div className="flex flex-col my-16 max-w-screen-xl mx-auto">
      <h3 className="text-2xl font-sans font-bold text-gray-darker mb-6">
        Agencies
      </h3>
      <AgencyForm onSubmit={addAgency} isLoading={false} />
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agencies.map((agency, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {agency.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {agency.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
