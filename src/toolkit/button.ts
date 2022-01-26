/****************************************************
*
*   Copyright 2022 
*
*   Authors: Colin Böttger
*
*   boettger.colin@web.de
*
*****************************************************/

import { create } from "./dom.js";

enum CssClassnames
{

}

interface ButtonOptions
{
    onclick?: (ev: MouseEvent, btn: HTMLButtonElement) => void,
    target?: HTMLElement,
    text?: string,
    isEnabled?: boolean,
}

export function createButton(options?: ButtonOptions)
{
    let btn = create('button');

    if (options?.text)
        btn.innerText = options.text;

    let cb = options?.onclick;
    if (cb !== undefined)
        btn.onclick = (ev) => cb!(ev, btn);

    if (options?.isEnabled !== undefined)
        btn.disabled = !options.isEnabled;

    if (options?.target)
        options.target.appendChild(btn);

    return btn;
}
