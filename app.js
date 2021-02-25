const express = require('express');
const app = express();
const main = require('./routers/main');
const api = require('./routers/api');
const config = require('config');
const port = config.get('app.port')
const credentials = require('./models/credential');
const cookieParser = require('cookie-parser');
app.use(cookieParser(credentials.cookieSecret));



app.listen(port , ()=>{
  console.log("listen on port:" + port );
});

app.set('views', './views');
app.set('view engine', 'ejs');
app.use("/", main);
app.use("/api", api);

app.use("/public",express.static('./public'));