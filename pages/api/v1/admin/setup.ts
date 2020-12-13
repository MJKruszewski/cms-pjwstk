import {NextApiRequest, NextApiResponse} from "next";
import {provide} from "@fixture/fixtures.provider";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const fixtures = await provide();

    for (const fn of fixtures) {
        await fn();
    }

    res.status(204).json({});
}