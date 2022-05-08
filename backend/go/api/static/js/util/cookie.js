function setToken(token) {
  document.cookie = "token=" + token + "; path=/; max-age=" + 60 * 60 * 24 * 3 + ";";
}

function getToken() {
  return document.cookie.split("token=")[1];
}
