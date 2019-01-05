<template lang="pug">
  section.section(v-if="facetFilters && facetFilters.length")
    .tags
      span.tag.is-medium.is-capitalized(v-for="facetFilter in facetFilters") {{facetFilter.refinement}}
        button.delete.is-small(@click="remove(facetFilter.facet, facetFilter.refinement)")
</template>
<script>
  import { Component } from 'vue-instantsearch'
  export default {
    computed: {
      facetFilters() {
        let refinements = this.searchStore.algoliaHelper.state.disjunctiveFacetsRefinements
        let facets = Object.keys(refinements)
        let result = []
        for (let facet of facets) {
          for (let refinementForAFacet of refinements[facet]) {
            result.push({
              facet: facet,
              refinement: refinementForAFacet
            })
          }
        }
        return result
      }
    },
    methods: {
      remove(facet, refinement) {
        this.searchStore.algoliaHelper.removeDisjunctiveFacetRefinement(facet, refinement)
      }
    },
    mixins: [ Component ]
  }
</script>
