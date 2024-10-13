import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { UserState } from '../../../redux/user/userslice';
import './UserDashboard.scss';

import { Container, Row, Col, Card } from 'react-bootstrap';
import SearchBox from '../../Admin/FilterPage/FilterPage';
import config from '../../../Config/config';

export default function UserDashboard() {
  const [data, setData] = useState(null); // State to store API data
  const { currentUser } = useSelector((state: { user: UserState }) => state.user);
   const [commission,setCommission]=useState(null);

  const [plan,setPlan]=useState({planPrice:"",plan:""});


  // Simulating API call
  useEffect(() => {
      // Replace this with your actual API call
      const fetchData = async () => {
        const response = await fetch(`${config.apiBaseUrl}user/user-just-one-level-down`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser?.accessToken}`,
            },
          });
    
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }



          const result = await response.json();
        
          setData(result.allUser);


      };

      const fetchPlan=async()=>{
       
        const response = await fetch(`${config.apiBaseUrl}user/check-plan`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser?.accessToken}`,
            },
          });
    
          if (!response.ok) {
            throw new Error("Failed to fetch plan");
          }



          const result = await response.json();
         
          

          setPlan({plan:result.plan.plan,planPrice:result.plan.amount})

        


      }


      const comissionPlan=async()=>{
       
        const response = await fetch(`${config.apiBaseUrl}/user/commision`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser?.accessToken}`,
            },
          });
    
          if (!response.ok) {
            throw new Error("Failed to fetch Mission");
          }



          const result = await response.json();
         
          console.log(result.value);
          setCommission(result.value);
        

        //   setCommission({plan:result.plan.plan,planPrice:result.plan.amount})

        


      }

      fetchPlan();
      fetchData();
      comissionPlan();

  }, []);




  return (
    <div>
      <h1>Welcome,{currentUser?.firstName} </h1>
      <Container fluid className="mt-3">
            <h1 className="text-center mb-4">User Dashboard</h1>
            <Row className="justify-content-center">
                {/* Summary Cards */}
                <Col xs={12} sm={6} md={3} className="mb-4">
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title className="dashboard-title">Name</Card.Title>
                            <Card.Text className="dashboard-value">{currentUser?.firstName}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={3} className="mb-4">
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title className="dashboard-title">Plan</Card.Title>
                            <Card.Text className="dashboard-value">{plan.plan}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={3} className="mb-4">
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title className="dashboard-title">Users</Card.Title>
                            <Card.Text className="dashboard-value">{data?data.length:0}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={3} className="mb-4">
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title className="dashboard-title">Commission</Card.Title>
                            <Card.Text className="dashboard-value">{commission}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Scrollable Container */}
            <Row className="justify-content-center">
                <Col xs={12} md={6} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">User who use refferal id </Card.Title>
                            <div className="scrollable-container">
                                {data && data.map((item:any, index:number) => (
                                    
                                    <div key={index} className="scrollable-item">
                                        <strong>Email:</strong> {item.email} <br />
                                        <strong>Joined Date:</strong> {new Date(item.createdAt).toLocaleDateString()}
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>


      

    </div>
  )
}
