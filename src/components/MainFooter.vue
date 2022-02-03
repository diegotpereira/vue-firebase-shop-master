<template lang="pug">
  footer.footer
    .content
       .logo
         a.logo-img
         img(src='../assets/logo.svg')
       .nav
         h4 Menu 
         ul.list
           li 
             a
       .blog 
         h4 Postagens recentes
         ul.list
           li.post 
             a
             .post-data
       .contact
          h4 Contact us
          p 2022 Rua x,
          p Porto Alegre - RS 
          p Brasil
          ul.list.social-list 
            ul.list.social-list
              li.social-item(v-for='social in socials')
               a.social-link
                img(:src='"../assets/icons/" + social + ".svg"')
    .copyright
      p Desenvovido por Diego Pereira. Todos os direitos reservados. &reg;
    
</template>
<script>
export default {
    name: 'main-footer',
    data() {
        return {

            socials: ['twitter', 'facebook', 'youtube', 'instagram']

        }
    }
}
</script>
<style lang="scss" scoped>

$color-dark: #252525;
$color-light: #fff;
$color-grey: #666;

h4 {
  margin-bottom: 3rem;
  color: $color-light;
}
.footer {
  display: flex;
  flex-direction: column;
  background-color: $color-dark;
  padding: 8vh 10vw;
}
.content {
  flex: 6;
  display: flex;
  justify-content: space-between;
}
.logo,
.nav,
.blog,
.contact {
  flex-basis: 20%;
}
.logo {
  height: 7rem;
  img {
    width: 60%;
    background-color: $color-grey;
    &:hover {
      background-color: darken($color-grey, 10);
    }
  }
}
.list {
  padding-left: 0;
}
.post-data {
  margin-top: .5rem;
  font-size: 1rem;
  text-transform: uppercase;
  color: $color-light;
}
.copyright {
  flex: 1;
}

@media screen and (max-width: 480px) {
  .footer {
    padding: 8vh 7vw;
  }
  .content {
    flex-wrap: wrap;
  }
  .logo,
  .nav,
  .blog,
  .contact {
    flex-basis: 30%;
  }
  .logo {
    order: 2;
  }
  .social-link {
    padding: 0.1rem;
  }
}
</style>