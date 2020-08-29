require('dotenv').config(); // read .env files
const express = require('express'); 
const app = express();
const port = process.env.PORT || 4200;

var fs = require('fs');  

var elements  = fs.readFileSync('Data.json');
var data = JSON.parse(elements); 

// Set public folder as root
app.use(express.static('base'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirect all traffic to index.html
//app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(function (req, res, next) {
  if (req.originalUrl === '/allfurnitures') {
    return next();
  } else {
    res.sendFile(`${__dirname}/base/index.html`);
  }
});

// when get request is made, alldata() is called 
app.get('/allfurnitures', allFurniture); 

function allFurniture(request, response) {    
    // Returns all information about the elements 
    response.send(data); 
} 

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
});