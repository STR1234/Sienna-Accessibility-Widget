import { getSettings } from "./storage";
import { LANGUAGE_DICTIONARY } from "./enum/Languages";

const defaultLanguage = "de";

export function t(label: string): string {
    const { lang } = getSettings();
    const dictionary = LANGUAGE_DICTIONARY[lang] || LANGUAGE_DICTIONARY[defaultLanguage];

    return dictionary[label] || label;
}