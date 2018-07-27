<template>
  <v-card height="400">
    <v-container grid-list-md>
      <v-layout align-center justify-center fill-height v-if="!show">
        <v-progress-circular
          :size="70"
          :width="7"
          indeterminate
        ></v-progress-circular>
      </v-layout>
      <v-fade-transition>
        <v-form ref="form" v-if="show">
          <v-container>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text>
              <v-text-field
              label="팩 이름"
              :rules="nameRules"
              v-model="form.name"
              ></v-text-field>
              <v-select
              :items="parentPacks"
              item-text="name"
              item-value="_id"
              v-model="form.parent"
              label="부모 팩"
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="submit()">{{ mode }}</v-btn>
              <v-btn @click="close()">취소</v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-fade-transition>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    mode: { type: String, default: '' }
  },
  data () {
    return {
      nameRules: [
        v => !!v || '이름을 입력하세요'
      ],
      parentPacks: [],
      form: {
        _id: null,
        name: '',
        parent: null
      },
      show: false
    }
  },
  computed: {
    name: function () {
      return this.pack.name
    }
  },
  methods: {
    submit () {
      if (!this.$refs.form.validate()) return console.log('검증되지않음')
      this.$emit('submit-form', this.form)
    },
    close () {
      this.$emit('close-form')
    },
    resetForm () {
      this.$refs.form.reset()

      this.$nextTick(() => {
        this.form = {
          _id: null,
          name: '',
          parent: null
        }
        this.show = false
      })
    },
    readParentPacks () {
      this.$axios.get(`${this.$cfg.path.api}data/pack/filter`, {
        params: {
          exclude: this.form.name,
          parent: 'null'
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.parentPacks = []

        res.data.packs.array.forEach((i) => {
          this.parentPacks.push({ name: i.name, _id: i._id })
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
      this.show = true
    },
    modForm (_id) {
      this.$axios.get(`${this.$cfg.path.api}data/pack`, {
        params: {
          _id: _id
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.form = res.data.pack
        this.readParentPacks()
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
