import express from "express"
import cors from 'cors'
import healthRoute from './health.route.js'
import pasteRoutes from './create.route.js'
import readRoute from './read.route.js'


const  app = express()

app.use(cors())

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello world!")
})

app.use("/api/health", healthRoute);
app.use("/api/pastes", pasteRoutes);
app.use("/p", readRoute);

export default app