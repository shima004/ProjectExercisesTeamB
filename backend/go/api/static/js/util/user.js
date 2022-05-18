async function getUser() {
  var res = await axios.get("/user", {});
  return res.data;
}

async function postCoin(coin) {
  var res = await axios.post(
    "/coin",
    {
      coin: coin,
    },
    {}
  );
  return res.data;
}
