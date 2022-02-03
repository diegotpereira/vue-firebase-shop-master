<template lang="pug">
  .auth
    .login-sign
      a.sign-btn(@click='login = "in"') Entrar
      a.sign-btn(@click='login = "up"') Cadastrar
    .modal-overlay(@click='login = false' v-if='login')
    a.close-btn(@click='login = false' v-if='login')
    form.modal(v-if='login')
      .modal-head
        h4.social-title  {{ login === 'in' ? 'Entrar' : 'Cadastrar'}}
        .social-img
          a.social-link.social-google
          a.social-link-social-twitter 
          a.social-link.social-facebook
      p.modal-title ou seja clássico
      .modal-content
        .input-box
          .input-icon.icon-email
          input.input-line(name='email' type='email' placeholder='Email...'
          v-model='email')
        .input-box
          .input-icon.icon-lock
          input.input-line(name='passwrod' type='password' placeholder='Senha'
          v-model='password')
      a.modal-action
    transition(name='note')
      notification(v-bind:message='message' v-if='message.length > 0'
      @click.native='message = ""')
</template>

<script>
export default {
	name: 'entrar',
	data() {
		return {
			login: false,
			email: '',
			password: '',
			message: '',
		}
	},

}
</script>

<style lang="scss" scoped>
$color-grey: #666;
$color-green: #7befb2;
$color-light: #fff;

.login-sign {
  position: absolute;
  height: 4rem;
  top: 6vh;
  right: calc(10vw - 6rem);
  display: flex;
  z-index: 1000;
}
.sign-btn {
  text-align: center;
  vertical-align: middle;
  line-height: 4rem;
  border-bottom: 2px solid lighten($color-grey, 40);
  color: $color-grey;
  font-size: 1.8rem;
  overflow: hidden;
  &:hover {
    border-color: $color-green;
  }
  &:first-child {
    margin-right: 3rem;
  }
}
.modal {
  top: calc(50% - 11rem - 4rem);
  left: calc(50% - 15rem - 2rem);
  width: 30rem;
  height: 22rem;
  padding: 10rem 2rem 2rem 2rem;
}
.modal-head {
  top: -7rem;
  left: 2rem;
  width: 22rem;
  height: 8rem;
  padding: 4rem;
  flex-direction: column;
}
.modal-content {
  flex: 10;
  flex-direction: column;
  padding-bottom: 2rem;
}
.modal-action {
  flex: 2;
}
.social-title {
  flex: 1;
  align-self: center;
  font-size: 2rem;
  font-weight: 500;
  text-transform: capitalize;
}
.social-img {
  flex: 1;
  display: flex;
  justify-content: space-around;
}
.social-link {
  flex-basis: 10%;
  background-position: center center;
  background-repeat: no-repeat;
}
.social-facebook {
  background-image: url('../assets/icons/facebook.svg');
}
.social-twitter {
  background-image: url('../assets/icons/twitter.svg');
}
.social-google {
  background-image: url('../assets/icons/google.svg');
}

@media screen and (max-width: 991px) {
  .login-sign {
    height: 3rem;
    top: 5vh;
    right: calc(10vw - 4rem);
  }
  .sign-btn {
    line-height: 3rem;
    font-size: 1.4rem;
    &:first-child {
      margin-right: 2rem;
    }
  }
}
@media screen and (max-width: 740px) {
  .modal {
    top: calc(50% - 8rem);
    height: 18rem;
    left: calc(50% - 12rem - 1rem);
    width: 24rem;
    padding: 3rem 1rem 1rem 1rem;
  }
  .modal-head {
    top: -6rem;
    width: 18rem;
    height: 5rem;
    padding: 2rem;
  }
  .modal-title {
    margin-bottom: 0.5rem;
  }
  .social-title {
    margin-bottom: 0.5rem;
  }
}
@media screen and (max-width: 480px) {
  .login-sign {
    right: calc(10vw - 2rem);
  }
  .modal {
    top: calc(50% - 11rem);
  }
}
</style>