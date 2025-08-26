
import {App} from 'ouider'
import { router } from './router'
import { AppComponent } from 'src/App';
import './global.css'
new App(AppComponent).use(router).mount("app");