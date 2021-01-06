import {driveFixture} from "@apiFixture/drive.fixture";
import {caseFixture} from "@apiFixture/case.fixure";
import {powerFixture} from "@apiFixture/power.fixture";
import {motherboardFixture} from "@apiFixture/motherboards.fixture";
import {cpuFixture} from "@apiFixture/cpu.fixture";
import {gpuFixture} from "@apiFixture/gpu.fixture";
import {ramFixture} from "@apiFixture/ram.fixture";
import {newsFixture} from "@apiFixture/news.fixture";
import {connectToDatabase} from "@apiMiddleware/mongo.middleware";
import {NEWS_COLLECTION, PC_CONFIGURATION_COLLECTION, PRODUCTS_COLLECTION} from "@apiRepository/collections.config";

export async function provide(): Promise<Function[]> {
    const db = await connectToDatabase();

    await db.collection(PRODUCTS_COLLECTION).drop().catch(i => {});
    await db.collection(PC_CONFIGURATION_COLLECTION).drop().catch(i => {});
    await db.collection(NEWS_COLLECTION).drop().catch(i => {});

    return [
        motherboardFixture,
        cpuFixture,
        gpuFixture,
        ramFixture,
        driveFixture,
        caseFixture,
        powerFixture,
        newsFixture,
    ]
}
