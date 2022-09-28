import { useState, useRef, useEffect } from 'react';

// Data

import data from './data.json';

const Carousel = () => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="carousel my-12 mx-auto  ">
      
      <div className="relative overflow-hidden bg-gray-50">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('prev')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="#050505"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="#050505"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {
            data.blogs.map((blog) => {
              return (
                <div className='carousel-item snap-start p-5'>
                  <article className='  min-h-44   sm:max-w-xl sm:mx-auto   flex justify-center rounded-xl flex-col overflow-hidden w-96 mt-16 bg-white '>
                    <figure className="flex justify-center relative p-2  ">
                      <img
                        className=' w-24 h-24 rounded-full shadow-lg '
                        src={blog.imageUrl}
                        layout='responsive'
                        height={222}
                        width={400}
                      />
                    </figure>
        
                    <div className='flex flex-col items-center mb-0  mt-0 shadow-sm hover:shadow-lg'>
                      
                      <div className='flex justify-center'>
                        <h1 className='mt-6 text-3xl font-headline tracking-tight font-extrabold text-gray-900 leading-snug ml-5 object-center'>
                          {blog.name} <br />
                          <span className='text-green-700'>{blog.pos}</span>
                              
                          <div className=' font-bold text-xl mb-3'>{blog.comp}</div>
                              
                        </h1>
                      </div>
                      
                      <p className='text-gray-600 p-5  line-clamp-5 overflow-y-auto h-48'>{ blog.review}</p>
                          
                
                
               
                    </div>
                  </article>
                </div>
              );
            })
          }

          
          
         
                
                  
        </div>
      </div>
    </div>
  );
};

export default Carousel;
