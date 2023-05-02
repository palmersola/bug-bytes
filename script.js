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
