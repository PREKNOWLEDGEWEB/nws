const http = require('http');
const { port } = require(process.cwd()+'/conf/app.json');
const { readfile } = require(process.cwd()+'/lib/readFile.js');
const fs = require('fs');
const path = require('path');
var site_Default = "default_site";

const requestListener = function (req, res) {
  fs.readFile(process.cwd()+`/conf/vhost/${req.headers.host}.json`, 'utf8' , (err, data) => {
    if (err) {
      site_Default = "default_site";
    }
    site_Default = JSON.parse(data).site_dir;
  })
  // res.end('Hello, World!');
  fs.readFile(process.cwd()+`/sites/${site_Default}/`+req.url, 'utf8' , (err, data) => {
    fs.readFile(process.cwd()+`/conf/extensions/${path.extname(path.basename(process.cwd()+`/sites/${site_Default}/`+req.url))}.json`, 'utf8' , (err, data) => {
      res.writeHead(200);
    //  res.setHeader('Content-Type', JSON.parse(data).ContentType);
    })
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