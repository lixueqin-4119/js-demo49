import './app2.css'
import $ from "jquery"
import Model from './base/Model.js'
import View from './base/View.js'
import EventBus from './base/EventBus'

const eventBus = new EventBus()
const localKey = 'app2.index'
const m = new Model({
    data: {
        index: parseInt(localStorage.getItem(localKey) || 0)
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger("m:updated")
        localStorage.setItem('app2.index', m.data.index)
        localStorage.setItem('index', m.data.index)
    }
})

const init = (el) => { //解决el:null的问题
    new View({
        el: el,
        data: m.data,
        eventBus: eventBus,
        html: (index) => {
            return `
        <div>
        <ol class="tab-bar">
            <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>1</span></li>
            <li class="${index === 1 ? 'selected' : ''}" data-index="1"><span>2</span></li>
        </ol>
        <ol class="tab-content">
            <li class="${index === 0 ? 'active' : ''}" >内容1</li>
            <li class="${index === 1 ? 'active' : ''}" data-index="1">内容2</li>
        </ol>
        </div>
        `
        },
        render(data) {
            const index = data.index
            if (this.el.children.length !== 0) this.el.empty()
            $(this.html(index)).prependTo(this.el)
        },
        events: {
            'click .tab-bar li': 'x'
        },
        x(e) {
            const index = parseInt(e.currentTarget.dataset.index)//用DOM做标记
            m.update({ index: index })
        }
    })
}
export default init //导出初始化方法