const app = require("./app");
require("dotenv").config();
const config = require("../config");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});
