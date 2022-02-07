<template lang="pug">
  .container
    main-header(v-bind='{produtosNoCarrinho}')
    router-view
    main-footer(v-bind='{produtosNoCarrinho}')
    entrar
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import Entrar from './components/Entrar.vue'

export default {
	name: 'app',
	components: {
		MainHeader,
        MainFooter,
		Entrar
	},
	data() {
		return {
			produtosNoCarrinho: {}
		}
	},
}
</script>
<style>

</style>
