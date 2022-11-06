import axios from "axios";
export const signin = (username, email, pnumber, password) => {
  return axios.post("/auth/signup", {
    username: username,
    email: email,
    phonenumber: pnumber,
    password: password,
  });
};

export const login = (email, password) => {
  return axios.post("/auth/login", {
    email: email,
    password: password,
  });
};

export function inbox(token) {
  return axios.get("/message/inbox", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function sent(token) {
  return axios.get("/message/sent", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function compose(token, usermail, to, subject, message) {
  return axios.post(
    "/message/sendmessage",
    {
      from: usermail,
      to: to,
      subject: subject,
      message: message,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function inboxDeletion(id, token) {
  return axios.delete(`/message/inbox/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function sentDeletion(id, token) {
  return axios.delete(`/message/sent/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
