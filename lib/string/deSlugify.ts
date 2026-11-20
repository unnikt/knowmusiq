import { toCamelCase } from "./camelcase";

export function deSlug(str: string) {
    str == null && (str = "");
    return toCamelCase(str.replace(/-/g, " ").replace(/%20/g, " "))
}