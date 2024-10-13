
import { Carousel } from 'react-bootstrap'
import './Home.scss';
import s1 from '../../assets/images/home/s1.jpg';
import s2 from '../../assets/images/home/s2.jpg';

export default function Home() {
  return (
    <div>
    <div className='home-slider'>  
          <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={s1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5 className='home-slider-title'>Jewelary</h5>
          <p className='home-slider-description'>Most enjoyment</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={s2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5 className='home-slider-title' >Expenses</h5>
          <p className='home-slider-description' >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={s1}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5 className='home-slider-title'>Third slide label</h5>
          <p className='home-slider-description'>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>





  
  

    </div>



    <div>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 font-weight-normal">Punny headline</h1>
          <p className="lead font-weight-normal">
            And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple's marketing pages.
          </p>
          <a className="btn btn-outline-secondary" href="#">
            Coming soon
          </a>
        </div>
        <div className="product-device box-shadow d-none d-md-block"></div>
        <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
      </div>

    

    

     
    </div>

    </div>
  )
}
