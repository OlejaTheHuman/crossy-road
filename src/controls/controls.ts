export interface HandlerI {
    handler: () => void
}

export default abstract class Controls<T extends HandlerI> {
    protected _eventHandlers: T[] = [];
    private _callFunction!: (event: WindowEventMap[keyof WindowEventMap]) => void;
    private _eventType: keyof WindowEventMap;

    constructor(
        type: keyof WindowEventMap,
    ) {
        this._eventType = type;
        this.setCallFunction();
    }

    public addEventHandler(handler: T): void {
        this._eventHandlers.push(handler);
        this.updateCallFunction();
    }

    public addEventHandlers(handlers: T[]): void {
        this._eventHandlers = handlers;
        this.updateCallFunction();
    }

    public clearEventHandlers(): void {
        this._eventHandlers = [];
        this.updateCallFunction();
    }

    public removeEventHandler(handler: HandlerI): void {
        this._eventHandlers = this._eventHandlers.filter(_handler => _handler.handler === handler.handler);
    }

    protected abstract callEventHandlerCondition(event: WindowEventMap[keyof WindowEventMap], handlerRecord: T): boolean;

    protected setCallFunction(): void {
        this._callFunction = this.callEventHandlers.bind(this);
        window.addEventListener(this._eventType, this._callFunction);
    }

    private callEventHandlers(event: WindowEventMap[keyof WindowEventMap]): void {
        for (const handlerRecord of this._eventHandlers) {
            if (this.callEventHandlerCondition(event, handlerRecord)) handlerRecord.handler();
        }
    }

    private removeCallFunction(): void {
        window.removeEventListener(this._eventType, this._callFunction);
    }

    private updateCallFunction(): void {
        this.removeCallFunction();
        this.setCallFunction();
    }
}