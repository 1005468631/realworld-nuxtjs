<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" v-model="review" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user && user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click="add">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
        <span class="mod-options">
          <i class="ion-trash-a" @click="del(comment.id)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments, delComments } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleCommentsIndex',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      review: '',
    }
  },
  async mounted() {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async add() {
      if (this.review == '') return false
      const model = {
        slug: this.article.slug,
        data: {
          comment: {
            body: this.review,
          },
        },
      }
      await addComments(model)
    },
    async del(id) {
      const model = {
        slug: this.article.slug,
        id,
      }
      await delComments(model)
      const index = this.comments.findIndex(w => w.id == id)
      this.comments.splice(index, 1)
    },
  },
}
</script>

<style scoped></style>
