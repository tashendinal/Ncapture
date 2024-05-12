import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';


const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem('user');
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
  }, [])


  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = (target) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (keyCode) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative">
      <Link
      >
        <span className="hidden text-right lg:block">
          <span className="block text-lg font-medium text-black">
            {userData && userData.firstName} {userData && userData.lastName}
          </span>
        </span>
      </Link>
    </div>
  );
};

export default DropdownUser;
