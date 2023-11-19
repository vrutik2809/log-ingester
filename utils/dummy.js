import { faker } from '@faker-js/faker';

const generateDummyLog = () => {
    return {
        level: faker.helpers.arrayElement(['info', 'warning', 'error']),
        message: faker.lorem.sentence(),
        resourceId: `server-${faker.number.int({ min: 1000, max: 9999 })}`,
        timestamp: faker.date.past().toISOString(),
        traceId: faker.string.uuid(),
        spanId: `span-${faker.number.int({ min: 100, max: 999 })}`,
        commit: faker.git.commitSha(),
        metadata: {
            parentResourceId: `server-${faker.number.int({ min: 1000, max: 9999 })}`,
        },
    };
};

export const generateDummyLogs = (numLogs) => {
    const logs = [];
    for (let i = 0; i < numLogs; i++) {
        logs.push(generateDummyLog());
    }
    return logs;
};
