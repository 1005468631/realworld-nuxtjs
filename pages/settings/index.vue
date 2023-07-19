<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" v-model="user.image" placeholder="URL of profile picture" />
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" disabled v-model="user.username" type="text" placeholder="Your Name" />
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" v-model="user.bio" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.email" type="email" placeholder="Email" />
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.password" type="password" placeholder="Password" />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="outlogin">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { getUser, UpdateUser } from '@/api/user'

export default {
  middleware: 'authenticated',
  name: 'SettingsIndex',
  async asyncData() {
    const { data } = await getUser()
    return {
      user: data.user,
    }
  },
  methods: {
    outlogin() {
      this.$store.commit('setUser', null)
      Cookie.remove('user')
      this.$router.push('/')
    },
    async onSubmit() {
      if (this.editorModel.email == '') {
        alert(`email can't be blank`)
        return false
      } else if (this.editorModel.image == '') {
        alert(`image can't be blank`)
        return false
      }
      const model = {
        user: {
          email: this.user.email,
          bio: this.user.bio,
          image: this.user.image,
        },
      }
      if (this.user.password != '') {
        model.user.password = this.user.password
      }
      try {
        const { data } = await UpdateUser(model)
        this.$router.push(`/article/${data.article.slug}`)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped></style>
