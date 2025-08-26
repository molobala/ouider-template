import {Component, OComponent} from 'ouider'
@Component({
    template: `<div @click="dispatch">{{name}}</div>`,
    tag: 'name'
})
class NameComponent extends OComponent<unknown, {click: () => void}> {
    willMount(): void {
        console.log('Name will mount', this.props)
    }
    dispatch() {
        this.emits.emit('click')
    }
}

@Component({
    template: require('./Hello.html'),
    css: require('./Hello.css'),
    tag: 'hello',
    use: [NameComponent]
})
export class Hello extends OComponent<{}, {btn: () => void}> {
    data: {name: string} = {name:  "Molo"}
    list = this.state.wrap(['Hi', 'Ever', 'Body'])
    cancelable = this.state.wrap(false)
    users = [{name: 'Molo', age: 0}, { name: 'Madou', age: 20}, { name: 'Issa', age: 20}]
    sayHello() {
        console.log('Hello', this.data.name)
        this.list.value.push('Hola')
        console.log('List', this.list)
        this.cancelable.value = true
        // alert("Hello guy" + this.name)
        console.log('Props::::', this.props)
        this.emits.emit('btn')
    }
    cancel() {
        this.cancelable.value = false
    }
    clicked() {
        console.log('CLicked')
    }
    willMount(): void {
        console.warn('Hello will mount')
    }
    willUnmount(): void {
        console.log('Hello Will unmount')
    }
    onMounted(): void {
        console.log('Mounted', this.list)
    }
    
}

