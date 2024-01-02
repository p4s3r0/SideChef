<template>
    <div id="back" :class="this.visibility">
        <div id="modal-delete" >
            <div v-if="this.loading!='loading'">
                <h1>{{ this.title }}</h1>
                <p>{{ this.text }}</p>
                <div id="buttons">
                    <button @click="$emit('confirm')">{{ this.confirm_text }}</button>
                    <button @click="$emit('abort')">Abbrechen</button>
                </div>
            </div>
            <div v-else>
                <span class="loader"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
name: 'modal-delete',
props: ["visibility", "title", "text", "confirm_text", "loading"]
}
</script>

<style scoped>

#back {

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.693);
    backdrop-filter: blur(5px);
}
#modal-delete{
    position: absolute;
    left: 10%;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    background-color: #EDEDED;
    border-radius: 10px;
    min-height: 100px;
}

.visible {
    visibility: visible;
}

.hidden {
    visibility: hidden;
}

p {
    margin-left: 20px;
    margin-right: 20px;
    font-size: large;
}
h1 {
    font-size: larger;
    margin-top: 20px;
    margin-left: 20px;
}

#buttons {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;
    margin-left: -20px;
}

button {
    width: 30%;
    height: 30px;
    border-radius: 10px;
    background-color: white;
    border: none;
    margin-left: 10px;
}

.loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-100%, -50%);
        border: 20px solid #000;
        border-radius: 50%;
        box-sizing: border-box;
        animation: eat 1s linear infinite;
      }
      .loader::after , .loader::before {
        content: '';
        position: absolute;
        left: 50px;
        top: 50%;
        transform: translateY(-50%);
        background: #000;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        box-sizing: border-box;
        opacity: 0;
        animation: move 2s linear infinite;
      }

      .loader::before {
        animation-delay: 1s;
      }

      @keyframes eat {
        0% , 49% { border-right-color: #000 }
        50% , 100% { border-right-color: #0000 }
      }
      @keyframes move {
        0% { left: 75px ; opacity: 1}
        50% { left: 0px; opacity: 1 }
        52%, 100% { left: -5px; opacity: 0; }
      }

</style>
