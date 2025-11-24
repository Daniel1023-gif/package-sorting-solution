const BULKY_VOLUME_THRESHOLD = 1_000_000;   // cubic centimeters
const BULKY_DIMENSION_THRESHOLD = 150;      // centimeters
const HEAVY_MASS_THRESHOLD = 20;            // kilograms

/**
 * Determines the destination stack for a package based on size and mass.
 *
 * Rules:
 * - Bulky: volume >= 1,000,000 cm³ OR any dimension >= 150 cm
 * - Heavy: mass >= 20 kg
 * - REJECTED: package is both bulky AND heavy
 * - SPECIAL : package is bulky OR heavy
 * - STANDARD: package is neither bulky nor heavy
 *
 * @param {number} width   Width in centimeters
 * @param {number} height  Height in centimeters
 * @param {number} length  Length in centimeters
 * @param {number} mass    Mass in kilograms
 *
 * @returns {string} One of: "STANDARD", "SPECIAL", "REJECTED"
 */
function sort(width, height, length, mass) {
    const volume = width * height * length;

    const isBulky =
        volume >= BULKY_VOLUME_THRESHOLD ||
        Math.max(width, height, length) >= BULKY_DIMENSION_THRESHOLD;

    const isHeavy = mass >= HEAVY_MASS_THRESHOLD;

    if (isBulky && isHeavy) {
        return "REJECTED";
    }

    if (isBulky || isHeavy) {
        return "SPECIAL";
    }

    return "STANDARD";
}

console.log(sort(50, 40, 30, 5));       // STANDARD
console.log(sort(100, 100, 100, 10));   // SPECIAL (bulky by volume)
console.log(sort(200, 50, 50, 10));     // SPECIAL (bulky dimension)
console.log(sort(200, 200, 200, 30));   // REJECTED (bulky + heavy)

module.exports = { sort };
