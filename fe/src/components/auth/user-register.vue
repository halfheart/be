<template>
  <v-dialog v-model="show">
    <v-btn icon flat slot="activator"><v-icon>person_add</v-icon></v-btn>
    <v-card>
      <v-form ref="form" lazy-validation>
        <v-card-title>
          회원가입
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
          <v-text-field
          label="Username"
          v-model="form.username"
          :rules="rule.usernameRules"
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
export default {
  data () {
    return {
      show: false,
      pwdShow: false,
      pending: false,
      form: {
        email: '',
        pwd: '',
        username: ''
      },
      rule: {
        emailRules: [
          (v) => !!v || 'E-mail을 입력해주세요',
          (v) => /.+@.+\.+./.test(v) || '올바른 이메일을 입력해주세요'
        ],
        pwdRules: [
          (v) => !!v || '비밀번호를 입력해주세요',
          (v) => (v && v.length >= 8) || '비밀번호는 8자리 이상이어야합니다'
        ],
        usernameRules: [
          (v) => !!v || '닉네임을 입력해주세요',
          (v) => (v && v.length >= 2) || '닉네임은 2자 이상이어야합니다',
          (v) => (v && v.length <= 6) || '닉네임은 6자 이하여야합니다'
        ]
      }
    }
  },
  methods: {
    async submit () {
      this.pending = true
      try {
        if (!this.$refs.form.validate()) throw new Error('양식을 모두 올바르게 입력해주세요')

        const email = this.form.email
        const username = this.form.username
        const pwd = this.form.pwd

        const validEmail = await this.isValidEmail(email)
        const vaildUsername = await this.isValidUsername(username)

        if (!validEmail) throw new Error('중복되는 이메일')
        if (!vaildUsername) throw new Error('중복되는 사용자명')

        const res = await this.$axios.post(`${this.$cfg.path.api}data/auth/register`, {
          email,
          username,
          pwd
        })

        if (!res.data.success) throw new Error(res.data.msg)

        console.log('등록됨')
        this.show = false
      } catch (err) {
        console.log(err.message)
      }
      this.pending = false
    },
    async isValidEmail (email) {
      try {
        if (!email) throw new Error('E-mail 필요')
        const res = await this.$axios.get(`${this.$cfg.path.api}data/auth/validate`, {
          params: {
            query: { email }
          }
        })
        if (!res.data.success) throw new Error(res.data.msg)

        return res.data.valid
      } catch (err) {
        console.log(err.message)
      }
    },
    async isValidUsername (username) {
      try {
        if (!username) throw new Error('username 필요')
        const res = await this.$axios.get(`${this.$cfg.path.api}data/auth/validate`, {
          params: {
            query: { username }
          }
        })
        if (!res.data.success) throw new Error(res.data.msg)

        return res.data.valid
      } catch (err) {
        console.log(err.message)
      }
    }
  },
  watch: {
    show (val) {
      if (!val) this.$refs.form.reset()
    }
  }
}
</script>
