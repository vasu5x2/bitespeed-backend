const express = require("express");
const dotenv = require("dotenv");
const identifyRoute = require("./routes/identify");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/identify", identifyRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
