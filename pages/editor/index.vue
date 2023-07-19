<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset class="form-group">
              <input type="text" v-model="editorModel.title" required class="form-control form-control-lg" placeholder="Article Title" />
            </fieldset>
            <fieldset class="form-group">
              <input type="text" v-model="editorModel.description" required class="form-control" placeholder="What's this article about?" />
            </fieldset>
            <fieldset class="form-group">
              <textarea class="form-control" v-model="editorModel.body" required rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input type="text" class="form-control" v-model="tag" @keyup.enter="addTag" placeholder="Enter tags" />
              <div class="tag-list">
                <span v-for="item in editorModel.tagList" class="tag-default tag-pill">
                  <i class="ion-close-round" @click="removeTag(item)"></i>
                  {{ item }}
                </span>
              </div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="onSubmit">Publish Article</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticles, updateArticles, getArticle } from '@/api/article'

export default {
  middleware: 'authenticated',
  name: 'EditorIndex',
  async asyncData({ params }) {
    const res = {
      editorModel: null,
      slug: params.slug,
    }
    if (params.slug && params.slug != '') {
      const { data } = await getArticle(params.slug)
      res.editorModel = data.article
    }
    return res
  },
  data() {
    return {
      tag: '',
      editorModel: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
    }
  },
  methods: {
    async onSubmit() {
      if (this.slug) {
        const model = {
          slug: this.slug,
          data: {
            article: this.editorModel,
          },
        }
        try {
          const { data } = await updateArticles(model)
          this.$router.push(`/article/${data.article.slug}`)
        } catch (error) {
          console.log(error)
        }
      } else {
        if (this.editorModel.title == '') {
          alert(`title can't be blank`)
          return false
        } else if (this.editorModel.description == '') {
          alert(`description can't be blank`)
          return false
        } else if (this.editorModel.body == '') {
          alert(`body can't be blank`)
          return false
        }
        const model = {
          article: this.editorModel,
        }
        try {
          const { data } = await createArticles(model)
          this.$router.push(`/article/${data.article.slug}`)
        } catch (error) {
          console.log(error)
        }
      }
    },
    addTag() {
      if (this.tag && this.tag != '') {
        this.editorModel.tagList.push(this.tag)
        this.tag = ''
      }
    },
    removeTag(item) {
      const index = this.editorModel.tagList.indexOf(item)
      this.editorModel.tagList.splice(index, 1)
    },
  },
}
</script>

<style scoped></style>
