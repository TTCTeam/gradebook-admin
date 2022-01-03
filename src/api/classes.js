import axios from 'axios';
import { apiUrl } from '../constant/apiUrl';

export const getAllClasses = async () => {
  const url = `${apiUrl}/admin/courses`;
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const getClassById = async (id) => {
  const url = `${apiUrl}/admin/courses/${id}`;
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};
