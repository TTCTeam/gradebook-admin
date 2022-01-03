import axios from 'axios';
import { apiUrl } from '../constant/apiUrl';

export const getAllAdminAccounts = async () => {
  const url = `${apiUrl}/admin/accounts`;
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const createNewAdminAccount = async (data) => {
  const url = `${apiUrl}/admin/accounts`;
  const response = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const getAdminAccountById = async (adminId) => {
  const url = `${apiUrl}/admin/accounts/${adminId}`;
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};
