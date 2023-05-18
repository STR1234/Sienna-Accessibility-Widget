import { injectToolCSS } from "../utils/cssGenerator";
import IToolConfig from "../types/IToolConfig";
import { TEXT_SELECTORS } from "../enum/Selectors";

export const readableFontConfig: IToolConfig = {
    id: "readable-font",
    selector: `html`,
    childrenSelector: ['', '*:not(.icons-sienna)', ...TEXT_SELECTORS],
    styles: {
        'font-family': 'OpenDyslexic3,Arial,Helvetica,sans-serif'
    },
}

export default function readableFont(enable=false) {
    injectToolCSS({
        ...readableFontConfig,
        enable
    })
}