<template>
  <v-card>
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
              <v-layout>
                <v-flex md4>
                  <v-switch
                  v-model="form.isUnique"
                  :label="this.$cfg.const.UNIQUE" />
                </v-flex>
                <v-flex md8>
                  <v-text-field
                  label="이름"
                  v-model="form.name"
                  :rules="nameRules"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-text-field
              label="부제목"
              v-model="form.subname"
              ></v-text-field>
              <v-select
              :label="this.$cfg.const.FACTION"
              v-model="form.faction"
              :items="factionItems"
              :rules="factionRules">
              </v-select>
              <v-select
              :label="this.$cfg.const.TYPE"
              v-model="form.type"
              :items="typeItems"
              :rules="typeRules">
              </v-select>
              <v-select
              :label="this.$cfg.const.SUBTYPE"
              v-model="form.subtype"
              :items="subtypeItems"
              clearable>
              </v-select>
              <v-combobox
              :label="this.$cfg.const.TRAIT"
              v-model="form.trait"
              :items="traitItems"
              multiple
              chips
              deletable-chips>
              </v-combobox>
              <v-combobox
              :label="this.$cfg.const.SLOT"
              v-model="form.slot"
              :items="slotItems"
              multiple
              chips
              deletable-chips>
              </v-combobox>
              <v-text-field
              :label="this.$cfg.const.COST"
              v-model="form.cost"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.XP"
              v-model="form.xp"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.WILLPOWER"
              v-model="form.will"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.INTELLECT"
              v-model="form.int"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.COMBAT"
              v-model="form.combat"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.AGILITY"
              v-model="form.agi"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.WILD"
              v-model="form.wild"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.HEALTH"
              v-model="form.health"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.SANITY"
              v-model="form.sanity"
              ></v-text-field>
              <v-textarea
              label="텍스트"
              v-model="form.text">
              </v-textarea>
              <v-textarea
              label="맛글"
              v-model="form.flavor">
              </v-textarea>
              <v-text-field
              label="삽화가"
              v-model="form.illustrator"
              :rules="illustratorRules"
              ></v-text-field>
              <v-text-field
              label="번호"
              v-model="form.number"
              :rules="numberRules"
              ></v-text-field>
              <v-select
              label="수록 세트"
              :items="includedPackItems"
              item-text="name"
              item-value="_id"
              v-model="form.includedPack"
              :rules="packRules"
              ></v-select>
              <input type="file" label="앞면 이미지" />
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
      factionRules: [
        v => !!v || '진영을 선택하세요'
      ],
      typeRules: [
        v => !!v || `${this.$cfg.const.TYPE}을 선택하세요`
      ],
      packRules: [
        v => !!v || '수록 팩을 선택하세요'
      ],
      numberRules: [
        v => !!v || '카드 번호를 입력하세요'
      ],
      illustratorRules: [
        v => !!v || '삽화가를 입력하세요'
      ],
      factionItems: this.$cfg.const.FACTIONS,
      traitItems: this.$cfg.const.TRAITS,
      typeItems: this.$cfg.const.TYPES,
      subtypeItems: this.$cfg.const.SUBTYPES,
      slotItems: this.$cfg.const.SLOTS,
      includedPackItems: [],
      form: {
        _id: null,
        name: '',
        subname: '',
        faction: '',
        type: '',
        subtype: null,
        isUnique: false,
        trait: [],
        slot: [],
        cost: null,
        xp: 0,
        will: 0,
        int: 0,
        combat: 0,
        agi: 0,
        wild: 0,
        health: 0,
        sanity: 0,
        text: '',
        flavor: '',
        illustrator: '',
        includedPack: '',
        number: 0
      },
      show: false
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
          subname: '',
          faction: '',
          type: '',
          subtype: null,
          isUnique: false,
          trait: [],
          slot: [],
          cost: null,
          xp: 0,
          will: 0,
          int: 0,
          combat: 0,
          agi: 0,
          wild: 0,
          health: 0,
          sanity: 0,
          text: '',
          flavor: '',
          illustrator: '',
          includedPack: '',
          number: 0
        }
        this.show = false
      })
    },
    readPackList () {
      this.$axios.get(`${this.$cfg.path.api}data/pack/filter`)
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.includedPackItems = []

        res.data.packs.array.forEach((i) => {
          this.includedPackItems.push({ name: i.name, _id: i._id })
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
      this.show = true
    },
    modForm (_id) {
      this.$axios.get(`${this.$cfg.path.api}data/card`, {
        params: {
          _id: _id
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        const d = res.data.card

        this.form = {
          _id: d._id,
          name: d.name,
          subname: d.subname,
          faction: d.faction,
          type: d.type,
          subtype: d.subtype,
          isUnique: d.isUnique,
          trait: d.trait,
          slot: d.slot,
          cost: d.cost,
          xp: d.xp,
          will: d.will,
          int: d.int,
          combat: d.combat,
          agi: d.agi,
          wild: d.wild,
          health: d.health,
          sanity: d.sanity,
          text: d.text,
          flavor: d.flavor,
          illustrator: d.illustrator,
          includedPack: d.includedPack,
          number: d.number
        }
        this.readPackList()
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>
