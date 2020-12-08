import {NextApiRequest, NextApiResponse} from "next";
import {connectToDatabase} from "@middleware/mongo.middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let k = await connectToDatabase();
    await k.collection('test').insertOne({'kekw': 'kekw'});

    res.status(200).json( await k.collection('test').find({}).toArray())
}