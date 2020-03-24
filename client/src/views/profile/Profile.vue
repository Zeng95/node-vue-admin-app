<template>
  <div id="profile">
    <b-container fluid>
      <b-row>
        <!-- About me ｜ 关于我 -->
        <b-col md="4" class="profile-left">
          <b-card header="About me" class="rounded-lg shadow">
            <div class="user-info">
              <div class="avatar"></div>
              <span class="name">{{ user.name }}</span>
              <span class="role"></span>
            </div>

            <div class="user-bio"></div>
          </b-card>
        </b-col>

        <!-- Things related user -->
        <b-col md="8" class="profile-right">
          <b-card title="Card Title" class="rounded-lg shadow">
            <b-card-text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </b-card-text>

            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['user'])
  }
}
</script>

<style lang="scss" scoped>
#profile {
  .name {
    text-transform: capitalize;
  }
}
</style>
