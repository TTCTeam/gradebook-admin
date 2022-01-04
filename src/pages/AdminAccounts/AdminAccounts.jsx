import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './AdminAccounts.css';
import InputBase from '@mui/material/InputBase';
import moment from 'moment';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import {
  getAllAdminAccounts,
  createNewAdminAccount,
} from '../../api/adminAccounts';

export default function AdminAccounts() {
  const [adminAccounts, setAdminAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [key, setKey] = useState('');
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchAdminAccounts = async () => {
      setIsLoading(true);
      const res = await getAllAdminAccounts();
      if (res.status === 200) {
        setAdminAccounts(res.data);
      } else {
        alert('Error.');
      }
      setIsLoading(false);
    };

    fetchAdminAccounts();
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setKey(search);
    }
  };

  const submitCreateNewAdminAccount = async () => {
    const newAdminAccount = {
      name,
      username,
      password,
    };
    const res = await createNewAdminAccount(newAdminAccount);
    if (res.status === 201) {
      const createdAccount = res.data;
      setAdminAccounts([...adminAccounts, createdAccount]);
      setPassword('');
      setUsername('');
      setName('');
    } else {
      alert('Error.');
    }
    handleClose();
  };

  const handleChangeSort = (e) => {
    const newSort = e.target.value;
    setSort(newSort);
    if (newSort === 'Ascending') {
      adminAccounts.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }
    if (newSort === 'Descending') {
      adminAccounts.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
    if (newSort === '') {
      adminAccounts.sort(function (a, b) {
        return a.id - b.id;
      });
    }
  };

  return (
    <div className="admin-accounts">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <h2>Admin Accounts</h2>
      <div className="top">
        <div className="search">
          <SearchIcon />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <div className="right">
          <div className="sort">
            <Box className="box">
              <FormControl className="form">
                <InputLabel>Sort by created time</InputLabel>
                <Select
                  label="Sort by created time"
                  value={sort}
                  onChange={handleChangeSort}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Ascending">Ascending</MenuItem>
                  <MenuItem value="Descending">Descending</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add new
          </Button>
        </div>
      </div>

      <div className="table">
        <div className="titles">
          <div style={{ flex: 1, borderLeft: 'none' }} className="title">
            ID
          </div>
          <div style={{ flex: 3 }} className="title">
            Name
          </div>
          <div style={{ flex: 2 }} className="title">
            Username
          </div>
          <div style={{ flex: 2 }} className="title create-at">
            Created At
          </div>
        </div>
        <div className="rows">
          {adminAccounts
            .filter((adminAccount) => {
              return adminAccount.username
                .toLowerCase()
                .includes(key.toLowerCase());
            })
            .map((adminAccount) => (
              <Link
                to={`/admins/${adminAccount.id}`}
                className="row"
                key={adminAccount.id}
              >
                <div className="box" style={{ flex: 1, borderLeft: 'none' }}>
                  {adminAccount.id}
                </div>

                <div className="box name" style={{ flex: 3 }}>
                  {adminAccount.name}
                </div>
                <div className="box" style={{ flex: 2 }}>
                  {adminAccount.username}
                </div>
                <div className="box" style={{ flex: 2 }}>
                  {moment(adminAccount.createdAt).format('DD/MM/YYYY')}
                </div>
              </Link>
            ))}
        </div>
      </div>
      <Modal className="admin-modal" open={open} onClose={handleClose}>
        <Box className="box">
          <Typography variant="h5" component="h2">
            Create new admin account
          </Typography>
          <div className="admin-modal__container">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field"
              label="Name"
              variant="outlined"
            />
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="field"
              label="Username"
              variant="outlined"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field"
              label="Password"
              variant="outlined"
              type="password"
            />
          </div>

          <Button
            sx={{ marginTop: '30px' }}
            variant="contained"
            onClick={submitCreateNewAdminAccount}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
