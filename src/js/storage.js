// get user storage account
function getUserStorage() {
  let user = localStorage.getItem("user");
  if (user == null) {
    return [];
  } else {
    return JSON.parse(user);
  }
}

// get user storage account
function getAdminStorage() {
  let admin = localStorage.getItem("admin");
  if (admin == null) {
    return [];
  } else {
    return JSON.parse(admin);
  }
}

// save user storage
function saveUserStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
  console.log(getUserStorage());
}

// save admin storage
function saveAdminStorage(admin) {
  localStorage.setItem("admin", JSON.stringify(admin));
  console.log(getAdminStorage());
}

export { getUserStorage, saveUserStorage, saveAdminStorage, getAdminStorage };
