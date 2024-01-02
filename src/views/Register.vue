<template>
    <div id="container-view-register">
        <h1 id="pageTitle">Register</h1>
        <div id="loginForm">
            <InputText id="usernameInput" @valueUpdated="updateUsername" />
            <InputPassword id="InputPassword" @valueUpdated="updatePassword"/>
            <ButtonRectangle id="ButtonRectangle" type="arrow" @click="register()"/>
        </div>
    </div>
    <p id="loginRoute" @click="this.$router.push('/')">Login</p>

</template>
  
<script>
import InputPassword from '@/components/InputPassword';
import InputText from '@/components/InputText.vue';
import ButtonRectangle from '@/components/ButtonRectangle.vue';

// import { supabase } from '@/supabase.js';
import { toast } from 'vue3-toastify';
import CryptoJS from 'crypto-js';
import 'vue3-toastify/dist/index.css';

import { DBL_checkLogin } from '@/local_db';
import { supabase } from '@/supabase';

export default {
name: 'RegisterView',
setup() {
    const register_succesful = () => {
      toast.success("Register Succesful!", {
        autoClose: 3000,
        success: true,
      }); // ToastOptions
    };

    const register_not_success = () => {
      toast.error("Register Unsuccesful!", {
        autoClose: 3000,
        success: true
      }); // ToastOptions
    }


    return { register_succesful, register_not_success };
   },
components: {
    InputPassword,
    ButtonRectangle,
    InputText
}, data() {
      return {
        username: "",
        password: "",
      }
    },
    methods: {
    updatePassword(pssw) {
        this.password = pssw;
    },
    updateUsername(usrn) {
        this.username = usrn;
    },
    async register() {
        const user = await supabase.from('user').select().eq('username', this.username)
        console.log(user.data.length)
        if (user.data.length != 0) {
            this.register_not_success();
            return;
        }

        const data = {
            username: this.username,
            pssw: CryptoJS.SHA3(this.password).toString(CryptoJS.enc.Hex)
        }
        await supabase.from('user').insert(data);
        this.$router.push('/');

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
#container-view-register {
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

#usernameInput {
    margin-bottom: 10px;
}

#loginRoute {
    position: absolute;
    bottom: 0px;
    right: 20px;
    text-decoration: underline;
    cursor: pointer;
}
</style>
  