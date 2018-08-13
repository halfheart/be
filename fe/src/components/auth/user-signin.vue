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
    async submit () {
      this.pending = true
      try {
        if (!this.$refs.form.validate()) throw new Error('양식을 올바르게 채워주세요.')

        const email = this.form.email
        const pwd = this.form.pwd

        const res = await this.$axios.post(`${this.$cfg.path.api}data/auth/signin`, {
          email,
          pwd
        })

        if (!res.data.success) throw new Error(res.data.msg)
        console.log('로그인됨')
        this.show = false
        location.reload()
      } catch (err) {
        console.log(err.message)
      }
      this.pending = false
    }
  }
}
</script>
