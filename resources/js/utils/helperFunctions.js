/**
 * Capitalises the first letter of each word in a sentence
 * @param {string} string - The sentence to capitalise.
 * @returns {string} Capitalised sentence
 */
export const capitaliseSentence = (string) => {
  return string
    .split(" ")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ")
}
