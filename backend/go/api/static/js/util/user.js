async function getUser() {
  var res = await axios.get("/user", {
    headers: {
      Authorization: "Bearer " + getToken(),
    }
  });
  return res.data;
}

async function postCoin(coin) {
  var res = await axios.post("/coin",
    {
      coin: coin
    },
    {
      headers: {
        Authorization: "Bearer " + getToken(),
      }
    }
  );
  return res.data;
}