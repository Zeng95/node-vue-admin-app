<template>
  <div id="dashboard" class="h-100">
    <b-container fluid>
      <b-row>
        <b-col md="6" xl="3">
          <b-card
            data-background-color="blue"
            class="rounded-lg border-0 shadow"
            header-class="border-bottom-0 bg-transparent text-center"
          >
            <template v-slot:header>
              <h4 class="card-title text-white font-weight-light text-lg">
                Dashboard
              </h4>
              <p class="card-description text-base">Traffic and sales target</p>
            </template>

            <div class="chart-container mx-auto">
              <svg viewBox="1 1 34 34" class="chart-circle">
                <path
                  class="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  class="circle"
                  stroke-dasharray="80, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" class="percentage">80%</text>
              </svg>
            </div>
          </b-card>
        </b-col>

        <b-col md="6" xl="3">
          <b-card
            data-background-color="green"
            class="rounded-lg border-0 shadow"
            header-class="border-bottom-0 bg-transparent text-center"
          >
            <template v-slot:header>
              <h4 class="card-title text-white font-weight-light text-lg">
                Purchases
              </h4>
              <p class="card-description text-base">Completed</p>
            </template>

            <div class="chart-container mx-auto">
              <svg viewBox="1 1 34 34" class="chart-circle">
                <path
                  class="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  class="circle"
                  stroke-dasharray="44, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" class="percentage">44%</text>
              </svg>
            </div>
          </b-card>
        </b-col>

        <b-col md="6" xl="3">
          <b-card
            data-background-color="orange"
            class="rounded-lg border-0 shadow"
            header-class="border-bottom-0 bg-transparent text-center"
          >
            <template v-slot:header>
              <h4 class="card-title text-white font-weight-light text-lg">
                New Visitors
              </h4>
              <p class="card-description text-base">Out of total number</p>
            </template>

            <div class="chart-container mx-auto">
              <svg viewBox="1 1 34 34" class="chart-circle">
                <path
                  class="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  class="circle"
                  stroke-dasharray="58, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" class="percentage">58%</text>
              </svg>
            </div>
          </b-card>
        </b-col>

        <b-col md="6" xl="3">
          <b-card
            data-background-color="brown"
            class="rounded-lg border-0 shadow"
            header-class="border-bottom-0 bg-transparent text-center"
          >
            <template v-slot:header>
              <h4 class="card-title text-white font-weight-light text-lg">
                Subscriptions
              </h4>
              <p class="card-description text-base">Monthly newsletter</p>
            </template>

            <div class="chart-container mx-auto">
              <svg viewBox="1 1 34 34" class="chart-circle">
                <path
                  class="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  class="circle"
                  stroke-dasharray="21, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" class="percentage">21%</text>
              </svg>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="website-views">
        <b-col cols="12">
          <b-card class="rounded-lg" footer-tag="footer">
            <b-row>
              <b-col cols="5">
                <h4>Traffic</h4>
                <span>{{ getMonthAndYear }}</span>
              </b-col>
              <b-col cols="7">b</b-col>
            </b-row>

            <v-chart :options="chartOptionsBar"></v-chart>

            <template v-slot:footer>
              <b-row class="text-center">
                <b-col md>a</b-col>
                <b-col md>b</b-col>
                <b-col md>c</b-col>
                <b-col md>d</b-col>
                <b-col md>e</b-col>
              </b-row>
            </template>
          </b-card>
        </b-col>
      </b-row>

      <b-row>
        <b-col xl="4">a</b-col>
        <b-col xl="4">b</b-col>
        <b-col xl="4">c</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartOptionsBar: {
        tooltip: {},
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'line',
            data: [5, 20, 36, 10, 10, 20, 30],
            areaStyle: {}
          }
        ]
      }
    }
  },
  computed: {
    getMonthAndYear() {
      const date = new Date()
      const month = date.toLocaleString('default', { month: 'long' })
      const year = date.getFullYear()

      return `${month} ${year}`
    }
  }
}
</script>

<style lang="scss" scoped>
#dashboard {
  .card {
    &[data-background-color='blue'] {
      background: rgb(184, 216, 216);

      .card-description {
        color: rgb(80, 101, 104);
      }

      .circle-bg {
        stroke: #cae2e2;
      }
    }

    &[data-background-color='green'] {
      background: rgb(213, 229, 163);

      .card-description {
        color: rgb(80, 101, 104);
      }

      .circle-bg {
        stroke: #e0ecba;
      }
    }

    &[data-background-color='orange'] {
      background: rgb(255, 143, 94);

      .card-description {
        color: rgb(119, 37, 16);
      }

      .circle-bg {
        stroke: #ffab87;
      }
    }

    &[data-background-color='brown'] {
      background: rgb(214, 193, 171);

      .card-description {
        color: rgb(117, 68, 46);
      }

      .circle-bg {
        stroke: #e0d1c0;
      }
    }

    .chart-container {
      width: 160px;
      height: 160px;
    }

    .circle-bg {
      fill: none;
      stroke-width: 1;
    }

    .circle {
      animation: progress 1s ease-out forwards;

      fill: none;
      stroke: #fff;
      stroke-width: 1;
      stroke-linecap: round;
    }

    .percentage {
      font-size: 0.35em;

      fill: #fff;
      text-anchor: middle;
    }
  }

  .website-views {
    margin-top: 30px;
  }

  .echarts {
    width: 100%;
    height: 700px;
  }
}
</style>
