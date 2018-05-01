# reaction-devtools
To start with dev data
1. ssh into the system
2. `cd reaction`
3. `screen -S dev`
4. `reaction --port 4000`
5. `Ctrl + a` (detach from screen)
6. The app will be available at <SERVER_IP>:4000

To start with mid-enterprise data
1. ssh into the system
2. `cd reaction`
3. `screen -S mid`
4. `MONGO_URL=mongodb://localhost:27017/meteor reaction`
5. `Ctrl + a` (detach from screen)
6. The app will be available at <SERVER_IP>:3000

To start with retailer data
1. ssh into the system
2. `cd reaction`
3. `screen -S retailer`
4. `reaction --port 5000`
5. `Ctrl + a` (detach from screen)
6. The app will be available at <SERVER_IP>:5000


## Tips
1. To be able to signin(or atleast see the option for it), you might need to zoom out on your browser.
2. Right now when you scroll to the bottom, more products are not loaded. I guess this is a problem with reaction itself since we get the error
```
loadProducts is not a function
    at ProductGrid._this.loadMoreProducts (app.js:55305)
``` 
in the console

3. If something stops loading at all, try a refresh without cache(Cmd + Shift + R).
