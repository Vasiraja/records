"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebTester = void 0;
const playwright_1 = __importDefault(require("playwright"));
const { chromium } = playwright_1.default;
class WebTester {
    async run(steps) {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();
        for (const step of steps) {
            if (step.action === "goto") {
                await page.goto(step.value);
                console.log("✅ Goto:", step.value);
            }
            if (step.action === "assertText") {
                const text = await page.textContent(step.selector);
                if (!text?.includes(step.value)) {
                    throw new Error("Assertion failed");
                }
                console.log("✅ Assert:", step.value);
            }
        }
        await browser.close();
    }
}
exports.WebTester = WebTester;
