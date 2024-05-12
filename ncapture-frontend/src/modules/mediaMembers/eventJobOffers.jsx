import { useState, useEffect } from 'react';
import useAxios from '../../../hooks/axios';
import { toast } from 'react-toastify';

const EventJobOffer = () => {
    const [assignedEvents, setAssignedEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [message, setMessage] = useState('');
    const [approveRejectModalOpen, setApproveRejectModalOpen] = useState(false);
    const axiosInstance = useAxios();
    const [eventToApproveReject, setEventToApproveReject] = useState(null);
    const [remarks, setRemarks] = useState({ status: '', reason: '' });

    const fetchEvents = () => {
        axiosInstance
            .get('/assignments') // Update the endpoint as per your backend API
            .then((response) => {
                setAssignedEvents(response.data);
            })
            .catch((error) => {
                console.error('Error fetching assigned events:', error);
            });
    }
    useEffect(() => {
        // Fetch assigned events for the logged-in user
        fetchEvents();
    }, []);


    const handleApproveRejectEvent = async (remarksData) => {
        try {
            await axiosInstance.put(`/assignments/${eventToApproveReject}`, remarksData);
            fetchEvents();
            setApproveRejectModalOpen(false);
            toast.success("Event status updated successfully");
            setRemarks({ status: '', reason: '' });
        } catch (error) {
            console.error('Error updating event status:', error);
            toast.error("Error in updating event status");
        }
    };


    const openApproveRejectModal = (eventId) => {
        setEventToApproveReject(eventId);
        setApproveRejectModalOpen(true);
    };

    const closeApproveRejectModal = () => {
        setEventToApproveReject(null);
        setApproveRejectModalOpen(false);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Assigned Events</h2>
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-left dark:bg-meta-4">
                        <th className="py-4 px-3 font-medium text-black xl:pl-6">#</th>
                        <th className="py-4 px-3 font-medium text-black">Event Name</th>
                        <th className="py-4 px-3 font-medium text-black">Event Date</th>
                        <th className="py-4 px-3 font-medium text-black">Event Time</th>
                        <th className="py-4 px-3 font-medium text-black">Venue</th>
                        <th className="py-4 px-3 font-medium text-black">Status</th>
                        <th className="py-4 px-3 font-medium text-black">Role</th>
                        <th className="py-4 px-3 font-medium text-black">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assignedEvents.map((event, index) => (
                        <tr key={index} className={`border-b border-gray-200 dark:border-strokedark ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                            <td className="py-4 px-3 xl:pl-6">{index + 1}</td>
                            <td className="py-4 px-3">{event.event.eventName}</td>
                            <td className="py-4 px-3">{new Date(event.event.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                            <td className="py-4 px-3">{event.event.eventTime}</td>
                            <td className="py-4 px-3">{event.event.venue}</td>
                            <td className="py-4 px-3">
                                <span className={`inline-flex capitalize rounded-full py-1 px-3 text-sm font-medium ${event.status === 'accepted' ? 'bg-green-500 text-white' :
                                    event.status === 'declined' ? 'bg-red-500 text-white' :
                                        'bg-yellow-400 text-black'
                                    }`}>
                                    {event.status}
                                </span>
                            </td>
                            <td className="py-4 px-3">
                                <span className={`inline-flex rounded-full py-1 px-3 text-sm capitalize font-medium bg-orange-500 text-white`}>
                                    {event.role}
                                </span>
                            </td>
                            <td className="py-4 px-3">
                                {event.status === 'pending' ? (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => openApproveRejectModal(event._id)}
                                    >
                                        Accept/Decline Offer
                                    </button>
                                ) : (<button
                                    disabled={true}
                                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => openApproveRejectModal(event._id)}
                                >
                                    Accept/Decline Offer
                                </button>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Dialog box */}
            {approveRejectModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded w-1/3">
                        <h2 className="text-xl font-bold mb-4">Accept/Decline Offer</h2>
                        <textarea
                            className="w-full border border-gray-300 rounded p-2 mb-4"
                            placeholder="Write your message here..."
                            value={remarks.reason}
                            onChange={(e) => setRemarks({ ...remarks, reason: e.target.value })}
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    handleApproveRejectEvent({ status: 'accepted', reason: remarks.reason });
                                }}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mr-2 rounded"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => {
                                    handleApproveRejectEvent({ status: 'declined', reason: remarks.reason });
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
        </div>
    );
};

export default EventJobOffer;
