import assert from "node:assert/strict"; import test from "node:test"; import { estimateRows, totals } from "../calculator.js";
test("calculates weight and earnings",()=>{const [row]=estimateRows([{materialId:"aluminum",count:100,condition:"sorted"}],{sorted:2});assert.equal(row.weight,3);assert.equal(row.earnings,6)});
test("clamps negative inputs",()=>{const [row]=estimateRows([{materialId:"aluminum",count:-4,condition:"sorted"}],{sorted:-2});assert.equal(row.count,0);assert.equal(row.earnings,0)});
test("totals rows",()=>assert.deepEqual(totals([{count:2,weight:3,earnings:4},{count:1,weight:2,earnings:3}]),{count:3,weight:5,earnings:7}));
