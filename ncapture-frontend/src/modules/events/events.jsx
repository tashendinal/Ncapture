import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever, MdVisibility } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { toast } from "react-toastify";
import useAxios from "../../../hooks/axios";
import { getUserRole } from "../../utils/auth";

const Events = () => {
  const axiosInstance = useAxios();
  const [events, setEvents] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [approveRejectModalOpen, setApproveRejectModalOpen] = useState(false);
  const [eventToApproveReject, setEventToApproveReject] = useState(null);
  const [remarks, setRemarks] = useState({ status: "", statusMessage: "" });
  const [userRole, setUserRole] = useState(getUserRole());
  const [membersModalOpen, setMembersModalOpen] = useState(false);
  const [assignedMembers, setAssignedMembers] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get("/events");
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchAssignedMembers = async (eventId) => {
    try {
      const response = await axiosInstance.get(
        `/events/${eventId}/assignments`
      );
      console.log("eventId", eventId);
      console.log("areaasd", response);
      setAssignedMembers(response.data);
    } catch (error) {
      console.error("Error fetching assigned members:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      await axiosInstance.delete(`/event/${eventId}`);
      fetchEvents();
      setDeleteModalOpen(false);
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Error in Deleting Event");
    }
  };

  const handleApproveRejectEvent = async (remarksData) => {
    try {
      await axiosInstance.put(`/event/${eventToApproveReject}`, remarksData);
      fetchEvents();
      setApproveRejectModalOpen(false);
      toast.success("Event status updated successfully");
      setRemarks({ status: "", statusMessage: "" });
    } catch (error) {
      console.error("Error updating event status:", error);
      toast.error("Error in updating event status");
    }
  };

  const openDeleteModal = (eventId) => {
    setEventToDelete(eventId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setEventToDelete(null);
    setDeleteModalOpen(false);
  };

  const openApproveRejectModal = (eventId) => {
    setEventToApproveReject(eventId);
    setApproveRejectModalOpen(true);
  };

  const closeApproveRejectModal = () => {
    setEventToApproveReject(null);
    setApproveRejectModalOpen(false);
  };

  const openMembersModal = (eventId) => {
    fetchAssignedMembers(eventId);
    setMembersModalOpen(true);
  };

  const closeMembersModal = () => {
    setMembersModalOpen(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="rounded-sm bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6 xl:pb-2">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left dark:bg-meta-4">
                <th className="py-4 px-3 font-medium text-black xl:pl-6">#</th>
                <th className="py-4 px-3 font-medium text-black">Event Name</th>
                <th className="py-4 px-3 font-medium text-black">Requested By</th>
                <th className="py-4 px-3 font-medium text-black">Event Date</th>
                <th className="py-4 px-3 font-medium text-black">Event Time</th>
                <th className="py-4 px-3 font-medium text-black">Venue</th>
                <th className="py-4 px-3 font-medium text-black">Status</th>
                <th className="py-4 px-3 font-medium text-black">
                  Status Message
                </th>
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
                    <td className="py-4 px-3">{event.createdBy.firstName}</td>
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
                  <td className="py-4 px-3">{event.statusMessage}</td>
                  <td className="py-4 px-3">
                    <div className="flex items-center space-x-3.5">
                      {(userRole === "staff" ||
                        userRole === "administrator") && (
                        <button
                          onClick={() => openApproveRejectModal(event._id)}
                          className="text-white bg-gray-400 hover:bg-gray-500 rounded-md px-3 py-2"
                          title="Approve/Reject"
                        >
                          Approve/Reject
                        </button>
                      )}
                      <button
                        onClick={() => openDeleteModal(event._id)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete"
                      >
                        <MdDeleteForever className="text-2xl" />
                      </button>
                      <button
                        onClick={() => openMembersModal(event._id)}
                        className="text-blue-500 hover:text-blue-600"
                        title="View Members"
                      >
                        <MdVisibility className="text-2xl" />
                      </button>
                      <Link
                        to={`/update-event/${event._id}`}
                        className="text-blue-500 hover:text-blue-600"
                        title="Update"
                      >
                        <FaPencil className="text-xl" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-md p-8 max-w-md">
            <p className="text-xl font-semibold mb-4">
              Are you sure you want to delete this event?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => handleDeleteEvent(eventToDelete)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mr-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {approveRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-md p-8 max-w-md">
            <p className="text-xl font-semibold mb-4">
              Approve or Reject this event
            </p>
            <label htmlFor="remarks">Remarks:</label>
            <textarea
              id="remarks"
              rows={5}
              value={remarks.text}
              onChange={(e) =>
                setRemarks({ ...remarks, statusMessage: e.target.value })
              }
              className="w-96 border border-gray-300 rounded-md p-2 mb-4"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  handleApproveRejectEvent({
                    status: "approved",
                    statusMessage: remarks.statusMessage,
                  });
                }}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mr-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  handleApproveRejectEvent({
                    status: "rejected",
                    statusMessage: remarks.statusMessage,
                  });
                }}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Reject
              </button>
              <button
                onClick={closeApproveRejectModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {membersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-md p-5">
            <p className="text-xl font-semibold mb-4">Assigned Members</p>

            <table className="w-full border-collapse my-5">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="py-2 px-4 font-medium">Name</th>
                  <th className="py-2 px-4 font-medium">Email</th>
                  <th className="py-2 px-4 font-medium">Phone Number</th>
                  <th className="py-2 px-4 font-medium">Role</th>
                  <th className="py-2 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                { assignedMembers.length > 0 ? assignedMembers.map((assignment, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="py-2 px-4">
                      {assignment.member.firstName} {assignment.member.lastName}
                    </td><td className="py-2 px-4">
                      {assignment.member.email} 
                    </td>
                    <td className="py-2 px-4">
                      {assignment.member.phoneNumber} 
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
                  </tr>
                )) : <p>No Assignemnt Found for this Event</p>}
              </tbody>
            </table>

            <div className="flex justify-end">
              <button
                onClick={closeMembersModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
