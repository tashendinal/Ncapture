export const getUserRole = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const { role } = JSON.parse(userData);
      return role;
    }
    return null;
  };
export const getUserData = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      return userData;
    }
    return null;
  };
  