/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable dot-notation */
import React, { createElement as _e } from "react";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import AOS from "aos";

//import "./glightbox.min.css";
//import "./style.css";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

interface Props {
}

function _initAOS() {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
  AOS.refresh();
}

function _updateBackToTop(ele: React.MutableRefObject<HTMLAnchorElement | null>) {
  return () => {
    if (window.scrollY > 100) {
      ele.current?.classList.add("active");
    } else {
      ele.current?.classList.remove("active");
    }
  };
}

const View: React.FC<Props> = ({}) => {
  const headerEle = React.useRef<HTMLDivElement>(null);
  const backToTopEle = React.useRef<HTMLAnchorElement>(null);

  // init once
  React.useEffect(() => {
    console.log(">>> Init...");
    // aos
    _initAOS();

    // header
    const updateBackToTop = _updateBackToTop(backToTopEle);
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop);

    // release
    return () => {
      // scroll event listener
      window.removeEventListener("scroll", updateBackToTop);
    };
  }, []);

  return (
    <div>
      {/* ======= Header ======= */}
      <header ref={headerEle} id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo">
            <h1>
              <a href="index.html">Vesperr</a>
            </h1>
            {/* Uncomment below if you prefer to use an image logo */}
            {/* <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>*/}
          </div>
        </div>
      </header>
      {/* End Header */}
      <main id="main">
        {/* ======= Breadcrumbs ======= */}
        <section id="breadcrumbs" className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Portfolio Details</h2>
              <ol>
                <li>
                  <a href=".">Home</a>
                </li>
                <li>Portfolio Details</li>
              </ol>
            </div>
          </div>
        </section>
        {/* End Breadcrumbs */}
        {/* ======= Portfolio Details Section ======= */}
        <section id="portfolio-details" className="portfolio-details">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-8">
                <div className="portfolio-details-slider swiper-container">
                  <Swiper
                    pagination={{ clickable: true }}
                    slidesPerView={1}
                    className="align-items-center"
                  >
                    <SwiperSlide>
                      <img src="/vesperr-assets/img/portfolio/portfolio-details-1.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="/vesperr-assets/img/portfolio/portfolio-details-2.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="/vesperr-assets/img/portfolio/portfolio-details-3.jpg" alt="" />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="portfolio-info">
                  <h3>Project information</h3>
                  <ul>
                    <li>
                      <strong>Category</strong>: Web design
                    </li>
                    <li>
                      <strong>Client</strong>: ASU Company
                    </li>
                    <li>
                      <strong>Project date</strong>: 01 March, 2020
                    </li>
                    <li>
                      <strong>Project URL</strong>: <a href="#">www.example.com</a>
                    </li>
                  </ul>
                </div>
                <div className="portfolio-description">
                  <h2>This is an example of portfolio detail</h2>
                  <p>
                    Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque inventore
                    commodi labore quia quia. Exercitationem repudiandae officiis neque suscipit non
                    officia eaque itaque enim. Voluptatem officia accusantium nesciunt est omnis
                    tempora consectetur dignissimos. Sequi nulla at esse enim cum deserunt eius.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Portfolio Details Section */}
      </main>
      {/* End #main */}
      {/* ======= Footer ======= */}
      <footer id="footer">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-lg-6 text-lg-left text-center">
              <div className="copyright">
                © Copyright <strong>Vesperr</strong>. All Rights Reserved
              </div>
              <div className="credits">
                {/* All the links in the footer should remain intact. */}
                {/* You can delete the links only if you purchased the pro version. */}
                {/* Licensing information: https://bootstrapmade.com/license/ */}
                {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/vesperr-free-bootstrap-template/ */}
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="footer-links text-lg-right text-center pt-2 pt-lg-0">
                <a href="#intro" className="scrollto">
                  Home
                </a>
                <a href="#about" className="scrollto">
                  About
                </a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Use</a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
      {/* End Footer */}
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short" />
      </a>
    </div>
  );
};

export default View;
