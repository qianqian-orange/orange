<template>
  <div>
    <componnet
      :is="component"
      v-for="component in items"
      :key="component.name"
    />
  </div>
</template>

<script>
import BorderRadius from './components/radius'
import BorderFill from './components/fill'
import BorderStroke from './components/stroke'
import BorderShadow from './components/shadow'

export default {
  name: 'ApperanceBorder',
  data() {
    return {
      items: [BorderRadius, BorderFill, BorderStroke, BorderShadow],
    }
  },
}
</script>
