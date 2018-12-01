import React from 'react'
import Carousel from 're-carousel';
import css from 'styled-jsx/css';

const images = [
  'https://i.ytimg.com/vi/WCcKWzaRIj0/maxresdefault.jpg',
  'http://www.hsvb.org/uploads/3/9/0/8/39084519/6551181_orig.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoZ20XWZFiQx38h3w9eDNG3V76Z97dm23PWUVKMY6nDYepNiJc',
  'https://i.ytimg.com/vi/hSlui_JstbE/maxresdefault.jpg',
  'https://steemitimages.com/DQma1bbkyXMcmrkD4Be3ctdVe3CGUvk8hmMWm4JckgqJcKL/DisorderlyConduct__1_AnimalsGoneWild.jpg',
  'https://listaka.com/wp-content/uploads/2015/08/Cheetah.jpg'
];

const randomImageUrls = () => {
  const imgs = [ ...images ];

  const randomized = [];
  const n = Math.floor(Math.random() * imgs.length) + 1;
  for (let i = 0 ; i < n ; ++i) {
    const j = Math.floor(Math.random() * imgs.length);
    randomized.push(imgs[j]);
  }

  return randomized;
}

const reset = css.global`
  * {
    box-sizing: border-box;
  }
  html, body {
    background-color: #f2f2f2;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  button {
    padding: 0 2rem;
    line-height: 2.5rem;
    background-color: #0076ff;
    cursor: pointer;
    color: white;
    border-radius: 6px;
    font-size: 12px;
    letter-spacing: 0.6px;
    position: absolute;
    z-index: 101;
    right: 10px;
    bottom: 10px;
  }
  h1 {
    margin-right: auto;
    width: 50%;
    font-family: Helvetica;
    letter-spacing: 0.5px;
    display: inline-block;
  }
`;

let blockStatus = true;


class Home extends React.Component {

  state = {
    prevNumFrames: 0,
    frameImages: randomImageUrls() 
  } 

  blockStatus = true;

  componentDidMount() {
    this.blockStatus = false
  }

  randomizeButton = () => (<button onClick={ this.randomize }> Randomize </button>)

  randomize = () => {
    this.setState((prevState) => ({
      prevNumFrames: prevState.frameImages.length,
      frameImages: randomImageUrls() 
    }));
  }

  render() {

    const {
      prevNumFrames,
      frameImages
    } = this.state;
    const { 
      blockStatus
    } = this;

    const currNumFrames = frameImages.length;

    return (
      <div className='root'>
        <div className='status'>
          <h1 className='num-frames'>
            {frameImages.length} Frames
          </h1>
          { !blockStatus && currNumFrames === prevNumFrames && <h1 className='status-char safe'>{ '✓' }</h1>}
          { !blockStatus && currNumFrames > prevNumFrames && <h1 className='status-char danger'>{ '✘' }</h1>}
          {  currNumFrames < prevNumFrames && <h1 className='status-char unknown-status'>{ '???' }</h1>}
        </div>
        <div className='carousel-wrapper'>
          <Carousel
            className='image-carousel'
            loop={ false }
            widgets={ this.randomizeButton }
          >
            {
              frameImages.map((url, index) => (
                <figure key={index}>
                  <img src={ url } />
                </figure>
              ))
            }
          </Carousel>
        </div>
        <style jsx global>{ reset }</style>
        <style jsx global>{`
          .root {
            padding: 5rem;
          }
          .status h1 {
            width: 50%; 
          }
          .status-char {
            text-align: right;
          }
          .safe {
            color: #2ac940;
          }
          .unknown-status {
            color: #ffde57;
          }
          .danger {
            color: #ff4945;
          }
          figure {
            height: 100%;
            width: 100%;
            margin: 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .carousel-wrapper {
            position: relative;
            min-height: 300px;
            margin-bottom: 30px;
          }
          .image-carousel {
            width: 100%;
            height: 100%;
            border: 1px dashed #aaa;
            padding-bottom: 33.66%;
          }
          img {
              max-height: 100%;
              max-width: 50%;
              margin: auto;
              display: block;
          }
        `}</style>
    </div>
    );
  }
}

export default Home
