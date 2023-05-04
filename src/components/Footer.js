import './Footer.css';
import turtle from '../image/turtle.png';

function Footer() {
  return (
    <div id="footer">
      <img className="turtle" src={turtle} alt="cute turtle" />
      <div id="footerContent">
        <p className="footerTitle">주식회사 잊지마 기억해</p>
        <p className="footerItem">
          <span>
            <b>대표 | </b>
          </span>
          <div>박민수</div>
          <span>
            <b>상임이사 | </b>
          </span>
          <div>Chat GPT</div>
        </p>
        <p className="footerItem">
          <span>
            <b>주소 | </b>
          </span>
          <div>대한민국 사랑시 고백구 행복동 14-72</div>
        </p>
        <p className="footerItem">
          <span>
            <b>전화 | </b>
          </span>
          <div>02-0000-0000</div>
          <span>
            <b>문의 | </b>
          </span>
          <div>1@elice.kr</div>
        </p>
        <p className="footerCopyright">
          Copyright 2023. 잊지마 기억해. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
