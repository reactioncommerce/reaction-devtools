# Data Setup
1. ssh into the system
2. `cd reaction-devtools`
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
1. `cd bundle/programs/server/`
1. `npm install`
1. copy the `reaction_ret` and `reaction_mid` files to `/home/ec2-user`
1. Run `crontab -e`
1. Add this line to the crontab: `@reboot /home/ec2-user/reaction_ret` for the "retailer" version
1. Add this line to the crontab: `@reboot /home/ec2-user/reaction_mid` for the "mid-erprise" version
1. Then execute the steps from below for the data that you want to run

# Starting Reaction
1. Reaction will start automatically
1. If you want to restart it run `/home/ec2-home/reaction_ret &` or `/home/ec2-home/reaction_mid &`
1. The app will be available on port 4000 for "ret" and 5000 for "mid"

To start with Mid Retailer data
1. ssh into the system
1. `screen -S ret`
1. `cd build/bundle/`
1. `MONGO_URL=mongodb://172.31.18.209:27017/ret ROOT_URL=http://localhost.com PORT=4000 node --max_old_space_size=8192 main.js`
1. `Ctrl + a` (detach from screen)
1. The app will be available at <SERVER_IP>:4000

# Stopping Reaction
1. ssh into the system
1. List screens running `screen -ls`
2. Attach the screen `screen -r mid` or `screen -r ret`
3. Stop reactoin `Ctrl + C`
4. Exit from the screen `exit`

## Tips
1. To be able to signin(or atleast see the option for it), you might need to zoom out on your browser.
2. Right now when you scroll to the bottom, more products are not loaded. I guess this is a problem with reaction itself since we get the error
```
loadProducts is not a function
    at ProductGrid._this.loadMoreProducts (app.js:55305)
``` 
in the console

3. If something stops loading at all, try a refresh without cache(Cmd + Shift + R).
