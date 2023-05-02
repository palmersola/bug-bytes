class Post {
  constructor(content, author, tags) {
    this.id = Math.round(new Date().getTime() + Math.random() * 100000);
    this.content = content;
    this.date = new Date();
    this.author = author;
    this.tags = tags;
  }
  create() {}
  read() {}
  update() {}
  delete() {}
}

function create () {
  const input = document.getElementById("post").ariaValueMax.trim();

}