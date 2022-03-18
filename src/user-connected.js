const USER_CONNECTED = {
  user: {
    id: localStorage.getItem('id'),
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    is_superuser: localStorage.getItem('is_superuser'),
    is_staff: localStorage.getItem('is_staff'),
    first_name: localStorage.getItem('first_name'),
    last_name: localStorage.getItem('last_name'),
  }
};

export default USER_CONNECTED;
