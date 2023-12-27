const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true })); // cors 허용

app.use(express.json());

app.get("/search/book", async (req, res) => {
  // 클라이언트가 보낸 쿼리값을 받아서
  const { searchQuery } = req.query;
  //   const url = `http://www.aladin.co.kr/~${encodeURIComponent(searchQuery)}`;
  const url = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbpsi_321109003&Query=${searchQuery}&QueryType=Keyword&&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`;

  try {
    // 알라딘 서버에 검색 요청
    const {
      data: { item: result },
    } = await axios.get(url);
    // 응답을 받으면 클라이언트에게 전달
    if (result) res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Listening to port 3000...");
});
