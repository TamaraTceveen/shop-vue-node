const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('./dist'));
app.use(express.json());

// catalog
app.get('/api/catalog/:countOfGoodsToShow', (req, res) => {
    fs.readFile('./catalog.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read catalog.json error!', err);
            res.status(500).send('Server error');
            return;
        }
        const countOfGoodsToShow=req.params.countOfGoodsToShow;
        console.log('trying to limit output count');
        const returnvalue=JSON.parse(rawData).slice(0,countOfGoodsToShow);
        //req.body.countOfGoodsToShow
        console.log('trying to send respnse'+ returnvalue);
        res.send(returnvalue);
        
    });
});

// basket
app.get('/api/basket', (req, res) => {
    fs.readFile('./basket.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read basket.json error!', err);
            res.status(500).send('Server error');
            return;
        }

        res.send(rawData);
        
    });
});

// addToBasket
app.post('/api/basket', (req, res) => {
    console.log('we are trying to add');
    fs.readFile('./basket.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Add to basket.json error!', err);
            res.status(500).send('Server error');
            return;
        }
        const basket = JSON.parse(rawData);
        
        const item = req.body;
        
        const index = basket.findIndex((basketItem) => basketItem.productId === item.productId);
        if (index > -1) {
            basket[index].quantity += 1;
        } else {
            basket.push({ ...item, quantity: 1 });
        }

        fs.writeFile('./basket.json', JSON.stringify(basket), (err) => {

            if (err){
                console.log('Write basket.json error!', err);
                res.status(500).send('Server error');
                return;
            }
            //logger('ADD', item.id, item.title);

            res.json({ success: true});
        });

    });
});

// removeFromBasket

app.delete('/api/basket/:productid', (req, res) => {
    console.log('We are trying to remove');
    fs.readFile('./basket.json', 'utf-8', (err, rawData) => {
        if(err){
            console.log('Read basket.json error!', err);
            res.status(500).send('Server error');
            return;
        }

        let basket = JSON.parse(rawData);
        console.log('this is req params ' + req.url);
        const id = parseInt(req.params.productid);

        console.log('this is id: ' + id);
        basket = basket.filter((goodsitem) => goodsitem.productId !== id);
        console.log('this is basket: ' + basket);
        fs.writeFile('./basket.json', JSON.stringify(basket), (err) => {
            if (err) {
                console.log('Write basket.json error!', err);
                res.status(500).send('Server error');
                return;
            }
            // logger('REMOVE', id, req.params.title);

            res.json({ success: true});
        });
    });
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});