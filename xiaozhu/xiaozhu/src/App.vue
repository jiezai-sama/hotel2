<template>
  <div id="app">
		<router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
	created(){
		// let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
		// console.log(htmlWidth);
		// let htmlDom = document.getElementsByTagName('html')[0];
		// htmlDom.style.fontSize = htmlWidth / 10 + 'px';
	}
}
</script>

<style>
	html {
		font-size: 37.5px;
	}
	@import url("assets/common.css");
	body{
		font-size: 12px;
	}
</style>
