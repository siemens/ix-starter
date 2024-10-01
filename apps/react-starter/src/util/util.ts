export default function camelCaseToNormal(camelCase: string): string {
  return camelCase
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b[a-z]{2,3}\b/g, (str) => str.toUpperCase())
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/(?<=\s)[A-Z]/, (str) => str.toLowerCase());
}
