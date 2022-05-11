window.onload = async function () {
  toggleAuth();
  if (getToken() == undefined) {
    return;
  }
  var res = await getUser();
  if (res.coin != undefined) {
    document.getElementById("coin").innerHTML = "Coin: " + res.coin;
  } else {
    document.getElementById("coin").innerHTML = "";
  }
};

function toggleAuth() {
  if (getToken() == undefined) {
    document.getElementById("signOut").style.display = "none";
    document.getElementById("signIn").style.display = "inline-block";
    document.getElementById("signUp").style.display = "inline-block";
  } else {
    document.getElementById("signOut").style.display = "inline-block";
    document.getElementById("signIn").style.display = "none";
    document.getElementById("signUp").style.display = "none";
  }
}

$(function () {
  $("#signOut").on("click", function () {
    var $this = $(this);
    document.cookie = "token=token; max-age=0";
    document.getElementById("coin").innerHTML = "";
    toggleAuth();
  });
  $("#get").on("click", async function () {
    var res = await getUser();
    if (res.coin != undefined) {
      document.getElementById("coin").innerHTML = "Coin: " + res.coin;
    }
    console.log(res);
  });
});