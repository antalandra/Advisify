// LIKES OBJECT

export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLikedAdvice(id, text) {
    const like = { id, text };
    this.likes.push(like);

    // Updating the localStorage with the likes list
    this.persistData();

    return like;
  }

  deleteLikedAdvice(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(index, 1);
    this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    // Setting the recipe as a string item into localStorage
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }

  readStorage() {
    // Getting the item stored in localStorage
    const storage = JSON.parse(localStorage.getItem("likes"));

    // Restoring likes from the localStorage
    if (storage) this.likes = storage;
  }
}
