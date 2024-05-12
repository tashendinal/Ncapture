import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../../hooks/axios';

const UpdateEvent = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const fetchEventData = async () => {
    try {
      const response = await axiosInstance.get(`/event/${eventId}`);
      setEventData(response.data.event);
    } catch (error) {
      console.error('Error fetching event data:', error);
      toast.error('Error fetching event data');
    }
  };

  useEffect(() => {
    console.log('Fetching event data...');

    fetchEventData();
  }, [eventId]);

  const validationSchema = Yup.object().shape({
    eventName: Yup.string().required('Event name is required'),
    eventDate: Yup.date().required('Event date is required'),
    eventTime: Yup.string().required('Event time is required'),
    venue: Yup.string().required('Venue is required'),
    invites: Yup.array().of(Yup.string()),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axiosInstance.put(`/event/${eventId}`, values);
      console.log(response);

      console.log('Event updated successfully');
      toast.success("Event updated successfully");
      navigate("/events")
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Update Event</h2>
      {eventData && (
        <Formik
          initialValues={{
            eventName: eventData.eventName,
            eventDate: eventData.eventDate,
            eventTime: eventData.eventTime,
            venue: eventData.venue,
            invites: eventData.invites || [], // Assuming invites is an array of strings
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="eventName" className="block text-gray-700 mb-2">Event Name</label>
                <Field
                  type="text"
                  id="eventName"
                  name="eventName"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter event name"
                />
                <ErrorMessage name="eventName" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mb-4">
                <label htmlFor="eventDate" className="block text-gray-700 mb-2">Event Date</label>
                <Field
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="eventDate" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mb-4">
                <label htmlFor="eventTime" className="block text-gray-700 mb-2">Event Time</label>
                <Field
                  type="time"
                  id="eventTime"
                  name="eventTime"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="eventTime" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mb-4">
                <label htmlFor="venue" className="block text-gray-700 mb-2">Venue</label>
                <Field
                  type="text"
                  id="venue"
                  name="venue"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter venue"
                />
                <ErrorMessage name="venue" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mb-4">
                <label htmlFor="invitee" className="block text-gray-700 mb-2">Invitee</label>
                <FieldArray name="invites">
                  {({ push, remove }) => (
                    <>
                      <div className='my-5'>
                        {values.invites.map((invitee, index) => (
                          <div key={index} className="flex justify-between items-center mt-2 bg-green-100 px-3 py-2 rounded-md">
                            <span>{invitee}</span>
                            <button
                              type="button"
                              onClick={() => {
                                remove(index);
                                const newInvites = [...values.invites];
                                newInvites.splice(index, 1);
                                setEventData((prevState) => ({
                                  ...prevState,
                                  invites: newInvites,
                                }));
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex">
                        <Field
                          type="text"
                          id="invitee"
                          name="invitee"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 mr-2"
                          placeholder="Enter invitee name or email"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (values.invitee.trim() !== '') {
                              push(values.invitee.trim());
                              const newInvites = [...values.invites, values.invitee.trim()];
                              setEventData((prevState) => ({
                                ...prevState,
                                invites: newInvites,
                              }));
                              setFieldValue('invitee', '');
                            }
                          }}
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </>
                  )}
                </FieldArray>
                <ErrorMessage name="invites" component="div" className="text-red-500 mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isSubmitting ? 'Updating...' : 'Update Event'}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdateEvent;