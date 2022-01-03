// import axios from 'axios';
// import { apiUrl } from '../constant/apiUrl';

export const getAllAdminAccounts = async () => {
  // const url = `${apiUrl}/admin/accounts`;
  // const response = await axios.get(url, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // console.log(response);
  // return response;
  const data = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      createdAt: '2020-01-01',
    },
    {
      id: 2,
      name: 'Jane Doe',
      username: 'janedoe',
      createdAt: '2020-01-01',
    },
    {
      id: 3,
      name: 'Harry Doe',
      username: 'harrydoe',
      createdAt: '2020-01-01',
    },
  ];
  return data;
};

export const createNewAdminAccount = async (data) => {
  // const url = `${apiUrl}/admin/accounts`;
  // const response = await axios.post(url, data, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // return response;
  return data;
};

export const getAdminAccountById = async (adminId) => {
  // const url = `${apiUrl}/admin/accounts/${adminId}`;
  // const response = await axios.get(url, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // return response;
  const data = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    createdAt: new Date().toISOString(),
  };
  return data;
};
