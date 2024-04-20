import {createRouter, createWebHistory} from "vue-router";
import homepage from '../views/homepage.vue'
import personalPage from '../views/personalPage.vue'
import commentsList from '../components/personalComponents/commentsList.vue'
import ActivityDetail from "../views/ActivityDetail.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: homepage
        },
        {
            path: '/activity',
            name: 'activity',
            component: ActivityDetail
        },{
            path: '/forum',
            name: 'forum',
            component: () => import('../views/forumPage.vue')
        },
        {
            path: '/personal/:userId',
            name: 'personal',
            component: personalPage,
            children: [
                {
                    path: 'posts',
                    name: 'posts',
                    component: commentsList
                },
                {
                    path: 'collected',
                    component: () => import('../components/personalComponents/collectedList.vue')
                },
                {
                    path: 'comments',
                    component: () => import('../components/personalComponents/commentsList.vue')
                },
                {
                    path: 'infoEdit',
                    component: () => import('../components/personalComponents/infoEdit.vue'),

                },
            ]
        },
        {
            path: '/comments/:id',
            name: 'comments',
            component: () => import('../views/viewPage.vue')
        },
        {
            path: '/post-edit',
            name: 'post-edit',
            component: () => import('../views/postEditPage.vue')
        },
        {
            name: 'activities',
            path: '/activities',
            component: () => import('../views/ActivitiesList.vue'),
        }
    ],
});




export default router;
