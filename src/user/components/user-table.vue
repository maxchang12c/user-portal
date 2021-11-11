<template>
  <div class="data-table-wrapper">
    <div v-if="isLoading" class="overlay d-flex align-center justify-center">
      <v-progress-circular indeterminate> </v-progress-circular>
    </div>

    <v-data-table
      :headers="tableHeaders"
      :items="items"
      item-key="name"
      class="elevation-1"
      :search="search"
      :items-per-page="100"
      hide-default-footer
    >
      <template v-slot:top>
        <div class="d-flex justify-space-between align-center">
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4 search-field"
          ></v-text-field>
          <slot name="top-right"></slot>
        </div>
      </template>

      <template v-slot:item="{ item }">
        <tr @mouseover="selectItem(item)" @click="$emit('clickRow', item)">
          <td class="constraint flex-wrap" v-for="(item, index) of filter(item)" :key="index">
            {{ item }}
          </td>
          <td>
            <slot name="actions" :item="item"></slot>
          </td>
        </tr>
      </template>

      <!-- <template v-slot:item.actions="{ item }">
      <slot name="actions" :item="item"></slot>
    </template> -->
    </v-data-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    selectItem(item) {
      this.$emit("hoverInfo", item);
    },
    filter(item) {
      const itemKeys = Object.keys(item);
      if (this.headers) {
        return this.headers.map(({ value: name }) => {
          if (itemKeys.includes(name)) return item[name];
        });
      } else return "No data Available";
    },
  },
  props: {
    headers: {
      type: Array,
      default: () => {
        return [];
      },
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tableHeaders() {
      return this.headers;
    },
  },
};
</script>
<style lang="scss">
.data-table-wrapper {
  height: 100%;
  position: relative;
}

.constraint {
  max-width: 200px;
  line-break: anywhere;
}
.v-data-table {
  height: inherit;
  tr {
    cursor: pointer;
  }
}
.search-field {
  max-width: 200px;
}
.overlay {
  opacity: 0.5;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: grey;
}
</style>
