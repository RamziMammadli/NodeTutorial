import express from 'express'
import noteRoute from './router/noteRouter.js'
import authRoute from './router/authRouter.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const PORT = process.env.PORT
const MONGO_URI= process.env.MONGO_URI

app.use('/api/notes', noteRoute)
app.use('/api/users', authRoute)

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('databazaya ugurla baglanildi');
    app.listen(PORT, () => {
        console.log('BACKEND ugurla run oldu');
    })
}).catch(err => {
    console.log(err.message);
})

