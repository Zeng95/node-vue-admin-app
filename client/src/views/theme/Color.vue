<template>
  <div id="color-demo">
    <b-card
      no-body
      v-for="card in cards"
      :key="card.title"
      class="rounded-xl shadow overflow-hidden"
    >
      <b-card-header class="d-flex justify-content-between rounded-0">
        <div class="card-header-title">
          <h4 class="mb-0 text-info">{{ card.title }}</h4>
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
        <ul>
          <li v-for="variant in card.variants" :key="variant.name" class="p-2">
            <span class="text-capitalize" :class="variant.textClass">
              {{ variant.name }}
            </span>
          </li>
        </ul>

        <p>{{ card.description }}</p>

        <ul class="demo-alignment d-flex pl-0 mb-0">
          <li
            v-for="variant in card.variants"
            :key="variant.name"
            class="d-flex justify-content-center align-items-center text-center shadow p-3"
            :class="[
              variant.bgClass,
              {
                'text-black':
                  variant.name === 'light' || variant.name === 'light gradient'
              },
              {
                'text-white':
                  variant.name !== 'light' && variant.name !== 'light gradient'
              }
            ]"
          >
            <span>{{ variant.name }}</span>
          </li>
        </ul>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
const cards = [
  {
    title: 'Bootstrap Defaults',
    description:
      'The base variants will translate to various Bootstrap v4 contextual class names based on the component (and variant purpose) where they are used.',
    variants: [
      {
        name: 'primary',
        textClass: 'text-primary',
        bgClass: 'bg-primary'
      },
      {
        name: 'secondary',
        textClass: 'text-secondary',
        bgClass: 'bg-secondary'
      },
      {
        name: 'success',
        textClass: 'text-success',
        bgClass: 'bg-success'
      },
      {
        name: 'warning',
        textClass: 'text-warning',
        bgClass: 'bg-warning'
      },
      {
        name: 'danger',
        textClass: 'text-danger',
        bgClass: 'bg-danger'
      },
      {
        name: 'info',
        textClass: 'text-info',
        bgClass: 'bg-info'
      },
      {
        name: 'light',
        textClass: 'text-light',
        bgClass: 'bg-light'
      },
      {
        name: 'dark',
        textClass: 'text-dark',
        bgClass: 'bg-dark'
      }
    ]
  },
  {
    title: 'Custom Gradient Background',
    description:
      'The custom gradient background can be applied anywhere you would use a normal background color utility.',
    variants: [
      {
        name: 'primary gradient',
        textClass: 'text-black',
        bgClass: 'bg-gradient-primary'
      },
      {
        name: 'secondary gradient',
        textClass: 'text-pink',
        bgClass: 'bg-gradient-secondary'
      },
      {
        name: 'success gradient',
        textClass: 'text-pink',
        bgClass: 'bg-gradient-success'
      },
      {
        name: 'warning gradient',
        textClass: 'text-pink',
        bgClass: 'bg-gradient-warning'
      },
      {
        name: 'danger gradient',
        textClass: 'text-pink',
        bgClass: 'bg-gradient-danger'
      },
      {
        name: 'info gradient',
        textClass: 'text-pink',
        bgClass: 'bg-gradient-info'
      },
      {
        name: 'light gradient',
        textClass: 'text-pink',
        bgClass: 'bg-gradient-light'
      },
      {
        name: 'dark gradient',
        textClass: 'text-pink',
        bgClass: 'bg-gradient-dark'
      }
    ]
  },
  {
    title: 'Expanded Color System',
    description:
      'Add non-contextual colors to the color map so they can be used in the same way you would use Bootstrap colors.',
    variants: [
      {
        name: 'red',
        textClass: 'text-red',
        bgClass: 'bg-red'
      },
      {
        name: 'orange',
        textClass: 'text-orange',
        bgClass: 'bg-orange'
      },
      {
        name: 'yellow',
        textClass: 'text-yellow',
        bgClass: 'bg-yellow'
      },
      {
        name: 'green',
        textClass: 'text-green',
        bgClass: 'bg-green'
      },
      {
        name: 'teal',
        textClass: 'text-teal',
        bgClass: 'bg-teal'
      },
      {
        name: 'cyan',
        textClass: 'text-cyan',
        bgClass: 'bg-cyan'
      },
      {
        name: 'blue',
        textClass: 'text-blue',
        bgClass: 'bg-blue'
      },
      {
        name: 'indigo',
        textClass: 'text-indigo',
        bgClass: 'bg-indigo'
      },
      {
        name: 'purple',
        textClass: 'text-purple',
        bgClass: 'bg-purple'
      },
      {
        name: 'pink',
        textClass: 'text-pink',
        bgClass: 'bg-pink'
      }
    ]
  }
]

export default {
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
    margin-bottom: 30px;

    .card-header {
      padding: 1.25rem;

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
