const baseUrl = 'https://nf-api.onrender.com/api/v1'
const searchAllUrl =`${baseUrl}/social/posts` 
const accessToken = localStorage.getItem('bearerToken')

let data = [];
const searchBar = document.getElementById('search-bar')
const postCards = document.getElementById('post-cards')
const sortByOldNew = document.getElementById('sort-old-new')

const options = {
    headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
    }
};

const displayAllPosts = (posts) => {
    const newHtml = posts
    .map((post) => {
        if( post.media == null){
            return `
            <div class="col-sm-3 p-3">
        <div class="card  text-white bg-dark h-100">
        <div class="card-body" data-id=${post.id}>
        <a class="text-white" href="./specificpost.html?id=${post.id}"><h5 class="card-title">${post.title}</h5></a>
          <p class="card-text">  ${post.body}.</p>

        </div>
    </div></div>`
        
        
        
        ;
        } else {
            return `
            <div class="col-sm-3 p-3">
                <div class="card  text-white bg-dark h-100">

                <img class="card-img-top" src="${post.media}" alt="Card image cap">

                <div class="card-body" data-id=${post.id}>

                <a class="text-white" href="specificpost.html?id=${post.id}"><h5 class="card-title">${post.title}</h5> </a>
                  <p class="card-text">  ${post.body}.</p>


                </div>
            </div></div>`
        }
       
    })
    .join('');
    postCards.innerHTML = newHtml;
}

const loadPosts = async() => {
    try {
        const response = await fetch(searchAllUrl, options);
        data = await response.json();
        displayAllPosts(data)
        console.log(data)
    }
    catch (err){
        console.log(error)
    }
 
};

searchBar.addEventListener('keyup', (e) =>{
    const searchString = e.target.value.toLowerCase();
   
    console.log(searchString)
    const filteredPosts = data.filter((posts) => {
    return (posts.title.toLowerCase().includes(searchString) || posts.body.toLowerCase().includes(searchString));
    });
    console.log(filteredPosts)
    displayAllPosts(filteredPosts);
});


sortByOldNew.addEventListener('click', (e) => {
    console.log(e)
    const sortedPosts = data.sort((posts) => {
       return  new Date(posts.created) - new Date() 
    })
    displayAllPosts(sortedPosts)
})




loadPosts()