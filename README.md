# Chat-Pikari
- Messaging between users
- No database
- Login form with password
- Uses node modules

To run this application, you have to have [Pikari](https://github.com/olliNiinivaara/Pikari/) and [npm](https://www.npmjs.com/get-npm).

Get the application by clicking [this link](https://github.com/olliNiinivaara/Chat-Pikari/raw/master/dist/chatpikari.zip), then unzip to preferred directory. At the directory, run following command to install [lit-html](https://lit-html.polymer-project.org/): *npm install --prefix . lit-html*

This application does not use database. Therefore set *maxpagecount = 0* in *pikari.toml* configuration file.

This application asks users for a password. Therefore you should deliver a password with *-password* command line parameter at pikari start.

This application is running live *as is* at <https://verkkoyhteys.fi/chat/>. Welcome to talk anything Pikari. The password is *chatwitholli*.

![pic](https://github.com/olliNiinivaara/Chat-Pikari/raw/master/pic.png)