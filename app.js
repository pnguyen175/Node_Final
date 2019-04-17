const hbs = require('hbs');
const express = require('express');
const bodyParser = require('body-parser');
const geocode = require('./backend.js');
var port = process.env.PORT || 8080;
var route = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views');
route.use(express.static(__dirname + '/public'));
route.set('view engine', 'hbs');
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({
    extended: true
}));

route.get('/', (request,response) => {

    try{

        response.render('index', {
            jumbo_main: "Welcome",
            jumbo_sec: "Image Parser",
        })

    }catch(err){
        if (err){
            response.render('404',{
                message: "Could not connect"
            })
        }
    }

});

route.get('/api_1', async(request,response)=> {
    try{
        response.render('api_1',{
            jumbo_main: "Enter a number"
        })
    }catch(err) {
        if (err){
            response.render('404')
        }
    }

});

route.post('/get_deck', async(request, response)=> {
    try{
        var entry = request.body.deck_entry;
        const code = await geocode.getDeck(entry);
        console.log(code[1].image);

        var deck_list = [];
        for (var i=0; i< code.length; i++){
            deck_list.push({image: code[i].image})
        }
        response.render('api_1',{
            jumbo_main: "Deck",
            jumbo_sec: "Build a deck",
            url: deck_list
        });
    }catch (err){
        if (err){
            response.render('api_1', {
                jumbo_main: "Deck App",
                jumbo_sec: "Could not connect to server."
            })
        }
        }


});

route.post('/get_image', async(request, response)=> {
    try{
        var entry = request.body.image_entry;
        var imageapi = await geocode.getImage(entry);
        var images = [];

        for (var i=0; i<imageapi.length; i++){
            images.push({path: imageapi[i].links[0].href});
        }
        response.render('index', {
            jumbo_main: "Welcome",
            jumbo_sec: "Image Parser",
            url: images
        })
    }catch(err){
        if (err){
            response.render('index', {
                jumbo_main: "Welcome",
                jumbo_sec: err
            })
        }
    }
});

route.listen(port, (request, response) => {
    console.log(`Server is up on port ${port}`)
});
