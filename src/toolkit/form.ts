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

type Elements = 'checkbox' | 'number' | 'date' | 'button' | 'string';

interface Options
{
    type: Elements;
    label?: string,
    onlclick?: () => void,
    disabled?: boolean,
    writeable?: boolean,
    min?: number,
    max?: number,
}



type Entries = { [name: string]: Options; };
type Preset = { [name: string]: number | Date | boolean | string; };


export class Form
{
    main: HTMLDivElement;

    private Inputs = new Map<string, HTMLDivElement>();

    constructor(e: Entries, label?: string)
    {
        this.main = create('div');
        this.main.classList.add('DataForm');
        if (label)
            create('h1', this.main, label);
        Object.keys(e).forEach(x => this.Inputs.set(x, this._BuildContent(e[x])));
    }

    getValues(callback: (key: string, value: string | boolean) => void)
    {
        this.Inputs.forEach((e, key) => 
        {
            let child: ChildNode | null = null;
            if (e)
            {
                child = e.lastChild;
            }

            if (child instanceof HTMLInputElement)
            {
                callback(key, child.checked ? child.checked : child.value);
            }

        });
    }

    setDatat(key: string, value: string | boolean)
    {
        let t = this.Inputs.get(key);
        let child: ChildNode | null = null;

        if (t)
            child = t.lastChild;
        if (child instanceof HTMLInputElement)
        {
            if (typeof value == 'boolean')
                child.checked = value;
            if (typeof value == 'string')
                child.value = value;
        }
    }

    createForm(target: HTMLElement)
    {
        target.appendChild(this.main);
    }

    private _BuildContent(op: Options)
    {
        let inDiv = create('div', this.main);

        switch (op.type)
        {
            case 'number':
                if (op.label)
                    create('p', inDiv, op.label);
                let n = create('input', inDiv);
                n.type = op.type;
                if (op.min)
                    n.min = op.min.toString();
                if (op.max)
                    n.max = op.max.toString();
                return inDiv;

            case 'date':
                if (op.label)
                    create('p', inDiv, op.label);
                let d = create('input', inDiv);
                d.type = op.type;
                return inDiv;
            case 'button':
                let b = create('button', inDiv, op.label);
                if (op.onlclick)
                    b.onclick = () => op.onlclick!();
                return inDiv;
            case 'checkbox':
                let id = uuid();
                let l = create('label', inDiv, op.label);
                l.setAttribute('for', id);
                let c = create('input', inDiv);
                c.type = op.type;
                c.id = id;
                if (op.onlclick)
                    c.onclick = () => op.onlclick!();
                return inDiv;

            case 'string':
                if (op.label)
                    create('p', inDiv, op.label);
                let i = create('input', inDiv);
                if (op.writeable !== undefined)
                    i.disabled = !op.writeable;
                return inDiv;
        }
        return inDiv;

    }
}

function uuid()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c)
    {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}