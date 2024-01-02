<template>
    <div id="container-component-ButtonSubtle">
      <button v-if="this.type == 'home'">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.6667 15V31.6667C31.6667 33.5076 30.1743 35 28.3333 35H11.6667C9.82572 35 8.33333 33.5076 8.33333 31.6667V15M25 35V26.6667C25 24.8257 23.5076 23.3333 21.6667 23.3333H18.3333C16.4924 23.3333 15 24.8257 15 26.6667V35M35 18.3333L22.357 5.69036C21.0553 4.38862 18.9447 4.38861 17.643 5.69036L5 18.3333" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button v-if="this.type == 'logout'">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3333 18.3333V11.25C13.3333 7.79822 16.1315 5 19.5833 5C23.0351 5 25.8333 7.79822 25.8333 11.25V18.3333M10.8333 35H28.3333C30.1743 35 31.6667 33.5076 31.6667 31.6667V21.6667C31.6667 19.8257 30.1743 18.3333 28.3333 18.3333H10.8333C8.99238 18.3333 7.5 19.8257 7.5 21.6667V31.6667C7.5 33.5076 8.99238 35 10.8333 35ZM23.3333 26.6667C23.3333 28.5076 21.8409 30 20 30C18.159 30 16.6667 28.5076 16.6667 26.6667C16.6667 24.8257 18.159 23.3333 20 23.3333C21.8409 23.3333 23.3333 24.8257 23.3333 26.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button v-if="this.type == 'modify'">
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.7626 4.07823L26.9253 10.1735M27.5785 1.97631L28.9935 3.3913C30.2953 4.69304 30.2953 6.80359 28.9935 8.10534L10.2671 26.8317C9.90121 27.1976 9.45512 27.4733 8.96419 27.6369L2.0983 29.9256C1.44683 30.1427 0.82705 29.5229 1.0442 28.8715L3.33284 22.0056C3.49648 21.5147 3.77218 21.0686 4.13809 20.7027L22.8645 1.97631C24.1662 0.674562 26.2768 0.674565 27.5785 1.97631Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button v-if="this.type == 'delete'">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26 6H31M26 6V27.6667C26 29.5076 24.5076 31 22.6667 31H9.33333C7.49238 31 6 29.5076 6 27.6667V6M26 6H6M1 6H6M12.6667 11.8333V25.1667M19.3333 11.8333V25.1667M10.1667 1H21.8333" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button v-if="this.type == 'save'">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.99994 9.99996C9.99994 8.15901 11.4923 6.66663 13.3333 6.66663H26.6666C28.5075 6.66663 29.9999 8.15901 29.9999 9.99996V31.8534C29.9999 33.4356 28.0019 34.1274 27.0235 32.884L21.3097 25.6228C20.6424 24.7748 19.3574 24.7748 18.6902 25.6228L12.9764 32.884C11.998 34.1274 9.99994 33.4356 9.99994 31.8534V9.99996Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
</template>

<script>
export default {
  name: 'ButtonSubtle',
  props: ["type"],
  data() {
      return {
        password: "",
      }
  },
}
</script>
  
<style scoped>
#container-component-ButtonSubtle {    
}

button {
  position: relative;
  margin-left: calc(100% - 70px);
  right: 0px;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 20px;
  background-color: #EDEDED;
}


</style>
  