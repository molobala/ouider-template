import { OComponent, Component } from "ouider";
import { useRouter } from "../../../src/router/Router";

@Component({
    tag: 'home',
    template: `
    <div>Home page</div>
    <button @click="goToHello">Go to Hello</button>
    `
})
export class HomePage extends OComponent {
    goToHello() {
        useRouter().push({
            name: 'Hello'
        })
    }
}