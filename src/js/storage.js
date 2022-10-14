// function de recuperation des baskets
function getUserStorage() {
  let user = localStorage.getItem("user");
  if (user == null) {
    return [];
  } else {
    return JSON.parse(user);
  }
}

// gestion du panier
function saveUserStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
  console.log(getUserStorage());
}

// retirer un produit du panier
function removeUser(userId) {
  let users = getUserStorage();
  users = users.filter((p) => p.id != userId.userId);
  saveUserStorage(users);
}
export { getUserStorage, saveUserStorage, removeUser };
