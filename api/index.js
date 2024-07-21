import express from "express";
import cors from "cors";
import axios from "axios";
import cheerio from 'cheerio'


const PORT = 4000;
const app = express();

app.use(cors());
const corsOption = {
  origin: "http://localhost:5173",
};

app.get("/getData", cors(corsOption), async (req, res) => {
  const stopping = req.query.stopping
try {

  const response = await axios.get(stopping);
  const html = response.data;
  const $ = cheerio.load(html);

  const div = $("ul.masstransit-brief-schedule-view__vehicles").html();
  const span = $("span").text().split(".")[0]

  if (!div) {
    res.send(span);
  } else {
    res.send(div);
  }
  
} catch (error) {
  console.error(error);
  res.status(500).send("An error occurred while fetching the data");
}
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
