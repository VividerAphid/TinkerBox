// See: https://en.wikipedia.org/wiki/Linear_congruential_generator
// See: https://en.wikipedia.org/wiki/Lehmer_random_number_generator
// Original Lehmer RNG construction
const m = 65537 // (2 ^ 16) + 1,  a fermat prime
const a = 75 // a primitive root modulo
const x0 = 65536 // a seed number, greater than '0', less than 'm'
const md = m - 1 // a floating-point devider

// Lehmer random number generator formula
function rng(x) {
  return (x * a) % m
}

// random min-max number formula
function rmm(min, max, x) {
  return min + (x % (max - min))
}

// random min-max decimal number formula
function rmmd(min, max, x) {
  return min + ((max - min) * x)
}

// checks seed number is valid
function iv(n) {
  if (typeof n != "number")
    throw new Error("expected a number!");
  if (n <= 0 || n >= m)
    throw new Error("invalid seed number!");
  if (n % 1 != 0)
    throw new Error("seed number should be an integer!");
}

// checks min, max number is valid
function ivmmd(min, max) {
  if (typeof min != "number" || typeof max != "number")
    throw new Error("expected a number!")
  if (min > max)
    throw new Error("invalid 'min'-'max' number!")
}

// checks min, max number is valid
function ivmm(min, max) {
  ivmmd(min, max)
  if (min % 1 != 0 || max % 1 != 0)
    throw new Error("'min'-'max' number should be an integer!")
}

class Random {
  // original seed, current seed
  static #ox = x0;
  static #cx = x0;

  /**
   * get or set a seed value
   * note: seed number can be between (0, 65537) a integer value
   * @param {Number} n a seed number
   * @returns a seed number
   */
  static seed(n) {
    if (n === undefined)
      return this.#ox;
    iv(n);
    this.#ox = n;
    this.#cx = n;
  }

  /**
   * get a random number between [min, max)
   * @param {Number} min minimum number
   * @param {Number} max maximum number
   * @returns a number
   */
  static range(min, max) {
    ivmm(min, max);
    this.#cx = rng(this.#cx);
    return rmm(min, max, this.#cx);
  }

  /**
   * get a random decimal number between [min, max]
   * @param {Number} min minimum decimal number
   * @param {Number} max maximum decimal number
   * @returns a decimal number
   */
  static ranged(min, max) {
    ivmmd(min, max);
    this.#cx = rng(this.#cx)
    return rmmd(min, max, rmm(0, m, this.#cx) / md)
  }
}