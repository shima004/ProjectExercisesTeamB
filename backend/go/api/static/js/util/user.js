async function getUser() {
  var res = await axios.get("/user", {});
  return res.data;
}

async function postCoin(coin) {
  var u = await getUser();
  if (u == undefined) {
    return;
  }
  var res = await axios.post(
    "/coin",
    {
      coin: coin,
    },
    {}
  );
  if (res.status == 200) {
    addCoinAnimation(u.name, u.coin, u.coin + coin);
  }
  return res.data;
}
