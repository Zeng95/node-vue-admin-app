<template>
  <div id="color-demo">
    <b-card
      no-body
      v-for="card in cards"
      :key="card.title"
      class="rounded-xl shadow border-0 overflow-hidden"
    >
      <b-card-header
        class="d-flex justify-content-between bg-transparent border-0 rounded-0"
      >
        <div class="card-header-title">
          <h4 class="mb-0">{{ card.title }}</h4>
        </div>

        <div
          class="card-header-actions cursor-pointer"
          @click="toggleCodeDemoVisibility(card)"
        >
          <b-icon v-if="!card.showCodeDemo" icon="code" />
          <b-icon v-else icon="code-slash" />
        </div>
      </b-card-header>

      <b-card-body>
        <p>{{ card.description }}</p>

        <ul class="list-none pl-0">
          <li v-for="variant in card.variants" :key="variant.name" class="p-2">
            <b-icon-caret-right-fill></b-icon-caret-right-fill>

            <div class="d-inline-block ml-1">
              <code>{{ variant.name }}</code> -
              <span class="text-capitalize" :class="`text-${variant.name}`">{{
                variant.name
              }}</span>
            </div>
          </li>
        </ul>

        <ul class="demo-alignment d-flex list-none pl-0 mb-0">
          <li
            v-for="variant in card.variants"
            :key="variant.name"
            class="d-flex justify-content-center align-items-center shadow"
            :class="[
              `bg-${variant.name}`,
              { 'text-white': variant.name !== 'light' }
            ]"
          >
            {{ variant.name }}
          </li>
        </ul>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
const cards = [
  {
    title: 'Default Colors',
    description:
      'We have a series of colors that are used by default. They include:',
    variants: [
      {
        name: 'primary'
      },
      {
        name: 'secondary'
      },
      {
        name: 'success'
      },
      {
        name: 'warning'
      },
      {
        name: 'danger'
      },
      {
        name: 'info'
      },
      {
        name: 'light'
      },
      {
        name: 'dark'
      }
    ]
  }
]

import { BIcon, BIconCaretRightFill } from 'bootstrap-vue'

export default {
  components: {
    BIcon,
    BIconCaretRightFill
  },
  data() {
    return {
      cards
    }
  }
}
</script>

<style lang="scss" scoped>
#color-demo {
  .card {
    .card-header {
      padding: 1.25rem 1.25rem 0;

      .b-icon {
        width: 16px;
        height: 16px;
      }
    }

    .demo-alignment {
      > li {
        margin: 10px;
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
    }
  }
}
</style>
