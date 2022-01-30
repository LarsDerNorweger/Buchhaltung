
import { create } from "./dom.js";

interface Data { [key: string]: () => void; }

interface InputOptions
{
    style: 'radio' | 'checkbox';
    classname?: string,
    target?: HTMLElement,
    legend?: string,
}

export function createInputList(data: Data, options: InputOptions)
{
    let res = create('div', options.target);
    res.classList.add(options.classname || 'DataList');
    if (options.legend)
        create('h1', res, options.legend);

    Object.keys(data).forEach(x =>
    {
        addData(x, data[x]);
    });

    function addData(name: string, callback: () => void)
    {
        let c = create('div', res);

        let e = create('input', c);
        e.type = options.style;
        if (options.style == 'radio')
            e.name = options.classname || 'DataList';
        e.id = name;

        let l = create('label', c, name);
        l.setAttribute('for', name);

        e.onclick = () => callback();
    }

    return {
        body: res,
        addData
    };
}