<template>
    <div>
        <div class="login-wrapper">
            <div id="login">
                <p class="title">登录</p>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
                    <el-form-item prop="account">
                        <el-input v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input
                            type="password"
                            v-model="ruleForm.pass"
                            auto-complete="off"
                            placeholder="输入密码"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;">登录</el-button>
                        <el-row>
                            <el-col :span="12" class="register">
                                <router-link to="/Register">没有账号？立即注册</router-link>
                            </el-col>
                            <el-col :span="12" class="register">
                                <router-link to="/ResetPassword">忘记密码？</router-link>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from "@/api/authApi";
import { mapActions, mapGetters } from "vuex";
export default {
    name: "Login",
    data() {
        // <!--验证手机号是否合法-->
        let checkTel = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入手机号码"));
            } else {
                callback();
            }
        };
        let validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                pass: "",
                account: "",
            },
            rules: {
                pass: [{ validator: validatePass, trigger: "change" }],
                account: [{ validator: checkTel, trigger: "change" }],
            },
        };
    },
    methods: {
        ...mapActions(
            // 语法糖
            ["setUserInfo"] // 相当于this.$store.dispatch('modifyName'),提交这个方法
        ),
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    login(this.ruleForm).then((res) => {
                        if (res.data.code == 1) {
                            localStorage.setItem("token", res.data.userInfo.token);
                            this.setUserInfo(res.data.userInfo);
                            this.$router.push("/TaskCenter");
                        } else {
                            this.$message.error(res.data.message);
                            return false;
                        }
                    });
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.loading-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #aedff8;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-wrapper img {
    position: absolute;
    z-index: 1;
}

.login-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}

#login {
    max-width: 340px;
    margin: 60px auto;
    background: #fff;
    padding: 20px 40px;
    border-radius: 10px;
    position: relative;
    z-index: 9;
}

.title {
    font-size: $font-title;
    line-height: 50px;
    font-weight: bold;
    margin: 10px;
    text-align: center;
}

.el-form-item {
    text-align: center;
}

> .register {
    margin-top: 10px;
    font-size: $font-text;
    line-height: 22px;
    color: #1ab2ff;
    cursor: pointer;
    text-align: left;
    text-indent: 8px;
    width: 160px;
}

> .register:last-child {
    text-align: right;
}

.register:hover {
    color: #2c2fd6;
}
</style>
