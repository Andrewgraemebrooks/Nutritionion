export const capitaliseSentence = (string) => {
  return string
    .split(" ")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ")
}
