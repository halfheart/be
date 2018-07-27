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
              <v-text-field
              label="이름"
              v-model="form.name"
              :rules="nameRules"
              ></v-text-field>
              <v-text-field
              label="직업"
              v-model="form.subname"
              :rules="subnameRules"
              ></v-text-field>
              <v-select
              :label="this.$cfg.const.FACTION"
              v-model="form.faction"
              :items="factionItems"
              :rules="factionRules">
              </v-select>
              <v-combobox
              :label="this.$cfg.const.TRAIT"
              v-model="form.trait"
              :items="traitItems"
              multiple
              chips
              deletable-chips>
              </v-combobox>
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
              :label="this.$cfg.const.HEALTH"
              v-model="form.health"
              ></v-text-field>
              <v-text-field
              :label="this.$cfg.const.SANITY"
              v-model="form.sanity"
              ></v-text-field>
              <v-textarea
              label="앞면 텍스트"
              v-model="form.text">
              </v-textarea>
              <v-textarea
              label="앞면 맛글"
              v-model="form.flavor">
              </v-textarea>
              <v-text-field
              label="뒷면 이름"
              v-model="form.backName"
              ></v-text-field>
              <v-textarea
              label="뒷면 텍스트"
              v-model="form.backText">
              </v-textarea>
              <v-textarea
              label="뒷면 맛글"
              v-model="form.backFlavor">
              </v-textarea>
              <v-text-field
              label="덱 사이즈"
              v-model="form.deckSize"
              ></v-text-field>
              <v-select
              label="필수 카드"
              v-model="form.deckRequirements"
              :items="requirementItems"
              item-text="name"
              item-value="_id"
              multiple
              chips
              deletable-chips
              ></v-select>
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
              <v-layout v-for="(i, index) in this.$cfg.const.FACTIONS" :key="index">
                <v-flex md6>
                  <v-switch :label="i" v-model="form.deckOption.sw[index]" />
                </v-flex>
                <v-flex md3>
                  <v-text-field label="min" v-model="form.deckOption.min[index]" :disabled="!form.deckOption.sw[index]" />
                </v-flex>
                <v-flex md3>
                  <v-text-field label="max" v-model="form.deckOption.max[index]" :disabled="!form.deckOption.sw[index]" />
                </v-flex>
              </v-layout>
              <input type="file" label="앞면 이미지" />
              <input type="file" label="뒷면 이미지" />
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
      subnameRules: [
        v => !!v || '직업을 입력하세요'
      ],
      factionRules: [
        v => !!v || '진영을 선택하세요'
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
      includedPackItems: [],
      requirementItems: [],
      form: {
        _id: null,
        name: '',
        subname: '',
        faction: '',
        type: this.$cfg.const.INVESTIGATOR,
        isUnique: true,
        doubleFaced: true,
        trait: [],
        will: 0,
        int: 0,
        combat: 0,
        agi: 0,
        health: 0,
        sanity: 0,
        text: '',
        flavor: '',
        backName: '',
        backText: '',
        backFlavor: '',
        deckSize: 0,
        deckRequirements: [],
        illustrator: '',
        includedPack: '',
        number: 0,
        deckOption: {
          sw: [true, true, true, true, true, true],
          faction: this.$cfg.const.FACTIONS,
          min: [0, 0, 0, 0, 0, 0],
          max: [5, 5, 5, 5, 5, 5]
        }
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
          type: this.$cfg.const.INVESTIGATOR,
          isUnique: true,
          doubleFaced: true,
          trait: [],
          will: 0,
          int: 0,
          combat: 0,
          agi: 0,
          health: 0,
          sanity: 0,
          text: '',
          flavor: '',
          backName: '',
          backText: '',
          backFlavor: '',
          deckSize: 0,
          deckRequirements: [],
          illustrator: '',
          includedPack: '',
          number: 0,
          deckOption: {
            sw: [true, true, true, true, true, true],
            faction: this.$cfg.const.FACTIONS,
            min: [0, 0, 0, 0, 0, 0],
            max: [5, 5, 5, 5, 5, 5]
          }
        }
        this.show = false
      })
    },
    readRequirements () {
      this.$axios.get(`${this.$cfg.path.api}data/card/filter`, {
        params: {
          excludeTypes: this.$cfg.const.INVESTIGATOR
        }
      })
      .then((res) => {
        if (!res.data.success) throw new Error(res.data.msg)
        this.requirementItems = []

        res.data.cards.array.forEach((i) => {
          this.requirementItems.push({ name: i.name, _id: i._id })
        })
        this.show = true
      })
      .catch((err) => {
        console.log(err.message)
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
        this.readRequirements()
      })
      .catch((err) => {
        console.log(err.message)
      })
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
        const f = this.$cfg.const.FACTIONS
        let o = {
          sw: [false, false, false, false, false, false],
          faction: f,
          min: [0, 0, 0, 0, 0, 0],
          max: [5, 5, 5, 5, 5, 5]
        }

        d.deckOption.forEach((i) => {
          const index = f.indexOf(i.faction)
          if (index !== -1) {
            o.sw[index] = true
            o.min[index] = i.min
            o.max[index] = i.max
          }
        })

        this.form = {
          _id: d._id,
          name: d.name,
          subname: d.subname,
          faction: d.faction,
          type: d.type,
          isUnique: d.isUnique,
          doubleFaced: d.doubleFaced,
          trait: d.trait,
          will: d.will,
          int: d.int,
          combat: d.combat,
          agi: d.agi,
          health: d.health,
          sanity: d.sanity,
          text: d.text,
          flavor: d.flavor,
          backName: d.backName,
          backText: d.backText,
          backFlavor: d.backFlavor,
          deckSize: d.deckSize,
          deckRequirements: d.deckRequirements,
          illustrator: d.illustrator,
          includedPack: d.includedPack,
          number: d.number,
          deckOption: o
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
