<template>
    <div>
        <el-container>
            <el-header>
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo home"
                    mode="horizontal"
                    @select="handleSelect"
                    router
                >
                    <el-menu-item index="/TaskCenter">处理中心</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">我的工作台</template>
                        <el-menu-item index="/OverTimeInfo">加班时间管理</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                        <el-submenu index="2-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3" disabled>消息中心</el-menu-item>
                    <el-menu-item index="/ChinaMap">Map</el-menu-item>
                    <el-menu-item>
                        <el-color-picker v-model="color" show-alpha></el-color-picker>
                    </el-menu-item>
                    <el-menu-item class="avatar">
                        <el-dropdown @command="handleCommand">
                            <el-avatar :size="40" src="https://empty" @error="errorHandler">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                            </el-avatar>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="a">个人中心</el-dropdown-item>
                                <el-dropdown-item command="b">修改信息</el-dropdown-item>
                                <el-dropdown-item command="c" divided>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <transition name="el-fade-in-linear">
                    <router-view />
                </transition>
            </el-main>
            <el-footer class="footer">Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            activeIndex: "/Home",
            color: "rgba(19, 206, 102, 0.8)",
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        errorHandler() {
            return true;
        },
        handleCommand(val) {
            switch (val) {
                case "a":
                    this.$router.push({ name: "PersonalCenter" });
                    break;
                case "b":
                    this.$router.push("/PersonalCenter");
                    break;
                case "c":
                    localStorage.clear();
                    this.$router.push("/Login");
                    break;
                default:
                    break;
            }
        },
    },
    created() {
        this.activeIndex = this.$route.fullPath;
    },
    mounted() {},
    watch: {
        color(newV, oldV) {
            document.getElementsByTagName("body")[0].style.setProperty("--bg", newV);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";
.home {
    // background-color: $color;
}
.avatar {
    float: right !important;
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    font-size: $font-text;
    background: $color;
}
</style>
