export default {
    state: {
        // 个人信息
        userInfo: {
            account: "",
            sex: "",
            mobile: "",
            name: "",
            email: "",
        },
    },
    mutations: {
        // 更新新消息状态
        updata_person(state, obj) {
            state.userInfo.account = obj.account;
            state.userInfo.sex = obj.sex;
            state.userInfo.mobile = obj.mobile;
            state.userInfo.name = obj.name;
            state.userInfo.email = obj.email;
        },
    },
    actions: {
        setUserInfo({ commit, state }, obj) {
            commit("updata_person", obj);
        },
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        },
    },
};
