
const fs = require('fs');
const sass = require('sass');

const print = (...args) => console.log(...args);

function compileSass()
{
    let result = sass.compile('./sass/main.sass', {
        sourceMap: true,
        style: 'compressed'
    });

    result.css += `/*# sourceMappingURL=main.css.map*/`;
    console.log(result.sourceMap);
    fs.writeFileSync('./.out/main.css.map', result.sourceMap);
    fs.writeFileSync('./.out/main.css', result.css);

}

function watcher(file)
{

    let timeout = undefined;
    let p = undefined;
    fs.watch(file, { recursive: true }, (action, file) =>
    {
        console.log(action, file);

        if (timeout !== undefined)
        {
            clearTimeout(timeout);
            timeout = undefined;
        }

        if (timeout == undefined)
        {
            timeout = setTimeout(() =>
            {
                try
                {
                    compileSass();
                }
                catch (e)
                {
                    console.log(e);
                }
            }, 100);
        }
    });
}

watcher('./sass');
