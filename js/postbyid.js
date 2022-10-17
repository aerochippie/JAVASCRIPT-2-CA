
const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");
const accessToken = localStorage.getItem('bearerToken')
const baseUrl = 'https://nf-api.onrender.com/api/v1'
const postUrl = `${baseUrl}/social/posts/${id}`
console.log(id)
const options = {
    headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
    }
};

async function getPost(url, opt){
    const response = await fetch(url, opt);
    const data = await response.json();
    console.log(data)

    const postCard = document.getElementById('post')
    postCard.innerHTML = `<div class="card">

    <img class="card-img-top" src="${data.media}" alt="Card image cap">

    <div class="card-body" data-id=${post.id}>

    <a href="./specificpost.html?id=${post.id}"><h5 class="card-title">${data.title}</h5></a>
      <p class="card-text">  ${data.body}.</p>
      <button class="btn btn-primary" id="edit-button">Edit</button>
      <button class="btn btn-primary" id="delete-button">Delete</button>

    </div>
</div>`
}

getPost(postUrl, options)

