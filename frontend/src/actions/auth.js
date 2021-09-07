import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL || '';

const accessToken = () => {
  return localStorage.getItem('token');
};


const loadUser = async () => {
  try {
    const response = await axios.get(`${api_url}/api/auth`, {
      headers: { Authorization: `Bearer ${accessToken()}` },
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

const signup = async (body) => {
  try {
    const response = await axios.post(`${api_url}/api/users`, body);
    return response;
  } catch (err) {
    return err.response;
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${api_url}/api/auth/login`, {
      email,
      password,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export { signup, login, loadUser };
