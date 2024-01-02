<template>
    <div id="container-view-login">
        <h1 id="pageTitle">Login</h1>
        <div id="loginForm">
            <InputText id="usernameInput" @valueUpdated="updateUsername" />
            <InputPassword id="InputPassword" @valueUpdated="updatePassword"/>
            <ButtonRectangle id="ButtonRectangle" type="arrow" @click="login()"/>
        </div>
    </div>

    <div id="version">
        <p>@v-1.0</p>
    </div>

    <p id="registerRoute" @click="this.$router.push('/register')">Register</p>
</template>
  
<script>
import InputPassword from '@/components/InputPassword';
import ButtonRectangle from '@/components/ButtonRectangle.vue';
import InputText from '@/components/InputText.vue';

import { supabase } from '@/supabase.js';
import { toast } from 'vue3-toastify';
import CryptoJS from 'crypto-js';
import 'vue3-toastify/dist/index.css';

import { DBL_loginUser, DBL_checkLogin } from '@/local_db';

export default {
name: 'App',
setup() {
    const login_succesful = () => {
      toast.success("Login Succesful!", {
        autoClose: 3000,
        success: true,
      }); // ToastOptions
    };

    const login_not_success = () => {
      toast.error("Wrong Password!", {
        autoClose: 3000,
        success: true
      }); // ToastOptions
    }


    return { login_succesful, login_not_success };
   },
components: {
    InputPassword,
    ButtonRectangle,
    InputText
}, data() {
      return {
        username: "",
        password: ""
      }
    },
    methods: {
    async login() {
        let { data } = await supabase.from('user').select().eq('username', this.username)
        data = data[0]

        if (data == undefined || data["pssw"] != CryptoJS.SHA3(this.password).toString(CryptoJS.enc.Hex)) {
             this.login_not_success();
        } else {
            DBL_loginUser(this.username);
            this.$router.push('/home');
        }
    },
    updatePassword(pssw) {
        this.password = pssw;
    },
    updateUsername(usrn) {
        this.username = usrn;
    } 
},
async beforeCreate() {
    const login = await DBL_checkLogin();
    if(login) {
        this.$router.push('/home');
    }
}
}
</script>

<style scoped>
#container-view-login {
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
}

#pageTitle {
    position: absolute;
    top: 9vh;
    left: 10vw;
}

#loginForm {
    position: absolute;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
}

#ButtonRectangle {
    margin-top: 10px;
    margin-left: calc(100% - 70px);
}

#version {
    position: absolute;
    bottom: 0px;
    left: 10px;
}
#version p {
    color: #a7a7a7
}

#registerRoute {
    position: absolute;
    right: 20px;
    bottom: 0px;
    cursor: pointer;
    text-decoration: underline;
}

#usernameInput {
    margin-bottom: 10px;
}
</style>
  