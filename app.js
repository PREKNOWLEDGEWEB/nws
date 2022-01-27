const http = require('http');
const { port } = require(process.cwd()+'/conf/app.json');
const { readfile } = require(process.cwd()+'/lib/readFile.js');
const fs = require('fs');
var site_Default = "default_site";

const requestListener = function (req, res) {
  res.writeHead(200);
  fs.readFile(process.cwd()+`/conf/vhost/${req.headers.host}.json`, 'utf8' , (err, data) => {
    if (err) {
      site_Default = "default_site";
    }
    site_Default = JSON.parse(data).site_dir;
  })
  // res.end('Hello, World!');
  fs.readFile(process.cwd()+`/sites/${site_Default}/`+req.url, 'utf8' , (err, data) => {
    if (err) {
      res.writeHead(200);
      fs.readFile(process.cwd()+"/errors/404.html", 'utf8' , (err, data) => {
        if (err) {
         console.error("404 Page Not Found Exiting C:234");
         process.exit();
        }
        res.end(data);
      })
      return;
    }
    res.end(data);
  })
  console.log(req.url + "<<<Requested Content ----- Host : "+req.headers.host+">>>");
  console.log();
}

const server = http.createServer(requestListener);
server.listen(port);