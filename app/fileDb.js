const express = require('express');
const router = express.Router();
const fs = require('fs');
const nanoid = require('nanoid');

const locations = './locations';
const categories = './categories';
const items = './items';

router.get('/:path',(req,res) => {
    const path = req.params.path;
    const files = fs.readdirSync(path).reverse();
    const array = [];
    try{
        for (let i = 0; i < files.length; i++) {
            const file = fs.readFileSync(`./${path}/${files[i]}`);
            array.push(JSON.parse(file.toString()));
        }
        res.send(array);
    }catch (e) {
        console.log(e);
    }
});

router.get('/categories/:id', (req, res) => {
    const id = req.params.id;
    const files = fs.readdirSync(categories).reverse();
    const array = [];
    for (let i = 0; i < files.length; i++) {
        const file = JSON.parse(fs.readFileSync(categories + "/" + files[i]).toString());
        if (id === file.id) {
            array.push(file);
        }
    }
    res.send(array);
});

router.get('items/:id', (req, res) => {
    const id = req.params.id;
    const files = fs.readdirSync(categories).reverse();
    const array = [];
    for (let i = 0; i < files.length; i++) {
        const file = JSON.parse(fs.readFileSync(items + "/" + files[i]).toString());
        if (id === file.id) {
            array.push(file);
        }
    }
    res.send(array);
});

router.get('locations/:id', (req, res) => {
    const id = req.params.id;
    const files = fs.readdirSync(categories).reverse();
    const array = [];
    for (let i = 0; i < files.length; i++) {
        const file = JSON.parse(fs.readFileSync(locations + "/" + files[i]).toString());
        if (id === file.id) {
            array.push(file);
        }
    }
    res.send(array);
});


router.post('/:path', (req, res) => {
    const path = req.params.path;
    const id = nanoid();
    const fileName = `${id}.json`;
    let obj;
    if (path === 'items') {
        obj = {id: nanoid(),
               name: req.body.name,
               locationId: req.body.locationId,
               categoryId: req.body.categoryId};
    } else if (path === 'locations' || path === 'categories') {
        obj = {id: id, name: req.body.name};
    }
    fs.writeFileSync(`${path}/${fileName}`, JSON.stringify(obj, null, 2));
});


router.delete('/locations/:id', (req, res) => {
    const id = req.params.id;
    let files = fs.readdirSync(categories).reverse();
    let itemFiles = fs.readdirSync(items).reverse();
    let locationId;
    itemFiles.map(item => {
        const file = JSON.parse(fs.readFileSync(items + "/" + item).toString());
        locationId = file.locationId;
    });
    if (locationId === id) {
        res.send("Error")
    } else {
        for (let i = 0; i < files.length; i++) {
            const file = JSON.parse(fs.readFileSync(locations + "/" + files[i]).toString());
            if (id === file.id) {
                fs.unlinkSync(`${locations}/${file.id}.json`);
                res.send('Deleted');
            }
        }
    }
});

router.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    let files = fs.readdirSync(items).reverse();
    for (let i = 0; i < files.length; i++) {
        const file = JSON.parse(fs.readFileSync(items + "/" + files[i]).toString());
        if (id === file.id) {
            fs.unlinkSync(`${items}/${file.id}.json`);
        }
    }
    res.send('File deleted');
});

router.delete('/categories/:id', (req, res) => {
    const id = req.params.id;
    let files = fs.readdirSync(categories).reverse();
    let itemFiles = fs.readdirSync(items).reverse();
    let categoryId;
    itemFiles.map(item => {
       const file = JSON.parse(fs.readFileSync(items + "/" + item).toString());
        categoryId = file.categoryId;
    });
    if (categoryId === id) {
        res.send("Error")
    } else {
        for (let i = 0; i < files.length; i++) {
            const file = JSON.parse(fs.readFileSync(categories + "/" + files[i]).toString());
            if (id === file.id) {
                fs.unlinkSync(`${categories}/${file.id}.json`);
                res.send('Deleted');
            }
        }
    }
});

module.exports = router;