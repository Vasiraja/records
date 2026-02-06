"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const engine_1 = require("./engine");
const raw = fs_1.default.readFileSync("test.json", "utf8");
const test = JSON.parse(raw);
const steps = Array.isArray(test) ? test : test.steps;
if (!Array.isArray(steps)) {
    throw new Error("Test file must be an array or contain { steps: [] }");
}
const tester = new engine_1.WebTester();
tester.run(steps);
