import {motherboardFixture} from "@fixture/motherboards.fixture";
import {cpuFixture} from "@fixture/cpu.fixture";
import {gpuFixture} from "@fixture/gpu.fixture";
import {connectToDatabase} from "@middleware/mongo.middleware";
import {NEWS_COLLECTION, PC_CONFIGURATION_COLLECTION, PRODUCTS_COLLECTION} from "@repository/collections.config";
import {newsFixture} from "@fixture/news.fixture";

export async function provide(): Promise<Function[]> {
    const db = await connectToDatabase();

    await db.collection(PRODUCTS_COLLECTION).drop().catch(i => {});
    await db.collection(PC_CONFIGURATION_COLLECTION).drop().catch(i => {});
    await db.collection(NEWS_COLLECTION).drop().catch(i => {});

    return [
        motherboardFixture,
        cpuFixture,
        gpuFixture,
        newsFixture,
    ]
}