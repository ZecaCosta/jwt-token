const express = require("express");
const routes = require('./routes');

const app = express();

// propriedade nativa do express pra reconhecer o body da request
app.use(express.json());

app.use(routes.photosRoute);
app.use(routes.usersRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}.`)
});
