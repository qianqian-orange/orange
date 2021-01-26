import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      ruler: {
        startX: 0,
        startY: 0,
      },
    }
  },
  computed: {
    ...mapGetters('canvas', ['origin']),
  },
  mounted() {
    this.back2origin()
  },
  methods: {
    scroll(evt) {
      const target = evt.target
      this.ruler.startX = target.scrollLeft - this.origin.x
      this.ruler.startY = target.scrollTop - this.origin.y
    },
    back2origin() {
      this.$refs.scrollbar.scrollTo(this.origin.x, this.origin.y)
    },
  },
}
