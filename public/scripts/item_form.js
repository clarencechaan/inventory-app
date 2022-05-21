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
  const imgElem = document.querySelector(".img-container img");
  const span = document.querySelector(".img-container span");
  span.innerText = "Uploading...";
  imgElem.src = await uploadImage(e.target.files[0]);
  span.hidden = true;
}

const itemImgPicker = document.querySelector("#item-img");
itemImgPicker.addEventListener("change", (e) => {
  handleImagePicked(e);
});

// prevent enter key from submitting form
function submitButtonClick(event) {
  event.preventDefault();
}
