// import axios from 'axios';
// import { apiUrl } from '../constant/apiUrl';

export const getAllUserAccounts = async () => {
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
      firstName: 'Minh Cuong',
      lastName: 'Ha',
      studentId: '18120297',
      createAt: '2020-01-01',
      status: 'active',
      email: 'cuongha2k@gmail.com',
    },
    {
      id: 2,
      firstName: 'Ho Thanh Tra',
      lastName: 'Huynh',
      studentId: '18120245',
      createAt: '2020-01-01',
      status: 'active',
      email: 'huynhhothanhtra@gmail.com',
    },
    {
      id: 3,
      firstName: 'Minh Tan',
      lastName: 'Doan',
      studentId: '18120234',
      createAt: '2020-01-01',
      status: 'active',
      email: 'minhtandoan@gmail.com',
    },
  ];
  return data;
};

export const getUserAccountById = async (userId) => {
  // const url = `${apiUrl}/user/accounts/${userId}`;
  // const response = await axios.get(url, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // return response;
  const data = {
    id: 1,
    firstName: 'Minh Cuong',
    lastName: 'Ha',
    studentId: '18120297',
    createAt: '2020-01-01',
    status: 0,
    email: 'cuongha2k@gmail.com',
  };
  return data;
};

export const changeStatusOfUserAccount = async (userId, status) => {
  // const url = `${apiUrl}/user/accounts/${userId}`;
  // const response = await axios.put(url, {
  //   status,
  // }, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // return response;
  return status;
};
