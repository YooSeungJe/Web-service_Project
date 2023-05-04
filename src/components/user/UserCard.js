import { useNavigate } from 'react-router-dom';
import { Card, Row, Button, Col } from 'react-bootstrap';
import { IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';
import styles from './UserCard.module.css';
import ShowImage from '../image/ShowImage';

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  return (
    <Card className={`${styles.card} mb-2 ms-3 mr-5`}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <ShowImage userId={user?.id} dataId={user?.id} />
        </Row>
        <Card.Title className={`${styles.title}`}>{user?.name}</Card.Title>
        <Card.Subtitle className={`${styles.subtitle} ${styles.email}`}>
          {user?.email}
        </Card.Subtitle>
        <Card.Text className={`${styles.text} ${styles.description}`}>
          {user?.description}
        </Card.Text>

        {isEditable && (
          <Col>
            <Row className={`${styles.button} ${styles.editButton}`}>
              <Col sm={{ span: 20 }}>
                <Tooltip title="Edit UserCard">
                  <IconButton
                    sx={{ ml: 'auto' }}
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>

                {/* <Button
                  className={`${styles.button} ${styles.editButton}`}
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button> */}
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className={`${styles.link} ${styles.networkLink} mt-3`}
            href="#"
            onClick={() => {
              console.log(`Clicked user ID: ${user.id}`);
              navigate(`/users/${user.id}`);
            }}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
