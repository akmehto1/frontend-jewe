/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Dashboard.scss';

import { Container, Row, Col, Card } from 'react-bootstrap';

import { Navigate } from 'react-router';
import config from '../../../Config/config';
import { signOutUserStart, UserState } from '../../../redux/user/userslice';

export default function AdminDashboard() {
    const dispatch=useDispatch();
    const [totalUsers,setTotalUser]=useState(0);
    const[totalAmount,setTotalAmount]=useState(0);

    
  // Fetch API data on mount
  useEffect(() => {
    const fetchDashBoard = async () => {
      try {
        console.log("use effect");
        
        const response = await fetch(`${config.apiBaseUrl}admin/dashboard`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
        });

        
        
       
        const result = await response.json();
        console.log(result);
        setTotalAmount(result.totalTransactionAmount);
        console.log(result.totalTransactionAmount);
        setTotalUser(result.totalUsers);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
     

        // setData(result); // Uncomment and use if needed
      } catch (error:any) {
        console.error('There was an error fetching data:', error.message);
      }
    };

    fetchDashBoard();
  }, []);

  // Select current user from Redux state
  const { currentUser } = useSelector((state: { user: UserState }) => state.user);

  if (typeof currentUser === 'undefined' || currentUser === null) {
    dispatch(signOutUserStart());
    return <Navigate to="admin/log-in" />;
  }

  // Check if the user is an admin
  if (currentUser.role !== 'admin') {
    dispatch(signOutUserStart());
    return <Navigate to="/unauthorized" />;
  }



  return (
    <div>
      <h1>Welcome, {currentUser?.firstName || 'Admin'}</h1> {/* Fallback if currentUser is undefined */}
      <Container fluid className="mt-3">
        <h1 className="text-center mb-4">Admin Dashboard</h1>
        <Row className="justify-content-center">
          {/* Summary Cards */}
          <Col xs={12} sm={6} md={3} className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <Card.Title className="dashboard-title">Name</Card.Title>
                <Card.Text className="dashboard-value">{currentUser.firstName}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <Card.Title className="dashboard-title">Total Revenue</Card.Title>
                <Card.Text className="dashboard-value">${totalAmount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <Card.Title className="dashboard-title">Users</Card.Title>
                <Card.Text className="dashboard-value">{totalUsers}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col xs={12} sm={6} md={3} className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <Card.Title className="dashboard-title">Pending Orders</Card.Title>
                <Card.Text className="dashboard-value">12</Card.Text>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>

        {/* Scrollable Container */}
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="mb-4">
            <Card>
              {/* Uncomment and populate this when you have data */}
              {/* <Card.Body>
                  <Card.Title className="text-center">Email & Price List</Card.Title>
                  <div className="scrollable-container">
                      {data.map((item, index) => (
                          <div key={index} className="scrollable-item">
                              <strong>Email:</strong> {item.email} <br />
                              <strong>Price:</strong> ${item.price}
                          </div>
                      ))}
                  </div>
              </Card.Body> */}
            </Card>
          </Col>
        </Row>
      </Container>

     
    </div>
  );
}
