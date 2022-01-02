import React, { useState } from 'react';
import './UserDetail.css';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { userStatus } from '../../constant/userStatus';
import { Link } from 'react-router-dom';

const data = {
  id: 1,
  firstName: 'Minh Cuong',
  lastName: 'Ha',
  studentId: '18120297',
  email: 'cuongha2k@gmail.com',
  createAt: '2020-01-01',
  status: 1,
};

const classes = [
  {
    id: 1,
    name: 'CNTT',
  },
  {
    id: 2,
    name: 'CNTT2',
  },
  {
    id: 3,
    name: 'CNTT3',
  },
];

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

export default function UserDetail() {
  const [userDetail, setUserDetail] = useState(data);
  const [classList, setClassList] = useState(classes);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    handleClickOpen();
  };

  const handleChangeStatus = () => {
    const newStatus =
      userDetail.status === userStatus.ACTIVE
        ? userStatus.BLOCKED
        : userStatus.ACTIVE;
    setUserDetail({ ...userDetail, status: newStatus });
    handleClose();
  };

  console.log(userDetail);

  return (
    <div className="user-detail">
      <div className="cover-image" />

      <div className="avatar">
        <Avatar
          {...stringAvatar(`${userDetail.firstName} ${userDetail.lastName}`)}
          sx={{ width: 150, height: 150 }}
        />
      </div>

      <div className="fullName">
        {userDetail.firstName} {userDetail.lastName}
      </div>

      <div className="about">
        <div className="about__title">About</div>
        <hr />
        <div className="content">
          <div className="infor">
            <div className="title">Role</div>
            <div className="value">User</div>
          </div>
          <div className="infor">
            <div className="title">Student Id</div>
            <div className="value">{userDetail.studentId}</div>
          </div>
          <div className="infor">
            <div className="title">Email</div>
            <div className="value">{userDetail.email}</div>
          </div>
          <div className="infor">
            <div className="title">Created At</div>
            <div className="value">{userDetail.createAt}</div>
          </div>
          <div className="infor">
            <div className="title">Status</div>
            <div className="value">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    nolabel="true"
                    value={userDetail.status}
                    onChange={handleChange}
                  >
                    <MenuItem value={userStatus.ACTIVE}>Active</MenuItem>
                    <MenuItem value={userStatus.BLOCKED}>Blocked</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        </div>
      </div>

      <div className="class-list">
        <div className="class-list__title">Class List</div>
        <hr />
        <div className="list">
          {classList.map((item) => (
            <Link to={`/classes/${item.id}`} key={item.id} className="item">
              <div className="name">{item.name}</div>
            </Link>
          ))}
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Gradebook Admin's Nonification"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action may result in some constraints on this account. Are you
            sure you want to change the status of this account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleChangeStatus}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
