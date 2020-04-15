<template>
  <div id="alert-demo">
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
        <p v-html="card.description"></p>

        <div v-if="card.showInput" class="input-container mb-3">
          <label class="mb-0">Enter only numbers</label>
          <b-input placeholder="0123456789"></b-input>
        </div>

        <div v-if="card.button">
          <b-button
            v-if="card.button.showButton1"
            variant="info"
            @click="displayDismissibleAlert(card.alerts[0], card.button)"
            >{{ card.button.text }} ({{
              card.alerts[0].showDismissibleAlert ? 'visible' : 'hidden'
            }})</b-button
          >

          <b-button
            v-if="card.button.showButton2"
            variant="info"
            @click="showAlert(card.alerts[0])"
            >{{ card.button.text }}</b-button
          >
        </div>

        <b-alert
          v-for="alert in card.alerts"
          :key="alert.title"
          :show="
            alert.showAlert ||
            alert.showDismissibleAlert ||
            alert.dismissCountDown
          "
          :variant="alert.variant"
          :dismissible="alert.dismissible"
          class="rounded-xl my-3"
          @dismissed="displayDismissibleAlert(alert, card.button)"
          @dismiss-count-down="countDownChanged"
        >
          <div class="alert-title">
            <h4 v-if="alert.title && alert.showLink">
              <b-link class="alert-link">{{ alert.title }}</b-link>
            </h4>

            <h4 v-else-if="alert.title">{{ alert.title }}</h4>
          </div>

          <p class="alert-text mb-0" v-html="alert.text || alertText"></p>

          <b-progress
            v-if="alert.showProgress"
            variant="info"
            :max="alert.dismissSecs"
            :value="alert.dismissCountDown"
            height="4px"
          ></b-progress>
        </b-alert>

        <transition name="expand">
          <div
            v-show="card.showCodeDemo"
            class="code-container bg-gray rounded-xl"
          >
            <pre class="d-flex mb-0 text-base">
            <code>&lt;<span class="text-red">b-alert</span> <span class="text-brown">show</span>&gt;<br/>&nbsp;&nbsp;Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.<br/><span>&lt;<span class="text-red">b-alert</span>&gt;</span></code>
          </pre>
          </div>
        </transition>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
const cards = [
  {
    title: 'Default',
    description:
      'To add a notification use the <code>&lt;b-alert&gt;</code> component. For the main parameter, pass the <code>show</code> property to control the visibility state of the alert.',
    alerts: [
      {
        variant: 'info',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showAlert: true
      }
    ],
    showCodeDemo: false
  },
  {
    title: 'Color',
    description:
      'You can change the color of the alert with the property <code>variant</code>. You are able to use the Main Colors and the default is <code>info</code>.',
    alerts: [
      {
        title: 'Primary',
        variant: 'primary',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showAlert: true
      },
      {
        title: 'Secondary',
        variant: 'secondary',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showAlert: true
      },
      {
        title: 'Success',
        variant: 'success',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showAlert: true
      },
      {
        title: 'Danger',
        variant: 'danger',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showAlert: true
      },
      {
        title: 'Warning',
        variant: 'warning',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showAlert: true
      },
      {
        title: 'Info',
        variant: 'info',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showAlert: true
      },
      {
        title: 'Light',
        variant: 'light',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showAlert: true
      },
      {
        title: 'Dark',
        variant: 'dark',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showAlert: true
      }
    ],
    showCodeDemo: false
  },
  {
    title: 'Color of links within alerts',
    description:
      'Use the <code>.alert-link</code> utility CSS class to quickly provide matching colored links within any alert.',
    alerts: [
      {
        title: 'Primary',
        variant: 'primary',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showLink: true,
        showAlert: true
      },
      {
        title: 'Secondary',
        variant: 'secondary',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showLink: true,
        showAlert: true
      },
      {
        title: 'Success',
        variant: 'success',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showLink: true,
        showAlert: true
      },
      {
        title: 'Danger',
        variant: 'danger',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showLink: true,
        showAlert: true
      },
      {
        title: 'Warning',
        variant: 'warning',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showLink: true,
        showAlert: true
      },
      {
        title: 'Info',
        variant: 'info',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showLink: true,
        showAlert: true
      },
      {
        title: 'Light',
        variant: 'light',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showLink: true,
        showAlert: true
      },
      {
        title: 'Dark',
        variant: 'dark',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        showLink: true,
        showAlert: true
      }
    ],
    showCodeDemo: false
  },
  {
    title: 'Dismissible alerts',
    description:
      "Using the <code>dismissible</code> prop it's possible to dismiss any <code>&lt;b-alert&gt;</code> inline. This will add a close <code>X</code> button. Use the <code>dismiss-label</code> prop to change the hidden label text associated with the dismiss button.",
    alerts: [
      {
        variant: 'info',
        text:
          'Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.',
        dismissible: true,
        showDismissibleAlert: false
      }
    ],
    showCodeDemo: false,
    button: {
      text: 'Show dismissible alert',
      showButton1: true
    }
  },
  {
    title: 'Alert With Timeout',
    description:
      'To create a <code>&lt;b-alert&gt;</code> that dismisses automatically after a period of time, set the <code>show</code> prop (or the <code>v-model</code>) to the number of seconds you would like the <code>&lt;b-alert&gt;</code> to remain visible for. Only integer number of seconds are supported.',
    alerts: [
      {
        variant: 'info',
        dismissible: true,
        showProgress: true,
        dismissSecs: 10,
        dismissCountDown: 0
      }
    ],
    showCodeDemo: false,
    button: {
      text: 'Show alert with count-down timer',
      showButton2: true
    }
  },
  {
    title: 'Example',
    description:
      'An example would be to have an input and when a condition is met show the <strong>b-alert</strong>',
    alerts: [
      {
        variant: 'danger',
        text:
          'the value is <strong>invalid</strong> you can only enter numbers.',
        showAlert: true
      }
    ],
    showCodeDemo: false,
    showInput: true
  }
]

export default {
  data() {
    return { cards }
  },
  methods: {
    showAlert(alert) {
      alert.dismissCountDown = alert.dismissSecs
    },
    countDownChanged(dismissCountDown) {
      this.cards[
        this.cards.length - 2
      ].alerts[0].dismissCountDown = dismissCountDown
    },
    displayDismissibleAlert(alert, button) {
      if (alert.dismissible && button.showButton1) {
        alert.showDismissibleAlert = !alert.showDismissibleAlert
      }

      if (alert.dismissible && button.showButton2) {
        alert.dismissCountDown = 0
      }
    },
    toggleCodeDemoVisibility(card) {
      card.showCodeDemo = !card.showCodeDemo
    }
  },
  computed: {
    alertText() {
      return `This alert will dismiss after ${
        this.cards[this.cards.length - 2].alerts[0].dismissCountDown
      } seconds...`
    }
  }
}
</script>

<style lang="scss" scoped>
#alert-demo {
  .card {
    margin-bottom: 30px;
    transition: all 2s ease-in-out;

    &:last-of-type {
      margin-bottom: 0;
    }

    .card-header {
      padding: 1.25rem 1.25rem 0;

      .b-icon {
        width: 16px;
        height: 16px;
      }
    }

    .card-body {
      .alert {
        &:nth-last-of-type(2) {
          margin-bottom: 0;
        }
      }

      .input-container {
        width: 200px;

        label {
          font-size: 12px;
        }
      }

      .code-container {
        pre {
          padding: 2rem 1.25rem;
        }
      }

      .expand-enter-active,
      .expand-leave-active {
        max-height: 350px;
        transition: opacity 0.35s, transform 0.65s, max-height 0.8s ease-out;
      }

      .expand-enter,
      .expand-leave-to {
        max-height: 0;
        opacity: 0;
        transform: translate3d(0, 100%, 0);
      }
    }
  }
}
</style>
