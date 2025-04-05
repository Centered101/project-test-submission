import React, { useEffect, useState, useRef } from 'react';

function ScrollToTopButton() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = Math.round((scrollTop / scrollHeight) * 100);

    setScrollPercent(scrolled);
    setIsVisible(scrollTop > 2 * window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.background = `conic-gradient(#0D0D0D ${scrollPercent}%, #FFF ${scrollPercent}%)`;
    }
    if (percentRef.current) {
      percentRef.current.textContent = `${scrollPercent}%`;
    }
  }, [scrollPercent]);

  return (
    <button
      title="top scroll button"
      aria-label="top scroll button"
      onClick={scrollToTop}
      ref={buttonRef}
      className={`sticky bottom-8 ml-auto mr-8 flex items-center rounded-full z-40 select-none transition-all duration-300 ease-in-out
                sm:border-t sm:border-l sm:border-b sm:border-[#0D0D0D]
                ${isVisible ? 'opacity-100 flex' : 'opacity-0 hidden'}
            `}
      style={{ background: '#FFF', color: '#0D0D0D' }}
    >
      <div className="hidden text-sm font-semibold capitalize mx-6 sm:grid" style={{ fontFamily: `'Roboto Mono','Bai Jamjuree',sans-serif` }}>
        <span>To Top</span>
        <span ref={percentRef}></span>
      </div>

      <div
        id="progress"
        ref={progressRef}
        className="size-12 grid place-items-center border border-[#0D0D0D] rounded-full bg-[#FFF] md:size-14"
      >
        <div className="grid place-items-center size-[calc(100%-10px)] bg-[#FFF] border border-[#0D0D0D] rounded-full">
          <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 27.5">
            <path d="m11.2 10.8v8.9c0 .9.8 1.7 1.7 1.7s1.7-.8 1.7-1.7v-9.1l4.1 4.2c.7.7 1.8.7 2.4 0 .7-.7.7-1.8 0-2.5l-6.9-7c-.7-.7-1.8-.7-2.4 0l-7.1 7.1c-.7.7-.7 1.8 0 2.4.7.7 1.7.7 2.4 0l4.1-4m12.3-10.7c.9 0 1.7.8 1.7 1.7s-.8 1.7-1.7 1.7h-21c-.9 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7h21" />
          </svg>
        </div>
      </div>
    </button>
  );
}

export default ScrollToTopButton;
