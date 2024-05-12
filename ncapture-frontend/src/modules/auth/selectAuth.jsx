import loginBg from '../../assets/loginBg.jpg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectAuth = () => {

    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    return (
        <>
            <div style={{
                backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0)), url(${loginBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '100vh',
            }}

                className='flex items-center justify-center lg:justify-end gap-12'
            >
                <div className='h-96 flex flex-col items-center justify-between gap-2 m-5 md:m-52 text-center'>
                    <div>
                    <h1 className='text-4xl lg:text-8xl font-bold text-green-500'>Ncapture</h1>
                        <p className='text-2xl lg:text-4xl font-medium'>Event Management System</p>
                    </div>

                    <Link to="/login" className='px-5 py-2 bg-green-500 rounded-md'>
                        <button className='text-3xl font-medium '>Login</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SelectAuth;
