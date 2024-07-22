import express from "express";
import cors from "cors";
import axios from "axios";
import cheerio from 'cheerio'


const PORT = 3000;
const app = express();

app.use(cors());
const corsOption = {
  origin: "*",
};

app.get("/", cors(corsOption), async (req, res) => {
  res.send("Server is Running")
});

app.get("/data", cors(corsOption), async (req, res) => {
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

app.get("/schedule", cors(corsOption), async (req, res) => {
  const stopping = req.query.stopping;
  try {
    const response = await axios.get(stopping);
    const data = response.data;
    const $ = cheerio.load(data);
    const div = $(".table.table-striped.table-schedule").html();
    if (!div) {
      res.send("Not found");
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
