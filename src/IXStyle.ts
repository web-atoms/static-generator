import { IStyleDeclaration } from "@web-atoms/core/dist/web/styles/IStyleDeclaration";

type IXStyle = IStyleDeclaration | string;
export default IXStyle;

function split(t: string): IStyleDeclaration {
    const r = {};
    if (!t) {
        return r;
    }
    for (const iterator of t.split(";")) {
        const items = iterator.split(":");
        const left = items[0].trim();
        const right = items[1].trim();
        r[left] = right;
    }
    return r;
}

export function mergeStyle(left: IXStyle, right: IXStyle): IXStyle {
    if (typeof left !== "object") {
        left = split(left);
    }
    if (typeof right !== "object") {
        right = split(right);
    }
    return { ... left, ... right };
}
