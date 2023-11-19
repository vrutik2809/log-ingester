import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import elasticClient from "./config/elasticsearch.config.js"
import logRoutes from "./routes/log.route.js"

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

elasticClient.ping({
    requestTimeout: 30000,
}, (err) => {
    if (err) {
        console.log('Elasticsearch server is down');
        return;
    }
    console.log('Elasticsearch server is up');
    return;
})

app.get('/', async (req, res) => {
    return res.status(200).json({ message: 'server is connected' });
});

app.use('/api/logs',logRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT || 3000}`);
});