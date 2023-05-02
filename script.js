class Post {
  constructor(content, author, tags) {
    this.id = Math.round(new Date().getTime() + Math.random() * 100000);
    this.content = content;
    this.date = new Date();
    this.author = author;
    this.tags = tags;
  }
}

class AllPosts {
  constructor() {
    this.postList = [];
  }
  create() {}

  read() {
    let posts = [];
    let keys = Object.keys(localStorage);
    for (let i=0; i < keys.length; i++) {
        let key = keys[i];
        let postString = localStorage.getItem(key);
        let postObject = JSON.parse(postString);
        posts.push(postObject);
    }
    this.postList = posts;
    return this.postList;
  }

  update() {}
  delete() {}
}


// Create a function to search keywords
function search(keywords) {
// Get current posts
  const posts = document.querySelectorAll('.post');
// Filter
  const filteredPosts = Array.from(posts).filter(post => {
    return keywords.some(keyword => post.textContent.includes(keyword));
  });

// Return filtered
    return filteredPosts;
}

// Event listener for search button
document.getElementById('searchButton').addEventListener('click', () => {
// Get keywords from the search
  const keywords = document.getElementById('searchInput').value;

// Search for posts with keywords
  const filteredPosts = search(keywords);

// Clear the existing
  document.getElementById('posts').innerHTML = '';

// Add the filtered posts
  for (const post of filteredPosts) {
    document.getElementById('posts').appendChild(post);
  }
});


function create () {
  const input = document.getElementById("post").ariaValueMax.trim();
  if (input !== "") {
    if (input.length <=250) {
      posts.push(input);
      showPosts ();

      document.getElementById("post").value = " "; 
      document.getElementById("count").textContent = "250";
    } else {
      alert("Your tweet exceeded the character amount.");
    }
  } else {
    alert("Tweet something...");
  }
}

document.getElementById("post").addEventListener("input", function() {
  const input = this.value;
  const count = document.getElementById("charCount");
  count.textContent = 150 - input.length;
});

//DOM manipulation to show all posts
function displayAllPosts(){
  let postList = document.getElementById("listsOfPosts");
  let allPosts = new AllPosts();
  let posts = allPosts.read();

  for(let i=0; i < posts.length; i++) {
    let post = posts[i];
    let postElement = document.createElement("div");

    postElement.innerHTML=
    `<div>
      <span class="postTitle">${post.title}</span>
      <span class="postAuthor">${post.author}</span>
      <span class="postDate">${post.date}</span>
    </div>
    <div>
      <span class="postContent">${post.content}</span>
    </div>`;

    postList.appendChild(postElement);
  };
};


