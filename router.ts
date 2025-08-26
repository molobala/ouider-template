import { Hello } from "./src/Hello";
import { HomePage } from "./src/Home";
import { createRouter } from "../../src/router/Router";

export const router = createRouter([
    {
        name: 'Home',
        path: '/',
        component: HomePage
    },
    {
        name: 'Hello',
        path: '/hello',
        component: Hello
    }
])
const me = () => {
    return new Promise<boolean>((res) => setTimeout(() => res(false), 5000))
}
router.beforeEach(async (to) => {
    if(to.name !== 'Hello') {
        // check me
       if(!await me()) {
        return {
            name: 'Hello'
        }
       }
    }
    return false
})