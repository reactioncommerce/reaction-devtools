# Data Setup
1. ssh into the system
1. `git clone https://github.com/reactioncommerce/reaction-devtools`
1. `cd reaction-devtools`
1. `git fetch origin akarshit-load-data`
1. `npm install`
3. Edit server/generator.js's line `const settings = _.clone(dev);`
4. Replace `dev` with the type of data to be loaded, options are `dev`, `ret`, `mid`, `ent`.
5. Run `npx babel-node server/generator.js --max_old_space_size=8192 --presets es2015,stage-2`

# Starting mongo
1. The mongod server is automatically started on server start.
1. To stop the server use `sudo service mongod stop`
1. To start again use `sudo service mongod start`

# Reaction server setup
1. ssh into the system
1. `sudo yum install -y git`
1. `curl -L https://git.io/n-install | bash`
1. `. ~/.bashrc`
1. `n 8.9.4`
1. `git clone https://github.com/reactioncommerce/reaction.git`
1. `git fetch origin fix-4090-akarshit-load-more`
1. `git merge origin/fix-4090-akarshit-load-more`
1. `mkdir build`
1. `cd reaction`
1. `sudo yum groupinstall "Development Tools" -y`
1. `curl https://install.meteor.com/ | sh`
1. `npm install -g reaction-cli`
1. `. ~/.bashrc`
1. `meteor npm install --save bcrypt`
1. `meteor npm install`
1. `meteor build --directory ../build`
1. `cd ../build`
1. `tar xvzf reaction.tar.gz`
1. `cd bundle/programs/server/`
1. `npm install`
1. copy the `reaction_ret` and `reaction_mid` files to `/home/ec2-user`
1. Run `crontab -e`
1. Add this line to the crontab: `@reboot /home/ec2-user/reaction_ret` for the "retailer" version
1. Add this line to the crontab: `@reboot /home/ec2-user/reaction_mid` for the "mid-erprise" version
1. Then execute the steps from below for the data that you want to run

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
1. App restarts if it takes more than 3GB of mem.
1. 
