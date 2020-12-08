import {NextApiRequest, NextApiResponse} from "next";
import {provide} from "../../../../fixtures/fixtures.provider";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const fixtures = provide();

    for (const fn of fixtures) {
        await fn();
    }

    res.status(204).json({});
}