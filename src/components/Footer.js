import styled from "styled-components";

const Foot = styled.div`
  width: 100%;
  align-items: left;
  background-color: #e9edc98c;
  padding: 1rem;
`;

const FootTitle = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: 1rem;
`;

const FootItem = styled.div`
  display: inline-block;
  font-size: 0.7rem;
`;

function Footer() {
  return (
    <Foot>
      <FootTitle>주식회사 잊지마 기억해</FootTitle>
      <br />
      <FootItem>대표 | 박민수</FootItem>
      <br />
      <FootItem>주소 | 대한민국 사랑시 고백구 행복동 14-72</FootItem>
      <br />
      <FootItem>전화 | 02-0000-0000 문의 | 1@elice.kr</FootItem>
      <br />
      <br />
      <FootItem>Copyright 2023. 잊지마 기억해. All rights reserved.</FootItem>
    </Foot>
  );
}

export default Footer;
