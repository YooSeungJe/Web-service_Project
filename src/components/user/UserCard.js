import { useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';
import styles from './UserCard.module.css';
import ShowImage from '../image/ShowImage';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Api from '../../api';

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      try {
        // "users/유저id/withdraw" 엔드포인트로 DELETE 요청함.
        const res = await Api.delete(`user/${user.id}/withdraw`);
        console.log('check', res);
        alert(res.data.message);
        // 로그아웃 처리 등의 후속 처리를 할 수 있음.
        sessionStorage.clear();
        localStorage.removeItem('token');
        window.location.reload();
        navigate('/login', { replace: true });
      } catch (err) {
        console.error(err);
        alert(
          err.response?.data?.message || '탈퇴 과정에서 문제가 발생했습니다.'
        );
      }
    }
  };

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
                <div style={{ display: 'inline-flex' }}>
                  <Tooltip title="회원정보 수정">
                    <IconButton onClick={() => setIsEditing(true)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="회원탈퇴">
                    <IconButton onClick={handleWithdraw} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
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
