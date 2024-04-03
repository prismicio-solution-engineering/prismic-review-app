"use client";
import React, { useState, useEffect, Fragment } from "react";
import { Combobox, Transition, Listbox, Switch } from "@headlessui/react";
import { getAgencies, addAgency } from "@/utils/agencies";
import { Button } from "../Button";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/20/solid";

const frameworks = ["Next.js", "Nuxt.js", "SvelteKit"];
const reviewStatuses = [
  "To review",
  "In review",
  "Feedback to send",
  "Complete",
];

interface Agency {
  id: number;
  name: string;
}

interface ReviewSubmissionFormProps {
  onAgencySelect: (agencyId: number) => void;
  onFrameworkSelect: (framework: string) => void;
  onOverallCommentsChange: (comments: string) => void;
  onStatusChange: (status: string) => void;
  onIsPassedChange: (isPassed: boolean) => void;
  reviewType: "sample" | "full";
}

export const ReviewSubmissionForm: React.FC<ReviewSubmissionFormProps> = ({
  onAgencySelect,
  onFrameworkSelect,
  onOverallCommentsChange,
  onIsPassedChange,
  onStatusChange,
  reviewType,
}) => {
  const [isPassed, setIsPassed] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<string>("");
  const [overallComments, setOverallComments] = useState("");

  useEffect(() => {
    const fetchAgencies = async () => {
      const loadedAgencies = await getAgencies();
      setAgencies(loadedAgencies);
    };

    fetchAgencies();
  }, []);

  const handleAgencySelect = async (name: string) => {
    // Check if the agency already exists; if not, add it
    let agency = agencies.find((a) => a.name === name);

    if (!agency) {
      agency = await addAgency(name);
      if (agency) {
        setAgencies((prev) => [...prev, agency]);
      }
    } else {
      // If the agency already exists, update the selected agency and inform the parent
      setSelectedAgency(agency);
      onAgencySelect(agency.id);
    }
  };

  const handleFrameworkSelect = (framework: string) => {
    if (!frameworks.includes(framework)) {
      frameworks.push(framework);
    }
    setSelectedFramework(framework);
    onFrameworkSelect(framework);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onStatusChange(value);
  };

  const handleValidationChange = (value: boolean) => {
    setIsPassed(value);
    onIsPassedChange(value);
  };

  const handleOverallCommentChange = (value: string) => {
    setOverallComments(value);
    onOverallCommentsChange(value);
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const reviewData = {
  //     agency: selectedAgency?.name,
  //     review_type: reviewType,
  //     framework: selectedFramework,
  //     overall_comments: overallComments,
  //     is_passed: isPassed,
  //     status: status,
  //   };
  // };

  return (
    <div className="max-w-screen-xl mx-auto my-16">
      <form
        // onSubmit={handleSubmit}
        className="flex flex-col gap-8 max-w-screen-md"
      >
        <div className="flex flex-row gap-10">
          <div className="relative">
            <Combobox
              as="div"
              value={selectedAgency}
              // onChange={setSelectedAgency}
              onChange={(agency: string) => handleAgencySelect(agency?.name)}
            >
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-base border-silver-light sm:text-sm">
                <Combobox.Label>Agency</Combobox.Label>
                <Combobox.Input
                  as="input"
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-darker focus:ring-0"
                  onChange={(agency: Agency) => setSelectedAgency(agency)}
                  displayValue={(agency: Agency) => agency?.name || "Agency"}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-silver-darker"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white p-2 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                  {agencies.map((agency) => (
                    <Combobox.Option
                      key={agency.id}
                      value={agency}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-tertiary-green" : "text-gray-900"
                        }`
                      }
                    >
                      {agency.name}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Transition>
            </Combobox>
          </div>
          <div className="relative">
            <Combobox
              as="div"
              value={selectedFramework}
              onChange={(framework: string) => handleFrameworkSelect(framework)}
            >
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-base sm:text-sm border-silver-light">
                <Combobox.Label>Framework</Combobox.Label>
                <Combobox.Input
                  as="input"
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  onChange={(event) => setSelectedFramework(event.target.value)}
                  displayValue={(framework: string) => framework}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-silver-darker"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white p-2 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {frameworks.map((framework, idx) => (
                    <Combobox.Option
                      key={idx}
                      value={framework}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-tertiary-green " : "text-gray-dark"
                        }`
                      }
                    >
                      {framework}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Transition>
            </Combobox>
          </div>
          <div className="relative">
            <Listbox
              value={status}
              onChange={(value) => handleStatusChange(value)}
            >
              <div className="relative w-full cursor-default rounded-lg bg-white text-left shadow-md  border-silver-light sm:text-sm">
                <Listbox.Label>Status</Listbox.Label>
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm z-10">
                  <span className="block truncate">{status}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white p-2 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {reviewStatuses.map((status) => (
                      <Listbox.Option
                        key={status}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-sky-100" : "text-gray-900"}`
                        }
                        value={status}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block ${selected ? "font-medium" : "font-normal"}`}
                            >
                              {status}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-green">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        <textarea
          value={overallComments}
          onChange={(e) => handleOverallCommentChange(e.target.value)}
          className="w-full rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-silver-darker sm:text-sm border-silver-light"
        />
        <div className="relative">
          <Switch.Group>
            <div className="flex items-center">
              <Switch.Label className="mr-4">Validation</Switch.Label>
              <Switch
                checked={isPassed}
                onChange={(value) => handleValidationChange(value)}
                className={`${
                  isPassed ? "bg-primary-green" : "bg-primary-orange"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Validation</span>
                <span
                  className={`${
                    isPassed ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </Switch.Group>
        </div>
        {/* <Button submit color="black" className="w-fit">
          Submit Review
        </Button> */}
      </form>
    </div>
  );
};
