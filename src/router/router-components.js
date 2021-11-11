const Home = () => import('@/home');
const User = () => import('@/user');
const UserList = () => import('@/user/main');
const UserDetail = () => import('@/user/detail');
const Error = () => import('@/error');




export const routes = [
    {
        path: '/', name: 'home', redirect: 'user/list', component: Home,
        children: [
            {
                path: 'user', name: 'user', component: User,
                children: [
                    { path: 'list', name: 'user-list', component: UserList },
                    { path: 'detail/:type(add|edit)/:id?', name: 'user-detail', component: UserDetail }

                ]
            }]
    },
    {
        path: '/404', name: 'error', component: Error
    }

]