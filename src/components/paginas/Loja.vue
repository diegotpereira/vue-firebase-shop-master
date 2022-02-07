<template lang="pug">
  .content 
    h1
      | Bem-vindo à nossa loja online - vendemos design incomum
      | ilustrações que batem no seu coração.
    section.produtos
      .gallery
        .filter
          .select-wrap
            select(v-model='categoriaSelecionada')
              option(v-for='categoria in categorias'
              v-bind:value='categoria') Categoria: {{ categoria }}
            span.select-arrow
          .select-wrap
            select(v-model='ordenacaoSelecionada')
              option(v-for='tipo in tipos'
              v-bind:value='tipo') Classificar por: {{ tipo }}
            span.select-arrow
        transition-group.gallery-row(name='gallery-anim' tag='div'
        mode='out-in')
            .galeria-produto(v-for='(produto, index) in produtosFiltrados'
            v-bind:key='index' v-if='index >= produtoEmPagina * (activePage -1)\
            && index < produtoEmPagina * activePage')
              .produto-img 
                img(:src='produto.url' alt='produto.nome'
                @click='')
                .produto-acoes(:class='{"produto-actions--active" : startBoxHover}')
                  a.cart-link(:class='{"cart-link--active": verificarNoCarrinho(produto)}'
                    @click='')
                  .star-box(@mouseenter='startBoxHover = true'
                  @mouseleave='startBoxHover = false')
                    span.star.star-link(v-for='star in 5'
                  @click='rateProduto(produto, (6 - start))')
              h2.produto-title(@click='exibirProdutoModal(produto)')
              span.produto-autor {{ produto.autor }}
              span.produto-preco ${{ produto.preco }}.00
      aside.sidebar
        .widget-top 
          h3.widget-title Melhor Avaliado
          ul.top-list 
            li.top-produto(v-for='produto in principaisProdutos')
              .top-produto-info
                a.produto-title {{ produto.nome }}
                .produto-stars 
                  span.star(v-for='n in 5'
                  v-bind:class='{ "star-full": n <= getStars(produto) }')
                span.produto-preco ${{ produto.preco }}.00
              .top-produto-img 
                img.produto-img(:src='produto.url' alt='produto.nome')
        .widget-cart(v-if='')
          h3.widget-title Revisão do carrinho
          ul.cart-list 
            li.cart-produto(v-for='(produto, key) in produtosNoCarrinho')
              a.produto-thumbnail 
                img(:src='produto.url' alt='produto.nome')
              .produto-descricao 
                a.produto-title {{ produto.nome }}
                span.produto-preco ${{ produto.preco }}
              a.produto-remove(@click='removerDoCarrinho(key)')
          .cart-subtotal 
            span Subtotal 
            span $ {{ carrinhoValor() }}
          .cart-links
            a.cart-view(@click='alterarPagina("Carrinho")') Exibir Carrinho
            a.cart-checkout(@click='alterarPagina("Verificar")') Verificar
        .widget-payment 
          h3.widget-title  Opções de pagamento
          p.payment-details 
            | Lorem
            | do 
          .payment-option
            a.option-img
              img(src='../../assets/icons/paypal.svg')
            a.option-img
              img(src='../../assets/icons/visa.svg')
            a.option-img
              img(src='../../assets/icons/mastercard.svg')
    //-nav.pagination 
    //-  a.nav-prev(:class='{ "nav-disable" : activePage == 1}'
    //-  @click='alterarPagina(activePage - 1)') Página anterior
    //-  .nav-pages 
    //-    a.page-num(@click='alterarPaginaDaGaleria(n)'
    //-    v-for='n in Math.ceil(produtosFiltrados.length / produtosEmPagina)'
    //-    v-bind:class='{ "page-active": n == activePage }') {{ n }}
    //-  a.nav-next(@click='alterarPaginaDaGaleria(activePage + 1)'
    //-  v-bind:class='{ "nav-disable": activePage ==\
    //-  Math.ceil(produtosFiltrados.length / produtosEmPagina) }') Proxima Página

    product(v-on:close='fecharProdutoModal' v-bind='{produtoModal, principaisProdutos}'
    v-if='produtoModal')
        
      
   
</template>

<script>
/* eslint-disable no-multi-str */
/* eslint-disable global-require */
/* eslint-disable no-unused-expressions */
import Produto from './Produto.vue'
export default {
	name: 'loja',
	props: ['produtosNoCarrinho'],

	components: {
		Produto,
	},
    data() {
        return {
          categoriaSelecionada: 'todas',
          ordenacaoSelecionada: 'none',
          categorias: ['todas', 'ilustrações', 'padrões', 'fotos'],
          tipos: ['nenhum', 'recente', 'populares'],
          produtoModal: null,
          produtosFiltrados: {},
          produtosEmPagina: 0,
          activePage: 1,
        };
    },
    created() {
      this.produtosFiltrados - this.produtos

    },
	computed: {
		carrinhoExibir() {
			return Object.keys(this.produtosNoCarrinho).length > 0
		},
		principaisProdutos() {
			return this.classificarPorAvaliacao(this.produtos).slice(0, 3)
		}
	},
	methods: {

		alterarPaginaDaGaleria(){

		},
		carrinhoValor() {

		},

		fecharProdutoModal() {
			this.produtoModal = null
		},
    classificarPorAvaliacao(produtos) {
      return this.deepClone(produtos).sort((prodA, prodB) => {
        if (prodA.rating && prodB.rating) {
          const ratingA = Object.values(prodA.rating).reduce(
            (sum, val) => sum + val, 0);
          const ratingB = Object.values(prodB.rating).reduce(
            (sum, val) => sum + val, 0);
          return ratingA <= ratingB ? 1 : -1;
        }
        return prodB.rating ? 1 : -1;
      });
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
  //   deepClone(obj) {
  //   let objClone = {};
  //   let _obj = JSON.stringify(obj);
  //   objClone = JSON.parse(_obj);
  //   return objClone;
  // },
    // deepClone(obj) {

    //   var stringified = JSON.stringify(obj);
    //   var parsedObj = JSON.parse(stringified);
    //   return parsedObj
    // },
    // sort: function(s){
    //             if(s === this.sortBy) {
    //                 this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    //             }
    //             this.sortBy = s;
    //         }
	},
	watch: {
		categoriaSelecionada(novaCategoria) {
      if (novaCategoria === 'todas') {
        this.produtosFiltrados = this.produtos;
        return;
      }
      this.produtosFiltrados = this.deepClone(this.produtos)
        .filter(prod => prod.type === novaCategoria);
      this.activePage = 1;
		},
		ordenacaoSelecionada(novoTipo) {
      switch(novoTipo) {
        case 'popular':
          this.produtosFiltrados = this.classificarPorAvaliacao(this.produto)
          break
        case 'recente': 
          this.produtosFiltrados = this.deepClone(this.produtos)
          this.deepClone = this.sort((prodA, prodB) => (
            Date.parse(prodA.date) < Date.parse(prodB.date) ? 1 : -1
          ))
          break 

        default: 
          this.produtosFiltrados = this.produtos   
      }
      this.activePage = 1
		}
	}
}
</script>

<style lang="scss" scoped>
$color-dark: #252525;
$color-grey: #666;
$color-green: #7BEFB2;
$color-light: #fff;

$border: 1px solid rgba(0, 0, 0, 0.2);

.content {
  padding: 12vh 10vw 0 10vw;
}
.products {
  display: flex;
  padding-bottom: 3rem;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
}
.filter {
  padding: 2rem 0;
  width: 100%;
  border: 0;
  display: flex;
  justify-content: space-between;
}
.select-wrap {
  flex-basis: 30%;
  padding: 1rem 0;
  position: relative;
  border-bottom: $border;
  font-size: 1.6rem;
  cursor: pointer;
  .select-arrow {
    display: block;
    background-color: $color-light;
    background: url('../../assets/arrow.svg') no-repeat center center;
    position: absolute;
    width: 2rem;
    height: 2rem;
    top: 1rem;
    right: 0;
    z-index: -10;
  }
}
select {
  width: 100%;
  appearance: none;
  background-color: transparent;
  border: 0;
  text-transform: capitalize;
  font-size: 1.6rem;
  color: $color-grey;
  cursor: pointer;
  outline: none;
}
.gallery {
  flex: 2.5;
}
.gallery-anim-enter-active, .gallery-anim-leave-active {
  transition: all 1s;
}
.gallery-anim-leave-to, .gallery-anim-enter-to {
  opacity: 0;
}
.gallery-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.galeria-produto {
  flex-direction: column;
  margin-bottom: 1rem;
  flex-basis: 30%;
  display: flex;
}
.product-img {
  &:hover .produto-acoes {
    transform: translateX(0);
  }
  img {
    transition: all 1s ease;
    &:hover {
      transform: scale(1.2);
    }
  }
}
.produto-acoes {
  position: absolute;
  overflow: visible;
  top: calc(50% - 2rem);
  right: 1rem;
  width: 2.5rem;
  transform: translateX(300%);
  transition: 1s;
}

@for $i from 1 through 4 {
  .star-box:hover .star-link:nth-of-type(#{$i+1}) {
    $length: -2.5rem*$i;
    transform: translateX($length);
  }
}
.cart-link,
.star-link {
  -webkit-font-smoothing: antialiased;
  &:hover {
    background-color: $color-green;
  }
}
.cart-link {
  display: block;
  height: 2.5rem;
  width: 100%;
  background: $color-light url('../../assets/icons/cart.svg') no-repeat center center;
  background-size: 40%;
}
.cart-link--active {
  background-color: $color-green;
  pointer-events: none;
}
.star-box {
  position: relative;
  height: 2.5rem;
}
.star-link {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 2.5rem;
  width: 2.5rem;
  background-color: $color-light;
  cursor: pointer;
  text-align: center;
  line-height: 2.5rem;
  vertical-align: middle;
  font-size: 1.5rem;
  transition: 1s;
  &:hover {
    &::before {
      content: '\2605';
      color: $color-dark;
    }
  }
  &:hover ~ .star-link {
    &::before {
      content: '\2605';
      color: $color-dark;
    }
  }
}
.product-title {
  margin-bottom: 0.3rem;
  cursor: pointer;
}
.product-price, .product-author {
  font-size: 1vw;
}
.product-author {
  padding-bottom: 0.5rem;
}

.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 3vw;
}
.top-list {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}
.top-product {
  display: flex;
  border-bottom: $border;
  padding: 2rem 0;
}
.top-product-info {
  flex: 3;
  display: flex;
  flex-direction: column;
  .product-stars, .product-price {
    flex: 1;
    padding-top: 1rem;
  }
}
.star {
  &::before {
    content: '\2606';
    color: $color-grey;
  }
}
.star-full {
  &::before {
    content: '\2605';
    color: $color-green;
  }
}
.top-product-img {
  flex-basis: 10rem;
}
.widget-cart {
  flex-basis: 15rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.pagination {
  display: flex;
  width: 100%;
  padding: 5rem 0;
  justify-content: space-between;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  >a {
    flex-basis: 20%;
    position: relative;
    opacity: 0.7;
    &::before {
      content: '';
      position: absolute;
      background: url('../../assets/arrow.svg') no-repeat top center;
      width: 2rem;
      height: 2rem;
      top: -10%;
    }
    &:hover {
      opacity: 1;
      color: $color-grey;
    }
  }
}
.nav-prev {
  text-align: right;
  &::before {
    left: 0;
    transform: rotate(90deg);
  }
}
.nav-next {
  &::before {
    right: 0;
    transform: rotate(-90deg);
  }
}
.nav-disable {
  opacity: 0.4;
  &:hover {
    color: inherit;
  }
  pointer-events: none;
}
.nav-pages {
  display: flex;
  justify-content: space-around;
}
.page-num {
  width: 2rem;
  color: $color-dark;
  &:hover {
    color: $color-green;
  }
}
.page-active {
  color: $color-green;
  pointer-events: none;
}

@media screen and (max-width: 991px) {
  .galeria-produto {
    flex-basis: calc(90% / 2);
  }
  .product-price, .product-author {
    font-size: 1.5vw;
  }
  .select-wrap {
    flex-basis: 40%;
  }
}

@media screen and (max-width: 800px) {
  .filter {
    flex-direction: column;
  }
  .content {
    padding: 12vh 15vw 0 15vw;
  }
  .products {
    flex-direction: column;
  }
  .gallery {
    flex: 1;
  }
  .sidebar {
    display: none;
  }
  .galeria-produto {
    flex-basis: 100%;
  }
  .product-title {
    font-size: 3vw;
  }
  .product-price, .product-author {
    font-size: 3vw;
  }
  .cart-link {
    height: 3rem;
  }
}
</style>