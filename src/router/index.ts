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
            component: homepage,
            meta: {ShowHeader: true}
        },
        {
            path: '/activity',
            name: 'activity',
            component: ActivityDetail,
            meta: {ShowHeader: true},
            props: true
        },{
            path: '/forum',
            name: 'forum',
            component: () => import('@/views/forumPage.vue'),
            meta: {ShowHeader: true}
        },
        {
            path: '/personal/:userId',
            name: 'personal',
            component: personalPage,
            meta: {ShowHeader: true},
            children: [
                {
                    path: 'posts',
                    name: 'posts',
                    component: commentsList
                },
                {
                    path: 'collected',
                    component: () => import('@/components/personalComponents/collectedList.vue')
                },
                {
                    path: 'comments',
                    component: () => import('@/components/personalComponents/commentsList.vue')
                },
                {
                    path: 'infoEdit',
                    component: () => import('@/components/personalComponents/infoEdit.vue'),

                },
                {
                    path: 'browseHistory',
                    component: () => import('@/components/personalComponents/browseHistoryList.vue')
                }
            ]
        },
        {
            path: '/post/:id',
            name: 'post',
            component: () => import('@/views/viewPage.vue'),
            meta: {ShowHeader: true}
        },
        {
            path: '/post-edit',
            name: 'post-edit',
            component: () => import('@/views/postEditPage.vue'),
            meta: {ShowHeader: true}
        },
        {
            name: 'activities',
            path: '/activities',
            component: () => import('@/views/ActivitiesList.vue'),
            meta: {ShowHeader: true}
        },
        {
            name: 'createActivity',
            path: '/create-activity',
            component: () => import('@/views/createActivity.vue'),
            meta: {ShowHeader: true}
        },
        {
            name: 'controlPanel',
            path: '/control-panel',
            component: () => import('@/views/ControlPanel.vue'),
            meta: {ShowHeader: false}
        },
        {
            name: 'ConfirmOrder',
            path: '/confirm-order',
            component: () => import('@/views/ConfirmPage.vue'),
            meta: {ShowHeader: true}
        }
    ],
});




export default router;
