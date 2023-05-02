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
  read() {}
  update() {}
  delete() {}
}

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