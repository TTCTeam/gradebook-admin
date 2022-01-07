/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './ClassDetail.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getClassById } from '../../api/classes';

export default function ClassDetail() {
  const [classDetail, setClassDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { classId } = useParams();

  useEffect(() => {
    const fetchClassDetail = async (classId) => {
      setIsLoading(true);
      const res = await getClassById(classId);
      if (res.status === 200) {
        setClassDetail(res.data);
      } else {
        alert("Error.");
      }
      setIsLoading(false);
    };

    fetchClassDetail(classId);
  }, []);

  return (
    <div className="class-detail">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress/>
      </Backdrop>
      <div className="cover-image">
        <div className="fullName">{classDetail.name}</div>
      </div>

      <div className="about">
        <div className="about__title">About</div>
        <hr/>
        <div className="content">
          <div className="infor">
            <div className="title">Id</div>
            <div className="value">{classDetail.id}</div>
          </div>
          <div className="infor">
            <div className="title">Description</div>
            <div className="value">{classDetail.description}</div>
          </div>
          <div className="infor">
            <div className="title">Created At</div>
            <div className="value">
              {moment(classDetail.createdAt).format('MM:HH DD/MM/YYYY')}
            </div>
          </div>
        </div>
      </div>

      <div className="class-list">
        <div className="class-list__title">Members</div>
        <hr/>
        <div className="list">
          {classDetail?.members?.map((item) => (
            <Link to={`/users/${item.id}`} key={item.id} className="item">
              <div className="name">{`${item.firstname} ${item.lastname}`}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
