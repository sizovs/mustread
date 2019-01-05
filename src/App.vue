<template lang="pug">
  #app
    header.header
      section.section
        .container
          .columns
            .column.is-half.has-text-centered-mobile
              a(href="/")
                h1.title.is-size-5-mobile mustread
                  span.has-text-danger .
                  | tech
              h2.subtitle.is-size-7-mobile 
                a.has-text-black(href="https://github.com/sizovs/mustread-data")
                  i.fab.fa-github
                  |  open-source and crowd-sourced book listing.
            .column.is-half
              .is-pulled-right
                .buttons.is-hidden-mobile
                  a.button(rel="noreferrer" href="https://twitter.com/share?url=https://mustread.tech&via=eduardsi&text=📚+Books+that+will+make+you+a+better+developer:" target="_blank") 
                    span.icon.is-small
                      i.fab.fa-twitter
                    span Tweet
                  a.button(rel="noreferrer" href="https://ko-fi.com/M4M3NR55" target="_blank") 
                    span.icon.is-small
                      i.fa.fa-heart.has-text-danger
                    span Buy me a coffee
                p.has-text-right(v-if="$store.state.newBooks.isbn.length")
                  a(:href="'/books/isbn/' + $store.state.newBooks.isbn.join('/')")
                    | {{$store.state.newBooks.isbn.length}}
                    | new book{{$store.state.newBooks.isbn.length > 1 ? 's' : ''}} added in {{$store.state.newBooks.month}}
                  br
                  a(href="http://static.mustread.tech/rss.xml")
                    i.fa.fa-rss
                    strong
                      span  Subscribe                  


    router-view
    footer.footer
      .content.has-text-centered
        p Developed at night by 
          a(href="https://sizovs.net" rel="noreferrer" target="_blank") Eduards Sizovs
          |  under caffeine. No ads, open source.
      .columns.is-centered.is-mobile
        .column.is-narrow
          .buttons.has-text-centered
            a.button(rel="noreferrer" href="https://ko-fi.com/M4M3NR55" target="_blank") 
              span.icon.is-small
                i.fa.fa-heart.has-text-danger
              span Buy me a coffee
            a.button(rel="noreferrer" href="https://twitter.com/intent/follow?screen_name=eduardsi" target="_blank") 
              span.icon.is-small
                i.fab.fa-twitter
              span Follow me
      .columns.is-centered.is-mobile
        .column.is-narrow              
          .image.is-128x128
            img(src="/btc_address.png" alt="My Bitcoin address")
      .content.has-text-centered
        p 
          i.fab.fa-bitcoin
          |  1PMbDLaUKkpqfgMno2Zy7yfDYwrJKrZqv3
</template>
<style lang="scss">
  .paging {
    .pagination-list {
      justify-content: center;
    }
    .is-current a {
      background-color: #343d46;
      color: white;
    }
  }
</style>
<script>
  export default { 
    metaInfo: {
      titleTemplate: 'The best %s books for developers'
    }    
  }
</script>