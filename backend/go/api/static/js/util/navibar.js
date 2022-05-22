window.onload = async function () {
  toggleAuth();
  updateUserData();
};

async function updateUserData() {
  if (getToken() == undefined) {
    return;
  }
  var res = await getUser();
  if (res.coin != undefined) {
    document.getElementById("coin").style.display = "inline-block";
    document.getElementById("coin").innerHTML = "Name: " + res.name + " Coin: " + res.coin;
  } else {
    document.getElementById("coin").style.display = "none";
  }
}

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

function addCoinAnimation(name, before, after) {
  var coin = document.getElementById("coin");
  before += 1;
  coin.innerHTML = "Name: " + name + " Coin: " + before + " <- " + (after - before);
  var t = setTimeout(addCoinAnimation, Math.min(1000 / (after - before), 50), name, before, after);
  if (before == after) {
    coin.innerHTML = "Name: " + name + " Coin: " + before;
    clearTimeout(t);
  }
}

$(function () {
  $("#signOut").on("click", function () {
    var $this = $(this);
    document.cookie = "token=token; max-age=0";
    document.getElementById("coin").innerHTML = "";
    document.getElementById("coin").style.display = "none";
    toggleAuth();
  });
  $("#get").on("click", async function () {
    var res = await getUser();
    if (res.coin != undefined) {
      document.getElementById("coin").innerHTML = "Coin: " + res.coin;
    }
    console.log(res);
  });
  $("#test").on("click", async function () {
    postCoin(200);
  });
});
