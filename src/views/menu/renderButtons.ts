export default function renderButtons(buttons, btnClass?:string) {
    let _html = '';

    for(var i = buttons.length; i--;) {
        let x = buttons[i];

        _html += `
            <button class="asw-btn ${ btnClass || '' }" type="button" data-key="${ x.key }" title="${ x.label }">
                <svg class="icons-sienna"><use xmlns:xlink="http://www.w3-org/1999/xlink" href="${ x.icon }#${x.key}">Icon symbolising ${ x.label }</use></svg>
                <span class="asw-translate">${ x.label }</span>
            </button>
        `;
    }
    
    return _html;
}