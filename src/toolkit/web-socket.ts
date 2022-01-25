
let debug = false;

export let enableLog = () => { debug = true; };


interface Message
{
    id: number,
    message: string,
}

interface PendingMessage
{
    resolve: (value: string) => void,
    reject: (value: string) => void,
}

export function createWebsocket(url: string)
{
    let messages = new Map<number, PendingMessage>();

    let startup: (value: unknown) => void;

    let started = false;
    let connected = false;
    let socket: WebSocket | undefined = undefined;

    function recreateSocket()
    {
        socket = new WebSocket(url);
        socket.onopen = handleOpen;
        socket.onmessage = handleMessage;
        socket.onclose = handelCloseOrError;
        socket.onerror = handelCloseOrError;
    }

    function handleOpen(event: Event)
    {
        connected = true;
        if (startup !== undefined)
            startup(true);
    }

    function handleMessage(ev: MessageEvent)
    {
        if (!ev.data)
            throw new Error('Data income expected');
        var m = JSON.parse(ev.data) as Message;
        if (debug)
            console.log('WS:', m);
        let p = messages.get(m.id);
        if (p === undefined)
            throw new Error('Invalid Data Syntax');
        messages.delete(m.id);
        p.resolve(m.message);
    }

    function handelCloseOrError(event: Event)
    {
        socket = undefined;
        started = false;
        connected = false;
        messages.forEach(x => x.reject('Websocket closed'));
    }

    function start()
    {
        return new Promise(res =>
        {
            startup = res;
            if (!started)
            {
                started = true;
                recreateSocket();
            }
        });
    }

    function sendMessage(Message: string)
    {
        return new Promise((resolve, reject) =>
        {
            getNextID();
            isOpen();
            messages.set(_lastid, { resolve: resolve, reject: reject } as PendingMessage);
            let m: Message = { id: _lastid, message: Message };
            socket!.send(JSON.stringify(m));
        });
    }

    function isOpen()
    {
        if (!socket)
            throw new Error('Socket not Open');
        if (!(started && connected))
            throw new Error('Socket pending');
    }

    function getNextID()
    {
        _lastid++;
    }

    let _lastid: number = 0;
    return { sendMessage, start };
}
