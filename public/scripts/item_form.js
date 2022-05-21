async function uploadImage(file) {
  const CLIENT_ID = "a90c750ff89f0e2";

  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Client-ID ${CLIENT_ID}`);

  let formdata = new FormData();
  formdata.append("image", file);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch("https://api.imgur.com/3/image", requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result).data.link)
    .catch((error) => console.log("error", error));
}

async function handleImagePicked(e) {
  if (!e.target.files[0]) return;
  if (e.target.files[0].size > 10485760) {
    alert("File is too big. Max size is 10MB.");
    return;
  }

  const span = document.querySelector(".img-container span");
  span.innerText = "Uploading...";
  const imgElem = document.querySelector(".img-container img");
  imgElem.src = await uploadImage(e.target.files[0]);
  const imgURLinput = document.querySelector("#img-url");
  imgURLinput.value = imgElem.src;
  span.hidden = true;
  console.log(imgURLinput);
}

const itemImgPicker = document.querySelector("#item-img");
itemImgPicker.addEventListener("change", (e) => {
  handleImagePicked(e);
});

// prevent enter key from submitting form
function checkEnter(event) {
  console.log(event.keyCode);
  if (event.keyCode === 13) {
    event.preventDefault();
  }
}
const inputs = document.querySelectorAll("input");
for (const input of inputs) {
  input.addEventListener("keypress", checkEnter);
}
