# Load data
1. ssh into the system
2. `cd reaction-devtools`
3. Edit server/generator.js's line `const settings = _.clone(dev);`
4. Replace `dev` with the type of data to be loaded, options are `dev`, `ret`, `mid`, `ent`.
5. Run `npx babel-node server/generator.js --max_old_space_size=8192 --presets es2015,stage-2`

# Reaction server setup
1. ssh into the system
1. `sudo yum install -y git`
1. `curl -L https://git.io/n-install | bash`
1. `. ~/.bashrc`
1. `n 8.9.4`
1. `git clone https://github.com/reactioncommerce/reaction.git`
1. `mkdir reaction`
1. `mkdir build`
1. `cd reaction`
1. `sudo yum groupinstall "Development Tools" -y`
1. `curl https://install.meteor.com/ | sh`
1. `npm install -g reaction-cli`
1. `. ~/.bashrc`
1. `meteor npm install`
1. `meteor build ../build`
1. `cd ../build`
1. `tar xvzf reaction.tar.gz`
1. `cd bundle/programs/server/`
1. `npm install`
1. Then execute the steps from below for the data that you want to run.

# Starting Reaction
To start with mid-enterprise data
1. ssh into the system
1. `screen -S mid`
1. `cd build/bundle/`
1. `MONGO_URL=mongodb://172.31.18.209:27017/mid ROOT_URL=http://localhost.com PORT=5000 node --max_old_space_size=8192 main.js`
1. `Ctrl + a` (detach from screen)
1. The app will be available at <SERVER_IP>:5000

To start with retailer data
1. ssh into the system
1. `screen -S ret`
1. `cd build/bundle/`
1. `MONGO_URL=mongodb://172.31.18.209:27017/ret ROOT_URL=http://localhost.com PORT=4000 node --max_old_space_size=8192 main.js`
1. `Ctrl + a` (detach from screen)
1. The app will be available at <SERVER_IP>:4000

## Tips
1. To be able to signin(or atleast see the option for it), you might need to zoom out on your browser.
2. Right now when you scroll to the bottom, more products are not loaded. I guess this is a problem with reaction itself since we get the error
```
loadProducts is not a function
    at ProductGrid._this.loadMoreProducts (app.js:55305)
``` 
in the console

3. If something stops loading at all, try a refresh without cache(Cmd + Shift + R).
