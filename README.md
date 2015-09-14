# hexo-hey
an admin plugin for hexo, support hexo v3.x
using es6 + angular + materail + jwt

## Demo
http://hey.liteno.com/admin  
username: hexo  
passowrd: hey  

## About
* client framework: angular
* dashboard ui: material
* authentication: jwt
* markdown parser: marked
* markdown style: github-markdown-css
* markdown editor: ace

## How to use
### 1. install hexo-hey
```
npm install nihgwu/hexo-hey --save
```

### 2. add a admin config section to `_config.yml`:
``` yml
# Admin
admin:
    name: hexo
    password: hey
    secret: hey hexo
    expire: 60*1
    # cors: http://localhost:3000
```
cors is optional if you want serve your client in another place(CDN for example)

### 3. serve hexo
```
hexo serve
```
then visit http://localhost:4000/admin, and login with the account set in previous step
