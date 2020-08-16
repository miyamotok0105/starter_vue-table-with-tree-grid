<template>
  <div>
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
  </div>
</template>


<script>

import Usage from '../components/Usage';
import Accordion from '../components/Accordion';

  export default {
    name: '',
    components: {
      Usage,
      Accordion,
    },

    data: () => ({
    }),
  }
</script>
