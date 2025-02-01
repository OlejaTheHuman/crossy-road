import Controls, {HandlerI} from './controls';

export interface KeyHandlerI extends HandlerI {
    key: string;
}

export default class KeyboardControls extends Controls<KeyHandlerI> {
    constructor(eventType: keyof WindowEventMap) {
        super(eventType);
    }

    protected callEventHandlerCondition(event: KeyboardEvent, handlerRecord: KeyHandlerI): boolean {
        return event.key === handlerRecord.key;
    }
}