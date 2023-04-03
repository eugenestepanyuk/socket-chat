// import { io } from "socket.io-client";
import { environment } from "./environment.js";

const socket = io();

async function authUser() {
  if (!sessionStorage.getItem("access_token")) {
    window.location.href = `${environment.api}auth`;
    return;
  }
  try {
    const token = sessionStorage.getItem("access_token");
    const response = await fetch(`${environment.api}auth/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      removeToken();
      return;
    }

    const { content: id } = await response.json();
    if (!id) {
      removeToken();
      return;
    }
    userId = id;
  } catch (error) {
    console.log(error);
    removeToken();
  }
}

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const nickname = document.getElementById("nickname");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", {
      nickname: nickname.value,
      message: input.value,
    });
    input.value = "";
  }
});

socket.on("chat message", function (data) {
  let item = document.createElement("li");
  item.textContent = data.nickname + ": " + data.message;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

// window.onload = async function () {
//   await authUser();
// };
