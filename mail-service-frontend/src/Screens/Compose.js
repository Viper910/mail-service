import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSend } from "react-icons/md";
import SideNav from "../components/Sidenav";
import { compose } from "../service";

export default function Compose() {
  const userToken = localStorage.getItem("token");
  const userMail = localStorage.getItem("userMailId");

  const cardStyle = { backgroundColor: "#182747" };
  const fontStyle = { color: "white" };

  const [alertMessage, setAlertMessage] = useState("");

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const submitFormHandler = (e) => {
    e.preventDefault();
    compose(userToken, userMail, to, subject, message)
      .then((result) => {
        console.log("Mail Sent successfully");
        setAlertMessage("Mail Sent successfully");
        navigate("/sent");
      })
      .catch((err) => {
        setAlertMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [userToken, navigate]);

  return (
    <SideNav>
      <div
        class="vh-100 d-flex justify-content-center align-items-center"
        style={fontStyle}
      >
        <div class="col-md-5 p-5 shadow-sm border rounded-3" style={cardStyle}>
          <h2 class="text-center mb-4">Mail Composer</h2>
          <form onSubmit={submitFormHandler}>
            <div class="mb-3">
              <input
                type="email"
                class="form-control border"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
                placeholder="To:"
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <input
                type="text"
                class="form-control border"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
                placeholder="Subject:"
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <input
                type="text"
                class="form-control border"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
                placeholder="Message:"
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="text-end">
              <button
                class="btn btn-primary rounded-5"
                type="submit"
                style={{ padding: "5px 7px 5px 7px" }}
              >
                <MdSend size={20} />
              </button>
            </div>
          </form>
          {alertMessage.length !== 0 ? (
            <div
              class="alert alert-warning alert-dismissible fade show"
              role="alert"
              style={{ marginTop: "10px" }}
            >
              {alertMessage}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </SideNav>
  );
}
