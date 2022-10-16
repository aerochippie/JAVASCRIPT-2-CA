
const userName = localStorage.getItem('username')
const accessToken = localStorage.getItem('bearerToken')

const baseUrl = 'https://nf-api.onrender.com/api/v1'
const getProfileUrl = `${baseUrl}/social/profiles/${userName}`;
const getProfilePosts = `${baseUrl}/social/profiles/${userName}?_posts=true`;
const createPostUrl = `${baseUrl}/social/posts`;

const profileCard = document.getElementById(`profile-card`)
const profilePosts = document.getElementById(`post-cards`)
const newPostButton = document.getElementById(`add-post-button`)

const options = {
    headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
    }
};

async function renderProfile(url, opt) {

    const response = await fetch(url, opt);
    const data = await response.json();

    if (data.avatar === "") {
        profileCard.innerHTML +=
            `<div class="card">
            <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text"> Follwers: ${data._count.followers} Following: ${data._count.following}.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>`
    } else 
    {
        profileCard.innerHTML +=
            `<div class="card">
            <img class="card-img-top" src="${data.avatar}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text"> Follwers: ${data._count.followers} Following: ${data._count.following}.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>` }
}

async function renderPosts(url, opt) {
    const response = await fetch(url, opt);
    const data = await response.json();
    console.log(data)

        data.posts.forEach(post => {
            if(post.media === ''){
                profilePosts.innerHTML += `
        <div class="card">
        <div class="card-body" data-id=${post.id}>
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">  ${post.body}.</p>

          <button class="btn btn-primary" id="edit-button">Edit</button>
        <button class="btn btn-primary" id="delete-button">Delete</button>
        </div>
    </div>`
            } else { 
                profilePosts.innerHTML += `
                <div class="card">

                <img class="card-img-top" src="${post.media}" alt="Card image cap">

                <div class="card-body" data-id=${post.id}>

                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">  ${post.body}.</p>
                  <button class="btn btn-primary" id="edit-button">Edit</button>
                  <button class="btn btn-primary" id="delete-button">Delete</button>

                </div>
            </div>`
            }
    })

 
    ;
}


function validatePost(e){
    e.preventDefault()
    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-content').value.trim();
    const media = document.getElementById('media-url').value.trim();
    let newPostData = {
        title: title,
        body: body,
        media: media
    };
    if(newPostData.media === ""){
         delete newPostData.media
     }
    createPost(createPostUrl, newPostData);
}



async function createPost(url, post){
    try {
        const data = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),

        };
        const response = await fetch(url, data)
        console.log(response)
        const json = await response.json();
        console.log(json)
    
      
        if(response.status === 200){
            window.location.reload();
        }
        console.log(data)
    }
    catch (error) {
        console.log(error);
    }
}

profilePosts.addEventListener('click', (e) => {

    e.preventDefault();
    let postId = e.target.parentElement.dataset.id
    const deletePostUrl = `${baseUrl}/social/posts/${postId}`
  
    let editPressed = e.target.id == 'edit-button';
    let deletePressed = e.target.id == 'delete-button';

    if(deletePressed){
       fetch(deletePostUrl, {
        method: 'DELETE',
        headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
        }})
       
       .then(res => res.json())
       .then(() => location.reload())
    
}});

renderProfile(getProfileUrl, options);
renderPosts(getProfilePosts, options);
newPostButton.addEventListener('click', validatePost)