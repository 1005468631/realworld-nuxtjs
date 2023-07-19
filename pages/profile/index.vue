<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn" @click="$router.push('/settings')">
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'My' }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'My',
                    },
                  }"
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'Favorited' }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'Favorited',
                    },
                  }"
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <!-- 列表 -->
          <div class="article-preview" v-for="article in articles" :key="article.slug">
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
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页按钮 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page,
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'profile',
                    query: {
                      page: item,
                      tab: tab,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFollowUser } from '@/api/profile'
import { getArticles, delFavorite, addFavorite } from '@/api/article'

export default {
  middleware: 'authenticated',
  name: 'ProfileIndex',
  watchQuery: ['page', 'tab'],
  async asyncData({ params, query }) {
    const page = Number(query.page || 1)
    const tab = query.tab || 'My'
    const limit = 5
    const model = {
      limit,
      offset: (page - 1) * limit,
    }
    if (tab === 'Favorited') {
      model.favorited = params.username
    } else {
      model.author = params.username
    }
    const [profiles, article] = await Promise.all([getFollowUser(params.username), getArticles(model)])
    const { profile } = profiles.data
    const { articles, articlesCount } = article.data
    return {
      profile,
      articles,
      articlesCount,
      limit,
      page,
      tab,
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        await delFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    },
  },
}
</script>

<style scoped></style>
