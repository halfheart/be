<template>
  <v-dialog v-model="show" v-if="!isLoggedin">
    <v-btn icon flat slot="activator"><v-icon>lock</v-icon></v-btn>
    <v-card>
      <v-form ref="form" lazy-validation>
        <v-card-title>
          로그인
        </v-card-title>
        <v-card-text>
          <v-text-field
          label="E-mail"
          v-model="form.email"
          :rules="rule.emailRules"
          ></v-text-field>
          <v-text-field
          label="Password"
          v-model="form.pwd"
          :rules="rule.pwdRules"
          :append-icon="pwdShow ? 'visibility_off' : 'visibility'"
          :type="pwdShow? 'text' : 'password'"
          @click:append="pwdShow = !pwdShow"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="submit()" :loading="pending" :disabled="pending">submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import userCtrlsMixin from './mixins/user-ctrls-mixin'
export default {
  mixins: [
    userCtrlsMixin
  ],
  data () {
    return {
      show: false,
      pwdShow: false,
      pending: false,
      form: {
        email: '',
        pwd: ''
      },
      rule: {
        emailRules: [
          (v) => !!v || 'E-mail을 입력해주세요',
          (v) => /.+@.+\.+./.test(v) || '올바른 이메일을 입력해주세요'
        ],
        pwdRules: [
          (v) => !!v || '비밀번호를 입력해주세요',
          (v) => (v && v.length >= 8) || '비밀번호는 8자리 이상이어야합니다'
        ]
      }
    }
  },
  watch: {
    show (val) {
      if (!val) this.$refs.form.reset()
    }
  },
  methods: {
    submit () {
      this.pending = true
      if (this.$refs.form.validate()) {
        const email = this.form.email
        const pwd = this.form.pwd

        this.$axios.post(`${this.$cfg.path.api}data/auth/signin`, {
          email,
          pwd
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.msg)
          console.log('로그인됨')
          this.setCookies(res.data.user)
          this.show = false
          location.reload()
        })
      }
      this.pending = false
    },
    setCookies (u) {
      const expiresIn = this.$cfg.cookie.expiresIn
      this.$cookie.set('user_id', u._id, { expires: expiresIn })
      this.$cookie.set('username', u.username, { expires: expiresIn })
      this.$cookie.set('userEmail', u.email, { expires: expiresIn })
    }
  }
}
</script>
