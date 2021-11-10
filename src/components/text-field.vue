<template>
  <ValidationProvider
    ref="validate"
    :mode="mode"
    :vid="vid"
    :name="name"
    :rules="rules"
    v-slot="{ errors }"
  >
    <label
      v-if="showLabel"
      class="font-12 font-weight-bold"
      :class="labelClassName"
      :for="id"
      >{{ label }}</label
    >
    <div class="d-flex">
      <v-text-field
        v-on="on"
        v-bind="attrs"
        ref="text"
        v-model="value"
        class="input position-relative"
        clear-icon="mdi-close-circle"
        :class="[className]"
        :type="type"
        :label="label"
        :placeholder="placeholder"
        :outlined="outlined"
        :filled="filled"
        :full-width="fullWidth"
        :append-icon="appendIcon"
        :append-outer-icon="appendOuterIcon"
        :prepend-inner-icon="prependInnerIcon"
        :disabled="disabled"
        :readonly="readonly"
        :rounded="rounded"
        :solo="solo"
        :tabindex="tabIndex"
        :flat="flat"
        :clearable="clearable"
        :loading="loading"
        :error-messages="errors[0]"
        :dense="dense"
        :hide-details="hideDetail"
        :maxlength="maxlength"
        :id="id"
        :autofocus="autoFocus"
        @input="onInput"
        @keydown="onKeyDown"
        @click:append="$emit('click:append')"
        @keydown.enter.prevent="submit"
        @keyup.native="$emit('keyup')"
        @keydown.native="$emit('keydown')"
        @change="onBlur"
        @focus="onFocus"
        @click:clear="$emit('click:clear')"
        v-disabled-append-inner-focus="disabledAppendInnerFocus"
      >
        <template v-slot:append>
          <slot name="append"></slot>
        </template>
        <template v-slot:append-outer>
          <slot name="append-outer"></slot>
        </template>
        <template v-slot:message="{ message, key }">
          <!-- <span v-if="errors && customLabel.en == false">{{ errors[0] }}</span> -->
          <i18n
            v-if="customLabel.en == true"
            :path="customLabel.path"
            tag="div"
          >
            <template :slot="customLabel.slotName">
              <span
                class="text-purple cursor-pointer"
                @click="$emit('inLabelClick')"
                >{{ customLabel.text }}</span
              >
            </template>
          </i18n>
          <span v-else>
            {{ errors[0] }}
          </span>
        </template>
      </v-text-field>
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: "TextField",
  props: {
    on: {
      type: [Object, Array],
    },
    attrs: {
      type: [Object, Array],
    },
    "append-icon": {
      type: String,
      default: null,
    },
    "append-outer-icon": {
      type: String,
      default: null,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },
    errorMessage: {
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
    disabledAppendInnerFocus: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: false,
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
      type: [String, Number],
      default: null,
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
    mode: {
      type: String,
      default: "lazy",
    },
    tabIndex: {
      type: [String, Number],
      default: null,
    },
    customLabel: {
      type: Object,
      default: () => {
        return {
          en: false,
          path: "",
          slotName: "",
          text: "",
        };
      },
    },
    maxlength: {
      type: Number,
    },
    id: {
      type: String,
    },
    labelClassName: {
      type: String,
    },
  },
  directives: {
    disabledAppendInnerFocus: {
      bind(el, binding) {
        const { value } = binding;
        if (value) {
          el.querySelectorAll(
            ".v-input__append-inner .v-input__icon button"
          ).forEach((dom) => dom.setAttribute("tabindex", -1));
        }
      },
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
    //events
    focus() {
      this.$refs.text.focus();
    },
    onBlur(value) {
      this.$emit("onBlur", value);
    },
    onFocus(value) {
      this.$emit("onFocus", value);
    },
    onInput(value) {
      this.$emit("onInput", value);
    },
    onKeyDown(value) {
      if (this.readonly) return;

      this.$emit("onKeyDown", value);

      if (13 == value.keyCode) {
        this.$emit("onEnter", true);
      }
    },
    async validate() {
      const response = await this.$refs.validate.validate();
      return response.valid;
    },
    submit() {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
      this.$emit("submit");
      this.$emit("keyup:enter");
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

    this.$emit("mounted");
  },
  data() {
    return {
      validated: true,
    };
  },
};
</script>

<style scoped>
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  >>> fieldset {
  color: #d2d5da !important;
  border: 1px solid currentColor !important;
}
.v-text-field--outlined.v-input--has-state >>> fieldset {
  border: 1px solid currentColor !important;
}
.input.v-text-field--solo-flat >>> .v-input__slot {
  /*border: 1px solid #c3c3c3;*/
  /*border: 1px solid #dddddd;*/
  box-shadow: none !important;
}

.input >>> .v-input__slot fieldset {
  border-width: 1px !important;
}
.input :focus-within {
  cursor: auto !important;
}

/* .input.error--text >>> .v-text-field__details {
  margin-bottom: 8px !important;
} */

.v-input--is-disabled,
.v-input--is-readonly {
  opacity: 0.8;
}

.v-input >>> .v-input__control .v-input__slot .v-progress-linear {
  display: none;
}
.input:focus-within >>> .v-input__slot {
  background: white !important;
}
.input:hover >>> .v-input__slot {
  background: #f6f6f6;
}

.v-input.remove-line-animation >>> .v-input__slot::after {
  display: none;
}
.input >>> .v-text-field__slot .v-label {
  color: #9ca4af !important;
  font-weight: 100 !important;
  font-size: var(--font-size-sm-1) !important;
}
.input >>> .v-text-field__slot {
  font-size: var(--font-size-sm-1) !important;
}
.input >>> .v-messages__message {
  line-height: 14px;
}
</style>
