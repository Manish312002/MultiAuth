import express, { json } from "express";
import axios from "axios";

const app = express();
const port = 4000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "ManishBhoi";
const yourPassword = "MVB8380";
const yourAPIKey = "7078fdd3-64b2-4ba9-954a-ff5271e327ad";
const yourBearerToken = "ca1a86cf-7d95-44cb-8ca1-16ec4df0aac2";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  try{
    const resp = await axios.get(API_URL+"/random")
    const result = resp.data
    res.render("index.ejs",{content: JSON.stringify(result)})
  } catch(error) {
    res.status(404).send(error.message)
  }
});

app.get("/basicAuth/", async (req, res) => {
  try{
    const resp = await axios.get(API_URL+"/all?page=2",{
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    })
    const result = resp.data
    res.render("index.ejs",{content: JSON.stringify(result)})
  } catch(error) {
    res.status(404).send(error.message)
  }
});

app.get("/apiKey", async(req, res) => {
  try{
    const resp = await axios.get(API_URL+"/filter",{
      params: {
        score:5,
        apiKey: yourAPIKey,
      },
    })
    const result = resp.data
    res.render("index.ejs",{content:JSON.stringify(result)})
  } catch(error){
    res.status(404).send(error.message)
  }
});

const config = {
  headers: {authorization: 'Bearer',yourBearerToken}
}

app.get("/bearerToken",async (req, res) => {
 try{
  const resp = await axios.get(API_URL+"/secrets/2",config)
  const result = resp.data
  console.log(JSON.stringify(result))
 } catch(error){
  res.status(404).send(error.message)
 }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}  http://localhost:${port}`);
});
