class Post {
  constructor(content, author, tags) {
    this.id = Math.round(new Date().getTime() + Math.random() * 100000);
    this.content = content;
    this.date = new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
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

  update(id) {
    console.log(id);
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
    <button class="deleteButton" onclick="deletePost(${post.id})">Delete</button>
    </div>
    <div>
    <span class="postContent">${post.content}</span>
    <span class="postTags">${post.tags}</span>
    <button onclick="allPosts.delete(${post.id})">DELETE</button>
    <button onclick="allPosts.update(${post.id})">UPDATE</button>
    </div>`;

    postList.appendChild(postElement);
  }
}

function create() {
  const content = document.getElementById("content").value.trim();
  const author = document.getElementById("author").value.trim();
  const tags = document.getElementById("tags").value.trim();
  if (content !== "") {
    if (content.length <= 150) {
      allPosts.create(content, author, tags);
      console.log(allPosts.postList);
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
