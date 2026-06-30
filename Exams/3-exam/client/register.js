const elRegisterForm = document.querySelector(".auth-box");

elRegisterForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  
  const inputs = elRegisterForm.querySelectorAll("input");
  const fullName = inputs[0].value;
  const email = inputs[1].value;
  const password = inputs[2].value;

  try {
    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password })
    });

    const data = await response.json();

    if (response.ok && data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      window.location.replace("index.html");
    } else {
      alert(data.message || "Xatolik yuz berdi!");
    }
  } catch (err) {
    console.error(err);
    alert("Serverga ulanishda xatolik!");
  }
});