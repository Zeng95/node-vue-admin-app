<template>
  <div :class="className"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'

export default {
  props: {
    className: {
      type: String,
      default: 'chart-line'
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('main'))
      this.setChartOptions()
    },
    setChartOptions() {
      const option = {}

      this.chart.setOption(option)
    }
  }
}
</script>

<style></style>
