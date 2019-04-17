const request = require('request');
const axios = require('axios');

var getDeck = async(deck_count) => {
    try{
        const deck = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=${deck_count}`)
        return deck.data.cards
    }catch(e){
        if(e){
            throw("Error deck")
        }
    }
};

var getImage = async(search)=>{
    try{
        const images = await axios.get(`https://images-api.nasa.gov/search?q=${search}`)
        return images.data.collection.items
    }catch(e) {
        if (e) {
            throw("Error")
        }
    }
};

module.exports = {
    getDeck,
    getImage
};