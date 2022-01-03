import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './UserAccounts.css';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { getAllUserAccounts } from '../../api/userAccounts';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { userStatus } from '../../constant/userStatus.js';

export default function UserAccounts() {
  const [userAccounts, setUserAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [key, setKey] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchUserAccounts = async () => {
      setIsLoading(true);
      const res = await getAllUserAccounts();
      if (res.status === 200) {
        setUserAccounts(res.data);
      } else {
        alert("Error.");
      }
      setIsLoading(false);
    };

    fetchUserAccounts();
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setKey(search);
    }
  };

  const handleChangeSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="user-accounts">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress/>
      </Backdrop>
      <h2>User Accounts</h2>
      <div className="top">
        <div className="search">
          <SearchIcon/>
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
        </div>
      </div>

      <div className="table">
        <div className="titles">
          <div style={{ flex: 1, borderLeft: 'none' }} className="title">
            ID
          </div>
          <div style={{ flex: 1 }} className="title">
            StudentId
          </div>
          <div style={{ flex: 2 }} className="title">
            First Name
          </div>
          <div style={{ flex: 2 }} className="title">
            Last Name
          </div>
          <div style={{ flex: 3 }} className="title">
            Email
          </div>
          <div style={{ flex: 1 }} className="title create-at">
            Created At
          </div>
          <div style={{ flex: 1 }} className="title">
            Status
          </div>
        </div>
        <div className="rows">
          {userAccounts
            .filter((userAccount) => {
              return userAccount.email
                .toLowerCase()
                .includes(key.toLowerCase());
            })
            .map((userAccount) => (
              <Link
                className="row"
                key={userAccount.id}
                to={`/users/${userAccount.id}`}
              >
                <div className="box" style={{ flex: 1, borderLeft: 'none' }}>
                  {userAccount.id}
                </div>
                <div className="box name" style={{ flex: 1 }}>
                  {userAccount.username}
                </div>
                <div className="box" style={{ flex: 2 }}>
                  {userAccount.firstname}
                </div>
                <div className="box" style={{ flex: 2 }}>
                  {userAccount.lastname}
                </div>
                <div className="box" style={{ flex: 3 }}>
                  {userAccount.email}
                </div>
                <div className="box" style={{ flex: 1 }}>
                  {moment(userAccount.createdAt).format('DD/MM/YYYY')}
                </div>
                <div className="box" style={{ flex: 1 }}>
                  {Object.values(userStatus).find((status) => status.value === userAccount.status)?.text}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
