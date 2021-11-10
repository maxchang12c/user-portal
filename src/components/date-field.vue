<template>
  <div>
    <label
      v-if="showLabel"
      class="font-12 font-weight-bold text-dark-gray mt-3 mb-2"
      :class="{ 'text-danger': 0 !== errors.length }"
      >{{ label }}</label
    >
    <div class="d-flex">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="nudgeRight"
        transition="scale-transition"
        :nudge-bottom="20"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <ValidationProvider
            ref="validate"
            class="w-100"
            :vid="vid"
            :name="name"
            :rules="rules"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="date"
              class="input"
              clear-icon="mdi-close-circle"
              :class="className"
              readonly
              :label="label"
              :placeholder="placeholder"
              :outlined="outlined"
              :filled="filled"
              :disabled="disabled"
              :rounded="rounded"
              :solo="solo"
              :hide-details="hideDetail"
              :flat="flat"
              :clearable="clearable"
              :error-messages="errors[0]"
              :prepend-icon="prependIcon"
              :dense="dense"
              v-on="on"
              @click:clear="$emit('clear')"
            >
            </v-text-field>
          </ValidationProvider>
        </template>

        <v-date-picker
          v-model="value"
          :min="min"
          class="v-date-picker__wrapper date-btn"
          :max="max"
          color="primary"
          :disabled="disabled"
          :range="range"
          @change="
            closeMenu($event);
            $emit('dateChange', { dateArr: $event || [] });
          "
        ></v-date-picker>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "DateField",
  props: {
    className: {
      type: String,
      default: "",
    },
    dense: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    prependIcon: {
      type: String,
      default: "",
    },
    flat: {
      type: Boolean,
      default: true,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    hideDetail: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    model: {
      type: Array,
      default: () => {
        return [];
      },
    },
    name: {
      type: String,
      default: "",
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    nudgeRight: {
      type: Number,
      default: 40,
    },
    prependInnerIcon: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    range: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Object,
      default: null,
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
    solo: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    vid: {
      type: String,
      default: "",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    min: {
      type: String,
      default: "",
    },
    max: {
      type: String,
      default: "",
    },
  },
  watch: {
    "$i18n.locale"() {
      if (this.hasErrors) {
        setTimeout(() => {
          this.validate();
        }, 250);
      }
    },
  },
  computed: {
    date: {
      get() {
        return this.model.join(" ~ ");
      },
      set(value) {
        this.$emit("update:dateLabel", value);
        return value;
      },
    },
    value: {
      get() {
        return this.model;
      },
      set(value) {
        this.$emit("update:model", value);
        return value;
      },
    },
    hasErrors() {
      if (!this.$refs.validate.errors) {
        return false;
      } else {
        if (0 < this.$refs.validate.errors.length) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    async validate() {
      const response = await this.$refs.validate.validate();
      return response.valid;
    },
    closeMenu(value) {
      if (value.length > 1) {
        this.menu = false;
      }
    },
  },
  created() {
    if (this.rules) {
      this.validated = false;
    }
  },
  mounted() {
    this.$refs.validate.$watch("errors", (value) => {
      if (value[0]) {
        this.$emit("onError", value[0]);
      }
    });
  },
  data() {
    return {
      validated: true,
      menu: false,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .date-btn .v-btn {
  height: 31px !important;
  &.v-btn--active {
    color: white !important;
  }
}

::v-deep .input {
  fieldset {
    border-width: 1px;
    border-color: var(--dimmer-grey);
  }
  &:hover {
    fieldset {
      border-color: blue !important;
    }
    label {
      color: blue !important;
    }
  }
  label {
    color: var(--primary) !important;
    font-weight: 600 !important;
    font-size: var(--font-size-sm-2) !important;
  }
}
</style>
