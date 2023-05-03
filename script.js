const content = document.getElementById("content");
const author = document.getElementById("author");
const tags = document.getElementById("tags");
const submitBtn = document.getElementById("submitBtn");
let ifUpdate = false;
let updateId;

class Post {
  constructor(content, author, tags) {
    this.id = Math.round(new Date().getTime() + Math.random() * 100000);
    this.content = content;
    this.date = new Date().toLocaleDateString("en-us", {
      weekday: "short",
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric"
    });
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
    localStorage.setItem("posts", JSON.stringify(this.postList));
  }
  read() {
    // localStorage.getItem("posts")
    //   ? (this.postList = JSON.parse(localStorage.getItem("posts")))
    //   : localStorage.setItem("posts", JSON.stringify([]));
    // return this.postList;

    // let posts = [];
    // let keys = Object.keys(localStorage);
    // for (let i = 0; i < keys.length; i++) {
    //   let key = keys[i];
    //   let postString = localStorage.getItem(key);
    //   let postObject = JSON.parse(postString);
    //   posts.push(postObject);
    // }
    // this.postList = posts;
    return this.postList;
  }

  update() {
    let update = this.postList.find(post => post.id === updateId);
    console.log(update);
    update.author = author.value;
    update.content = content.value;
    update.tags = tags.value;
    ifUpdate = false;
    submitBtn.innerText = "Submit";
    displayAllPosts();
  }
  delete(id) {
    this.postList = this.postList.filter(post => post.id !== id);
    displayAllPosts();
  }
}

let allPosts = new AllPosts();

//DOM manipulation to show all posts
function displayAllPosts(search) {
  let postList = document.getElementById("listOfPosts");
  postList.innerHTML = "";
  let posts = allPosts.read();
  let list = search ? search : posts;
  for (let i = 0; i < list.length; i++) {
    let post = list[i];
    let postElement = document.createElement("div");

    postElement.innerHTML = `<div>
    <span class="postAuthor">${post.author}</span>
    <span class="postDate">${post.date}</span>
    </div>
    <div>
    <span class="postContent">${post.content}</span>
    <span class="postTags">${post.tags}</span>
    <button onclick="allPosts.delete(${post.id})">Delete</button>
    <button onclick="update(${post.id})">Update</button>
    </div>`;

    postList.appendChild(postElement);
  }
  reset();
}

function create() {
  const contentVal = content.value.trim();
  const authorVal = author.value.trim();
  const tagsVal = tags.value.trim();
  if (content !== "") {
    if (contentVal.length <= 150) {
      allPosts.create(contentVal, authorVal, tagsVal);
      displayAllPosts();
      content.value = " ";
      // document.getElementById("count").textContent = "150";
    } else {
      alert("Your tweet exceeded the character amount.");
    }
  } else {
    alert("Tweet something...");
  }
}

function update(id) {
  submitBtn.innerText = "Update";
  let update = allPosts.postList.find(post => post.id === id);
  console.log(update);
  updateId = update.id;
  ifUpdate = true;
  author.value = update.author;
  content.value = update.content;
  tags.value = update.tags;
}

const updateCheck = () => (ifUpdate ? allPosts.update() : create());
const reset = () => {
  author.value = "";
  content.value = "";
  tags.value = "";
};

displayAllPosts();

// document.getElementById("content").addEventListener("input", function() {
//   const input = this.value;
//   const count = document.getElementById("charCount");
//   count.textContent = 150 - input.length;
// });

// Event listener for search button
document.getElementById("searchButton").addEventListener("click", () => {
  // Get keywords from the search
  const keywords = document.getElementById("searchInput").value;
  // Search for posts with keywords
  const filteredPosts = allPosts.postList.filter(post => post.tags == keywords);

  displayAllPosts(filteredPosts);
});
