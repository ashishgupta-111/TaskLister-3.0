const express = require("express");
const jobs = require('./routes/routes')
const cors = require("cors")
const app = express();

//user-/api/ethereum/create-task -> server.js -> routes.js -> controller.js -> tasks.js
app.use(cors())
app.use(express.json())
app.use('/api/ethereum',jobs)


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});



