const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const backend = require('./backend');

const port = process.env.PORT || 8080;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

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
            jumbo_main: "Application 2"
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
        const code = await backend.getDeck(entry);
        console.log(code[1].image);

        var deck_list = [];
        for (var i=0; i< code.length; i++){
            deck_list.push({image: code[i].image})
        }
        response.render('api_1',{
            jumbo_main: "Currency Converter",
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
        var imageapi = await backend.getImage(entry);
        // console.log(imageapi);
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
    console.log(`server is up on port ${port}`)
});
