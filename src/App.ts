import {Component, OComponent} from 'ouider'
import {Hello} from './Hello';

@Component({
    template: require('./App.html'),
    tag: 'app',
    use: [Hello]
})
export class AppComponent extends OComponent {
    showHello = this.state.wrap(true)
    show() {
        this.showHello.value = !this.showHello.value
        console.log('Hello')
    }
}
