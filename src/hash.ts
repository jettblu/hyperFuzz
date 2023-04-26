/*
 * @description Neighbor sensitive hashing.
 * @param data: data matrix
 * @param b: hash code length
 * @param n: parameter for coordinate transformation
 */
// The Hash Function component is composed of b bit functions, each re- sponsible for generating an individual bit of the overall hashcode.
function nsh(data: number[][], b: number, n: number) {
  throw new Error("Not implemented");
}

/*
 * @description Neighbor sensitive transformation.
 * @param data: data matrix
 * @param pivots: pivots used for pivoted transformation
 * @param n: parameter for coordinate transformation
 */
function nst(data: number[][], pivots: number[][], n: number) {
  throw new Error("Not implemented");
}

/**
 * @description MinHash.
 * @param numHashes: number of hash functions
 * @param maxVal: the max value for each hash function
 */
// The MinHash component is composed of b hash functions, each responsible for generating an individual bit of the overall hashcode.
export class MinHash {
  private numHashes: number;
  private maxVal: number;
  private hashes: ((x: number) => number)[];

  constructor(numHashes: number, maxVal: number) {
    this.numHashes = numHashes;
    this.maxVal = maxVal;
    this.hashes = [];
    for (let i = 0; i < numHashes; i++) {
      const a = Math.floor(Math.random() * maxVal);
      const b = Math.floor(Math.random() * maxVal);
      this.hashes.push((x: number) => (a * x + b) % maxVal);
    }
  }

  public computeSignature(set: Set<number>): number[] {
    // initialize signature with infinity for each value
    const sig = new Array<number>(this.numHashes).fill(Infinity);
    for (const elem of set) {
      for (let i = 0; i < this.numHashes; i++) {
        sig[i] = Math.min(sig[i], this.hashes[i](elem));
      }
    }
    return sig;
  }

  public computeSimilarity(sig1: number[], sig2: number[]): number {
    let count = 0;
    for (let i = 0; i < sig1.length; i++) {
      if (sig1[i] === sig2[i]) {
        count++;
      }
    }
    return count / sig1.length;
  }
}

export class SimHash {
  private numBits: number;
  private hashFunctions: ((str: string) => number)[];

  constructor(numBits: number) {
    this.numBits = numBits;
    this.hashFunctions = [];
    for (let i = 0; i < numBits; i++) {
      const a = Math.floor(Math.random() * 1000000007);
      const b = Math.floor(Math.random() * 1000000007);
      this.hashFunctions.push((str: string) => {
        let hash = 0;
        for (const c of str) {
          const code = c.charCodeAt(0);
          hash = (hash * a + code * b) % 1000000007;
        }
        return hash;
      });
    }
  }

  public computeSignature(str: string): number {
    const counts = new Array<number>(this.numBits).fill(0);
    const words = str.split(/\s+/);
    for (const word of words) {
      const hash = this.hashWord(word);
      for (let i = 0; i < this.numBits; i++) {
        if (hash & (1 << i)) {
          counts[i]++;
        } else {
          counts[i]--;
        }
      }
    }
    let signature = 0;
    for (let i = 0; i < this.numBits; i++) {
      if (counts[i] > 0) {
        signature |= 1 << i;
      }
    }
    return signature;
  }

  private hashWord(word: string): number {
    let hash = 0;
    for (const func of this.hashFunctions) {
      const value = func(word);
      hash = (hash + value) % 1000000007;
    }
    return hash;
  }

  public computeSimilarity(sig1: number, sig2: number): number {
    let count = 0;
    for (let i = 0; i < this.numBits; i++) {
      if ((sig1 & (1 << i)) === (sig2 & (1 << i))) {
        count++;
      }
    }
    return count / this.numBits;
  }
}
