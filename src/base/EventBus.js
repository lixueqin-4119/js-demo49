import $ from "jquery"

class EventBus {
    constructor() {
        this._eventBus = $(window)
    }
    trigger(eventName, data) {
        return this._eventBus.trigger(eventName, data)
    }
    on(eventName, fn) {
        return this._eventBus.on(eventName, fn)
    }
    off(eventName, fn) {
        return this._eventBus.off(eventName, fn)
    }
}

export default EventBus