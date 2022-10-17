
const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");



const userName = localStorage.getItem('username')
const accessToken = localStorage.getItem('bearerToken')

const baseUrl = 'https://nf-api.onrender.com/api/v1'
const getProfileUrl = `${baseUrl}/social/profiles/${userName}`;
const getProfilePosts = `${baseUrl}/social/profiles/${userName}?_posts=true`;
const createPostUrl = `${baseUrl}/social/posts`;

const profileCard = document.getElementById(`profile-card`)
const profilePosts = document.getElementById(`post-cards`)
const newPostButton = document.getElementById(`add-post-button`)
const popUpForm = document.getElementById('popup-form');

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
    } else {
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
        if (post.media === '') {
            profilePosts.innerHTML += `
        <div class="card">
        <div class="card-body" data-id=${post.id}>
        <a href="./specificpost.html?id=${post.id}"><h5 class="card-title">${post.title}</h5></a>
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

                <a href="specificpost.html?id=${post.id}"><h5 class="card-title">${post.title}</h5> </a>
                  <p class="card-text">  ${post.body}.</p>
                  <button class="btn btn-primary" id="edit-button">Edit</button>
                  <button class="btn btn-primary" id="delete-button">Delete</button>

                </div>
            </div>`
        }
    })


        ;
}

function validatePost(e) {
    e.preventDefault()
    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-content').value.trim();
    const media = document.getElementById('media-url').value.trim();
    let newPostData = {
        title: title,
        body: body,
        media: media
    };
    if (newPostData.media === "") {
        delete newPostData.media
    }
    createPost(createPostUrl, newPostData);
}

async function createPost(url, post) {
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


        if (response.status === 200) {
            window.location.reload();
        }
        console.log(data)
    }
    catch (error) {
        console.log(error);
    }
}


async function getPostDetials(url, opt) {
    const response = await fetch(url, opt);
    const data = await response.json();
    console.log(data)

    const postTitle = document.getElementById("post-edit-title")
    const postBody = document.getElementById("post-edit-content")
    const postMedia = document.getElementById("media-edit-url")
    const formPostId = document.getElementById("post-edit-id")
    postTitle.value = `${data.title}`
    postBody.value = `${data.body}`
    postMedia.value = `${data.media}`
    formPostId.value = `${data.id}`


}

async function editPost(url, postdata) {


    try {
        const data = {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postdata),

        };
        const response = await fetch(url, data)
        const json = await response.json();
        if (response.status === 200) {
            window.location.reload();
        }
    }
    catch (error) {
        console.log(error);
    }

};

function openForm() {
    document.getElementById("popup-form").style.display = "block";

}

profilePosts.addEventListener('click', (e) => {

    let postId = e.target.parentElement.dataset.id
    let postUrl = `${baseUrl}/social/posts/${postId}`

    let editPressed = e.target.id == 'edit-button';
    let deletePressed = e.target.id == 'delete-button';

    if (deletePressed) {
        fetch(postUrl, {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json",
            }
        })

            .then(res => res.json())
            .then(() => location.reload())

    }
    if (editPressed) {
        openForm()
        getPostDetials(postUrl, options)
    };
});


popUpForm.addEventListener('click', (e) => {
    e.preventDefault();

    const postTitle = document.getElementById("post-edit-title")
    const postBody = document.getElementById("post-edit-content")
    const postMedia = document.getElementById("media-edit-url")
    const formPostId = document.getElementById("post-edit-id").value

    let postDetailsUrl = `${baseUrl}/social/posts/${formPostId}`
    let savePressed = e.target.id == 'save-post-button';

    let newData = {
        title: postTitle.value,
        body: postBody.value,
        media: postMedia.value
    }

    if (savePressed) {
        editPost(postDetailsUrl, newData);
    }
})




renderProfile(getProfileUrl, options);
renderPosts(getProfilePosts, options);
newPostButton.addEventListener('click', validatePost)