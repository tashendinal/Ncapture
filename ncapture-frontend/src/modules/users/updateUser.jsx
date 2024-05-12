import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { toast } from 'react-toastify';

const UpdateUser = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await Axios.get(`http://localhost:3302/user/${userId}`);
                setUserData(response.data.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        role: Yup.string().required('Role is required'),
        password: Yup.string().when(values => values.updatePassword, {
            is: true,
            then: Yup.string().required('Password is required'),
            otherwise: Yup.string().notRequired(),
        }),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const userDataToSend = { ...values };
            if (!showPassword) {
                delete userDataToSend.password; // Remove password if not to be updated
            }
            console.log(userDataToSend, "userDataToSend");
            const response = await Axios.put(`http://localhost:3302/user/${userId}`, userDataToSend);
            toast.success('User updated successfully');
            navigate("/users");
        } catch (error) {
            console.error('User update error:', error.response.data.message);
            toast.error(error.response.data.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-4">Update User</h2>
            {userData && (
                <Formik
                    initialValues={{
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        phoneNumber: userData.phoneNumber,
                        password: '',
                        role: userData.role,
                        updatePassword: false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
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
                                    disabled="true"
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
                            {/* Checkbox to show/hide password field */}
                            <div className="mb-4 flex gap-3">
                                <Field
                                    type="checkbox"
                                    id="updatePassword"
                                    name="updatePassword"
                                    checked={showPassword}
                                    className="p-0 mb-2"
                                    onChange={() => setShowPassword(!showPassword)}
                                />
                                <label htmlFor="updatePassword" className="block text-gray-700 mb-2">
                                    Update Password
                                </label>
                            </div>
                            {/* Conditionally render password field */}
                            {showPassword && (
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Enter password"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                {isSubmitting ? 'Updating...' : 'Update User'}
                            </button>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
};

export default UpdateUser;
