import XNode from "@web-atoms/core/dist/core/XNode";
import IXStyle from "../IXStyle";

import StyleHelper from "./StyleHelper";

export interface IITem {
    style?: IXStyle;
    children?: XNode[];
}

export default function Cell(prop: IITem, ... children: XNode[]): XNode {
    prop.children  = prop.children || children;
    return <td style={ StyleHelper.styleToString(prop.style) }>
        {prop.children}
    </td>;
}
