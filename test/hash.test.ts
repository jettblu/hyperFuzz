import { expect, describe, it } from "vitest";
import { MinHash, SimHash } from "../src";

describe("Test hash Features", () => {
  it("cano compute similarity value with min hash", () => {
    // example usage
    const set1 = new Set([1, 2, 3, 4, 5]);
    const set2 = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const minHash = new MinHash(10, 1000000007);
    const sig1 = minHash.computeSignature(set1);
    const sig2 = minHash.computeSignature(set2);
    const similarity = minHash.computeSimilarity(sig1, sig2);
    console.log("Minhash similarity: ", similarity);
    expect(similarity).toBeTypeOf("number");
  });
  it("can compute similarity value with simhash", () => {
    const simHash = new SimHash(64);
    const sig1 = simHash.computeSignature(
      "Lebron James plays basketball for the Cleveland Cavaliers"
    );
    const sig2 = simHash.computeSignature(
      "Lebron James plays basketball for the Los Angeles Lakers"
    );
    const similarity = simHash.computeSimilarity(sig1, sig2);
    console.log("Simhash similarity: ", similarity);
    expect(similarity).toBeTypeOf("number");
  });
});
