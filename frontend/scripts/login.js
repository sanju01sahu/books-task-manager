const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // console.log(email, password);
  const data = {
    email,
    password,
  };

  fetch(`${baseUrl}/user/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => data.json())
    .then((res) => {
      // alert(res.msg)
      console.log(res);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      window.location.href = "./taskItem.html";
    })
    .catch((err) => {
      console.log(err);
      alert("Somthing Went Wrong \nPlease SignUp Again");
    });
});
