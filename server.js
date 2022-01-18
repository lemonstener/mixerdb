const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, () => {
  console.log("OPEN ON PORT 3001");
});
