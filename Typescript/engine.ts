import playwright from "playwright";
const { chromium } = playwright;

export type TestStep = {
  action: "goto" | "assertText";
  selector?: string;
  value?: string;
};

export class WebTester {
  async run(steps: TestStep[]) {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    for (const step of steps) {
      if (step.action === "goto") {
        await page.goto(step.value!);
        console.log("✅ Goto:", step.value);
      }

      if (step.action === "assertText") {
        const text = await page.textContent(step.selector!);
        if (!text?.includes(step.value!)) {
          throw new Error("Assertion failed");
        }
        console.log("✅ Assert:", step.value);
      }
    }

    await browser.close();
  }
}
