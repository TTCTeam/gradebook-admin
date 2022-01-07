/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './AdminDetail.css';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { getAdminAccountById } from '../../api/adminAccounts';
import moment from 'moment';
import { useParams } from 'react-router-dom';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function AdminDetail() {
  const [adminDetail, setAdminDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { adminId } = useParams();

  useEffect(() => {
    const fetchAdminDetail = async (adminId) => {
      setIsLoading(true);
      const res = await getAdminAccountById(adminId);
      if (res.status === 200) {
        setAdminDetail(res.data);
      } else {
        alert('Error.');
      }
      setIsLoading(false);
    };

    fetchAdminDetail(adminId);
  }, []);
  return (
    <div className="admin-detail">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <div className="cover-image" />
      <div className="avatar">
        <Avatar
          {...stringAvatar(adminDetail.name + ' Admin' || 'Admin Detail')}
          sx={{ width: 150, height: 150 }}
        />
      </div>
      <div className="fullName">{adminDetail.name}</div>
      <div className="about">
        <div className="about__title">About</div>
        <hr />
        <div className="content">
          <div className="infor">
            <div className="title">Role</div>
            <div className="value">Admin</div>
          </div>
          <div className="infor">
            <div className="title">Username</div>
            <div className="value">{adminDetail.username}</div>
          </div>
          <div className="infor">
            <div className="title">Created At</div>
            <div className="value">
              {moment(adminDetail.createdAt).format('MM:HH DD/MM/YYYY')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
