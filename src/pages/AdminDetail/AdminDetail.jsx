import React from 'react';
import './AdminDetail.css';
import Avatar from '@mui/material/Avatar';

const data = {
  id: 1,
  name: 'Admin 1',
  username: 'haminhcuong',
  createAt: '2020-01-01',
};

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
  const [adminDetail, setAdminDetail] = React.useState(data);
  return (
    <div className="admin-detail">
      <div className="cover-image" />
      <div className="avatar">
        <Avatar
          {...stringAvatar(adminDetail.name)}
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
            <div className="value">{adminDetail.createAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
