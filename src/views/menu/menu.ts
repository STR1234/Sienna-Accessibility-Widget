// @ts-ignore
import template from "./menu.html";

import FilterButtons from "./FilterButtons";
import ContentButtons from "./ContentButtons";
import ToolButtons from "../../enum/TOOL_PRESETS";

import renderButtons from "./renderButtons";
import toggle from "../../utils/toggle";
import adjustFontSize from "../../tools/adjustFontSize";
import renderTools from "./renderTools";
import { getSettings, getState, saveSettings, saveState } from "../../storage";
import reset from "./reset";
import renderFilter from "./renderFilter";
import translateMenu from "./translateMenu";

import { ILanguage, LANGUAGES } from "../../enum/Languages";
import { LANGUAGE_DICTIONARY } from "../../enum/Languages";

export interface IRenderMenuArgs {
    container: HTMLElement
}

export function renderMenu({
    container
}: IRenderMenuArgs) {
    const menu: HTMLElement = document.createElement("div");
    menu.innerHTML = template;

    menu.querySelector(".content").innerHTML = renderButtons(ContentButtons);
    menu.querySelector(".tools").innerHTML = renderButtons(ToolButtons, 'asw-tools');
    menu.querySelector(".contrast").innerHTML = renderButtons(FilterButtons, 'asw-filter');

    menu.querySelectorAll('.asw-menu-close, .asw-overlay').forEach((el: HTMLElement) => {
        el.addEventListener('click', () => {
            toggle(menu, false)
        });
    })

    menu.querySelectorAll(".asw-adjust-font div[role='button']").forEach((el: HTMLElement) => {
        el.addEventListener("click", () => {
            const margin = 0.1;

            let fontSize = getState("fontSize") ?? 1;
            if(el.classList.contains('asw-minus')) {
                fontSize -= margin;
            } else {
                fontSize += margin;
            }

            fontSize = Math.max(fontSize, 0.1);
            fontSize = Math.min(fontSize, 2);
            fontSize = Number(fontSize.toFixed(2));
            
            adjustFontSize(fontSize);

            saveState({ fontSize });
        });
    });

    menu.querySelectorAll(".asw-btn").forEach((el: HTMLElement) => {
        el.addEventListener("click", () => {
            let key = el.dataset.key;

            let isSelected = !el.classList.contains("asw-selected");

            if(el.classList.contains('asw-filter')) {
                menu.querySelectorAll('.asw-filter').forEach((el: HTMLElement) => {
                    el.classList.remove('asw-selected');
                });

                saveState({
                    contrast: isSelected ? key : false
                });

                if(isSelected) {
                    el.classList.add('asw-selected');
                }

                renderFilter();
            } else {
                el.classList.toggle('asw-selected', isSelected);

                saveState({
                    [key]: isSelected
                });

                renderTools();
            }
        });
    });

    menu.querySelector('.asw-menu-reset')?.addEventListener('click', () => {
        reset();
    });

    let $lang: HTMLSelectElement = menu.querySelector("#asw-language");

    if($lang) {
        $lang.innerHTML = LANGUAGES.map((lang: ILanguage) => `<option value="${lang.code}">${lang.label}</option>`).join('');

        let htmlLang = document.querySelector('html').getAttribute('lang');
        $lang.value = LANGUAGE_DICTIONARY[htmlLang] ? htmlLang : getSettings().lang;
    
        $lang?.addEventListener("change", () => {
            saveSettings({
                lang: $lang.value
            });
    
            translateMenu(menu);
        });

        saveSettings({
            lang: $lang.value
        });

        translateMenu(menu);
    }

    container.appendChild(menu);

    return menu;
}