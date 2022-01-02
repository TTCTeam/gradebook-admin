import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './UserAccounts.css';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { data } from '../../api/userAccounts';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';

export default function UserAccounts() {
  const [userAccounts, setUserAccounts] = React.useState(data);
  // const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [key, setKey] = React.useState('');
  const [sort, setSort] = React.useState('');

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
      <h2>User Accounts</h2>
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
                  {userAccount.studentId}
                </div>
                <div className="box" style={{ flex: 2 }}>
                  {userAccount.firstName}
                </div>
                <div className="box" style={{ flex: 2 }}>
                  {userAccount.lastName}
                </div>
                <div className="box" style={{ flex: 3 }}>
                  {userAccount.email}
                </div>
                <div className="box" style={{ flex: 1 }}>
                  {userAccount.createAt}
                </div>
                <div className="box" style={{ flex: 1 }}>
                  {userAccount.status}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
