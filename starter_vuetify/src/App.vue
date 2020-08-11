<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- tree view -->
      <Usage/>

      <!-- アコーディオン -->
      <Accordion/>

      <Accordion>
        <div slot="title">アコーディオン1</div>
        <div class="js-accordion--body" slot="body">
          <p>アコーディオン1の中身</p>
          <p>アコーディオン1の中身</p>
          <p>アコーディオン1の中身</p>
        </div>
      </Accordion>

    <!-- <js-accordion>
      <div slot="title">アコーディオン2</div>
      <div class="js-accordion--body" slot="body">
        <p>アコーディオン2の中身</p>
        <p>アコーディオン2の中身</p>
      </div>
    </js-accordion>
    <js-accordion>
      <div slot="title">アコーディオン3</div>
      <div class="js-accordion--body" slot="body">
        <p>アコーディオン3の中身</p>
        <p>アコーディオン3の中身</p>
      </div>
    </js-accordion> -->

    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Usage from './components/Usage';
import Accordion from './components/Accordion';

export default {
  name: 'App',

  components: {
    Usage,
    Accordion,
  },

  data: () => ({
    //
  }),
};
</script>
