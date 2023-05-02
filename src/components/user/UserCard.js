import { useNavigate } from 'react-router-dom';
import { Card, Row, Button, Col } from 'react-bootstrap';
import styles from './UserCard.module.css';

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  return (
    <Card className={`${styles.card} mb-2 ms-3 mr-5`}>
      <Card.Body>
        <Row className='justify-content-md-center'>
          <Card.Img
            className={styles.image}
            src='http://placekitten.com/200/200'
            alt='랜덤 고양이 사진 (http://placekitten.com API 사용)'
          />
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
            <Row className={`${styles.row} mt-3 text-center text-info`}>
              <Col sm={{ span: 20 }}>
                <Button
                  className={`${styles.button} ${styles.editButton}`}
                  variant='outline-info'
                  size='sm'
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className={`${styles.link} ${styles.networkLink} mt-3`}
            href='#'
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
