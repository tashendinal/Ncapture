import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import { FaPencil } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3302/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3302/user/${userId}`);
      fetchUsers();
      setDeleteModalOpen(false);
      toast.success("User deleted successfully")
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error("User deleting Error")
    }
  };

  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setDeleteModalOpen(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="rounded-sm bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6 xl:pb-2">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left dark:bg-meta-4">
                <th className="py-4 px-3 font-medium text-black xl:pl-6">#</th>
                <th className="py-4 px-3 font-medium text-black">First Name</th>
                <th className="py-4 px-3 font-medium text-black">Last Name</th>
                <th className="py-4 px-3 font-medium text-black">Email</th>
                <th className="py-4 px-3 font-medium text-black">Phone Number</th>
                <th className="py-4 px-3 font-medium text-black">Role</th>
                <th className="py-4 px-3 font-medium text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-strokedark">
                  <td className="py-4 px-3 xl:pl-6">{index + 1}</td>
                  <td className="py-4 px-3">{user.firstName}</td>
                  <td className="py-4 px-3">{user.lastName}</td>
                  <td className="py-4 px-3">{user.email}</td>
                  <td className="py-4 px-3">{user.phoneNumber || 'N/A'}</td>
                  <td className="py-4 px-3">{user.role}</td>
                  <td className="py-4 px-3">
                    <div className="flex items-center space-x-3.5">
                      <button onClick={() => openDeleteModal(user._id)} className="text-red-500 hover:text-red-600" title="Delete">
                        <MdDeleteForever className='text-2xl' />
                      </button>
                      <Link to={`/update-user/${user._id}`} className="text-blue-500 hover:text-blue-600" title="Update">
                        <FaPencil className='text-xl' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-md p-8 max-w-md">
            <p className="text-xl font-semibold mb-4">Are you sure you want to delete this User?</p>
            <div className="flex justify-end">
              <button onClick={() => handleDeleteUser(userToDelete)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mr-2 rounded">Confirm</button>
              <button onClick={closeDeleteModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
