import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useAxios from '../../../hooks/axios';

const CreateEvent = () => {
  const axiosInstance = useAxios();
  const initialValues = {
    eventName: '',
    eventDate: '',
    eventTime: '',
    venue: '',
    invites: [],
    requiredEventRoles: [], // Adding requiredEventRoles field
  };

  const validationSchema = Yup.object().shape({
    eventName: Yup.string().required('Event name is required'),
    eventDate: Yup.date().required('Event date is required'),
    eventTime: Yup.string().required('Event time is required'),
    venue: Yup.string().required('Venue is required'),
    invites: Yup.array().of(Yup.string()),
    requiredEventRoles: Yup.array().of(Yup.string()), // Adding validation for requiredEventRoles
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('values', values);

      const response = await axiosInstance.post('/event', values);
      console.log(response);

      console.log('Login successful');
      toast.success('Event Created Successfully');
      // resetForm();
    } catch (error) {
      console.error('Login error:', error.response.data.message);
      toast.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            {/* Event Name */}
            <div className="mb-4">
              <label htmlFor="eventName" className="block text-gray-700 mb-2">
                Event Name
              </label>
              <Field
                type="text"
                id="eventName"
                name="eventName"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter event name"
              />
              <ErrorMessage name="eventName" component="div" className="text-red-500 mt-1" />
            </div>
            {/* Event Date */}
            <div className="mb-4">
              <label htmlFor="eventDate" className="block text-gray-700 mb-2">
                Event Date
              </label>
              <Field
                type="date"
                id="eventDate"
                name="eventDate"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="eventDate" component="div" className="text-red-500 mt-1" />
            </div>
            {/* Event Time */}
            <div className="mb-4">
              <label htmlFor="eventTime" className="block text-gray-700 mb-2">
                Event Time
              </label>
              <Field
                type="time"
                id="eventTime"
                name="eventTime"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="eventTime" component="div" className="text-red-500 mt-1" />
            </div>
            {/* Venue */}
            <div className="mb-4">
              <label htmlFor="venue" className="block text-gray-700 mb-2">
                Venue
              </label>
              <Field
                type="text"
                id="venue"
                name="venue"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter venue"
              />
              <ErrorMessage name="venue" component="div" className="text-red-500 mt-1" />
            </div>
            {/* Invitees List */}
            <div className="mb-4">
              <label htmlFor="invitee" className="block text-gray-700 mb-2">
                Invitee
              </label>
              <FieldArray name="invites">
                {({ push, remove }) => (
                  <>
                    <div className='my-5'>
                      {values.invites.map((invitee, index) => (
                        <div key={index} className="flex justify-between items-center mt-2 bg-green-100 px-3 py-2 rounded-md">
                          <span>{invitee}</span>
                          <button
                            type="button"
                            onClick={() => remove(index)}
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
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Required Event Roles</label>
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  id="photographer"
                  name="requiredEventRoles"
                  value="photographer"
                  className="mr-2"
                />
                <label htmlFor="photographer" className="mr-4">
                  Photographer
                </label>
                <Field
                  type="checkbox"
                  id="videographer"
                  name="requiredEventRoles"
                  value="videographer"
                  className="mr-2"
                />
                <label htmlFor="videographer" className="mr-4">
                  Videographer
                </label>
                <Field
                  type="checkbox"
                  id="announcer"
                  name="requiredEventRoles"
                  value="announcer"
                  className="mr-2"
                />
                <label htmlFor="announcer">Announcer</label>
              </div>
              <ErrorMessage name="requiredEventRoles" component="div" className="text-red-500 mt-1" />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isSubmitting ? 'Creating...' : 'Create Event'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEvent;