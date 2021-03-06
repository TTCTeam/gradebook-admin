/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InputBase from '@mui/material/InputBase';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import moment from 'moment';
import {
  changeStatusOfUserAccount,
  getUserAccountById,
  changeStudentIdOfUserAccount,
} from '../../api/userAccounts';
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

export default function UserDetail() {
  const [userDetail, setUserDetail] = useState({});
  const [studentId, setStudentId] = useState('');
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    const fetchUserDetail = async (id) => {
      setIsLoading(true);
      const res = await getUserAccountById(id);
      if (res.status === 200) {
        setUserDetail(res.data);
      } else {
        alert('Error.');
      }
      setIsLoading(false);
    };

    fetchUserDetail(userId);
  }, []);

  useEffect(() => {
    setStudentId(userDetail.username);
  }, [userDetail]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = () => {
    handleClickOpen();
  };

  const handleChangeStatus = async () => {
    const newStatus =
      userDetail.status === userStatus.ACTIVE.value
        ? userStatus.BLOCKED.value
        : userStatus.ACTIVE.value;

    const res = await changeStatusOfUserAccount(userId, newStatus);
    if (res.status === 200) {
      setUserDetail({ ...userDetail, status: newStatus });
    } else {
      alert('Error.');
    }
    handleClose();
  };

  const submitChangeStudentId = async () => {
    const res = await changeStudentIdOfUserAccount(userId, studentId);
    if (res.status === 200) {
      setUserDetail({ ...userDetail, username: studentId });
    } else {
      alert('Error.');
    }
    setEdit(false);
  };

  return (
    <div className="user-detail">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <div className="cover-image" />

      <div className="avatar">
        <Avatar
          {...stringAvatar(`${userDetail.firstname} ${userDetail.lastname}`)}
          sx={{ width: 150, height: 150 }}
        />
      </div>

      <div className="fullName">
        {userDetail.firstname} {userDetail.lastname}
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
            <div className="value">
              <div className="studentId">
                <InputBase
                  className="input-base"
                  value={studentId ?? ''}
                  disabled={!edit}
                  onChange={(e) => setStudentId(e.target.value)}
                />
                {edit ? (
                  <SaveIcon
                    onClick={submitChangeStudentId}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <EditIcon
                    onClick={() => setEdit(true)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="infor">
            <div className="title">Email</div>
            <div className="value">{userDetail.email}</div>
          </div>
          <div className="infor">
            <div className="title">Created At</div>
            <div className="value">
              {moment(userDetail.createdAt).format('DD/MM/YYYY')}
            </div>
          </div>
          <div className="infor">
            <div className="title">Status</div>
            <div className="value">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    nolabel="true"
                    value={userDetail.status ?? ''}
                    onChange={handleChange}
                  >
                    <MenuItem value={userStatus.ACTIVE.value}>Active</MenuItem>
                    <MenuItem value={userStatus.BLOCKED.value}>
                      Blocked
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
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
