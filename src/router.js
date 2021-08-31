import { createRouter, createWebHistory } from 'vue-router'
import mainMenu from "./firstpage/mainMenu";
import secondPage from "./secondpage/secondPage";
import thirdpage from "./thirdpage/thirdpage";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/first', component: mainMenu, alias: '/' },
        { path: '/second', component: secondPage},
        {
            path: '/third/:gameId',
            name: 'third',
            component: thirdpage,
            meta: {
                isUseCache: true, // Значение этого поля будет обсуждено позже
                keepAlive: true    // Используйте это поле, чтобы определить, нужно ли кэшировать текущий компонент
            }
        }
    ]
})
