import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserState } from '../../../redux/user/userslice';
import './UserDashboard.scss';

import { Container, Row, Col, Card } from 'react-bootstrap';
import config from '../../../Config/config';

// Define the types for your API responses
interface User {
  email: string;
  createdAt: string;
}

interface Plan {
  plan: string;
  amount: string;
}

export default function UserDashboard() {
  // State for users
  const [data, setData] = useState<User[]>([]); // Array of users

  // State for commission
  const [commission, setCommission] = useState<number | null>(null);

  // State for plan
  const [plan, setPlan] = useState<Plan>({ plan: "", amount: "" });

  // Get current user from the Redux store
  const { currentUser } = useSelector((state: { user: UserState }) => state.user);

  // Fetch data, plans, and commission when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}user/user-just-one-level-down`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result.allUser || []);
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchPlan = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}user/check-plan`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch plan');
        }

        const result = await response.json();
        setPlan({ plan: result.plan.plan, amount: result.plan.amount });
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchCommission = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/user/commision`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch commission');
        }

        const result = await response.json();
        setCommission(result.value);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
    fetchPlan();
    fetchCommission();
  }, [currentUser]);

  return (
    <div>
      <h1>Welcome, {currentUser?.firstName}</h1>
      <Container fluid className="mt-3">
        <h1 className="text-center mb-4">User Dashboard</h1>
        <Row className="justify-content-center">
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
                <Card.Text className="dashboard-value">{data.length}</Card.Text>
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

        {/* Scrollable User List */}
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Users who used referral ID</Card.Title>
                <div className="scrollable-container">
                  {data && data.map((item, index) => (
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
  );
}
