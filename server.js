const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
});

app.use((request, response, next) => {
    var time = new Date().toString();
    // console.log(`${time}: ${request.method} ${request.url}`);
    var log = (`${time}: ${request.method} ${request.url}`);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to log message');
        }
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenence.hbs', {
//         title: 'Maintenance'
//     })
// });

app.get('/', (request, response) => {
    // response.send('<h1>Hello Express!</h1>');
    response.send({
        name: 'Your Name',
        school: [
            'BCIT',
            'UBC',
            'SFU',
            'Douglas',
            'UVIC',
            'UofT',
            'Waterloo',
            'Emily Carr',
            'Raph is the best'
        ]
    })
});


app.get('/converter',async(request,response)=> {
    try {
        var object = await axios.get('https://restcountries.eu/rest/v2/name/Crsgfrdanada?fullText=true');
        var code = object.data[0].currencies[0].code;
        var currency = await axios.get(`https://api.exchangeratesapi.io/latest?symbols=${code}&base=USD`);
        var exchange = JSON.stringify(currency.data.rates[`${code}`]);
        result = (`1 USD is worth ${exchange} CAD`);
    }catch (e) {
        if (coded_canada === undefined) {
            return(
                `Error: Country not exist`
            );
        } else if (rate === undefined) {
            return('Error: Code does not exist')
        } else {
            return(
                {
                    error: `${e}`
                })}}
    response.render('converter.hbs',{
        getCurrency: result
    })
});

app.get('/info', (request, response) => {
    response.render('about.hbs', {
        title: 'About page',
        year: new Date().getFullYear(),
        welcome: 'Hello!'
    });
});


app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found'
    })
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`)
});
