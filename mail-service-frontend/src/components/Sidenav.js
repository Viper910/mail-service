import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MdInbox, MdSend, MdAdd } from "react-icons/md";
import { FaRegStar, FaBars } from "react-icons/fa";
import { BsKey } from "react-icons/bs";
import { useState } from "react";
const routes = [
  {
    path: "/inbox",
    name: "Inbox",
    icon: <MdInbox />,
  },
  {
    path: "/sent",
    name: "Sent",
    icon: <MdSend />,
  },
  {
    path: "/saved",
    name: "Starred",
    icon: <FaRegStar />,
  },
  {
    path: "/compose",
    name: "Compose",
    icon: <MdAdd />,
  },
  {
    path: "/",
    name: "Log Out",
    icon: <BsKey />,
  },
];

export default function SideNav({ children,username }) {
  const height = window.innerHeight;
  const [isOpen, setIsopen] = useState(false);
  const toggle = () => setIsopen(!isOpen);
  const hoverOn = () => setIsopen(true);
  const logoutHandler = () => {
    // this.setState({ isAuth: false, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="main-container fixed-top">
      <motion.div
        animate={{ width: isOpen ? "200px" : "39px" }}
        className="sidebar"
      >
        <div className="top_section">
          {isOpen && <h1 className="logo">MailService</h1>}
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>

        <section className="routes">
          {routes.map((route) => (
            <Link
              to={route.path}
              key={route.name}
              className="link"
              onClick={route.name === "Log Out" ? logoutHandler : null}
            >
              <div className="icon" onPointerEnter={hoverOn}>
                {route.icon}
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    {route.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </section>
      </motion.div>
      <main className="main-section" style={{ overflowY: "scroll" , height:`${height}px`}}>
        <h1>{username ? `User:${username}`: ''}</h1>
        {children}
      </main>
    </div>
  );
}
