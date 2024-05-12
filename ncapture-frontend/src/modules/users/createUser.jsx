import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { toast } from 'react-toastify';

const CreateUser = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'lecturer',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
  });

  const handleDefaultPassword = (setFieldValue) => {
    setFieldValue('password', 'ncapture123');
  };

  const handleSubmit = async (values, { setSubmitting , resetForm }) => {
    try {
      const response = await Axios.post('http://localhost:3302/user', values);
      console.log(response);
      toast.success('User created successfully');
      resetForm();
    } catch (error) { 
      console.error('User creation error:', error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Create New User</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700 mb-2">
                First Name
              </label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter first name"
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700 mb-2">
                Last Name
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter last name"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">
                Phone Number
              </label>
              <Field
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter phone number"
              />
              <ErrorMessage name="phoneNumber" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <div className='flex gap-1'>

              <Field
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter password"
                />
                              <button
                type="button"
                onClick={() => handleDefaultPassword(setFieldValue)}
                className="bg-gray-300 text-gray-700 py-2 px-4 ml-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Default
              </button>
                </div>
              <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />

            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 mb-2">
                Role
              </label>
              <Field
                as="select"
                id="role"
                name="role"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="lecturer">Lecturer</option>
                <option value="staff">Staff</option>
                <option value="administrator">Administrator</option>
                <option value="mediaAdmin">Media Admin</option>
                <option value="mediaMember">Media Member</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 mt-1" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isSubmitting ? 'Creating...' : 'Create User'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUser;
