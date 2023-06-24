import Background from '../assets/background-img.jpg';
import './banner.css';

function Banner() {
  return (
    <div  className='banner-container'>
      <div className='banner-title'>
          <h1>TODO</h1>
      </div>
      <div className='banner-img-container'>
          <img src={Background} alt="background to do img app" />
      </div>
    </div>
  )
}

export default Banner