<template>
  <b-row class="chart-circle-group">
    <b-col class="chart-circle-group-item" md="6" xl="3">
      <b-card
        data-background-color="blue"
        class="border-0 shadow rounded-xl"
        header-class="border-bottom-0 bg-transparent text-center"
      >
        <template v-slot:header>
          <h4 class="card-title text-white font-weight-light text-lg">
            Dashboard
          </h4>
          <p class="card-description text-base">Traffic and sales target</p>
        </template>

        <div class="chart-container mx-auto cursor-pointer">
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

    <b-col class="chart-circle-group-item" md="6" xl="3">
      <b-card
        data-background-color="green"
        class="border-0 shadow rounded-xl"
        header-class="border-bottom-0 bg-transparent text-center"
      >
        <template v-slot:header>
          <h4 class="card-title text-white font-weight-light text-lg">
            Orders
          </h4>
          <p class="card-description text-base">Completed</p>
        </template>

        <div class="chart-container mx-auto cursor-pointer">
          <svg viewBox="1 1 34 34" class="chart-circle">
            <path
              class="circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              class="circle"
              stroke-dasharray="56, 100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" class="percentage">56%</text>
          </svg>
        </div>
      </b-card>
    </b-col>

    <b-col class="chart-circle-group-item" md="6" xl="3">
      <b-card
        data-background-color="orange"
        class="border-0 shadow rounded-xl"
        header-class="border-bottom-0 bg-transparent text-center"
      >
        <template v-slot:header>
          <h4 class="card-title text-white font-weight-light text-lg">
            New Visitors
          </h4>
          <p class="card-description text-base">Out of total number</p>
        </template>

        <div class="chart-container mx-auto cursor-pointer">
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

    <b-col class="chart-circle-group-item" md="6" xl="3">
      <b-card
        data-background-color="brown"
        class="border-0 shadow rounded-xl"
        header-class="border-bottom-0 bg-transparent text-center"
      >
        <template v-slot:header>
          <h4 class="card-title text-white font-weight-light text-lg">
            Subscriptions
          </h4>
          <p class="card-description text-base">Monthly newsletter</p>
        </template>

        <div class="chart-container mx-auto cursor-pointer">
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
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.chart-circle-group-item {
  margin-top: 30px;

  .card {
    &[data-background-color='blue'] {
      background: #b8d8d8;

      .card-description {
        color: #506568;
      }

      .circle-bg {
        stroke: #cae1e1;
      }
    }

    &[data-background-color='green'] {
      background: #d5e5a3;

      .card-description {
        color: #60773d;
      }

      .circle-bg {
        stroke: #e0ecba;
      }
    }

    &[data-background-color='orange'] {
      background: #ff8f5d;

      .card-description {
        color: #772510;
      }

      .circle-bg {
        stroke: #ffad89;
      }
    }

    &[data-background-color='brown'] {
      background: rgb(214, 193, 171);

      .card-description {
        color: #75442e;
      }

      .circle-bg {
        stroke: #e0d1c0;
      }
    }

    .chart-container {
      width: 160px;
      height: 160px;

      .chart-circle {
        & > * {
          transition: all 0.25s ease;
        }

        &:hover {
          .circle-bg {
            stroke-width: 1;
          }

          .percentage {
            font-size: 0.4rem;
          }

          .circle {
            stroke-width: 1;
          }
        }
      }

      .circle-bg {
        fill: none;
        stroke-width: 1.5;
      }

      .circle {
        animation: progress 1s ease-out forwards;

        fill: none;
        stroke: #fff;
        stroke-width: 1.5;
        stroke-linecap: round;
      }

      .percentage {
        font-size: 0.35rem;

        fill: #fff;
        text-anchor: middle;
      }
    }
  }
}
</style>
