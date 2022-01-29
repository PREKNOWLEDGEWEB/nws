## NWS aka(Node Web Server)
### Lightweight Static File Hosting with virtual host and more !
#### Usage
### Installation
- Step 1 : Download nws-full.zip from Releases <br>
- Step 2 : After Download unzip them and run nws.exe <br>
- Step 3 : There you go access NWS at localhost:80
### Configs
1 Editing Application Config
```txt 
conf/app.json
```
```json
{
  "app_name":"NWS Web Server",
  "port":80 <-- confugure default port to any,
  "ssl_port":443 <-- confugure ssl port to any,
  "webadmin":2232,
  "default_index":"index.html" <-- default index file
}
```
2 Adding Virtual Hosts <br>
  - Step 1 : Create conf/vhost/website address.json for example conf/vhost/example.com.json 
  - Step 2 : Edit Config as 
  ```json
  {
    "site":"site address",
    "site_dir":"folder name in sites folder ",
    "www_redir":false <-- www redirect true or false ?
  }
  ```
