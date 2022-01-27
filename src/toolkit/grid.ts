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

enum CssClassName
{
    table = 'DataGrid',
    greater = 'plus'
}

interface TableOptions
{

    target?: HTMLElement;
    columnIndex?: number;
}

export function createTable(headContent: string[], options?: TableOptions)
{
    let table = create('table', options?.target);
    table.classList.add(CssClassName.table);

    let head = create('tr', create('thead', table));
    headContent.forEach(x => create('th', head, x));

    let body = create('tbody', table);

    function addDataRow(data: string[] | number[])
    {
        let r = create('tr', body);
        for (let i = 0; i < data.length; i++)
        {
            let x = data[i];
            let d = create('td', r, x.toString());
            if (!isNaN(+x) && i == options?.columnIndex)
            {
                if (+x > 0)
                    d.classList.add(CssClassName.greater);
            }
        }
    }
    return {
        table,
        head,
        body,
        addDataRow
    };
}