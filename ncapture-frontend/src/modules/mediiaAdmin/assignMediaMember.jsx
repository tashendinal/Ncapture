import { useState, useEffect } from "react";
import useAxios from "../../../hooks/axios";

const AssignMediaMember = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mediaMembers, setMediaMembers] = useState([]);
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState({});
  const [selectedRole, setSelectedRole] = useState();
  const axiosInstance = useAxios();

  useEffect(() => {
    console.log("selectedEvent", selectedEvent);
  }, [selectedEvent]);

  useEffect(() => {
    // Fetch approved events
    axiosInstance
      .get("/events", { params: { status: "approved" } })
      .then((response) => {
        setEvents(response.data.events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });

    // Fetch media members
    axiosInstance
      .get("/users", { params: { role: "mediaMember" } })
      .then((response) => {
        setMediaMembers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching media members:", error);
      });
  }, []);

  const handleAssignClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);

    // Fetch assigned media members for the selected event
    axiosInstance
      .get(`/events/${event._id}/assignments`)
      .then((response) => {
        console.log("Assigning", response.data);
        setAssignedMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assigned members:", error);
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setAssignedMembers([]);
  };

  const handleAddMember = () => {
    const newAssignment = {
      member: selectedMember,
      role: selectedRole,
      status: "pending",
    };
    setAssignedMembers([...assignedMembers, newAssignment]);
  };

  const handleRemoveMember = (index) => {
    const updatedAssignments = [...assignedMembers];
    updatedAssignments.splice(index, 1);
    setAssignedMembers(updatedAssignments);
  };

  const handleSave = () => {
    const assignmentData = assignedMembers.map(({ member, role, status }) => ({
      member: member._id,
      role,
      status,
    }));

    axiosInstance
      .post(`/events/${selectedEvent._id}/assign`, assignmentData)
      .then((response) => {
        console.log("Media members assigned successfully");
        handleModalClose();
      })
      .catch((error) => {
        console.error("Error assigning media members:", error);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Assign Media Members</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left dark:bg-meta-4">
            <th className="py-4 px-3 font-medium text-black xl:pl-6">#</th>
            <th className="py-4 px-3 font-medium text-black">Event Name</th>
            <th className="py-4 px-3 font-medium text-black">Event Date</th>
            <th className="py-4 px-3 font-medium text-black">Event Time</th>
            <th className="py-4 px-3 font-medium text-black">Venue</th>
            <th className="py-4 px-3 font-medium text-black">Status</th>
            <th className="py-4 px-3 font-medium text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 dark:border-strokedark"
            >
              <td className="py-4 px-3 xl:pl-6">{index + 1}</td>
              <td className="py-4 px-3">{event.eventName}</td>
              <td className="py-4 px-3">
                {new Date(event.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="py-4 px-3">{event.eventTime}</td>
              <td className="py-4 px-3">{event.venue}</td>
              <td className="py-4 px-3">
                <p
                  className={`inline-flex rounded-full py-1 px-4 text-sm font-medium ${
                    event.status === "approved"
                      ? "bg-green-500 text-white"
                      : event.status === "rejected"
                      ? "bg-red-600 text-white"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {event.status}
                </p>
              </td>
              <td className="py-4 px-3">
                <div className="flex items-center space-x-3.5">
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleAssignClick(event)}
                    >
                      Assign
                    </button>
                  </td>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Assign Media Members</h2>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={handleModalClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Media member selection */}
            <div className="mb-4">
              <label htmlFor="formMember" className="block text-sm font-bold">
                Media Member
              </label>
              <select
                id="formMember"
                className="w-full border text-black border-gray-300 rounded py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
                value={selectedMember._id}
                onChange={(e) => {
                  const selectedMember = mediaMembers.find(
                    (member) => member._id === e.target.value
                  );
                  setSelectedMember(selectedMember);
                }}
              >
                <option value="">Select Media Member</option>
                {mediaMembers.map((member) => (
                  <option
                    key={member._id}
                    value={member._id}
                    className="text-black"
                  >
                    {member.firstName + " " + member.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Role selection */}
            <div className="mb-4">
              <label htmlFor="formRole" className="block text-sm font-bold">
                Role
              </label>
              <select
                id="formRole"
                className="w-full border text-black border-gray-300 rounded py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="videographer">Videographer</option>
                <option value="photographer">Photographer</option>
                <option value="announcer">Announcer</option>
              </select>
            </div>

            {/* Add button */}
            <div className="mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddMember}
              >
                Add
              </button>
            </div>

            <div>
              {selectedEvent.requiredEventRoles.map((role) => (
                <div key={role}>
                  <p>The <span className="italic font-medium text-red-600 ">{role}*</span> is required for this event</p>
                </div>
              ))}
            </div>

            {assignedMembers.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">
                  Assigned Media Members
                </h3>
                <table className="w-full border-collapse my-5">
                  <thead>
                    <tr className="bg-gray-200 text-gray-800">
                      <th className="py-2 px-4 font-medium">Name</th>
                      <th className="py-2 px-4 font-medium">Role</th>
                      <th className="py-2 px-4 font-medium">Status</th>
                      <th className="py-2 px-4 font-medium">Reason</th>
                      <th className="py-2 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedMembers.map((assignment, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        <td className="py-2 px-4">
                          {assignment.member.firstName}{" "}
                          {assignment.member.lastName}
                        </td>
                        <td className="py-2 px-4">{assignment.role}</td>
                        <td className="py-2 px-4">
                          <div
                            className={`py-1 px-3 font-medium text-center rounded-full text-sm ${
                              assignment.status === "accepted"
                                ? "bg-green-200 text-green-800"
                                : assignment.status === "declined"
                                ? "bg-red-200 text-red-800"
                                : "bg-yellow-200 text-gray-800"
                            }`}
                          >
                            {assignment.status}
                          </div>
                        </td>
                        <td className="py-2 px-4">{assignment.reason}</td>
                        <td className="py-2 px-4 text-center">
                          <button
                            className="text-red-500 hover:text-red-700 text-center"
                            onClick={() => handleRemoveMember(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-end">
              <button
                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 mr-2 rounded"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignMediaMember;
