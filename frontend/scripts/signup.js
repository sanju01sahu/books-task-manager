const signUpForm = document.getElementById("signUpForm");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // console.log(name, email, password);
  const data = {
    name,
    email,
    password,
  };

  fetch(`${baseUrl}/user/signup`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log(res)
      alert(`${res.msg}`);
      window.location.href = "./login.html";
    })
    .catch((err) => {
      console.log(err);
      // alert("Somthing Went Wrong \nPlease SignUp Again")
    });
});
