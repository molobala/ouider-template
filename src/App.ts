import {Component, OComponent, OIcon, ORouter} from 'ouider'

@Component({
    template: require('./App.html'),
    tag: 'app',
    css: `
        #app {
            height: 100%;
        }
    `,
    use: {'o-icon': OIcon}
})
export class AppComponent extends OComponent {
    showHello = this.state.wrap(true)
    show() {
        this.showHello.value = !this.showHello.value
        console.log('Hello')
    }
}
