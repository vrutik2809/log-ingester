import elasticClient from "../config/elasticsearch.config.js";

import { indexName, QueryFilterBuilder,queryFields } from "../utils/esutils.js";


const buildQuery = (query) => {
    const { level, message, resourceId, timestamp, traceId, spanId, commit, parentResourceId } = query;

    const builder = new QueryFilterBuilder()

    if (level) {
        builder.addMatchFilter(queryFields.level, level)
    }
    if (message) {
        builder.addMatchFilter(queryFields.message, message)
    }
    if (resourceId) {
        builder.addMatchFilter(queryFields.resourceId, resourceId)
    }
    if (timestamp) {
        builder.addMatchFilter(queryFields.timestamp, timestamp)
    }
    if (traceId) {
        builder.addMatchFilter(queryFields.traceId, traceId)
    }
    if (spanId) {
        builder.addMatchFilter(queryFields.spanId, spanId)
    }
    if (commit) {
        builder.addMatchFilter(queryFields.commit, commit)
    }
    if (parentResourceId) {
        builder.addMatchFilter(queryFields.parentResourceId, parentResourceId)
    }

    return builder.build()
} 

export const getAllLogs = async (req, res) => {
    try {
        const query = buildQuery(req.query)

        const response = await elasticClient.search({
            index: indexName,
            body: {
                query,
            },
        });

        const logs = response.hits.hits.map(hit => hit._source);
        return res.status(200).json({ msg: 'success', data: logs });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error' })
    }
}

export const addLog = async (req, res) => {
    try {
        const response = elasticClient.index({
            index: indexName,
            body: req.body,
        });

        return res.status(200).json({ msg: 'success', data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error' })
    }
}