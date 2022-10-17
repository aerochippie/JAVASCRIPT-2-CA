
const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");
const accessToken = localStorage.getItem('bearerToken')
const baseUrl = 'https://nf-api.onrender.com/api/v1'
const postUrl = `${baseUrl}/social/posts/${id}`
const postCard = document.getElementById('post')
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

  
    
        if (data.media === null) {
            postCard.innerHTML += `
            <div class="col-sm-3 p-3">
        <div class="card  text-white bg-dark h-50">
        <div class="card-body" data-id=${data.id}>
        <a class="text-white" href="./specificpost.html?id=${data.id}"><h5 class="card-title">${data.title}</h5></a>
          <p class="card-text">  ${data.body}.</p>

          <button class="btn btn-info" id="edit-button">Edit</button>
        <button class="btn btn-danger" id="delete-button">Delete</button>
        </div>
    </div></div>`
        } else {
            postCard.innerHTML += `
            <div class="col-sm-3 p-3">
                <div class="card  text-white bg-dark h-100">

                <img class="card-img-top" src="${data.media}" alt="Card image cap">

                <div class="card-body" data-id=${data.id}>

                <a class="text-white" href="specificpost.html?id=${data.id}"><h5 class="card-title">${data.title}</h5> </a>
                  <p class="card-text">  ${data.body}.</p>
                  <button class="btn btn-info" id="edit-button">Edit</button>
                  <button class="btn btn-danger" id="delete-button">Delete</button>

                </div>
            </div></div>`
        }}


getPost(postUrl, options)

