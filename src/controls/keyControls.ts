import Controls, { HandlerT } from './controls';

export interface KeyHadlerI extends HandlerT {
    key: string;
}

export default class KeyboardControls extends Controls<KeyHadlerI> {
    private static _instance: KeyboardControls | null = null;

    constructor(
        eventType: keyof WindowEventMap,
    ) {
        if (KeyboardControls._instance !== null) return KeyboardControls._instance;

        super(eventType);
        KeyboardControls._instance = this;
    }

    protected callEventHandlerCondition(event: KeyboardEvent, handlerRecord: KeyHadlerI): boolean {
        return event.key === handlerRecord.key;
    }
}