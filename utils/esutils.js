import elasticClient from "../config/elasticsearch.config.js";
import { generateDummyLogs } from "./dummy.js"

export const indexName = 'logs';

export const queryFields = {
    level: 'level',
    message: 'message',
    resourceId: 'resourceId',
    timestamp: 'timestamp',
    traceId: 'traceId',
    spanId: 'spanId',
    commit: 'commit',
    parentResourceId: 'metadata.parentResourceId',
}


export const bulkInsertDummyLogs = async (num) => {
    try {
        const dummyLogs = generateDummyLogs(num);
        const operations = dummyLogs.flatMap(doc => [{ index: { _index: indexName } }, doc])
        const response = elasticClient.bulk({ refresh: true, body: operations });

        console.log(`Bulk insert successful.`);
    } catch (error) {
        console.error('Error inserting documents:', error.body || error.message);
    }
};

export const deleteAllLogs = async() => {
    try {
        const response = await elasticClient.deleteByQuery({
            index: indexName,
            body: {
                query: {
                    match_all: {},
                },
            },
        });

        console.log(`Deleted documents.`);
    } catch (error) {
        console.error('Error deleting documents:', error.body || error.message);
    }

}

const indexMapping = {
    mappings: {
        properties: {
            level: { type: 'keyword' },
            message: { type: 'text' },
            resourceId: { type: 'keyword' },
            timestamp: { type: 'date' },
            traceId: { type: 'keyword' },
            spanId: { type: 'keyword' },
            commit: { type: 'keyword' },
            metadata: {
                properties: {
                    parentResourceId: { type: 'keyword' },
                },
            },
        },
    },
};

export const createIndex = async () => {
    try {
        const exists = await elasticClient.indices.exists({ index: indexName });

        if (!exists.body) {
            const response = await elasticClient.indices.create({
                index: indexName,
                body: indexMapping,
            });

            console.log(`Index "${indexName}" created. Response:`, response);
        } else {
            console.log(`Index "${indexName}" already exists.`);
        }
    } catch (error) {
        console.error('Error creating index:', error.body || error.message);
    }
}

export class QueryFilterBuilder {
    #query = {}
    constructor() {
        this.#query = {
            bool: {
                must: [],
            },
        };
    }

    addMatchFilter(field, value) {
        this.#query.bool.must.push({ match: { [field]: value } });
        return this;
    }

    addDateRangeFilter(startDate, endDate) {
        this.#query.bool.must.push({
            range: {
                [queryFields.timestamp]: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
        return this;
    }

    addRegexFilter(field, regex) {
        this.#query.bool.must.push({
            regexp: {
                [field]: regex,
            },
        });
        return this;
    }

    build() {
        return this.#query;
    }

}