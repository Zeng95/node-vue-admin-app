<template>
  <div id="dashboard">
    <b-container fluid>
      <PanelGroup />

      <b-row class="website-views">
        <b-col cols="12">
          <b-card class="border-0 rounded-xl shadow" footer-tag="footer">
            <b-row>
              <b-col cols="5">
                <h4>Traffic</h4>
                <span>{{ getMonthAndYear }}</span>
              </b-col>
              <b-col cols="7">b</b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <b-row>
        <b-col xl="4">
          <b-card
            title="Card Title"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            class="w-100"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </b-card-text>
          </b-card>
        </b-col>

        <b-col xl="4">
          <b-card
            title="Card Title"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            class="w-100"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </b-card-text>
          </b-card>
        </b-col>

        <b-col xl="4">
          <b-card
            title="Card Title"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            class="w-100"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>

      <ChartCircleGroup />
    </b-container>
  </div>
</template>

<script>
import ChartCircleGroup from './components/chart/ChartCircleGroup'
import PanelGroup from './components/PanelGroup'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  orders: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  newVisitors: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  subscriptions: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  components: {
    PanelGroup,
    ChartCircleGroup
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    getMonthAndYear() {
      const date = new Date()
      const month = date.toLocaleString('default', { month: 'long' })
      const year = date.getFullYear()

      return `${month} ${year}`
    }
  },
  created() {
    console.log(this)
  }
}
</script>

<style lang="scss" scoped>
#dashboard {
  .website-views {
    margin: 30px -15px;
  }

  .echarts {
    width: 100%;
    height: 700px;
  }
}
</style>
