import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import loginBg from '../../assets/loginBg.jpg';
import Axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const Login = () => {
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    // Form submission handler
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await Axios.post('http://localhost:3302/login', values);
            console.log(response)
            const { token, user } = response.data;

            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            console.log('Login successful');
            toast.success("LoggedIn Successfully")
            navigate("/dashboard")

        } catch (error) {
            console.error('Login error:', error.response.data.message);
            toast.error(error)
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)), url(${loginBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '100vh',
            }}
            className='flex'>
            <div className='w-full lg:w-1/4 flex justify-center items-center bg-transparent lg:bg-white z-50'>
                <div className='h-1/2 flex flex-col items-center justify-around min-w-full p-5 lg:p-10'>
                    <div className='text-center flex flex-col gap-3'>
                        <h1 className='text-6xl font-bold'>Login</h1>
                        <h1 className='text-2xl font-bold tracking-[6px]'>Ncapture</h1>
                    </div>
                    {/* Formik form */}
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className='flex flex-col gap-2 w-full'>
                                <div>
                                    <Field type='text' name='email' placeholder='Email' className='border rounded p-2 w-full' />
                                    <ErrorMessage name='email' component='p' className='text-red-500 text-sm' />
                                </div>
                                <div>
                                    <Field type='password' name='password' placeholder='Password' className='border rounded p-2 w-full' />
                                    <ErrorMessage name='password' component='p' className='text-red-500 text-sm' />
                                </div>

                                <button type='submit' disabled={isSubmitting} className='bg-green-500 text-white px-4 py-2 rounded'>
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className='bg-black block lg:hidden w-full h-full opacity-50 absolute'></div>
        </div>
    );
};

export default Login;
