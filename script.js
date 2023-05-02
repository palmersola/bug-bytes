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