import {App, OUID} from 'ouider'
import { router } from './router'
import { AppComponent } from 'src/App';


OUID.config()
new App(AppComponent, {}).use(router).mount("#app");