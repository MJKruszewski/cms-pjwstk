import {motherboardFixture} from "@fixture/motherboards.fixture";
import {cpuFixture} from "@fixture/cpu.fixture";
import {gpuFixture} from "@fixture/gpu.fixture";

export function provide(): Function[] {
    return [
        motherboardFixture,
        cpuFixture,
        gpuFixture,
    ]
}