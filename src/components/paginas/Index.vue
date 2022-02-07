<template lang="pug">
  .content
    .slider
      .slide(:class='{"slide-active" : index == ativoSlide}'
        v-for='(slide, index) in slides')
        .slide-content
          h1.slide-titulo {{ slide.titulo }}
          h4.slide-texto {{ slide.texto }}
          .slide-action
            a Consulte Mais Informação
            a Ver Trabalhos
        .slide-overlay
        figure.slide-img
          img(v-bind='{ src: carregarImage(slide.nome), class: [`img-${slide.nome}`] }'
          alt='Imagem de boas vindas')
      nav.slider-nav
        a.nav-point(:class='{"point-active": index == ativoSlide}'
        v-for='(slide, index) in slides'
        @click='alterarSlide(index)')
      a.nav-arrow.arrow-prev(@click='alterarSlide("prev")')
      a.nav-arrow.arrow-next(@click='alterarSlide("next")')
    section.about
      .about-item
        h2.about-title
          || DTPSHOP é uma plataforma para conteúdo de design artesanal feito com mouse
          || de criativos independentes de todo o mundo.
        p.about-text.
                      A DTP Software, uma empresa nacional de tecnologia, criou um ótimo
                      mercado para profissionais criativos licenciarem conteúdo - incluindo
                      imagens, vídeos e música - bem como ferramentas inovadoras que potencializam o
                      processo criativo.
      .about-video
        iframe(width='100%' height='100%' src='https://goo.gl/aieVs4')
    section.info
      h2.aside-title INFORMAÇÕES
      .info-item
        h4.info-title Somos gratos ao nossos autores
        p.
                      Os artistas estão no centro de tudo o que fazemos e a razão pela qual
                      O dtpshop continua sendo um destino importante para conteúdo de estoque.
                      Ao fornecer uma plataforma para nossos artistas distribuirem alguns dos melhores
                      conteúdo de estoque do mundo, damos a eles a oportunidade de
                      transformar suas vidas ganhando a vida através de sua arte.
      .info-item
        h4.info-title Somos gratos a nossa cultura
        p.
                      Estamos onde a arte começa, mas isso é apenas o começo. Nós somos os
                      movimento para a liberação da expressão criativa. Acreditamos que
                      arte é para todos, e estamos criando o contexto cultural de como
                      ele é criado, descoberto e compartilhado.
      .info-item
        h4.info-title Somos gratos aos nossos clientes
        p.
                      O registo é gratuito e dá-lhe acesso a milhares de
                      fotos, ilustrações e padrões profissionais isentos de royalties.
                      Encontre ótimos arquivos dos maiores contribuidores do mundo pelo menor preço. 
          Sempre damos boas-vindas para personalizar todos os nossos planos para atender às suas necessidades.
    section.awards
      h2.aside-title PRÊMIOS
      .awards-item(v-for='n in 4')
        img(src='../../assets/index/award-logo.svg' alt='Awwwwards')
    section.gallery(v-if='classificarPrincipaisProdutos')
      h2.aside-title GALERIA
      .gallery-product(v-for='produto in principaisProdutos')
        figure.product-img
          img(:src='product.url' alt='produto.nome')
          .img-overlay
            h2.overlay-title {{ produto.nome }}
            p.overlay-author {{ produto.autor }}
    section.comments
      h2.aside-title COMENTÁRIOS
      .comment(v-for='n in 4')
        figure.comment-img
          img(src='../../assets/icons/avatar.svg' alt='Author avatar')
        cite.comment-author Diego, DTP Software
        blockquote.comment-text
          | Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</template>

<script>
/* eslint-disable no-multi-str */
/* eslint-disable global-require */
/* eslint-disable no-unused-expressions */
export default {
	name: "index",
	data() {
		return {
			ativoSlide: 0,
			slides: [
				{
					nome: 'main',
					titulo: 'Bem-vindo ao nosso mercado online!',
					texto: 'Estoque de fotos, ilustrações e vídeos dos melhores criativos\
					ao redor do mundo',
				},
				{
					nome: 'team',
					titulo: '',
					texto: 'Estoque de fotos, ilustrações e vídeos dos melhores criativos\
					ao redor do mundo'
				},
				{
					nome: 'shop',
					titulo: 'Bem-vindo ao nosso mercado online!',
					teto: 'Estoque de fotos, ilustrações e vídeos dos melhores criativos\
					ao redor do mundo'
				}
			],
			principaisProdutos: {},
		};
	},
	computed: {
		classificarPrincipaisProdutos() {
			this.principaisProdutos = this.produtos.sort((prodA, prodB) => (
				prodA.stars <= prodB.stars ? 1 : 1
			)).slice(0, 3);
			return this.principaisProdutos.length >= 1
		}
	},
	methods: {
		alterarSlide(n) {
			if (n === 'prev') {
				this.ativoSlide !== 0 ? this.ativoSlide -= 1 : this.ativoSlide = 2
			} else if(n === 'next') {
				this.ativoSlide !== 2 ? this.ativoSlide += 1 : this.ativoSlide = 0
			} else {
				this.ativoSlide = n
			}
		},
		carregarImage(slide) {
			if (slide === "main") {
				return require("../../assets/index/yellow-sofa.jpg");
			} else if (slide === "team") {
				return require("../../assets/index/deer.jpg");
			}
			return require("../../assets/index/bookblock.jpg");
		},
	},
};
</script>

<style lang="scss" scoped>
$padding: 8vh 10vw;

$color-dark: #252525;
$color-grey: #666;
$color-green: #7befb2;
$color-light: #fff;

h1,
h2,
h3,
h4 {
	color: $color-light;
}
p {
	font-size: 2rem;
	color: $color-grey;
	text-align: justify;
}
a {
	font-size: 1.5rem;
	color: $color-light;
	&:hover {
		color: $color-green;
	}
}
.slider {
	position: relative;
	overflow: hidden;
	height: 100vh;
}
.slide {
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	display: flex;
	flex-direction: column;
	opacity: 0;
	transform: scale(0.7);
	transition: 3s;
	z-index: 1;
}
.slide-active {
	opacity: 1;
	transform: scale(1);
	transition: 3s;
	z-index: 2;
}
.slide-content {
	position: absolute;
	top: 20vh;
	left: 0;
	padding: $padding;
	z-index: 100;
	width: 45vw;
}
.slide-img {
	margin: 0;
}
.img-main {
	transform: translateY(-10%) scale(1.3);
}
.img-shop,
.img-team {
	transform: translateY(-2%) translateX(4%) scale(1.3);
}
.slide-titulo {
	font-size: 8vh;
}
.slide-texto {
	font-size: 4vh;
}
.slide-action {
	a {
		font-size: 3vh;
		padding-right: 3rem;
	}
}
.slider-nav {
	position: absolute;
	bottom: 2rem;
	left: calc(50% - 5rem);
	width: 10rem;
	height: 3rem;
	display: flex;
	flex-direction: row;
}
.nav-point {
	flex: 1;
	position: relative;
	opacity: 0.6;
	z-index: 101;
	&:hover {
		opacity: 1;
	}
	&::before {
		position: absolute;
		display: block;
		top: 0;
		left: 50%;
		width: 1rem;
		height: 1rem;
		content: "";
		background-color: $color-light;
		border-radius: 50%;
		cursor: pointer;
	}
}
.point-active {
	opacity: 1;
}
.nav-arrow {
	position: absolute;
	display: none;
	width: 4rem;
	height: 10vh;
	content: "";
	background-color: $color-dark;
	opacity: 0.6;
	z-index: 101;
	cursor: pointer;
	&:hover {
		opacity: 1;
	}
}
.slider:hover .nav-arrow {
	display: block;
}
.arrow-prev {
	top: calc(50% - 10vh);
	left: 0;
	&::before {
		position: absolute;
		content: "";
		top: calc(50% - 0.5rem);
		left: calc(50% - 0.5rem);
		width: 1rem;
		height: 1rem;
		background: url("../../assets/arrow.svg") no-repeat center;
		transform: rotate(90deg) scale(2);
	}
}
.arrow-next {
	top: calc(50% - 10vh);
	right: 0;
	&::before {
		position: absolute;
		content: "";
		top: calc(50% - 0.5rem);
		right: calc(50% - 0.5rem);
		width: 1rem;
		height: 1rem;
		background: url("../../assets/arrow.svg") no-repeat center;
		transform: rotate(-90deg) scale(2);
	}
}
.slide-overlay {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transform: scale(3);
	content: "";
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 50;
}
.about {
	color: $color-grey;
	display: flex;
	flex-direction: column;
	padding: $padding;
}
.about-item {
	flex: 1;
}
.about-title {
	color: $color-dark;
	font-size: 3.5rem;
}
.about-text {
	padding-bottom: 2rem;
}
.about-video {
	height: 60vh;
}
iframe {
	border: 0;
}
.info,
.awards,
.gallery,
.comments {
	position: relative;
	padding: $padding;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.info {
	background-color: lighten($color-grey, 57);
	.aside-title {
		top: 40%;
	}
}
.info-item {
	flex-basis: 30%;
}
.info-title {
	color: $color-dark;
	font-size: 3rem;
}
.aside-title {
	position: absolute;
	left: calc(5vw - 2rem);
	font-size: 2rem;
	transform: rotate(90deg);
	transform-origin: left;
	color: $color-dark;
	margin: 0;
	letter-spacing: 0.2rem;
}
.awards {
	background-color: $color-green;
	justify-content: center;
	.aside-title {
		top: 25%;
	}
}
.awards-item {
	flex-basis: 15%;
	border: 1px dashed rgba(6, 0, 0, 0.3);
	border-left: 0;
	padding: 0 5rem;
	&:last-child {
		border-right: 0;
	}
	img {
		margin: 0 auto;
	}
}
.gallery {
	.aside-title {
		top: 35%;
	}
}
.img-overlay {
	transform: translateY(-100%);
	background-color: rgba(0, 0, 0, 0.4);
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	transition: 0.5s;
}
.overlay-title {
	position: absolute;
	color: $color-light;
	bottom: 20%;
	left: 5%;
	overflow: hidden;
	font-size: 2rem;
}
.overlay-author {
	position: absolute;
	color: $color-light;
	font-size: 1.6rem;
	bottom: 5%;
	left: 5%;
	overflow: hidden;
	&:hover {
		color: $color-green;
	}
}
.gallery-product:hover .img-overlay {
	transform: translateY(0%);
	transition: 0.5s;
}
.gallery-product {
	flex-basis: 30%;
	display: flex;
}
.comments {
	background-color: lighten($color-grey, 30);
	.aside-title {
		top: 30%;
	}
}
.comment {
	flex-basis: 20%;
	justify-content: space-between;
	text-align: center;
}
.comment-img {
	width: 6rem;
	height: 6rem;
	margin: 2rem auto;
	border-radius: 50%;
	background-color: $color-light;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 80%;
	}
}
.comment-text {
	color: $color-light;
	font-size: 1.6rem;
	text-align: center;
	font-style: italic;
	quotes: "“";
	&::before {
		content: open-quote;
	}
	&::after {
		content: close-quote;
	}
}

@keyframes show {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@media screen and (max-width: 991px) {
	.slide-content {
		top: 15vh;
		width: 60vw;
	}
	.slide-img {
		img {
			height: 100vh;
			width: auto;
		}
	}
	.img-main,
	.img-team,
	.img-shop {
		transform: translateY(0);
	}
	.img-main {
		transform: scale(1.8);
	}
	.img-team {
		transform: translateX(-20%) scale(1.2);
	}
	.info {
		flex-direction: column;
		align-items: center;
	}
	.info-item {
		padding: 2rem 0;
	}
	.aside-title {
		left: 7vw;
	}
	.awards-item:nth-child(3) {
		border-right: 0;
	}
	.gallery-item {
		width: 80%;
	}
	.awards-item {
		flex-basis: 20%;
		padding: 0 5rem;
	}
}

@media screen and (max-width: 740px) {
	.img-main,
	.img-shop {
		transform: translateY(0) scale(4);
	}
	.img-team {
		transform: translateY(20%) scale(2);
	}
	.comment {
		flex-basis: 5rem;
	}
	.comments {
		padding: 2rem 0;
		.aside-title {
			display: none;
		}
	}
}

@media screen and (max-width: 480px) {
	.slide-content {
		transform: scale(0.8);
		width: 80vw;
		top: 10vh;
	}
	.slide-img {
		img {
			height: 100vh;
			width: auto;
		}
	}
	.gallery,
	.comments {
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	.gallery-product {
		padding: 1rem 2rem;
		flex-basis: auto;
	}
	.img-main {
		transform: translateX(-20%);
	}
	.img-team {
		transform: translateX(-40%);
	}
	.img-shop {
		transform: translateX(-30%) scale(1.4);
	}
	.about-title {
		font-size: 2.6rem;
	}
	.awards-item {
		border-right: 0;
		flex-basis: 30%;
	}
}
</style>