import { FilterQuery, InsertOneWriteOpResult, MongoClient } from 'mongodb';

export async function getMongoClient() {
    const client = await MongoClient.connect(
        'mongodb+srv://todo-next:wawdG9EEv5CTX51f@cluster0.wbwa1.mongodb.net/events?retryWrites=true&w=majority',
        { useUnifiedTopology: true }
    );

    return client;
}

export async function insertDocument(
    client: MongoClient,
    collection: string,
    document: {}
): Promise<InsertOneWriteOpResult<any>> {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);

    return result;
}

export async function findDcument(
    client: MongoClient,
    collection: string,
    query: FilterQuery<any>,
    sort = {}
): Promise<any[]> {
    return client.db().collection(collection).find(query).sort(sort).toArray();
}
