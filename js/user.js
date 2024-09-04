document.getElementById("regbtn").addEventListener("click", async () => {
  document.getElementById(
    "todo"
  ).innerHTML = `Register<button onclick="clearTxt()" class="clear">Clear Data</button>`;
  document.getElementsByClassName("name")[0].style.display = "block";
  await getUser("register");
});

document.getElementById("logbtn").addEventListener("click", async () => {
  document.getElementById(
    "todo"
  ).innerHTML = `Login<button onclick="clearTxt()" class="clear">Clear Data</button>`;
  document.getElementsByClassName("name")[0].style.display = "none";
  await getUser("login");
});

function clearTxt() {
  document.getElementsByTagName("input")[0].value = "";
  document.getElementsByTagName("input")[1].value = "";
  document.getElementsByTagName("input")[2].value = "";
}
async function getUser(endpoint) {
  let user = document.getElementsByTagName("input")[0].value;
  let name = undefined;
  if (endpoint == "register")
    name = document.getElementsByTagName("input")[1].value;
   let pass = document.getElementsByTagName("input")[2].value;
  let response = await axios
    .post(`https://tarmeezacademy.com/api/v1/${endpoint}`, {
      username: user,
      name: name,
      password: pass,
    })
    .catch((err) => {
      console.log(err.response.data.errors);
      let warning = document.getElementsByClassName("warning");
      warning[0].innerHTML = "";
      warning[1].innerHTML = "";
      warning[2].innerHTML = "";
      let arr = Object.keys(err.response.data.errors);
      for (ind of arr) {
        if (ind == "username") {
          let nameArr = err.response.data.errors.username;
          for (i of nameArr) warning[0].innerHTML += `<p>*${i}</p>`;
        } else if (ind == "name") {
          let nameArr = err.response.data.errors.name;
          for (i of nameArr) warning[1].innerHTML += `<p>*${i}</p>`;
        } else if (ind == "password") {
          let nameArr = err.response.data.errors.password;
          for (i of nameArr) warning[2].innerHTML += `<p>*${i}</p>`;
        } else if (ind == "email") {
          let nameArr = err.response.data.errors.email;
          for (i of nameArr) warning[2].innerHTML += `<p>*${i}</p>`;
        }
      }
      throw "input error";
    });
  console.log("returning Token to local storage");
  let token = response.data.token;
  localStorage.setItem("token", token);
  let info = JSON.stringify(response.data);
  localStorage.setItem("info", info);
  localStorage.setItem("fromLoginPG","yes")

  window.location = "index.html";
  return;
}
// Done with Login/Register Page
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

