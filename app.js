const http = require('http');
const https = require('https');
const { port , default_index , ssl_port } = require(process.cwd()+'/conf/app.json');
const { readfile } = require(process.cwd()+'/lib/readFile.js');
const fs = require('fs');
const path = require('path');
try{
  const requestListener = function (req, res) {
    fs.readFile(process.cwd()+`/conf/vhost/${req.headers.host}.json`, 'utf8' , (err, data) => {
      if (err) {
        writeHost("default_site",req,res,false);
        return;
      }
      //site_Default = ;
      writeHost(JSON.parse(data).site_dir,req,res,JSON.parse(data).www_redir);
    })
    // res.end('Hello, World!');
    
  }
  function writeHost(site_Default,req,res,www_redir){
    var host = req.headers.host;
    if(!host.startsWith('www.')){
      if(www_redir){
        res.writeHead(302, {
          'Location': `http://www.${host}${req.url}`
        });
        return;
      }
    }
    try{
      var isDir = 
        fs.lstatSync(process.cwd()+`/sites/${site_Default}/`+req.url).isDirectory();
      if(isDir){
        if (fs.existsSync(process.cwd()+`/sites/${site_Default}/`+req.url+default_index)) {
          fs.readFile(process.cwd()+`/sites/${site_Default}/`+req.url+default_index, 'utf8' , (err, data) => {
            console.log("Redirecting to Index!!!");
            res.end(data);
          })
          return;
        }
      }
    }catch(e){

    }
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
  const options = {
    key: fs.readFileSync('conf/key.pem'),
    cert: fs.readFileSync('conf/cert.pem')
  };
  const server = http.createServer(requestListener);
  server.listen(port, function() {
      console.log('Node Web Server v1.1 HTTP Port : ' + port);
  });
  https.createServer(options, requestListener).listen(ssl_port, function() {
      console.log('Node Web Server v1.1 HTTPs Port : ' + ssl_port);
  });
}catch(e){
  console.log("Oh no i crashed"+e);
}