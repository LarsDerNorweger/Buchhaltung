import { create } from "./dom.js";
import { createButton } from "./button.js";

enum CSSClassNames
{
    menu = 'Menu',
    choose = 'selected',
}

interface MenuContent
{
    [key: string]: () => void;
}

export function createMenu(content: MenuContent, target: HTMLElement)
{
    let lastclicked: HTMLButtonElement | null = null;

    let div = create('div', target);
    div.classList.add(CSSClassNames.menu);

    let h = create('h1', div);
    let m = create('div', div);

    let first: HTMLButtonElement | undefined;
    let c: () => void;

    Object.keys(content).forEach(x =>
    {
        let b = createButton({
            onclick: (ev, btn) => handleClick(btn, content[x]),
            text: x,
            target: m
        });
        if (!first)
        {
            first = b;
        }
    });
    if (first)
        setTimeout(() => first?.click(), 10);

    function handleClick(btn: HTMLButtonElement, callback: () => void)
    {
        if (lastclicked != null)
            lastclicked.classList.remove(CSSClassNames.choose);
        btn.classList.add(CSSClassNames.choose);
        h.innerText = btn.innerText;
        callback();
        btn.blur();
        lastclicked = btn;
    }
}