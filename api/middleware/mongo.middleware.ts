import {Db, MongoClient} from 'mongodb'

let cached: MongoClient;

export const connectToDatabase = async (): Promise<Db> => {
    if (cached) return cached.db(process.env.DB_NAME);

    const client = new MongoClient(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        }
    });

    cached = await client.connect();

    return cached.db(process.env.DB_NAME);
};

export const mapMongoId = res => {
    // @ts-ignore
    res.id = res._id;
    // @ts-ignore
    delete res._id;

    return res;
};