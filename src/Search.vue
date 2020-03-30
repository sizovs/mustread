<template lang="pug">
  .searchContainer
    ais-index(:search-store="searchStore" index-name="prod_BOOKS")
      section.section
        .container
          .columns
            .column.is-4
              .is-hidden-tablet
                a(@click="toggleCategories()" v-if="categoriesVisible") 
                  i.fas.fa-eye-slash
                  |  Hide categories
              .is-hidden-tablet
                a(@click="toggleCategories()" v-if="!categoriesVisible") 
                  i.fa.fa-eye
                  |  Show categories
              .categories(v-bind:class="{ 'is-hidden-mobile': !forceShowCategories }" v-observe-visibility="categoryVisibilityChanged")
                  section.section
                    h1.title Topics
                    ais-refinement-list.is-capitalized(attribute-name="about" :limit="30" :class-names="{'ais-refinement-list__count': 'tag'}")
                  section.section
                    h1.title Authors
                    ais-refinement-list.is-capitalized(attribute-name="by" :limit="10" :class-names="{'ais-refinement-list__count': 'tag'}")
                  section.section(style="display:none")
                    h1.title Isbn
                    ais-refinement-list.is-capitalized(attribute-name="isbn" :limit="10" :class-names="{'ais-refinement-list__count': 'tag'}")
            .column.is-8
              ActiveFilters
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
                        img.cover.lazy(:data-src="result.cover" alt="Book cover")
                        br
                        br
                        .buttons(style="justify-content: center")
                          a.button.is-small(rel="noreferrer" :href="result.goodreadsLink" target="_blank") 
                            span.icon.is-small
                              i.fa.fa-plus
                            span Goodreads
                          .dropdown.is-hoverable(v-if="result.asin")
                            .dropdown-trigger
                              button.button.is-small(aria-haspopup="true" :aria-controls="'storePicker' + result.asin")
                                span.icon.is-small
                                  i.fas.fa-shopping-cart(aria-hidden="true")
                                span Amazon
                            .dropdown-menu(:id="'storePicker' + result.asin" role="menu")
                              .dropdown-content
                                a.dropdown-item(rel="noreferrer" v-for="(tag, domain) in affiliates" :href="'https://' + domain + '/gp/product/' + result.asin + '/?tag=' + tag" target="_blank") {{domain}}           
                      .column.is-8     
                          .content
                            p.description(v-html="result.description")
                          .columns.is-pulled-right.is-vcentered.is-gapless.has-text-grey-light.is-size-7.is-mobile(v-if="result.kudo")
                            .column.is-narrow
                              i.fa.fa-heart
                              span  contributed by 
                                a.has-text-grey-light(rel="noreferrer" :href="'https://twitter.com/' + result.kudo" target="_blank") @{{result.kudo}}
                              | &nbsp;
                            .column.is-narrow
                              figure.image.is-16x16
                                img.is-rounded(:src="'https://avatars.io/twitter/' + result.kudo" :alt="'Thanks to ' + result.kudo")
                    hr

      section.section(v-show="searchStore.totalPages > 1")
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
import ActiveFilters from './ActiveFilters.vue'

let searchStore = createFromAlgoliaCredentials(
    'DR90AOGGE9',
    '6316b2949713aec016e726979b7f701d'
)

export default { 
  props: {
    queryParameters: {
      type: String
    },
  },
  data: () => {
    return {
      searchStore,
      categoriesVisible: true,
      forceShowCategories: false,
      processed: false,
      affiliates: {
        'amazon.com': 'sizovs-20',
        'amazon.ca': 'mustr00-20',
        'amazon.de': 'mustread033-21',
        'amazon.fr': 'mustread0f-21',
        'amazon.es': 'mustread03c-21',
        'amazon.it': 'mustread0c1-21',
        'amazon.co.uk': 'mustread03-21'
      }
    }
  },
  computed: {
    filters: () => searchStore.queryParameters.disjunctiveFacetsRefinements
  },
  metaInfo () {
    const about = 
      [
      ...(this.filters['about'] || []),
      ...(this.filters['by'] || []).map(a => a + "'s")
      ]
      .join(' and ')
    return {
      title: about
    }
  },  
  created() {
    if (!this.queryParameters) {
      return
    }

    const facets = ['by', 'about', 'isbn']
    const reducer = (acc, curr) => {
      if (facets.includes(curr)) {
        acc[curr] = []
        acc.facet = curr
      } else {
        let value = curr.replace(/\~/g, ' ')
        acc[acc.facet].push(value)
      }
      return acc
    }
    
    Object  
      .entries(
        this.queryParameters
          .split("/")
          .reduce(reducer, {}))
      .filter(([facet]) => facets.includes(facet))
      .forEach(([facet, value]) => {
        this.searchStore.queryParameters.disjunctiveFacetsRefinements[facet] = value
      })
  },
  updated: function () {
    this.$nextTick(function () {
      const images = [...document.getElementsByClassName('lazy')]
      images.forEach(image => image.removeAttribute('data-was-processed'))
      myLazyLoad.update()
    })
  },  
  watch: {
    'searchStore.queryParameters'(parameters) {
      let query = Object
        .entries(parameters.disjunctiveFacetsRefinements)
        .map(([facet, value]) => facet + '/' + value.join('/'))
        .join('/')
        .replace(/\s/g, '~')
      this.$router.push({ path: '/books/' + query })
    }
  },
  methods: {
    categoryVisibilityChanged(categoriesVisible, entry) {
      this.categoriesVisible = categoriesVisible
    },
    toggleCategories() {
      this.forceShowCategories = !this.forceShowCategories
    },
    scrollTop(page) {
      window.scrollTo(0, 0)
    },
    refine(facet, value) {
      this.searchStore.algoliaHelper.addDisjunctiveFacetRefinement(facet, value)
    },
    buy(asin) {
      window.location.href = "https://www.amazon.com/gp/product/" + asin + "/&tag=mustread0da-20"
    }
  },
  components: { 
    ActiveFilters
  }
}
</script>
