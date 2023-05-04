import './Footer.css';
import turtle from '../image/turtle.png';

function Footer() {
  return (
    <div id='footer'>
      <img className='turtle' src={turtle} alt='cute turtle' />
      <div id='footerContent'>
        <div className='footerTitle'>주식회사 잊지마 기억해</div>
        <div className='footerItem'>
          <b>&nbsp;&nbsp;대표 | </b>
          <div>박민수&nbsp;&nbsp;&nbsp;</div>
          <b>상임이사 | </b>
          <div>Chat GPT</div>
          <br />
          <b>&nbsp;&nbsp;주소 | </b>
          <div>대한민국 사랑시 고백구 행복동 14-72</div>
          <br />
          <b>&nbsp;&nbsp;전화 | </b>
          <div>02-0000-0000&nbsp;&nbsp;&nbsp;</div>
          <b>문의 | </b>
          <div>1@elice.kr</div>
          <br />
        </div>
        <div className='footerCopyright'>
          &nbsp;&nbsp;Copyright 2023. 잊지마 기억해. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
