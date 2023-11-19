import pkg from "elasticsearch";

const { Client } = pkg

const elasticClient = new Client({ host: `${process.env.ELASTICSEARCH_HOST}:${process.env.ELASTICSEARCH_PORT}` });

export default elasticClient