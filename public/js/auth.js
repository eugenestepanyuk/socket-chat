import { environment } from "./environment.js";

async function onAuth(event) {
  event.preventDefault();
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  try {
    const response = await fetch(`${environment.api}auth/login/`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const { content: accessToken } = await response.json();
      sessionStorage.setItem("access_token", accessToken);
      window.location.href = `${environment.api}`;
    }
    console.log("dasda");
  } catch (error) {
    console.error(error);
  }
}
document.getElementById("btnAuth").addEventListener("click", onAuth);
