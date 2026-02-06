import fs from "fs";
import { WebTester } from "./engine";

const raw = fs.readFileSync("test.json", "utf8");
const test = JSON.parse(raw);

const steps = Array.isArray(test) ? test : test.steps;

if (!Array.isArray(steps)) {
  throw new Error("Test file must be an array or contain { steps: [] }");
}

const tester = new WebTester();
tester.run(steps);
