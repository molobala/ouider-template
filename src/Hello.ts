import { Component, Native, OComponent } from 'ouider'
import { Planet, PlanetOutline, useIcons, Heart } from 'ouider-ionicons'

@Component({
  template: `<div @click="dispatch">
        <o-icon style="color: #FE9800"><planet/></o-icon>{{props.name}}<o-icon style="color: #FE9800"><planet-o/></o-icon>
    </div>`,
  tag: 'name'
})
class NameComponent extends OComponent<{name: string}, { click: () => void }> {
  constructor() {
    super()
    useIcons({
      'planet': Planet,
      'planet-o': PlanetOutline
    })
  }
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
  use: {'name': NameComponent, 'heart': Heart}
})
export class Hello extends OComponent<{}, { btn: () => void }> {
  data = this.state.wrap({ name: "Molo" })
  list = this.state.wrap(['Hi', 'Ever', 'Body'])
  cancelable = this.state.wrap(false)
  users = [{ name: 'Molo', age: 0 }, { name: 'Madou', age: 20 }, { name: 'Issa', age: 20 }]
  logo = 'assets/logo.png'
  bg = 'assets/wavy-lines.svg'
  sayHello() {
    console.log('Hello', this.data.value.name)
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
    OUID.setTimeout(() => {
      this.data.value.name = 'Mala'
      console.log('Chanding name')
    }, 2000)
  }
}

