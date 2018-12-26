<template lang="pug">
  .searchContainer
    ais-index(:search-store="searchStore" index-name="prod_BOOKS")
      section.section
        .container
          .columns
            .column.is-3
              section.section
                h1.title Topics
                ais-refinement-list.is-capitalized(attribute-name="about" :limit="30" :class-names="{'ais-refinement-list__count': 'tag'}")
              section.section
                h1.title Authors
                ais-refinement-list.is-capitalized(attribute-name="by" :limit="10" :class-names="{'ais-refinement-list__count': 'tag'}")              
            .column.is-8
              section.section
                ais-results
                  template(slot-scope="{ result }")
                    h1.title.is-uppercase.has-text-centered {{result.title}}
                    .has-text-centered
                      br
                      span(v-for="(tag, index) in result.about")
                        a.is-capitalized(v-on:click="refine('about', tag)") {{tag}}
                        span(v-if="index != result.about.length - 1") , 
                      span  book by 
                      span(v-for="(author, index) in result.by")
                        a.is-capitalized(v-on:click="refine('by', author)") {{author}}
                        span(v-if="index != result.by.length - 1") , 
                      br  
                      br
                    nav.level.is-mobile
                      .level-item.has-text-centered
                        .item
                          p.heading Rating
                          p.subtitle {{result.ratingAvg}}
                          .star-rating
                            .back-stars
                              i.fas.fa-star
                              i.fas.fa-star
                              i.fas.fa-star
                              i.fas.fa-star
                              i.fas.fa-star
                              .front-stars.has-text-warning(:style="'width:' + (result.ratingAvg / 5) * 100 + '%'")
                                i.fa.fa-star
                                i.fa.fa-star
                                i.fa.fa-star
                                i.fa.fa-star
                                i.fa.fa-star
                      .level-item.has-text-centered
                        .item
                          p.heading Reviews
                          p.subtitle {{result.ratingCount + result.reviewCount | kilo}}
                      .level-item.has-text-centered
                        .item
                          p.heading Year
                          p.subtitle {{result.year}}                                
                      .level-item.has-text-centered
                        .item
                          p.heading Pages
                          p.subtitle {{result.pages}}
                    .columns
                      .column.is-4
                        img.cover(:src="result.cover")
                        br
                        br
                        .buttons(style="justify-content: center")
                          a.button.is-small(:href="result.goodreadsLink" target="_blank") 
                            span.icon.is-small
                              i.fa.fa-plus
                            span Goodreads
                          a.button.is-small(target="_blank") 
                            span.icon.is-small
                              i.fas.fa-shopping-cart
                            span Amazon                        
                      .column.is-8                   
                          .content
                            p.description(v-html="result.description")
                    hr

      section.section
        .container
          nav.paging(role="navigation" aria-label="pagination")
            ais-pagination.pagination(v-on:page-change="scrollTop" :class-names="{'ais-pagination': 'pagination-list', 'ais-pagination__item': 'page', 'ais-pagination__link': 'pagination-link', 'ais-pagination__item--previous': 'is-hidden', 'ais-pagination__item--next': 'is-hidden', 'ais-pagination__item--active': 'is-current'}")
</template>
<style lang="scss">
  .ais-refinement-list__value::before {
    content: " ";
  }  
  .description {
    b, i {
      font-weight: normal;
      font-style: normal;
    }
    // overflow: hidden;
    // max-height: 35ch;
    // text-overflow: ellipsis;
  }
  .cover {
    width: 100%;
    box-shadow: 14px 13px 35px -10px rgba(0,0,0,0.4);
  }
  .star-rating {
    margin-top: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .back-stars {
      display: flex;
      position: relative;
    }
    .front-stars {
      display: flex;
      overflow: hidden;
      position: absolute;
      top: 0;
    }
  }
</style>
<script>
import { createFromAlgoliaCredentials } from 'vue-instantsearch'

let searchStore = createFromAlgoliaCredentials(
    'DR90AOGGE9',
    '6316b2949713aec016e726979b7f701d'
)

export default { 
  props: {
    queryParameters: {
      type: String,
      default: ''
    },
  },
  data: () => {
    return {
      searchStore
    }
  },
  created() {
    console.log(this.queryParameters)
    
    this.searchStore.queryParameters = this.queryParameters
  },
  watch: {
    'searchStore.queryParameters'(parameters) {
      let query = Object
        .entries(parameters.disjunctiveFacetsRefinements)
        .map(([facet, value]) => facet + '/' + value.join('/'))
        .join('/')
        .replace(/\s/g, '~')
      this.$router.push({ path: '/' + query })
    }
  },
  methods: {
    scrollTop(page) {
      window.scrollTo(0,0)
    },
    refine(facet, value) {
      this.searchStore.algoliaHelper.addDisjunctiveFacetRefinement(facet, value)
    }
  },
  components: { 
  }
}
</script>