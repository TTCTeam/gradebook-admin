import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './AdminAccounts.css';
import InputBase from '@mui/material/InputBase';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { data } from '../../api/adminAccounts';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';

export default function AdminAccounts() {
  const [adminAccounts, setAdminAccounts] = React.useState(data);
  // const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [key, setKey] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [sort, setSort] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setKey(search);
    }
  };

  const submitCreateNewAdminAccount = () => {};

  const handleChangeSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="admin-accounts">
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
                  {adminAccount.createAt}
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
            <TextField className="field" label="Name" variant="outlined" />
            <TextField className="field" label="Username" variant="outlined" />
            <TextField
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
