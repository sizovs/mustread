<template lang="pug">
  #app
    notifications(group="notification" :duration="-1")
    header.header
      section.section
        .container
          .columns
            .column.is-half
              h1.title mustread
                span.has-text-danger .
                | tech
              h2.subtitle 
                a.has-text-black(href="https://github.com/sizovs/mustread-data")
                  i.fab.fa-github
                  |  open-source and crowd-sourced book listing.
            .column.is-half
              .buttons.is-pulled-right
                a.button(href="https://twitter.com/share?url=https://mustread.tech&via=eduardsi&text=📚+Books+that+will+make+you+a+better+developer:" target="_blank") 
                  span.icon.is-small
                    i.fab.fa-twitter
                  span Tweet           
                a.button(href="https://ko-fi.com/M4M3NR55" target="_blank") 
                  span.icon.is-small
                    i.fa.fa-heart.has-text-danger
                  span Buy me a coffee
    router-view
    vue-progress-bar
    footer.footer
      .content.has-text-centered
        p Developed at night by 
          a(href="https://sizovs.net") Eduards Sizovs
          |  under caffeine. No ads, open source.
      .columns.is-centered
        .column.is-narrow
          .buttons.has-text-centered
            a.button(href="https://ko-fi.com/M4M3NR55" target="_blank") 
              span.icon.is-small
                i.fa.fa-heart.has-text-danger
              span Buy me a coffee
            a.button(href="https://twitter.com/intent/follow?screen_name=eduardsi" target="_blank") 
              span.icon.is-small
                i.fab.fa-twitter
              span Follow me
      .columns.is-centered
        .column.is-narrow              
          .image.is-128x128
            img(src="/btc_address.png")
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
  }
</script>