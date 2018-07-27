module.exports = {
  path: {
    // api: '/api/' npm run build 용
    api: 'http://localhost:3000/api/'
  },
  const: {
    ADD_MODE: '추가',
    MOD_MODE: '수정',
    FACTIONS: ['Neutral', 'Survivor', 'Guardian', 'Mystic', 'Seeker', 'Rogue'],
    TRAITS: ['Item', 'Tactic', 'Weapon', 'Relic'],
    INVESTIGATOR: '조사자',
    TYPES: ['Asset', 'Event', 'Skill', 'Treachery'],
    SUBTYPES: ['Weakness', 'Basic Weakness'],
    SLOTS: ['Hand', 'Hand x2', 'Ally', 'Body', 'Vision', 'Vision x2', 'Accessory'],
    WILLPOWER: 'Willpower',
    COMBAT: 'Combat',
    INTELLECT: 'Intellect',
    AGILITY: 'Agility',
    WILD: 'Wild',
    HEALTH: 'Health',
    SANITY: 'Sanity',
    COST: '비용',
    XP: '레벨',
    FACTION: '진영',
    TRAIT: '특성',
    SLOT: '슬롯',
    TYPE: '카드 종류',
    SUBTYPE: '서브 타입',
    UNIQUE: '유니크'
  }
}
