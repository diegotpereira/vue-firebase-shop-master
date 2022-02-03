<template lang="pug">
  .container
    main-header
    router-view
    main-footer
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
			
		}
	},
}
</script>
<style>

</style>
