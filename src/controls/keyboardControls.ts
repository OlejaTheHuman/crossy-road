import Controls, {HandlerI} from './controls';

export interface KeyHadlerI extends HandlerI {
    key: string;
}

export default class KeyboardControls extends Controls<KeyHadlerI> {
    constructor(eventType: keyof WindowEventMap) {
        super(eventType);
    }

    protected callEventHandlerCondition(event: KeyboardEvent, handlerRecord: KeyHadlerI): boolean {
        return event.key === handlerRecord.key;
    }
}