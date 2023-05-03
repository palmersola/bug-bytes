const content = document.getElementById("content");
const author = document.getElementById("author");
const tags = document.getElementById("tags");
const submitBtn = document.getElementById("submitBtn");
let ifUpdate = false;
let updateId;
const feedType = document.getElementById("feedType");

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

allPosts.create("JavaScript is interesting but hard. I kind of like it but don't at the same time! &#128517;", "Kia", "javascript, interesting");
allPosts.create('"Break your limits and outgrow yourself." - A reminder to let yourself grow from positivity energies. And Hooray.. We are almost done with Full-Stack-102! &#128578;', "Lee", "positivity, grow");
allPosts.create("The Secret to Success for a Software Developer<br>One of the most important aspects of being a software developer is staying up to date with the latest technology trends. With new programming languages, frameworks, and tools emerging constantly, it's important to stay ahead of the curve to deliver the best possible solutions to clients.", "Carlos", "developer, engineer, programmer");
allPosts.create("3 Struggles of a Beginner Coder<br>So you've decided to learn to code. It can be a lot of fun. But it can also be a frustrating at times. Here are 3 struggles that every beginner coder can relate to:<br> 1. You spend hours trying to figure out a bug, only to realize you forgot a semicolon.<br> 2. You try to write a function, but it keeps crashing.<br>3. You try to explain what you do to your friends and family, but they just stare at you blankly.", "Darranda", "struggles, beginner, coder");
allPosts.create("This is some text", "Palmer", "word, word, word");


//DOM manipulation to show all posts
function displayAllPosts(search) {
  let postList = document.getElementById("listOfPosts");
  postList.innerHTML = "";
  let posts = allPosts.read();
  let list = search ? search : posts;
  feedType.innerText = search ? "Search Results" : "All Posts";
  for (let i = 0; i < list.length; i++) {
    let post = list[i];
    let postElement = document.createElement("div");
    postElement.classList.add("postCard");

    postElement.innerHTML = `<div class="innerDiv">
    <span class="postAuthor">${post.author}</span><br>
    <span class="postDate">${post.date}</span>
    </div>
    <div class="innerDiv">
    <div class="contentDiv">
    <span class="postContent">${post.content}</span><br>
    </div>
    <span class="postTags">${post.tags}</span><br>
    <button class="deleteButton btn btn-outline-success" onclick="allPosts.delete(${post.id})">Delete</button>
    <button class="deleteButton btn btn-outline-success" onclick="update(${post.id})">Update</button>
    </div>`;

    postList.appendChild(postElement);
  }
  reset();
}

function create() {
  const contentVal = content.value.trim();
  const authorVal = author.value.trim();
  const tagsVal = tags.value.trim();
  if (contentVal !== "" && authorVal !== "" && tagsVal !== "") {
    if (contentVal.length <= 150) {
      allPosts.create(contentVal, authorVal, tagsVal);
      displayAllPosts();
      content.value = " ";
      // document.getElementById("count").textContent = "150";
    } else {
      alert("Your Post exceeded the character amount.");
    }
  } else {
    alert("Post something...");
  }
}
const characterCount = document.getElementById("content");
const characterText = document.getElementById("count1");
const MAX_CHARS = 150;

characterCount.addEventListener("input", () => {
  const remaining = MAX_CHARS - characterCount.value.length;
  characterText.textContent = `${remaining} characters remaining`;
});

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
document.getElementById("searchButton").addEventListener("click", e => {
  // Get keywords from the search
  e.preventDefault();
  const keywords = document.getElementById("searchInput").value;
  // Search for posts with keywords
  const filteredPosts = allPosts.postList.filter(post => post.tags == keywords);

  displayAllPosts(filteredPosts);
});
