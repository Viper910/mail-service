import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/Sidenav";
import { inbox, inboxDeletion } from "../service";

export default function Inbox() {
  const userToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [inboxmail, setInboxmail] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    } else {
      inbox(userToken)
        .then((mails) => {
          setInboxmail(mails.data.inbox);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userToken, navigate]);

  const deleteMail = async (id) => {
    await inboxDeletion(id, userToken)
      .then((result) => {
        navigate("/sent");
      })
      .catch((err) => {
        alert("Message not found");
      });
  };

  const staredMail = () => {};
  return (
    <SideNav username={userId}>
      <div
        className="container-fluid align-self-stretch"
        style={{ backgroundColor: "aliceblue", borderRadius: "25px" }}
      >
        <table class="table table-light table-hover table-borderless table-responsive">
          {inboxmail.length !== 0 ? (
            inboxmail.map((mail, id) => {
              return (
                <tbody key={id}>
                  <tr>
                    <td onClick={() => deleteMail(mail.msgId._id)}>
                      <AiFillDelete />
                    </td>
                    <td onClick={staredMail}>
                      <AiOutlineStar />
                    </td>
                    <td width="30em">{mail.msgId.from}</td>
                    <td>
                      <strong>{mail.msgId.subject}-</strong>
                      {mail.msgId.message}
                    </td>
                    <td className="text-end text-muted">
                      {mail.msgId.createdAt.slice(0, 10)}
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <div class="alert alert-info" role="alert">
              Inbox is empty
            </div>
          )}
        </table>
      </div>
    </SideNav>
  );
}
