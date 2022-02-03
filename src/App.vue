<template lang="pug">
  .container
    main-header
    router-view
    main-footer
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
export default {
	name: 'app',
	components: {
		MainHeader,
        MainFooter

	}
}
</script>
<style>

</style>
