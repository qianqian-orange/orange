<template>
  <div>
    <project-canvas />
    <project-grid />
  </div>
</template>

<script>
import ProjectCanvas from './components/canvas'
import ProjectGrid from './components/grid'

export default {
  name: 'Project',
  components: {
    ProjectCanvas,
    ProjectGrid,
  },
}
</script>
