import React, { useEffect, useState, ReactElement, createElement as _e } from "react";

//import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/swiper-react.cjs.js";

import AOS from "aos";

// install Swiper modules
//SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const isBrowser = () => (typeof window !== "undefined")
const _window = (name, defaultValue) => (
  (typeof window !== "undefined") ? window[name] : defaultValue
);

interface Props {

}

interface NavItem {
  label: string;
  href: string;
  navItems?: Array<NavItem>;
}

const navItems: NavItem[] = [
  { label: "home", href: "#hero" },
  { label: "about", href: "#about" },
  { label: "services", href: "#services" },
  { label: "portfolio", href: "#portfolio" },
  { label: "team", href: "#team" },
  { label: "pricing", href: "#pricing" },
  {
    label: "Drop Down",
    href: "#",
    navItems: [
      { label: "Drop Down 1", href: "#" },
      {
        label: "Deep Drop Down 2",
        href: "#",
        navItems: [
          { label: "Drop Down 2-1", href: "#" },
          { label: "Drop Down 2-2", href: "#" },
        ],
      },
      { label: "Drop Down 3", href: "#" },
      { label: "Drop Down 4", href: "#" },
    ],
  },
  { label: "contact", href: "#contact" },
  { label: "getting-started", href: "#about" },
];

interface RefItem {
  [key: string]: React.MutableRefObject<HTMLDivElement>;
}

const sectionItems: string[] = [
  "hero",
  "about",
  "counts",
  "services",
  "more-services",
  "features",
  "testimonials",
  "portfolio",
  "team",
  "pricing",
  "faq",
  "contact",
];

function _scrollToEle(
  headerEle: React.MutableRefObject<HTMLDivElement | null>,
  targetEle: React.MutableRefObject<HTMLDivElement | null> | null
) {
  const header = headerEle.current;
  const target = targetEle?.current;
  if (!header || !target) return;

  let offset = header.offsetHeight;
  if (!header.classList.contains("header-scrolled")) {
    offset -= 20;
  }
  window.scrollTo({
    top: target.offsetTop - offset,
    behavior: "smooth",
  });
}

function _findEleFromHash(
  eles: RefItem,
  hash: string
): React.MutableRefObject<HTMLDivElement | null> | null {
  if (!hash) return null;
  // eslint-disable-next-line no-param-reassign
  if (hash[0] === "#") hash = hash.substr(1);
  if (hash.length <= 0) return null;
  return eles[hash];
}

function _genNavbar(
  navbarEle: React.MutableRefObject<HTMLDivElement | null>,
  mobileNavToggleEle: React.MutableRefObject<HTMLDivElement | null>,
  refEles: React.MutableRefObject<HTMLAnchorElement | null>[],
  headerEle: React.MutableRefObject<HTMLDivElement | null>,
  sectionEles: RefItem,
  items: NavItem[],
  depth = 0
): ReactElement<any, any> | null {
  function onDropdownClick(aEle: React.MutableRefObject<HTMLAnchorElement | null>) {
    return (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (navbarEle.current?.classList.contains("navbar-mobile")) {
        e.preventDefault();
        aEle.current?.nextElementSibling?.classList.toggle("dropdown-active");
      }
    };
  }

  function onScrollToClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    console.log(">>>>>>>> CLICK");
    e.preventDefault();

    const navbar = navbarEle.current;
    const navbarToggle = mobileNavToggleEle.current;
    if (!navbar || !navbarToggle) return;

    if (navbar.classList.contains("navbar-mobile")) {
      navbar.classList.remove("navbar-mobile");
      navbarToggle.classList.toggle("bi-list");
      navbarToggle.classList.toggle("bi-x");
    }

    _scrollToEle(headerEle, _findEleFromHash(sectionEles, e.currentTarget.hash));
    // Add hash (#) to URL
    window.location.hash = e.currentTarget.hash;
  }

  return _e(
    "ul",
    { key: "z" },
    items.map((item, idx) => {
      const aProps: any = { href: item.href };
      if (depth === 0) {
        aProps.ref = refEles[idx];
      }
      if (item.navItems) {
        const subItem = _genNavbar(
          navbarEle,
          mobileNavToggleEle,
          refEles,
          headerEle,
          sectionEles,
          item.navItems,
          depth + 1
        );
        return _e("li", { className: "dropdown", key: item.label }, [
          _e("a", { key: "a", ...aProps, onClick: onDropdownClick(refEles[idx]) }, item.label),
          subItem,
        ]);
      }
      // no sub items
      return _e(
        "li",
        { key: item.label },
        _e("a", { ...aProps, className: "nav-link scrollto", onClick: onScrollToClick }, item.label)
      );
    })
  );
  /*
  return (
    <ul>
      {items.map((item, idx) => (
        <li className={item.navItems && "dropdown"} key={item.label}>
          {depth === 0 ? (
            <a
              ref={refs[idx]}
              className={item.navItems ? "" : "nav-link scrollto"}
              href={item.href}
              onClick={item.navItems && onDropdownClick(refs[idx])}
            >
              {item.label}
            </a>
          ) : (
            <a 
              className={item.navItems ? "" : "nav-link scrollto"} 
              onClick={onScrollToClick}
              href={item.href}
            >
              {item.label}
            </a>
          )}
          {item.navItems && _genNavbar(navbarEle, mobileNavToggleEle, item.navItems, refs, depth + 1)}
        </li>
      ))}
    </ul>
  );
  */
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

function _updateActiveNavItem(
  navTopEles: React.MutableRefObject<HTMLAnchorElement | null>[],
  sectionEles: RefItem
) {
  return () => {
    const position = window.scrollY + 200;
    navTopEles.forEach((ele) => {
      if (!ele.current?.hash) return;
      const section = sectionEles[ele.current.hash.substr(1)].current; // as React.MutableRefObject<unknown>;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        ele.current.classList.add("active");
      } else {
        ele.current.classList.remove("active");
      }
    });
  };
}

function _updateHeaderScrolled(headerEle: React.MutableRefObject<HTMLDivElement | null>) {
  return () => {
    if (window.scrollY > 100) {
      headerEle.current?.classList.add("header-scrolled");
    } else {
      headerEle.current?.classList.remove("header-scrolled");
    }
  };
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

function _initIsotope(
  portfolioContainerEle: React.MutableRefObject<HTMLDivElement | null>,
  pfFilterEles: RefItem
): void {
  if (!isBrowser()) return;

  const Isotope = require("isotope-layout");

  const portfolioContainer = portfolioContainerEle.current;
  if (!portfolioContainer) return;

  const portfolioIsotope = new Isotope(portfolioContainer, {
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });

  Object.keys(pfFilterEles).forEach((item) => {
    // eslint-disable-next-line func-names
    pfFilterEles[item].current?.addEventListener("click", function (e) {
      e.preventDefault();
      Object.keys(pfFilterEles).forEach((i) =>
        pfFilterEles[i].current?.classList.remove("filter-active")
      );
      this.classList.add("filter-active");
      portfolioIsotope.arrange({
        filter: this.getAttribute("data-filter"),
      });
      // eslint-disable-next-line func-names
      portfolioIsotope.on("arrangeComplete", function () {
        AOS.refresh();
      });
    });
  });
}

interface WindowSize {
  wClient: number;
  hClient: number;
}

function useWindowSize() {
  
  const [size, setSize] = useState<WindowSize>({
    wClient: _window("innerWidth", 0),
    hClient: _window("innerHeight", 0),
  });

  useEffect(() => {
    console.log(">>> useWindowSize: effect");
    const onResizeWindow = () =>
      setSize({
        wClient: _window("innerWidth", 0),
        hClient: _window("innerHeight", 0),
      });

    isBrowser() && window.addEventListener("resize", onResizeWindow);

    return () => {
      isBrowser() && window.removeEventListener("resize", onResizeWindow);
    };
  });
  console.log(">>> useWindowSize");

  return size;
}

const View: React.FC<Props> = ({}) => {
  const headerEle = React.useRef<HTMLDivElement>(null);
  const backToTopEle = React.useRef<HTMLAnchorElement>(null);
  const navbarEle = React.useRef<HTMLDivElement>(null);
  const mobileNavToggleEle = React.useRef<HTMLDivElement>(null);
  const portfolioContainerEle = React.useRef<HTMLDivElement>(null);
  const pfFilterEles = ["all", "app", "web", "card"].reduce((acc: any, name) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    acc[name] = React.useRef<HTMLDivElement>(null);
    return acc;
  }, {});

  const navTopEles: React.MutableRefObject<HTMLAnchorElement | null>[] = navItems.map(() =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useRef<HTMLAnchorElement>(null)
  );
  const sectionEles: RefItem = sectionItems.reduce((acc: any, item) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    acc[item] = React.useRef<HTMLDivElement>();
    return acc;
  }, {});

  // init once
  useEffect(() => {
    console.log(">>> Init...");
    // aos
    _initAOS();

    // navbar
    const updateActiveNavItem = _updateActiveNavItem(navTopEles, sectionEles);
    updateActiveNavItem();
    window.addEventListener("scroll", updateActiveNavItem);

    // navbar mobile toggle button
    mobileNavToggleEle.current?.addEventListener("click", function a(e) {
      navbarEle.current?.classList.toggle("navbar-mobile");
      // eslint-disable-next-line react/no-this-in-sfc
      this.classList.toggle("bi-list");
      // eslint-disable-next-line react/no-this-in-sfc
      this.classList.toggle("bi-x");
    });

    // header
    const updateHeaderScrolled = _updateHeaderScrolled(headerEle);
    updateHeaderScrolled();
    window.addEventListener("scroll", updateHeaderScrolled);

    // header
    const updateBackToTop = _updateBackToTop(backToTopEle);
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop);

    // isotope for portfolio
    _initIsotope(portfolioContainerEle, pfFilterEles);

    // release
    return () => {
      // scroll event listener
      window.removeEventListener("scroll", updateActiveNavItem);
      window.removeEventListener("scroll", updateHeaderScrolled);
      window.removeEventListener("scroll", updateBackToTop);
    };
  }, []);

  return (
    <>
      {/* ======= Header ======= */}
      <header ref={headerEle} id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo">
            <h1>
              <a href="index">Vesperr</a>
            </h1>
            {/* Uncomment below if you prefer to use an image logo */}
            {/* <a href="index.html"><img src="vesperr-assets/img/logo.png" alt="" class="img-fluid"></a>*/}
          </div>
          <nav ref={navbarEle} id="navbar" className="navbar">
            {_genNavbar(
              navbarEle,
              mobileNavToggleEle,
              navTopEles,
              headerEle,
              sectionEles,
              navItems
            )}
            <i ref={mobileNavToggleEle} className="bi bi-list mobile-nav-toggle" />
          </nav>
          {/* .navbar */}
        </div>
      </header>
      {/* End Header */}
      {/* ======= Hero Section ======= */}
      <section
        id="hero"
        ref={sectionEles["hero"]}
        className="d-flex align-items-center"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">Grow your business with Vesperr</h1>
              <h2 data-aos="fade-up" data-aos-delay={400}>
                We are team of talented designers making websites with Bootstrap
              </h2>
              <div data-aos="fade-up" data-aos-delay={800}>
                <a href="#about" className="btn-get-started scrollto">
                  Get Started
                </a>
              </div>
            </div>
            <div
              className="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="fade-left"
              data-aos-delay={200}
            >
              <img src="/vesperr-assets/img/hero-img.png" className="img-fluid animated" alt="" />
            </div>
          </div>
        </div>
      </section>
      {/* End Hero */}
      <main id="main">
        {/* ======= About Us Section ======= */}
        <section
          id="about"
          ref={sectionEles["about"]}
          className="about"
        >
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>About Us</h2>
            </div>
            <div className="row content">
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay={150}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
                <ul>
                  <li>
                    <i className="ri-check-double-line" /> Ullamco laboris nisi ut aliquip ex ea
                    commodo consequat
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> Duis aute irure dolor in reprehenderit in
                    voluptate velit
                  </li>
                  <li>
                    <i className="ri-check-double-line" /> Ullamco laboris nisi ut aliquip ex ea
                    commodo consequat
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0" data-aos="fade-up" data-aos-delay={300}>
                <p>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <a href="#" className="btn-learn-more">
                  Learn More
                </a>
              </div>
            </div>
            <div className="row clients">
              <h3>Clients</h3>
              <div className="col-lg-2 col-md-4 col-6">
                <img
                  src="/vesperr-assets/img/clients/client-1.png"
                  className="img-fluid"
                  alt=""
                  data-aos="zoom-in"
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <img
                  src="/vesperr-assets/img/clients/client-2.png"
                  className="img-fluid"
                  alt=""
                  data-aos="zoom-in"
                  data-aos-delay={100}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <img
                  src="/vesperr-assets/img/clients/client-3.png"
                  className="img-fluid"
                  alt=""
                  data-aos="zoom-in"
                  data-aos-delay={200}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <img
                  src="/vesperr-assets/img/clients/client-4.png"
                  className="img-fluid"
                  alt=""
                  data-aos="zoom-in"
                  data-aos-delay={300}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <img
                  src="/vesperr-assets/img/clients/client-5.png"
                  className="img-fluid"
                  alt=""
                  data-aos="zoom-in"
                  data-aos-delay={400}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <img
                  src="/vesperr-assets/img/clients/client-6.png"
                  className="img-fluid"
                  alt=""
                  data-aos="zoom-in"
                  data-aos-delay={500}
                />
              </div>
            </div>
          </div>
        </section>
        {/* End About Us Section */}
        {/* ======= Counts Section ======= */}
        <section id="counts" ref={sectionEles["counts"]} className="counts">
          <div className="container">
            <div className="row">
              <div
                className="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-xl-start"
                data-aos="fade-right"
                data-aos-delay={150}
              >
                <img src="/vesperr-assets/img/counts-img.svg" alt="" className="img-fluid" />
              </div>
              <div
                className="col-xl-7 d-flex align-items-stretch pt-4 pt-xl-0"
                data-aos="fade-left"
                data-aos-delay={300}
              >
                <div className="content d-flex flex-column justify-content-center">
                  <div className="row">
                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                      <div className="count-box">
                        <i className="bi bi-emoji-smile" />
                        <span
                          data-purecounter-start={0}
                          data-purecounter-end={65}
                          data-purecounter-duration={1}
                          className="purecounter"
                        />
                        <p>
                          <strong>Happy Clients</strong> consequuntur voluptas nostrum aliquid ipsam
                          architecto ut.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                      <div className="count-box">
                        <i className="bi bi-journal-richtext" />
                        <span
                          data-purecounter-start={0}
                          data-purecounter-end={85}
                          data-purecounter-duration={1}
                          className="purecounter"
                        />
                        <p>
                          <strong>Projects</strong> adipisci atque cum quia aspernatur totam
                          laudantium et quia dere tan
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                      <div className="count-box">
                        <i className="bi bi-clock" />
                        <span
                          data-purecounter-start={0}
                          data-purecounter-end={18}
                          data-purecounter-duration={1}
                          className="purecounter"
                        />
                        <p>
                          <strong>Years of experience</strong> aut commodi quaerat modi aliquam nam
                          ducimus aut voluptate non vel
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                      <div className="count-box">
                        <i className="bi bi-award" />
                        <span
                          data-purecounter-start={0}
                          data-purecounter-end={15}
                          data-purecounter-duration={1}
                          className="purecounter"
                        />
                        <p>
                          <strong>Awards</strong> rerum asperiores dolor alias quo reprehenderit eum
                          et nemo pad der
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End .content*/}
              </div>
            </div>
          </div>
        </section>
        {/* End Counts Section */}
        {/* ======= Services Section ======= */}
        <section
          id="services"
          ref={sectionEles["services"]}
          className="services"
        >
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Services</h2>
              <p>Magnam dolores commodi suscipit eius consequatur ex aliquid fug</p>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div className="icon-box" data-aos="fade-up" data-aos-delay={100}>
                  <div className="icon">
                    <i className="bx bxl-dribbble" />
                  </div>
                  <h4 className="title">
                    <a href="#">Lorem Ipsum</a>
                  </h4>
                  <p className="description">
                    Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div className="icon-box" data-aos="fade-up" data-aos-delay={200}>
                  <div className="icon">
                    <i className="bx bx-file" />
                  </div>
                  <h4 className="title">
                    <a href="#">Sed ut perspiciatis</a>
                  </h4>
                  <p className="description">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div className="icon-box" data-aos="fade-up" data-aos-delay={300}>
                  <div className="icon">
                    <i className="bx bx-tachometer" />
                  </div>
                  <h4 className="title">
                    <a href="#">Magni Dolores</a>
                  </h4>
                  <p className="description">
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div className="icon-box" data-aos="fade-up" data-aos-delay={400}>
                  <div className="icon">
                    <i className="bx bx-world" />
                  </div>
                  <h4 className="title">
                    <a href="#">Nemo Enim</a>
                  </h4>
                  <p className="description">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Services Section */}
        {/* ======= More Services Section ======= */}
        <section
          id="more-services"
          ref={sectionEles["more-services"]}
          className="more-services"

        >
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex align-items-stretch">
                <div
                  className="card"
                  style={{ backgroundImage: 'url("/vesperr-assets/img/more-services-1.jpg")' }}
                  data-aos="fade-up"
                  data-aos-delay={100}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      <a href="#">Lobira Duno</a>
                    </h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore
                      et dolore magna aliqua.
                    </p>
                    <div className="read-more">
                      <a href="#">
                        <i className="bi bi-arrow-right" /> Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div
                  className="card"
                  style={{ backgroundImage: 'url("/vesperr-assets/img/more-services-2.jpg")' }}
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      <a href="#">Limere Radses</a>
                    </h5>
                    <p className="card-text">
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque
                      laudantium, totam rem.
                    </p>
                    <div className="read-more">
                      <a href="#">
                        <i className="bi bi-arrow-right" /> Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-stretch mt-4">
                <div
                  className="card"
                  style={{ backgroundImage: 'url("/vesperr-assets/img/more-services-3.jpg")' }}
                  data-aos="fade-up"
                  data-aos-delay={100}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      <a href="#">Nive Lodo</a>
                    </h5>
                    <p className="card-text">
                      Nemo enim ipsam voluptatem quia voluptas sit aut odit aut fugit, sed quia
                      magni dolores.
                    </p>
                    <div className="read-more">
                      <a href="#">
                        <i className="bi bi-arrow-right" /> Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-stretch mt-4">
                <div
                  className="card"
                  style={{ backgroundImage: 'url("/vesperr-assets/img/more-services-4.jpg")' }}
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      <a href="#">Pale Treda</a>
                    </h5>
                    <p className="card-text">
                      Nostrum eum sed et autem dolorum perspiciatis. Magni porro quisquam laudantium
                      voluptatem.
                    </p>
                    <div className="read-more">
                      <a href="#">
                        <i className="bi bi-arrow-right" /> Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End More Services Section */}
        {/* ======= Features Section ======= */}
        <section
          id="features"
          ref={sectionEles["features"]}
          className="features"
        >
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Features</h2>
              <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem</p>
            </div>
            <div className="row" data-aos="fade-up" data-aos-delay={300}>
              <div className="col-lg-3 col-md-4">
                <div className="icon-box">
                  <i className="ri-store-line" style={{ color: "#ffbb2c" }} />
                  <h3>
                    <a href="#">Lorem Ipsum</a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                <div className="icon-box">
                  <i className="ri-bar-chart-box-line" style={{ color: "#5578ff" }} />
                  <h3>
                    <a href="#">Dolor Sitema</a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                <div className="icon-box">
                  <i className="ri-calendar-todo-line" style={{ color: "#e80368" }} />
                  <h3>
                    <a href="#">Sed perspiciatis</a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4 mt-lg-0">
                <div className="icon-box">
                  <i className="ri-paint-brush-line" style={{ color: "#e361ff" }} />
                  <h3>
                    <a href="#">Magni Dolores</a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i className="ri-database-2-line" style={{ color: "#47aeff" }} />
                  <h3>
                    <a href="#">Nemo Enim</a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i className="ri-gradienter-line" style={{ color: "#ffa76e" }} />
                  <h3>
                    <a href="#">Eiusmod Tempor</a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i className="ri-file-list-3-line" style={{ color: "#11dbcf" }} />
                  <h3>
                    <a href="#">Midela Teren</a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i className="ri-price-tag-2-line" style={{ color: "#4233ff" }} />
                  <h3>
                    <a href="#">Pira Neve</a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i className="ri-anchor-line" style={{ color: "#b2904f" }} />
                  <h3>
                    <a href="#">Dirada Pack</a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i className="ri-disc-line" style={{ color: "#b20969" }} />
                  <h3>
                    <a href="#">Moton Ideal</a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i className="ri-base-station-line" style={{ color: "#ff5828" }} />
                  <h3>
                    <a href="#">Verdo Park</a>
                  </h3>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                  <i className="ri-fingerprint-line" style={{ color: "#29cc61" }} />
                  <h3>
                    <a href="#">Flavor Nivelanda</a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Features Section */}
        {/* ======= Testimonials Section ======= */}
        <section
          id="testimonials"
          ref={sectionEles["testimonials"]}
          className="testimonials section-bg"
        >
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Testimonials</h2>
              <p>Magnam dolores commodi suscipit eum quidem consectetur velit</p>
            </div>
            <div
              className="testimonials-slider swiper-container"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <Swiper
                spaceBetween={30}
                slidesPerView={2}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                <SwiperSlide>
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <img
                        src="/vesperr-assets/img/testimonials/testimonials-1.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>Saul Goodman</h3>
                      <h4>Ceo &amp; Founder</h4>
                      <p>
                        <i className="bx bxs-quote-alt-left quote-icon-left" />
                        Proin iaculis purus consequat sem cure digni ssim donec porttitora entum
                        suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et.
                        Maecen aliquam, risus at semper.
                        <i className="bx bxs-quote-alt-right quote-icon-right" />
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <img
                        src="/vesperr-assets/img/testimonials/testimonials-2.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>Sara Wilsson</h3>
                      <h4>Designer</h4>
                      <p>
                        <i className="bx bxs-quote-alt-left quote-icon-left" />
                        Export tempor illum tamen malis malis eram quae irure esse labore quem
                        cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua
                        noster fugiat irure amet legam anim culpa.
                        <i className="bx bxs-quote-alt-right quote-icon-right" />
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <img
                        src="/vesperr-assets/img/testimonials/testimonials-3.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>Jena Karlis</h3>
                      <h4>Store Owner</h4>
                      <p>
                        <i className="bx bxs-quote-alt-left quote-icon-left" />
                        Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla
                        quem veniam duis minim tempor labore quem eram duis noster aute amet eram
                        fore quis sint minim.
                        <i className="bx bxs-quote-alt-right quote-icon-right" />
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <img
                        src="/vesperr-assets/img/testimonials/testimonials-4.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>Matt Brandon</h3>
                      <h4>Freelancer</h4>
                      <p>
                        <i className="bx bxs-quote-alt-left quote-icon-left" />
                        Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export
                        minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt
                        elit fore quem dolore labore illum veniam.
                        <i className="bx bxs-quote-alt-right quote-icon-right" />
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="testimonial-wrap">
                    <div className="testimonial-item">
                      <img
                        src="/vesperr-assets/img/testimonials/testimonials-5.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>John Larson</h3>
                      <h4>Entrepreneur</h4>
                      <p>
                        <i className="bx bxs-quote-alt-left quote-icon-left" />
                        Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor
                        noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat
                        legam esse veniam culpa fore nisi cillum quid.
                        <i className="bx bxs-quote-alt-right quote-icon-right" />
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>
        {/* End Testimonials Section */}
        {/* ======= Portfolio Section ======= */}
        <section
          id="portfolio"
          ref={sectionEles["portfolio"]}
          className="portfolio"
        >
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Portfolio</h2>
              <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem</p>
            </div>
            <div className="row" data-aos="fade-up" data-aos-delay={200}>
              <div className="col-lg-12 d-flex justify-content-center">
                <ul id="portfolio-filters">
                  <li ref={pfFilterEles["all"]} data-filter="*" className="filter-active">
                    All
                  </li>
                  <li ref={pfFilterEles["app"]} data-filter=".filter-app">
                    App
                  </li>
                  <li ref={pfFilterEles["card"]} data-filter=".filter-card">
                    Card
                  </li>
                  <li ref={pfFilterEles["web"]} data-filter=".filter-web">
                    Web
                  </li>
                </ul>
              </div>
            </div>
            <div
              ref={portfolioContainerEle}
              className="row portfolio-container"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                <div className="portfolio-wrap">
                  <img
                    src="/vesperr-assets/img/portfolio/portfolio-1.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>App 1</h4>
                    <p>App</p>
                    <div className="portfolio-links">
                      <a
                        href="/vesperr-assets/img/portfolio/portfolio-1.jpg"
                        data-gallery="portfolioGallery"
                        className="portfolio-lightbox"
                        title="App 1"
                      >
                        <i className="bx bx-plus" />
                      </a>
                      <a href="portfolio-details" title="More Details">
                        <i className="bx bx-link" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                <div className="portfolio-wrap">
                  <img
                    src="/vesperr-assets/img/portfolio/portfolio-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>Web 3</h4>
                    <p>Web</p>
                    <div className="portfolio-links">
                      <a
                        href="/vesperr-assets/img/portfolio/portfolio-2.jpg"
                        data-gallery="portfolioGallery"
                        className="portfolio-lightbox"
                        title="Web 3"
                      >
                        <i className="bx bx-plus" />
                      </a>
                      <a href="portfolio-details" title="More Details">
                        <i className="bx bx-link" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                <div className="portfolio-wrap">
                  <img
                    src="/vesperr-assets/img/portfolio/portfolio-3.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>App 2</h4>
                    <p>App</p>
                    <div className="portfolio-links">
                      <a
                        href="/vesperr-assets/img/portfolio/portfolio-3.jpg"
                        data-gallery="portfolioGallery"
                        className="portfolio-lightbox"
                        title="App 2"
                      >
                        <i className="bx bx-plus" />
                      </a>
                      <a href="portfolio-details" title="More Details">
                        <i className="bx bx-link" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                <div className="portfolio-wrap">
                  <img
                    src="/vesperr-assets/img/portfolio/portfolio-4.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>Card 2</h4>
                    <p>Card</p>
                    <div className="portfolio-links">
                      <a
                        href="/vesperr-assets/img/portfolio/portfolio-4.jpg"
                        data-gallery="portfolioGallery"
                        className="portfolio-lightbox"
                        title="Card 2"
                      >
                        <i className="bx bx-plus" />
                      </a>
                      <a href="portfolio-details" title="More Details">
                        <i className="bx bx-link" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                <div className="portfolio-wrap">
                  <img
                    src="/vesperr-assets/img/portfolio/portfolio-5.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>Web 2</h4>
                    <p>Web</p>
                    <div className="portfolio-links">
                      <a
                        href="/vesperr-assets/img/portfolio/portfolio-5.jpg"
                        data-gallery="portfolioGallery"
                        className="portfolio-lightbox"
                        title="Web 2"
                      >
                        <i className="bx bx-plus" />
                      </a>
                      <a href="portfolio-details" title="More Details">
                        <i className="bx bx-link" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                <div className="portfolio-wrap">
                  <img
                    src="/vesperr-assets/img/portfolio/portfolio-6.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>App 3</h4>
                    <p>App</p>
                    <div className="portfolio-links">
                      <a
                        href="/vesperr-assets/img/portfolio/portfolio-6.jpg"
                        data-gallery="portfolioGallery"
                        className="portfolio-lightbox"
                        title="App 3"
                      >
                        <i className="bx bx-plus" />
                      </a>
                      <a href="portfolio-details" title="More Details">
                        <i className="bx bx-link" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                <div className="portfolio-wrap">
                  <img
                    src="/vesperr-assets/img/portfolio/portfolio-7.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>Card 1</h4>
                    <p>Card</p>
                    <div className="portfolio-links">
                      <a
                        href="/vesperr-assets/img/portfolio/portfolio-7.jpg"
                        data-gallery="portfolioGallery"
                        className="portfolio-lightbox"
                        title="Card 1"
                      >
                        <i className="bx bx-plus" />
                      </a>
                      <a href="portfolio-details" title="More Details">
                        <i className="bx bx-link" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                <div className="portfolio-wrap">
                  <img
                    src="/vesperr-assets/img/portfolio/portfolio-8.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>Card 3</h4>
                    <p>Card</p>
                    <div className="portfolio-links">
                      <a
                        href="/vesperr-assets/img/portfolio/portfolio-8.jpg"
                        data-gallery="portfolioGallery"
                        className="portfolio-lightbox"
                        title="Card 3"
                      >
                        <i className="bx bx-plus" />
                      </a>
                      <a href="portfolio-details" title="More Details">
                        <i className="bx bx-link" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                <div className="portfolio-wrap">
                  <img
                    src="/vesperr-assets/img/portfolio/portfolio-9.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="portfolio-info">
                    <h4>Web 3</h4>
                    <p>Web</p>
                    <div className="portfolio-links">
                      <a
                        href="/vesperr-assets/img/portfolio/portfolio-9.jpg"
                        data-gallery="portfolioGallery"
                        className="portfolio-lightbox"
                        title="Web 3"
                      >
                        <i className="bx bx-plus" />
                      </a>
                      <a href="portfolio-details" title="More Details">
                        <i className="bx bx-link" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Portfolio Section */}
        {/* ======= Team Section ======= */}
        <section
          id="team"
          ref={sectionEles["team"]}
          className="team section-bg"
        >
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Team</h2>
              <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem</p>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div className="member" data-aos="fade-up" data-aos-delay={100}>
                  <div className="member-img">
                    <img src="/vesperr-assets/img/team/team-1.jpg" className="img-fluid" alt="" />
                    <div className="social">
                      <a href="#">
                        <i className="bi bi-twitter" />
                      </a>
                      <a href="#">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="#">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="#">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>Walter White</h4>
                    <span>Chief Executive Officer</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div className="member" data-aos="fade-up" data-aos-delay={200}>
                  <div className="member-img">
                    <img src="/vesperr-assets/img/team/team-2.jpg" className="img-fluid" alt="" />
                    <div className="social">
                      <a href="#">
                        <i className="bi bi-twitter" />
                      </a>
                      <a href="#">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="#">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="#">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>Sarah Jhonson</h4>
                    <span>Product Manager</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div className="member" data-aos="fade-up" data-aos-delay={300}>
                  <div className="member-img">
                    <img src="/vesperr-assets/img/team/team-3.jpg" className="img-fluid" alt="" />
                    <div className="social">
                      <a href="#">
                        <i className="bi bi-twitter" />
                      </a>
                      <a href="#">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="#">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="#">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>William Anderson</h4>
                    <span>CTO</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                <div className="member" data-aos="fade-up" data-aos-delay={400}>
                  <div className="member-img">
                    <img src="/vesperr-assets/img/team/team-4.jpg" className="img-fluid" alt="" />
                    <div className="social">
                      <a href="#">
                        <i className="bi bi-twitter" />
                      </a>
                      <a href="#">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="#">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="#">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>Amanda Jepson</h4>
                    <span>Accountant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Team Section */}
        {/* ======= Pricing Section ======= */}
        <section
          id="pricing"
          ref={sectionEles["pricing"]}
          className="pricing"
        >
          <div className="container">
            <div className="section-title">
              <h2>Pricing</h2>
              <p>Sit sint consectetur velit nemo qui impedit suscipit alias ea</p>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="box" data-aos="zoom-in-right" data-aos-delay={200}>
                  <h3>Free</h3>
                  <h4>
                    <sup>$</sup>0<span> / month</span>
                  </h4>
                  <ul>
                    <li>Aida dere</li>
                    <li>Nec feugiat nisl</li>
                    <li>Nulla at volutpat dola</li>
                    <li className="na">Pharetra massa</li>
                    <li className="na">Massa ultricies mi</li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="#" className="btn-buy">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                <div className="box recommended" data-aos="zoom-in" data-aos-delay={100}>
                  <h3>Business</h3>
                  <h4>
                    <sup>$</sup>19<span> / month</span>
                  </h4>
                  <ul>
                    <li>Aida dere</li>
                    <li>Nec feugiat nisl</li>
                    <li>Nulla at volutpat dola</li>
                    <li>Pharetra massa</li>
                    <li className="na">Massa ultricies mi</li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="#" className="btn-buy">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                <div className="box" data-aos="zoom-in-left" data-aos-delay={200}>
                  <h3>Developer</h3>
                  <h4>
                    <sup>$</sup>29<span> / month</span>
                  </h4>
                  <ul>
                    <li>Aida dere</li>
                    <li>Nec feugiat nisl</li>
                    <li>Nulla at volutpat dola</li>
                    <li>Pharetra massa</li>
                    <li>Massa ultricies mi</li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="#" className="btn-buy">
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Pricing Section */}
        {/* ======= F.A.Q Section ======= */}
        <section id="faq" ref={sectionEles["faq"]} className="faq">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Frequently Asked Questions</h2>
            </div>
            <div
              className="row faq-item d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="col-lg-5">
                <i className="ri-question-line" />
                <h4>Non consectetur a erat nam at lectus urna duis?</h4>
              </div>
              <div className="col-lg-7">
                <p>
                  Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus
                  laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor
                  rhoncus dolor purus non.
                </p>
              </div>
            </div>
            {/* End F.A.Q Item*/}
            <div
              className="row faq-item d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="col-lg-5">
                <i className="ri-question-line" />
                <h4>Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?</h4>
              </div>
              <div className="col-lg-7">
                <p>
                  Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id
                  interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque
                  eleifend donec pretium. Est pellentesque elit ullamcorper dignissim.
                </p>
              </div>
            </div>
            {/* End F.A.Q Item*/}
            <div
              className="row faq-item d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <div className="col-lg-5">
                <i className="ri-question-line" />
                <h4>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi?</h4>
              </div>
              <div className="col-lg-7">
                <p>
                  Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus
                  pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit.
                  Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis
                  tellus.
                </p>
              </div>
            </div>
            {/* End F.A.Q Item*/}
            <div
              className="row faq-item d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              <div className="col-lg-5">
                <i className="ri-question-line" />
                <h4>Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?</h4>
              </div>
              <div className="col-lg-7">
                <p>
                  Aperiam itaque sit optio et deleniti eos nihil quidem cumque. Voluptas dolorum
                  accusantium sunt sit enim. Provident consequuntur quam aut reiciendis qui rerum
                  dolorem sit odio. Repellat assumenda soluta sunt pariatur error doloribus fuga.
                </p>
              </div>
            </div>
            {/* End F.A.Q Item*/}
            <div
              className="row faq-item d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={500}
            >
              <div className="col-lg-5">
                <i className="ri-question-line" />
                <h4>Tempus quam pellentesque nec nam aliquam sem et tortor consequat?</h4>
              </div>
              <div className="col-lg-7">
                <p>
                  Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse
                  in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl
                  suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in
                </p>
              </div>
            </div>
            {/* End F.A.Q Item*/}
          </div>
        </section>
        {/* End F.A.Q Section */}
        {/* ======= Contact Section ======= */}
        <section
          id="contact"
          ref={sectionEles["contact"]}
          className="contact"
        >
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Contact Us</h2>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100}>
                <div className="contact-about">
                  <h3>Vesperr</h3>
                  <p>
                    Cras fermentum odio eu feugiat. Justo eget magna fermentum iaculis eu non diam
                    phasellus. Scelerisque felis imperdiet proin fermentum leo. Amet volutpat
                    consequat mauris nunc congue.
                  </p>
                  <div className="social-links">
                    <a href="#" className="twitter">
                      <i className="bi bi-twitter" />
                    </a>
                    <a href="#" className="facebook">
                      <i className="bi bi-facebook" />
                    </a>
                    <a href="#" className="instagram">
                      <i className="bi bi-instagram" />
                    </a>
                    <a href="#" className="linkedin">
                      <i className="bi bi-linkedin" />
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 mt-4 mt-md-0"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="info">
                  <div>
                    <i className="ri-map-pin-line" />
                    <p>
                      A108 Adam Street
                      <br />
                      New York, NY 535022
                    </p>
                  </div>
                  <div>
                    <i className="ri-mail-send-line" />
                    <p>info@example.com</p>
                  </div>
                  <div>
                    <i className="ri-phone-line" />
                    <p>+1 5589 55488 55s</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12" data-aos="fade-up" data-aos-delay={300}>
                <form action="forms/contact.php" method="post" className="php-email-form">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="message"
                      rows={5}
                      placeholder="Message"
                      required
                      defaultValue=""
                    />
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message" />
                    <div className="sent-message">Your message has been sent. Thank you!</div>
                  </div>
                  <div className="text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* End Contact Section */}
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
      <a
        ref={backToTopEle}
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>
    </>
  );
};

export default View;
