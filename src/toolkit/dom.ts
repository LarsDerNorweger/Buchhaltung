/****************************************************
*
*   Copyright 2022 
*
*   Authors: Colin Böttger
*
*   boettger.colin@web.de
*
*****************************************************/


export { create, };

function create<K extends keyof HTMLElementTagNameMap>(tagName: K, target?: HTMLElement, innerText?: string): HTMLElementTagNameMap[K]
{
    let elem = document.createElement(tagName);
    if (target != undefined)
    {
        console.log("test");
        target.appendChild(elem);
    }
    if (innerText != undefined)
    {
        if (innerText == '')
            elem.innerText = ' \n';
        else
            elem.innerHTML = innerText;
    }
    return elem;
}