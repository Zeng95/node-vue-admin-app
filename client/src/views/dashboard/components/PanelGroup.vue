<template>
  <b-row>
    <!-- Employees -->
    <b-col sm="6" xl="3">
      <b-card no-body class="border-0 rounded-xl shadow">
        <b-card-body class="d-flex justify-content-between align-items-center">
          <div class="icon">
            <b-icon-people-fill font-scale="4" variant="info" />
          </div>
          <div class="content text-right">
            <p class="mb-0">Employees</p>
            <h3 class="mb-0">366</h3>
          </div>
        </b-card-body>

        <b-card-footer class="border-top-0 rounded-xl bg-white text-black-50">
          <b-icon-arrow-repeat></b-icon-arrow-repeat>
          <span class="ml-2">Updated now</span>
        </b-card-footer>
      </b-card>
    </b-col>

    <!-- Sales -->
    <b-col sm="6" xl="3">
      <b-card no-body class="border-0 rounded-xl shadow">
        <b-card-body class="d-flex justify-content-between align-items-center">
          <div class="icon">
            <b-icon-folder-plus font-scale="4" variant="success" />
          </div>
          <div class="content text-right">
            <p class="mb-0">Sales</p>
            <h3 class="mb-0">6781</h3>
          </div>
        </b-card-body>

        <b-card-footer class="border-top-0 rounded-xl bg-white text-black-50">
          <b-icon-calendar></b-icon-calendar>
          <span class="ml-2">Last day</span>
        </b-card-footer>
      </b-card>
    </b-col>

    <!-- Orders -->
    <b-col sm="6" xl="3">
      <b-card no-body class="border-0 rounded-xl shadow">
        <b-card-body class="d-flex justify-content-between align-items-center">
          <div class="icon">
            <b-icon-file-earmark-check font-scale="4" variant="danger" />
          </div>
          <div class="content text-right">
            <p class="mb-0">Orders</p>
            <h3 class="mb-0">4635</h3>
          </div>
        </b-card-body>

        <b-card-footer class="border-top-0 rounded-xl bg-white text-black-50">
          <b-icon-stopwatch flip-h></b-icon-stopwatch>
          <span class="ml-2">In the last hour</span>
        </b-card-footer>
      </b-card>
    </b-col>

    <!-- Expense -->
    <b-col sm="6" xl="3">
      <b-card no-body class="border-0 rounded-xl shadow">
        <b-card-body class="d-flex justify-content-between align-items-center">
          <div class="icon">
            <b-icon-folder-minus font-scale="4" variant="warning" />
          </div>
          <div class="content text-right">
            <p class="mb-0">Expense</p>
            <h3 class="mb-0">5370</h3>
          </div>
        </b-card-body>

        <b-card-footer class="border-top-0 rounded-xl bg-white text-black-50">
          <b-icon-arrow-repeat></b-icon-arrow-repeat>
          <span class="ml-2">Updated now</span>
        </b-card-footer>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BIconCalendar,
  BIconStopwatch,
  BIconPeopleFill,
  BIconFolderPlus,
  BIconFolderMinus,
  BIconArrowRepeat,
  BIconFileEarmarkCheck
} from 'bootstrap-vue'

export default {
  name: 'PanelGroup',
  components: {
    BIconCalendar,
    BIconStopwatch,
    BIconFolderPlus,
    BIconPeopleFill,
    BIconFolderMinus,
    BIconArrowRepeat,
    BIconFileEarmarkCheck
  }
}
</script>

<style></style>
