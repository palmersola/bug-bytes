class Post {
  constructor(content, author, tags) {
    this.id = Math.round(new Date().getTime() + Math.random() * 100000);
    this.content = content;
    this.date = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour: "numeric", minute: "numeric"});
    this.author = author;
    this.tags = tags;
  }
}

class AllPosts {
  constructor() {
    this.postList = [];
  }
  create(content, author, tags) {
    this.postList.push(new Post(content, author, tags));
  }

  read() {
    let posts = [];
    let keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let postString = localStorage.getItem(key);
      let postObject = JSON.parse(postString);
      posts.push(postObject);
    }
    this.postList = posts;
    return this.postList;
  }

  update() {}
  delete(id) {
    this.postList = this.postList.filter(post => post.id !== id);
    localStorage.removeItem(id);
  }
}

let allPosts = new AllPosts();

//DOM manipulation to show all posts
function displayAllPosts() {
  let postList = document.getElementById("listOfPosts");
  postList.innerHTML = "";
  // let posts = allPosts.read();

  for (let i = 0; i < allPosts.postList.length; i++) {
    let post = allPosts.postList[i];
    let postElement = document.createElement("div");

    postElement.innerHTML = `<div>
    <span class="postAuthor">${post.author}</span>
    <span class="postDate">${post.date}</span>
    <button class="deleteButton" onclick="deletePost(${post.id})">Delete</button>
    </div>
    <div>
    <span class="postContent">${post.content}</span>
    <span class="postTags">${post.tags}</span>
    </div>`;

    postList.appendChild(postElement);
  }
  console.log(allPosts.postList);
}

function create() {
  const content = document.getElementById("content").value.trim();
  const author = document.getElementById("author").value.trim();
  const tags = document.getElementById("tags").value;
  if (content !== "") {
    if (content.length <= 150) {
      allPosts.create(content, author, tags);
      displayAllPosts();

      document.getElementById("content").value = " ";
      // document.getElementById("count").textContent = "150";
    } else {
      alert("Your tweet exceeded the character amount.");
    }
  } else {
    alert("Tweet something...");
  }
}
const characterCount = document.getElementById("content");
const characterText = document.getElementById("count1");
const MAX_CHARS = 150;

characterCount.addEventListener('input', () => {
  const remaining = MAX_CHARS - characterCount.value.length;
  characterText.textContent = `${remaining} characters remaining`;
})

function deletePost(id) {
  allPosts.delete(id);
  displayAllPosts();
}
// document.getElementById("content").addEventListener("input", function() {
//   const input = this.value;
//   const count = document.getElementById("charCount");
//   count.textContent = 150 - input.length;
// });

// Create a function to search keywords
function search(keywords) {
  // Get current posts
  // const posts = document.querySelectorAll(".post");
  // Filter
  let filteredPosts = allPosts.postList.filter(post => {
    console.log(keywords);
    console.log(post.content);
    post.content === "test";
    // return keywords.some(keyword => post.includes(keywords));
  });
  console.log(filteredPosts);
  // Return filtered
  return filteredPosts;
}
