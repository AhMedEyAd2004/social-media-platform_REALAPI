let token = localStorage.getItem("token");
tokenExists();
let user_info = JSON.parse(localStorage.getItem("info")).user;
let page = 1;
viewPosts(page);
function tokenExists() {
  if (token == null) window.location = "login_reg.html";
}
if(localStorage.getItem("fromLoginPG")==="yes")
  {
    document.getElementById("notif0").style.display="block";
    localStorage.removeItem("fromLoginPG");
  }

let container1 = document.querySelector(".container1");

function viewPosts(pg) {
  axios
    .get(`https://tarmeezacademy.com/api/v1/posts?page=${pg}`)
    .then((json) => {
      for (post of json.data.data) {
        let img_profile;
        let img;
        let title;
        if (typeof post.author.profile_image != "string") {
          img_profile = `<img src="./img/image.png" alt="">`;
        } else {
          img_profile = `<img src="${post.author.profile_image}" alt="">`;
        }
        if (typeof post.image == "object") {
          img = ``;
        } else {
          img = `<img onclick="commentClicked('${post.id}')" class="horizontal" src="${post.image}"
                        alt="">`;
        }
        if (post.title == null) title = "";
        else title = `<h5>${post.title}</h4>`;
        let tagscontent = "";
        for (tag of post.tags) {
          tagscontent += `
               <span class="badge bg-secondary"><a href="#">${tag.name}</a></span>
            `;
        }
        container1.innerHTML += `
            <div class="post-content">
                <div onclick="userClicked('${
                  post.author.id
                }')" class="profile-info">
                    <div>
                       ${img_profile}
                    </div>
                    <span>${post.author.username}</span>
                </div>
                <div class="post">
                   ${img}
                </div>
                <div class="additional">
                    <p>${post.created_at}</p>
                    ${title}
                    <p>${post.body}</p>
                    <hr>
                </div>
                <div onclick="commentClicked('${post.id}')" class="cmnts">
                    <label for="#comnt-num">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path opacity="0.5"
                                    d="M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5"
                                    stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
                                <path
                                    d="M17.3009 2.80624L16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9L8.03811 15.0229C7.9492 15.2897 8.01862 15.5837 8.21744 15.7826C8.41626 15.9814 8.71035 16.0508 8.97709 15.9619L10.1 15.5876L11.8354 15.0091C12.3775 14.8284 12.6485 14.7381 12.9035 14.6166C13.2043 14.4732 13.4886 14.2975 13.7513 14.0926C13.9741 13.9188 14.1761 13.7168 14.5801 13.3128L20.5449 7.34795L21.1938 6.69914C22.2687 5.62415 22.2687 3.88124 21.1938 2.80624C20.1188 1.73125 18.3759 1.73125 17.3009 2.80624Z"
                                    stroke="#1C274C" stroke-width="1.5"></path>
                                <path opacity="0.5"
                                    d="M16.6522 3.45508C16.6522 3.45508 16.7333 4.83381 17.9499 6.05034C19.1664 7.26687 20.5451 7.34797 20.5451 7.34797M10.1002 15.5876L8.4126 13.9"
                                    stroke="#1C274C" stroke-width="1.5"></path>
                            </g>
                        </svg>
                    </label>
                    <a href="#" id="comnt-num">
                        <p>${"(" + post.comments_count + ") "}Comments</p>
                    </a>
                    <div class="tags">
                    ${tagscontent}
                    </div>
                </div>
            </div>
        `;
      }
    });
  page++;
}

window.onscroll = () => {
  if (document.documentElement.scrollTop > 200)
    document.getElementById("stickyTop").style.display = "block";
  else document.getElementById("stickyTop").style.display = "none";

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    viewPosts(page);
    console.log("endOfPage");
  }
};
document.getElementById("stickyTop").addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
});

// ==========LOGOUT===============================================================
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("info");
  window.location = "login_reg.html";
});
//=================================================================================
let tags_added = document.getElementById("tags-added");
tags_added.innerHTML = "";
let added = new Array(6);
//length of array is 6
function addTag(e, index) {
  if (added[index] == e.textContent) {
    document.getElementById("notif2").style.display = "block";
    return;
  }
  added.splice(index, 0, e.textContent);
  //delete 0 elements and insert e.textContent at index 2
  tags_added.innerHTML += `<span onclick="removeTag(this,${index})" class="badge bg-success">${e.textContent}</span>`;
}
function removeTag(e, index) {
  added.splice(index, 1);
  e.parentNode.removeChild(e);
}
//==================================================================================
document.getElementById("post-image").addEventListener("change", () => {
  let file = document.getElementById("post-image").files;
  //.files : hy2ra 2sm 2l sora w y7otha fee array

  let filereader = new FileReader();
  filereader.onload = (e) => {
    document.getElementById("img-slot").setAttribute("src", e.target.result);
  };
  filereader.readAsDataURL(file[0]);
  document.getElementById("img-slot-container").style.display = "block";
});
//==================================================================================
function removeImage() {
  let file = document.getElementById("post-image").files;
  delete file[0];
  document.getElementById("post-image").value = "";
  document.getElementById("img-slot-container").style.display = "none";
}
//==================================================================================
document.getElementById("post-btn").addEventListener("click", () => {
  let title = document.getElementById("post-title").value;
  let body = document.getElementById("post-body").value;
  let image = document.getElementById("post-image").files[0];
  let formdata = new FormData();
  formdata.append("title", title);
  formdata.append("body", body);
  formdata.append("image", image);
  axios
    .post("https://tarmeezacademy.com/api/v1/posts", formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      document.getElementById("notif").style.display = "block";
    });
});
//==================================================================================
function userClicked(id) {
  localStorage.setItem("anotherId", id);
  window.location = "profile.html";
}
document.getElementById("profilePage").addEventListener("click", () => {
  localStorage.removeItem("anotherId");
  window.location = "profile.html";
});
function commentClicked(id) {
  localStorage.setItem("postId",id)
  window.location="comments.html"
}

//ahmed001
//15004
//145634|T3gfxvKE3Sop4yV6IHmrB5Yk2KygBeJ09ieK8gRH
