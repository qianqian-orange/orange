<template>
  <div>
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-form-item label="Note">
        <a-input
          v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
    </a-form>
    <!-- <a-input placeholder="Basic usage" />
    <a-input prefix="￥" suffix="RMB" />
    <a-input-search placeholder="input search loading deault" />
    <a-input addon-before="Http://" addon-after=".com" default-value="mysite" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
}
</script>
