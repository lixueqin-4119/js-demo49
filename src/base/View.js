import $ from 'jquery'
import EventBus from './EventBus'

class View extends EventBus {
    //初始化写到constructor上
    //constructor({ el, html, render, data, eventBus, events }) {//遍历
    constructor(options) {
        super()
        Object.assign(this, options)
        this.el = $(this.el)
        this.render(this.data)
        this.autoBindEvents()
        this.on('m:updated', () => {
            this.render(this.data)
        })
    }

    autoBindEvents() {
        for (let key in this.events) {
            const value = this[this.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex + 1)
            const part2 = key.slice(spaceIndex)
            this.el.on(part1, part2, value)
        }
    }
}
export default View