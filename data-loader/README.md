# Data Setup
1. ssh into the system
1. `git clone https://github.com/reactioncommerce/reaction-devtools`
1. `cd reaction-devtools`
1. `git fetch origin akarshit-load-data`
1. `npm install`
3. Edit data/generator.js's line `const settings = _.clone(dev);`
4. Replace `dev` with the type of data to be loaded, options are `dev`, `ret`, `mid`, `ent`.
5. Run `npx babel-node data/generator.js --max_old_space_size=8192 --presets es2015,stage-2`
1. `db.createUser({user: "oplogger", pwd: "oplogger", roles: [{role: "read", db: "local"}]})`

# Starting mongo
1. The mongod server is automatically started on server start.
1. To stop the server use `sudo service mongod stop`
1. To start again use `sudo service mongod start`

# Reaction server setup
1. ssh into the system
1. `sudo yum install -y git`
1. `curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -`
1. `sudo yum install -y nodejs-8.9.4` (Make sure you use v8.9.4)
1. `sudo npm install -g pm2`
1. `sudo yum groupinstall "Development Tools" -y`
1. `curl https://install.meteor.com/ | sh`
1. `. ~/.bashrc`
1. `curl -OL https://github.com/reactioncommerce/reaction-devtools/raw/akarshit-load-data/reaction.json`
1. `git clone https://github.com/reactioncommerce/reaction.git`
1. `mkdir ~/build`
1. `cd ~/reaction`
1. `meteor npm install --save bcrypt`
1. `meteor npm install`
1. Add `BrowserPolicy.content.allowOriginForAll("d267vurrx08r5d.cloudfront.net");` in `server/startup/browser-policy.js`
1. Add ```if (Meteor.settings.cdnPrefix) {
  Meteor.startup(() => WebAppInternals.setBundledJsCssPrefix(Meteor.settings.cdnPrefix));
}``` in `server/startup/index.js`
1. `mkdir ~/reaction/packages && cd ~/reaction/packages`
1. `git clone https://github.com/Akarshit/kadira-binary-deps.git`
1. `git clone https://github.com/Akarshit/kadira-profiler.git`
1. `cd ~/reaction`
1. `meteor add akarshit:kadira-binary-deps`
1. `meteor add akarshit:kadira-profiler`
1. `meteor add meteorhacks:kadira@2.30.4` 
1. `mkdir "${HOME}/.npm-packages"` (Steps for installing reaction-cli)
1. `echo prefix=${HOME}/.npm-packages > ~/.npmrc`
1. Add to `~/.bashrc` the following  
```
NPM_PACKAGES="${HOME}/.npm-packages"

PATH="$NPM_PACKAGES/bin:$PATH"

# Unset manpath so we can inherit from /etc/manpath via the `manpath` command
unset MANPATH # delete if you already modified MANPATH elsewhere in your config
export MANPATH="$NPM_PACKAGES/share/man:$(manpath)"
```
1. `. ~/.bashrc`
1. `npm install -g reaction-cli`
1. `reaction` (this is needed to setup the imports)
1. `Ctrl + C` (after reaction starts)
1. `meteor build --directory ../build`
1. `cd ~/build/bundle/programs/server/`
1. `npm install`
1. `cd ~`
1. Edit `~/reaction.json` and fill in the details.
1. Run `pm2 start reaction.json`

# Starting Reaction
1. Reaction will start automatically
1. Make sure pm2 knows about reaction, run `pm2 list`
1. If you don't see "reaction-ret" run `pm2 start reaction.json`
1. If you see "reaction-ret" run `pm2 restart reaction-ret`
1. If you want to restart it run `pm2 restart reaction-ret`
1. The app will be available on port 4000 for "ret"
1. To monitor the app use `pm2 monit`
1. To see the logs use `pm2 logs`/ `pm2 logs --lines 1000`
1. The pm2 configuration file is at `~/reaction.json`

# Stopping Reaction
1. ssh into the app server
1. Issue `pm2 kill`

## Tips
1. To be able to signin (or at least see the option for it), you might need to zoom out on your browser.
1. If something stops loading at all, try a refresh without cache(Cmd + Shift + R).

## Server modification
1. App restarts if it takes more than 3GB of mem for 30 secs.
1. Giving node process memory max memory of 32GB.
1. Increased the sort memory limit to 1GB for mongo.


## Kadira setup
1. `git clone https://github.com/lampe/kadira-server.git`
1. Install mongod v3.4
1. Enabled replication in mongod, by adding following in `/etc/mongod.cong`
```
replication:
  replSetName: kadira
```
1. `sudo service mongod restart`
1. `mongo admin --eval 'rs.initiate({_id: "kadira", members:[{_id : 0, host : "localhost:27017"},]})'`
1. `mongo admin --eval 'rs.slaveOk()'`
1. `mongo`
1. `use kadiraApps`
1. `db.createUser({ user: "admin", pwd: "admin", roles: [ "readWrite", "dbAdmin" ]})`
1. `use kadiraData`
1. `db.createUser({ user: "admin", pwd: "admin", roles: [ "readWrite", "dbAdmin" ]})`
1. `cd ~/kadira-server`
1. edit `init-shell.sh` with 
```export APP_MONGO_URL="mongodb://admin:admin@localhost:27017/kadiraApps"
export APP_MONGO_OPLOG_URL="mongodb://localhost:27017/local"
export DATA_MONGO_URL="mongodb://admin:admin@localhost:27017/kadiraData"
export UI_PORT=8000
export AWS_DEFAULT_REGION="us-east-2"
export AWS_ACCESS_KEY_ID="<ID>"
export AWS_SECRET_ACCESS_KEY="<KEY>"
export AWS_BUCKET="reaction-kadira"
```
1. Change `s3url` in `~/kadira-server/kadira-ui/settings.json`
1. `curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -`
1. `sudo yum -y install nodejs`
1. `mongo`
1. `use kadiraData`
```
db.mapReduceProfileConfig.insert({lastTime: new Date(), _id:{profile:'1min',provider:'methods',shard:"one"}})
db.mapReduceProfileConfig.insert({lastTime: new Date(), _id:{profile:'1min',provider:'errors',shard:"one"}})
db.mapReduceProfileConfig.insert({lastTime: new Date(), _id:{profile:'1min',provider:'pubsub',shard:"one"}})
db.mapReduceProfileConfig.insert({lastTime: new Date(), _id:{profile:'1min',provider:'system',shard:"one"}})
db.mapReduceProfileConfig.insert({lastTime: new Date(), _id:{profile:'3hour',provider:'methods',shard:"one"}})
db.mapReduceProfileConfig.insert({lastTime: new Date(), _id:{profile:'3hour',provider:'errors',shard:"one"}})
db.mapReduceProfileConfig.insert({lastTime: new Date(), _id:{profile:'3hour',provider:'pubsub',shard:"one"}})
db.mapReduceProfileConfig.insert({lastTime: new Date(), _id:{profile:'3hour',provider:'system',shard:"one"}})
db.mapReduceProfileConfig.insert({lastTime: new Date(), _id:{profile:'30min',provider:'methods',shard:"one"}})
db.mapReduceProfileConfig.insert({lastTime: new Date(), _id:{profile:'30min',provider:'errors',shard:"one"}})
db.mapReduceProfileConfig.insert({lastTime: new Date(), _id:{profile:'30min',provider:'pubsub',shard:"one"}})
db.mapReduceProfileConfig.insert({lastTime: new Date(), _id:{profile:'30min',provider:'system',shard:"one"}})
```
1. In a screen:
1. `cd ~/kadira-server/kadira-engine`
1. `npm install`
1. `chmod +x ../init-shell.sh`
1. `source ../init-shell.sh`
1. `chmod +x run.sh`
1. `./run.sh`
1. In a screen:
1. `cd ~/kadira-server/kadira-rma`
1. `npm install`
1. `./run.sh`
1. In a screen:
1. In new shell `cd ~/kadira-server/kadira-ui`
1. `curl https://install.meteor.com/ | sh`
1. `. ~/.bashrc`
1. `meteor npm install --save bcrypt`
1. `meteor npm install`
1. `meteor shell`
1. Accounts.createUser({username:'admin', email:'admin@reactioncommerce.com', password:<password>})
1. `chmod +x run.sh`
1. `source ../init-shell.sh`
1. `./run.sh`
1. Navigate to <server-ip>:8000.
1. Add new "reaction" app.
1. In the terminal `mongo`
1. `use kadiraApps`
1. `db.apps.update({}, { $set: { plan: "business", pricingType: "paid" } })
1. Make sure ports 8000 and 11011 are accessible.
  
## Connect kadira to local instance
1. Navigate to http://35.165.27.196:8000/ login and create a new app with free plan.
1. Copy the appId and appSecret from the page
1. SSH into the kadira server
1. `mongo kadiraApps --eval 'db.apps.updateMany({}, { $set: { plan: "business", pricingType: "paid" } })'`
1. On local`cd <reaction-location>/packages`
1. `git clone https://github.com/Akarshit/kadira-binary-deps.git`
1. `git clone https://github.com/Akarshit/kadira-profiler.git`
1. `meteor add akarshit:kadira-binary-deps`
1. `meteor add akarshit:kadira-profiler`
1. `meteor add meteorhacks:kadira@2.30.4`
1. Create `settings.json` file with the following content
```
{
"kadira": {
  "appId": <appId>,
  "appSecret": <appSecret>,
  "options": { "endpoint": "http://35.165.27.196:11011" }
 }
}
```
1. Navigate to http://35.165.27.196:8000/ to see the logs.
