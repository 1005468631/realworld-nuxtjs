<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article" :slug="slug" />
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
        <ul class="tag-list">
          <li class="tag-default tag-pill tag-outline" v-for="item in article.tagList" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
      <hr />
      <div class="article-actions">
        <article-meta :article="article" :slug="slug" />
      </div>
      <div class="row" v-if="$store.state.user">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-mate.vue'
import ArticleComments from './components/article-comments.vue'

export default {
  name: 'ArticleIndex',
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article,
      slug: params.slug,
    }
  },
  components: {
    ArticleMeta,
    ArticleComments,
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [{ hid: 'description', name: 'description', content: this.article.description }],
    }
  },
}
</script>

<style scoped></style>
