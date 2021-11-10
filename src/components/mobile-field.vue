<template>
  <div class="vue-tel-wrapper" :class="{ 'v-tel-input--focus': isFocus }">
    <ValidationProvider
      :name="name"
      :rules="rules"
      v-slot="{ errors }"
      :mode="vMode"
      ref="validator"
    >
      <vue-tel-input
        ref="vue-tel-input"
        v-model="displayPhone"
        class="tel-input text-input"
        :class="[
          {
            'mb-1': !hideDetail,
            'tel-input--error': errors[0],
            'tel-input--empty': !displayPhone,
          },
        ]"
        :all-countries="allCountries"
        :default-country="defaultCountry"
        :disabled="disabled"
        :mode="mode"
        :valid-characters-only="validCharactersOnly"
        :auto-default-country="disableFetching"
        :dropdown-options="{
          showDialCodeInSelection: showDropdownSelectionDialCode,
          showDialCodeInList: showDropdownListDialCode,
          showFlags: showDropdownFlags,
          tabindex: dropdownTabindex,
        }"
        :input-options="{
          placeholder: placeholder,
          id: inputId,
        }"
        @input="onInputPhone"
        @blur="onBlur"
        @focus="isFocus = true"
        @enter="onEnter"
        @validate="validatePhone"
      />
      <div v-if="!hideDetail" class="v-tel-input__details px-3">
        <div v-if="errors[0]" class="tel-error-text mb-0">
          <span class="red--text text--accent-2">{{ errors[0] }}</span>
        </div>
      </div>
    </ValidationProvider>
  </div>
</template>
<script>
import { isUndefinedNullOrEmpty, isNumber } from "@/utils";
import "vue-tel-input/dist/css/sprite.css";
import "vue-tel-input/dist/css/component.css";
import { countriesDataEnUs } from "@/assets/datasets/internationalization/data_enUS";

const countriesDataZhCn = () =>
  import(
    /* webpackChunkName: "chinese-phone-i18n" */ "@/assets/datasets/internationalization/data_zhCN"
  );

export default {
  components: {
    VueTelInput: () =>
      import(/* webpackChunkName: "v-tel-input" */ "vue-tel-input").then(
        (asyncComponent) => asyncComponent.VueTelInput
      ),
  },
  props: {
    countryCode: {
      type: [String, Number],
      default: null,
    },
    dialCode: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dropdownTabindex: {
      type: Number,
      default: -1,
    },
    showDropdownSelectionDialCode: {
      type: Boolean,
      default: true,
    },
    showDropdownListDialCode: {
      type: Boolean,
      default: true,
    },
    inputOptions: {
      type: Object,
      default: () => {
        return {
          showDialCode: true,
          tabIndex: 0,
        };
      },
    },
    label: {
      // for validation error
      type: String,
      default: "",
    },
    vMode: {
      type: String,
      default: "lazy",
    },
    mandatory: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: "national",
      // international = "+60 12-456 5555"
      // national = "012-456 5555"
      // e164 = "+60124565555"
      // rfc3966 = "tel:+60-12-456-5555"
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    rules: {
      type: Object,
      // 'required|email'
      default: () => {
        return {};
      },
    },
    showDropdownFlags: {
      type: Boolean,
      default: true,
    },
    validCharactersOnly: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Object,
      validator: (object) => {
        return ["international", "significant"].every((key) => key in object);
      },
    },
    inputId: {
      type: String,
    },
    hideDetail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      phoneValid: true,
      created: false,
      showErr: true,
      disableFetching: true,
      isFocus: false,
      allCountries: countriesDataEnUs,
      displayPhone: "",
      phoneNumWatcher: "",
      GETTER_LANG: "",
    };
  },
  computed: {
    defaultCountry() {
      if (this.countryCode) {
        if (isNumber(this.countryCode)) {
          return this.getCountryCodeByDialCode(this.countryCode);
        }
        return this.countryCode;
      }

      if (this.dialCode) {
        return this.getCountryCodeByDialCode(this.dialCode);
      }

      return "my";
    },
  },
  watch: {
    GETTER_LANG: {
      handler: "changeCountryLanguage",
      immediate: true,
    },
  },
  created() {
    this.created = true;
    this.phoneNumWatcher = this.$watch(
      "value",
      this.detectPhoneNumChangesOnce,
      {
        immediate: true,
      }
    );
  },
  methods: {
    async validatePhone(phoneObj) {},
    onBlur() {
      this.$emit("onBlur");
    },

    async onInputPhone(formattedNumber, phoneObject) {
      if (!isUndefinedNullOrEmpty(this.$refs.validator.errors)) {
        this.$refs.validator.reset();
      }

      const { countryCallingCode, countryCode, nationalNumber, number, valid } =
        phoneObject;

      if (formattedNumber) this.phoneValid = valid;
      else {
        if (!this.created) {
          const { valid } = await this.$refs.validator.validate();
          this.phoneValid = valid;
        }
      }

      if (this.phoneValid) {
        this.$emit("update:country-code", countryCode);
        this.$emit("update:dial-code", countryCallingCode);
        this.updateValue({ nationalNumber, number });
      } else {
        this.displayPhone = formattedNumber;
      }
      this.$emit("getPhoneValid", this.phoneValid);

      if (this.created) this.created = false;
    },
    getCountryFromSession() {
      const selectedCountry = "";
      if (!isUndefinedNullOrEmpty(selectedCountry)) {
        if (!isUndefinedNullOrEmpty(selectedCountry.mobileCountry)) {
          if (selectedCountry.mobileCountry === "") {
            this.disableFetching = false;
          } else {
            this.$emit("update:country-code", selectedCountry.mobileCountry);
          }
        } else {
          this.disableFetching = false;
        }
      } else {
        this.disableFetching = false;
      }
    },

    updateValue(val) {
      let tempPhoneObj = {};
      if (typeof val === "object") {
        tempPhoneObj = {
          international: val.number,
          significant: val.nationalNumber,
        };
      } else if (typeof val === "string") {
        tempPhoneObj = {
          international: val,
          significant: val,
        };
      }
      this.$emit("input", tempPhoneObj);
    },

    onEnter() {
      this.$emit("onEnter");
    },
    changeCountryLanguage() {
      if (
        this.GETTER_LANG.code === "zh_CN" ||
        this.GETTER_LANG.code === "zh_TW"
      ) {
        countriesDataZhCn().then((data) => {
          this.allCountries = data.countriesDataZhCn.map((obj) =>
            Object.freeze(obj)
          );
        });
      } else {
        this.allCountries = countriesDataEnUs.map((obj) => Object.freeze(obj));
      }
    },
    getCountryCodeByDialCode(dialCode) {
      try {
        const { iso2 } =
          this.allCountries.find(
            (countryObj) => countryObj.dialCode === dialCode
          ) || {};
        if (iso2) return iso2;
        else throw new Error(`Cant find the countryCode from countries list`);
      } catch (error) {
        console.error(error);
      }
    },
    detectPhoneNumChangesOnce(val) {
      if (val.international) {
        this.displayPhone = val.international;

        // Tear down watcher after (user input phone number || API return phone number)
        if (this.phoneNumWatcher) {
          this.phoneNumWatcher();
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.vue-tel-wrapper {
  min-height: 40px;
  position: relative;

  .vue-tel-input {
    &.tel-input::v-deep {
      min-height: 40px;
      border-radius: 4px;
      position: relative;
      border: 1px solid var(--dimmer-grey);
      color: var(--primary);

      &:focus-within:not(.tel-input--error) {
        box-shadow: none;
        border: 1px solid var(--purple);
        background: white !important;
      }

      &:hover {
        background: #f6f6f6;
      }

      input {
        // font-size: inherit;
        font-size: var(--font-size-sm-1);
        color: inherit;

        &::placeholder {
          opacity: 1;
          color: inherit;
        }
      }

      .vti__dropdown {
        color: var(--primary);
        border-radius: 4px;
        position: initial;

        strong {
          font-weight: 400;
        }

        .vti__dropdown-list {
          padding-left: 0px;
          width: 100%;
        }

        .vti__selection {
          .vti__country-code {
            font-weight: bold;
            color: var(--primary);
          }
        }

        &:focus {
          outline: 0;
        }
      }
    }

    &.tel-input {
      &--error {
        border: 1px solid var(--red);
        box-shadow: none;
        background: white !important;
      }

      &--empty {
        color: var(--text-light-gray);
      }
    }
  }

  .v-tel-input {
    &__details {
      min-height: 14px;
    }
  }

  .primary-text {
    color: var(--purple);
  }

  .tel-input-error {
    border: 2px solid var(--red) !important;
  }

  .tel-error-text {
    line-height: 12px;
    height: 12px;
    margin-bottom: 8px;
    font-size: 12px;
  }
}
</style>
