<template>
  <div id="typography-demo">
    <b-card
      no-body
      v-for="card in cards"
      :key="card.description"
      class="rounded-xl shadow overflow-hidden"
    >
      <b-card-header class="d-flex justify-content-between align-items-center">
        <div class="card-title mb-0">
          <h4 class="mb-0 text-info">{{ card.title }}</h4>
        </div>

        <div
          class="card-actions cursor-pointer"
          @click="toggleCodeDemoVisibility(card)"
        >
          <b-icon v-if="!card.showCodeDemo" icon="code" />
          <b-icon v-else icon="code-slash" />
        </div>
      </b-card-header>

      <b-card-body>
        <b-card-text v-html="card.description" />

        <b-table
          id="table"
          v-if="card.table"
          :items="card.table.items"
          :fields="card.table.fields"
          :stacked="card.table.stacked"
        >
          <template v-slot:cell(Heading)="data">
            <p class="text-pink">{{ data.item.Heading }}</p>
          </template>

          <template v-slot:cell(Example)="data">
            <span :class="data.item.className">{{ data.item.Example }}</span>
          </template>
        </b-table>

        <div
          v-if="card.examples"
          class="examples"
          :class="{ bordered: card.hasBorder }"
        >
          <p
            v-for="example in card.examples"
            :key="example.text"
            :class="example.className"
            v-html="example.text"
          ></p>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
const cards = [
  {
    title: 'Headings',
    description:
      'All HTML headings, <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>, are available.',
    table: {
      fields: ['Heading', 'Example'],
      items: [
        {
          Heading: '<h1></h1>',
          Example: 'h1. Bootstrap heading',
          className: 'h1'
        },
        {
          Heading: '<h2></h2>',
          Example: 'h2. Bootstrap heading',
          className: 'h2'
        },
        {
          Heading: '<h3></h3>',
          Example: 'h3. Bootstrap heading',
          className: 'h3'
        },
        {
          Heading: '<h4></h4>',
          Example: 'h4. Bootstrap heading',
          className: 'h4'
        },
        {
          Heading: '<h5></h5>',
          Example: 'h5. Bootstrap heading',
          className: 'h5'
        },
        {
          Heading: '<h6></h6>',
          Example: 'h6. Bootstrap heading',
          className: 'h6'
        }
      ]
    }
  },
  {
    title: 'Headings',
    description:
      '<code>.h1</code> through <code>.h6</code> classes are also available, for when you want to match the font styling of a heading but cannot use the associated HTML element.',
    examples: [
      {
        text: 'h1. Bootstrap heading',
        className: 'h1'
      },
      {
        text: 'h2. Bootstrap heading',
        className: 'h2'
      },
      {
        text: 'h3. Bootstrap heading',
        className: 'h3'
      },
      {
        text: 'h4. Bootstrap heading',
        className: 'h4'
      },
      {
        text: 'h5. Bootstrap heading',
        className: 'h5'
      },
      {
        text: 'h6. Bootstrap heading',
        className: 'h6'
      }
    ],
    hasBorder: true
  },
  {
    title: 'Display headings',
    description:
      'Traditional heading elements are designed to work best in the meat of your page content. When you need a heading to stand out, consider using a <strong>display heading</strong>—a larger, slightly more opinionated heading style.',
    table: {
      stacked: true,
      fields: [{ key: 'Example', label: '' }],
      items: [
        {
          Example: 'Display 1',
          className: 'display-1'
        },
        {
          Example: 'Display 2',
          className: 'display-2'
        },
        {
          Example: 'Display 3',
          className: 'display-3'
        },
        {
          Example: 'Display 4',
          className: 'display-4'
        }
      ]
    }
  },
  {
    title: 'Inline text elements',
    description: 'Styling for common inline HTML5 elements.',
    examples: [
      {
        text: 'You can use the mark tag to <mark>highlight</mark> text.'
      },
      {
        text:
          '<del>This line of text is meant to be treated as deleted text.</del>'
      },
      {
        text:
          '<s>This line of text is meant to be treated as no longer accurate.</s>'
      },
      {
        text:
          '<ins>This line of text is meant to be treated as an addition to the document.</ins>'
      },
      {
        text: '<u>This line of text will render as underlined</u>'
      },
      {
        text:
          '<small>This line of text is meant to be treated as fine print.</small>'
      },
      {
        text: '<strong>This line rendered as bold text.</strong>'
      },
      {
        text: '<em>This line rendered as italicized text.</em>'
      }
    ],
    hasBorder: true
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
#typography-demo {
  .card {
    margin-bottom: 30px;

    .examples {
      &.bordered {
        padding: 1.5rem;
        border: 0.2rem solid #e3e6ec;

        > p {
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
