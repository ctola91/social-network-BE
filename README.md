# Desplegar app en Amazon Lightsail

- Crear cuenta de amazon

- conectarse por ssh

```bash
cd stack
mkdir projects
sudo chown $USER projects
cd projects
git clone APP_URL
mv web-server myapp
sudo mkdir /opt/bitnami/projects/myapp/conf
sudo mkdir /opt/bitnami/projects/myapp/htdocs
sudo nano /opt/bitnami/projects/myapp/conf/httpd-prefix.conf
#mv to stack
```
add this

```conf
Include "/opt/bitnami/projects/myapp/conf/httpd-app.conf"
```

```bash
sudo nano /opt/bitnami/projects/myapp/conf/httpd-app.conf
```

add this

```conf
ProxyPass / http://127.0.0.1:3000/
ProxyPassReverse / http://127.0.0.1:3000/
```
add to bitnami.conf
```conf
Include "/opt/bitnami/projects/myapp/conf/httpd-prefix.conf"
```


```bash
sudo /opt/bitnami/ctlscript.sh restart apache
sudo /opt/bitnami/ctlscript.sh status apache

or

sudo vim /opt/bitnami/apache2/conf/bitnami/conf/bitnami-apps-prefix.conf
add to bitnami.conf

```conf
Include "/opt/bitnami/projects/myapp/conf/httpd-prefix.conf"
```


# npm install
npm install
# or
sudo npm install --unsafe-perm=true
```

scripts
"migrate:prod": "cross-env NODE_ENV=production npm run migrate",
"start": "cross-env NODE_ENV=production node server.js"

mean app credentials
sudo cat /home/bitnami/bitnami_credentials