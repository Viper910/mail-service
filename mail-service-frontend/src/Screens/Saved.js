import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/Sidenav";

export default function Saved() {
  const userToken = localStorage.getItem("token");
  // const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [userToken, navigate]);
  return (
    <SideNav>
      <div
        className="container-fluid align-self-stretch"
        style={{ backgroundColor: "aliceblue", borderRadius: "25px" }}
      >
        <h1>Saved</h1>
      </div>
    </SideNav>
  );
}
