const express = require ('express')
const app= express()
const mongoose= require('mongoose')
require('dotenv').config();
const path = require('path');
const persone = require('../REstAPICheckPoint/models/user')
require('dotenv').config({ path: path.join(__dirname, './config/.env') });
const user = require('../REstAPICheckPoint/models/user')

app.use(express.json())
const port= process.env.PORT
mongoose.connect(process.env.MONGO_URI)
.then(console.log('database connected successfully'))
.catch(err=>{if (err) throw err})
app.listen(port,()=>{console.log('app listening on port',port)})
//get method
app.get('/', async (req, res) => {
    try {
        const AllUser = await user.find()
        res.status(200).json({ msg: 'all records are following:', AllUser })
    }
    catch (err) { res.status(500).json({ msg: err.message }) }
})
//POST method
app.post('/', async (req, res) => {
    try {
        const newUser = new user(req.body)
        await newUser.save()
        res.status(200).json({ msg: 'person created successfly', newUser })
    }
    catch (err) { res.status(500).json({ msg: err.message }) }
})
//PUT method by id
app.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const TheUser = await user.findOneAndUpdate({ _id: id }, { ...req.body })
        res.status(200).json({ msg: 'person mached:', TheUser })
        console.log(id)
    }
    catch (err) { res.status(500).json({ msg: err.message }) }
})
//DELETE method by id
app.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedUser = await persone.deleteOne({ _id: id })
        res.status(200).json({ msg: 'person mached:', deletedUser })
    }
    catch (err) { res.status(500).json({ msg: err.message }) }
})