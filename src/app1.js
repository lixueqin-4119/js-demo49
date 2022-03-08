import './app1.css'
import $ from 'jquery'
import Model from './base/Model.js'
import View from './base/View.js'
import EventBus from './base/EventBus'

const m = new Model({
    data: {
        n: parseFloat(localStorage.getItem('n'))//小数
    },
    update(data) {
        Object.assign(m.data, data)
        m.trigger("m:updated")
        localStorage.setItem('n', m.data.n)
    },
})

const init = (el) => {
    new View({
        el: el,
        data: m.data,
        html: `
        <div>
          <div class="output">
            <span id="number">{{n}}</span>
          </div>
          <div class="actions">
            <button id="add1"> +1 </button>
            <button id="minus1"> -1 </button>
            <button id="mul2"> *2 </button>
            <button id="divide2"> /2 </button>
          </div>
        </div>
        `,
        render(data) {
            const n = data.n
            if (this.el.children.length !== 0) this.el.empty()
            $(this.html.replace('{{n}}', n)).prependTo(this.el)
        },
        events: {
            'click #add1': 'add1',
            'click #minus1 ': 'minus1',
            'click #mul2 ': 'mul2',
            'click #divide2 ': 'divide2'
        },
        add1() {
            m.update({ n: m.data.n + 1 })
        },
        minus1() {
            m.update({ n: m.data.n - 1 })
        },
        mul2() {
            m.update({ n: m.data.n * 2 })
        },
        divide2() {
            m.update({ n: m.data.n / 2 })
        }
    })
}
export default init