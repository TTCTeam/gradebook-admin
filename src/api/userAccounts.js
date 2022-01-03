import axios from 'axios';
import { apiUrl } from '../constant/apiUrl';

export const getAllUserAccounts = async () => {
  const url = `${apiUrl}/admin/users`;
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const getUserAccountById = async (userId) => {
  const url = `${apiUrl}/admin/users/${userId}`;
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const changeStatusOfUserAccount = async (userId, status) => {
  const url = `${apiUrl}/admin/users/${userId}`;
  const response = await axios.put(url, {
    status,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};
