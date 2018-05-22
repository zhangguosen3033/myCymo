<template>

    <div class=""> </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.$vux.toast.text(this.productId);
  },
  created() {
    this.caseId = this.$route.query.caseId;
    this.productId = this.$route.query.productId;
    this.productType = this.$route.query.productType;
  },
  methods: {}
};
</script>
