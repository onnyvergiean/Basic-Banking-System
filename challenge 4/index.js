const express = require('express');
const app = express();
const PORT = 3000;
const routers = require('./router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routers);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
