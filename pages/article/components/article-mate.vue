<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <template v-if="$store.state.user && $store.state.user.username === article.author.username">
      <nuxt-link
        :to="{
          name: 'editor',
          params: {
            slug: slug,
          },
        }"
      >
        <button class="btn btn-outline-secondary btn-sm">
          <i class="ion-edit"></i>
          &nbsp; Edit Article
        </button>
      </nuxt-link>
      &nbsp;&nbsp;
      <button class="btn btn-outline-danger btn-sm" @click="del_article">
        <i class="ion-trash-a"></i>
        &nbsp; Delete Article
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{
          active: article.author.following,
        }"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow Anah Benešová
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.favorited,
        }"
        @click="onFavorite"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { addFavorite, delFavorite, delArticle } from '@/api/article'

export default {
  name: 'ArticleMateIndex',
  props: ['article', 'slug'],
  methods: {
    async del_article() {
      await delArticle(this.article.slug)
      this.$router.push('/')
    },
    async onFavorite() {
      this.article.favoriteDisabled = true
      if (this.article.favorited) {
        await delFavorite(this.article.slug)
        this.article.favorited = false
        this.article.favoritesCount += -1
      } else {
        await addFavorite(this.article.slug)
        this.article.favorited = true
        this.article.favoritesCount += 1
      }
      this.article.favoriteDisabled = false
    },
  },
}
</script>

<style scoped></style>
