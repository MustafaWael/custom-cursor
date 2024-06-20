import { useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  return (
    <>
      <Cursor />
      <Link ahref="https://mustafawael.com" cursor={"external-link"}>
        Portfolio
      </Link>
      <Link
        ahref="https://www.mustafawael.com/Mustafa-Wael-CV.pdf"
        cursor={"download"}
      >
        Download CV
      </Link>
    </>
  );
}

const Link = ({ children, cursor, ahref }) => {
  const handleMouseEnter = () => {
    document.querySelector(".cursor").style.width = "50px";
    document.querySelector(".cursor").style.height = "50px";
    document.querySelector(`#${cursor}`).classList.add("active");
  };
  const handleMouseLeave = () => {
    document.querySelector(".cursor").style.width = "16px";
    document.querySelector(".cursor").style.height = "16px";
    document.querySelector(`#${cursor}`).classList.remove("active");
  };

  return (
    <a
      href={ahref}
      target="_blank"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
};

const Cursor = () => {
  const ref = useRef(null);

  useEffect(() => {
    let request;

    const handleMouseMove = (e) => {
      request = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.left = `${e.clientX}px`;
          ref.current.style.top = `${e.clientY}px`;
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (request) {
        cancelAnimationFrame(request);
      }
    };
  }, []);

  return (
    <div ref={ref} className="cursor">
      <svg
        className="external-link"
        id="external-link"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
        <path d="m21 3-9 9" />
        <path d="M15 3h6v6" />
      </svg>
      <svg
        className="download"
        id="download"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 17V3" />
        <path d="m6 11 6 6 6-6" />
        <path d="M19 21H5" />
      </svg>
    </div>
  );
};
