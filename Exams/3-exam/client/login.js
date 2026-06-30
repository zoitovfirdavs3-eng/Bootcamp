const elLoginForm = document.querySelector(".auth-box");

elLoginForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  
  const inputs = elLoginForm.querySelectorAll("input");
  const email = inputs[0].value;
  const password = inputs[1].value;

  try {
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok && data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      window.location.replace("index.html");
    } else {
      alert(data.message || "Email yoki parol xato!");
    }
  } catch (err) {
    console.error(err);
    alert("Serverga ulanishda xatolik!");
  }
});