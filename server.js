
import express from 'express';
import bodyParse from 'body-parser';

import { getRecommandation } from './src/endpoints/getRecommandation.js';
const { urlencoded, json }=bodyParse;
const app = express();


app.use(
    urlencoded({
    extended :true
})
);

app.use((req,res,next)=>{
    res.set("Content-Type", "application/json");
    next();
});

app.use(json());

app.get('/',async(req,res)=>{
    res.send({"d":"Welcome to the meetUp"})
});
app.post('/getRecommandation',async(req,res)=>{
    await getRecommandation(req,res);
})
var port = process.env.PORT || 3000;
app.listen(port,"0.0.0.0", () => {
    console.log(`Server Started at ${port}`)
});
export {app};