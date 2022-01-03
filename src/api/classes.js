// import axios from 'axios';
// import { apiUrl } from '../constant/apiUrl';

export const getAllClasses = async () => {
  // const url = `${apiUrl}/classes`;
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
      name: 'CNTT',
      description: 'CNTT',
      createdAt: '2020-01-01',
    },
    {
      id: 2,
      name: 'CNTT2',
      description: 'CNTT2',
      createdAt: '2020-01-01',
    },
    {
      id: 3,
      name: 'CNTT3',
      description: 'CNTT3',
      createdAt: '2020-01-01',
    },
    {
      id: 4,
      name: 'CNTT4',
      description: 'CNTT4',
      createdAt: '2020-05-01',
    },
  ];
  return data;
};

export const getClassById = async (id) => {
  // const url = `${apiUrl}/classes/${id}`;
  // const response = await axios.get(url, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // console.log(response);
  // return response;
  const data = {
    id: 1,
    name: 'course1',
    lecturer: null,
    description: 'sdfa',
    createdAt: '2022-01-03T05:21:27.000Z',
    updatedAt: '2022-01-03T05:21:27.000Z',
    members: [
      {
        id: 1,
        username: null,
        email: 'tandoan2000@gmail.com',
        firstname: 'Minh Tân',
        lastname: 'Đoàn',
        password: null,
        status: 1,
        createdAt: '2022-01-03T05:20:55.000Z',
        updatedAt: '2022-01-03T05:20:55.000Z',
        hehe: {
          role: 1,
        },
      },
    ],
  };
  return data;
};
