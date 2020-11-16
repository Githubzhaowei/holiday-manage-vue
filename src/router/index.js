import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("@/components/Home"),
            meta: {
                auth: true,
            },
            children: [
                {
                    path: "/TaskCenter",
                    name: "TaskCenter",
                    component: () => import("@/components/Home/TaskCenter"),
                },
                {
                    path: "/ChangePersonInfo",
                    name: "ChangePersonInfo",
                    component: () => import("@/components/Home/ChangePersonInfo"),
                },
                {
                    path: "/PersonalCenter",
                    name: "PersonalCenter",
                    component: () => import("@/components/Home/PersonalCenter"),
                },
                {
                    path: "/ChinaMap",
                    name: "ChinaMap",
                    component: () => import("@/components/Home/ChinaMap"),
                },
                {
                    path: "/OverTimeInfo",
                    name: "OverTimeInfo",
                    component: () => import("@/components/Home/OverTimeInfo"),
                },
            ],
        },
        {
            path: "/Home",
            redirect: "/",
        },
        {
            path: "/Login",
            name: "Login",
            component: () => import("@/components/Login"),
        },
        {
            path: "/Register",
            name: "Register",
            component: () => import("@/components/Register"),
        },
        {
            path: "/ResetPassword",
            name: "ResetPassword",
            component: () => import("@/components/ResetPassword"),
        },
        {
            path: "*",
            component: () => import("@/components/NotFound"),
        },
    ],
});
router.beforeEach((to, from, next) => {
    if (to.matched.some((m) => m.meta.auth)) {
        // console.log("先判断是否登录");
        if (to.name == "Login") {
            next();
        } else {
            if (localStorage.getItem("token")) {
                //访问服务器缓存数据，判断当前token是否失效
                // Vue.http
                //     .get("http:xxxx/Login/UserIsLogin?token=" + localStorage.getItem("token") + "&url=" + to.name, {
                //         withCredentials: true,
                //     })
                //     .then((response) => response.json())
                //     .then((num) => {
                //         // console.log('是否登录',num);
                //         if (num.code == 1001) {
                //             next();
                //         } else {
                //             alert("您的token已超时，请重新登录");
                //             next("/Login");
                //         }
                //     });
                next();
            } else {
                next("/Login");
            }
        }
    } else {
        console.log("请先登录");
        next();
    }
});

export default router;
