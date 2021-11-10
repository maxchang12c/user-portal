<template>
  <div v-if="loaded" class="user-detail">
    <ValidationObserver ref="form">
      <div class="d-flex">
        <v-row>
          <v-col class="d-flex justify-center" cols="12" sm="3">
            <v-avatar class="my-6" size="140">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </v-col>
          <v-col cols="12" sm="9">
            <div class="flex-column">
              <template v-for="(item, index) in getComponents">
                <v-row :key="index">
                  <v-col class="justify-center" cols="3">
                    {{ item.label }}
                  </v-col>
                  <v-col cols="9">
                    <component
                      :name="item.identifier"
                      :type="'email'"
                      :model.sync="item.model"
                      :tab-index="index"
                      :is="item.name"
                      mode="aggressive"
                      :id="index.toString()"
                      :key="index"
                      :label="item.label"
                      :rules="item.rules"
                      outlined
                      solo
                      dense
                      @submit="submit"
                    ></component>
                  </v-col>
                </v-row>
              </template>
              <v-row>
                <v-col class="justify-center" cols="3">
                  {{ "Date of birth" }}
                </v-col>
                <v-col cols="9">
                  <v-menu
                    ref="menu1"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.dob"
                        label="Date"
                        persistent-hint
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.dob"
                      no-title
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="align-center" cols="3">
                  {{ "Mobile No." }}
                </v-col>
                <v-col cols="9">
                  <MobileField
                    outlined
                    data-cy="select-phone"
                    v-model="form.mobile.no"
                    class="flex-grow-1"
                    :label="$t('labels.phone.number')"
                    :placeholder="$t('labels.phone.number')"
                    :name="$t('labels.phone.number')"
                    :disabled="false"
                    :rules="rules.mobileNum"
                    :country-code.sync="form.mobile.countryCode"
                    :dial-code.sync="form.mobile.dialCode"
                    @getPhoneValid="
                      rules.mobileNum.mobileValidation.state = $event
                    "
                  />
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="d-flex justify-end">
        <v-btn
          class="mx-2"
          small
          depressed
          color="primary"
          :loading="getBtnActions.firstBtnAction.loading"
          @click="getBtnActions.firstBtnAction.action"
        >
          {{ getBtnActions.firstBtnAction.text }}
        </v-btn>
        <v-btn
          small
          depressed
          color="error"
          :loading="getBtnActions.secondBtnAction.loading"
          @click="getBtnActions.secondBtnAction.action"
        >
          {{ getBtnActions.secondBtnAction.text }}
        </v-btn>
      </div>
    </ValidationObserver>
  </div>
</template>
<script>
import { isUndefinedNullOrEmpty } from "@/utils";
import TextField from "@/components/text-field";
import MobileField from "@/components/mobile-field";
import { userApi } from "@/api/user/index.js";
export default {
  name: "UserDetail",
  components: {
    TextField,
    MobileField,
    // DatePicker,
  },
  computed: {
    getBtnActions() {
      return {
        firstBtnAction: {
          text: this.$route.params.type == "add" ? "Save" : "Edit",
          action:
            this.$route.params.type == "add"
              ? this.saveCustomerInfo
              : this.editCustomerInfo,
          loading:
            this.$route.params.type == "add"
              ? this.loading.add
              : this.loading.edit,
        },
        secondBtnAction: {
          text: this.$route.params.type == "add" ? "Cancel" : "Delete",
          action:
            this.$route.params.type == "add"
              ? this.back
              : this.deleteCustomerInfo,
          loading:
            this.$route.params.type == "add" ? false : this.loading.delete,
        },
      };
    },

    getComponents() {
      const self = this;
      return [
        {
          name: TextField,
          get model() {
            return self.form.name;
          },
          set model(value) {
            self.form.name = value;
          },
          label: "Enter Your Name",
          identifier: "Name",
        },
        {
          name: TextField,
          get model() {
            return self.form.email;
          },
          set model(value) {
            self.form.email = value;
          },
          label: "Enter Your Email",
          rules: {
            required: true,
            email: true,
          },
          identifier: "Email",
        },

        {
          name: TextField,
          get model() {
            return self.form.id;
          },
          set model(value) {
            self.form.id = value;
          },
          label: "Enter Your ID",
          identifier: "ID",
        },
      ];
    },
  },
  props: {
    details: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      menu: false,
      loading: {
        delete: false,
        edit: false,
        add: false,
      },
      form: {
        name: "",
        dob: "",
        id: "",
        email: "",
        avatar: "",
        remarks: "",
        prevId: "",
        mobile: {
          no: {
            international: "",
            significant: "",
          },
          countryCode: "",
          dialCode: "",
        },
      },
      rules: {
        name: {
          required: true,
        },
        mobileNum: {
          required: true,
          mobileValidation: { state: false },
        },
      },
      loaded: false,
    };
  },
  created() {
    if (this.$route.params.type == "add") this.loaded = true;
    else this.getCustomerInfo(this.$route.query.id);
  },
  methods: {
    isUndefinedNullOrEmpty: isUndefinedNullOrEmpty,
    populateData(details) {
      if (details) {
        Object.keys(details).forEach((key) => {
          this.form[key] = details[key] || "not available";
        });
        this.form.prevId = this.form.id;

        this.form.mobile.no.international = details["international"];
        this.form.mobile.no.significant = details["significant"];
        this.form.mobile.countryCode = details["countryCode"];
        this.form.mobile.dialCode = details["dialCode"];

        this.loaded = true;
      }
    },
    submit() {},
    changeDate() {},
    async getCustomerInfo(id) {
      try {
        const { ret, data } = await userApi.getCustomerDetail({ id });
        if (ret == 0) {
          this.populateData(data);
        }
      } catch (e) {}
    },
    async saveCustomerInfo() {
      const valid = await this.$refs.form.validate();
      if (!valid) return;

      try {
        this.loading.add = true;
        const { ret } = await userApi.addCustomer({
          ...this.form,
          dialCode: this.form.mobile.dialCode,
          countryCode: this.form.mobile.countryCode,
          international: this.form.mobile.no.international,
          significant: this.form.mobile.no.significant,
        });

        if (ret == 0) this.$router.replace({ name: "user-list" });
      } catch (e) {
        throw e;
      } finally {
        this.loading.add = false;
      }
    },
    async editCustomerInfo() {
      const valid = await this.$refs.form.validate();
      if (!valid) return;

      try {
        this.loading.edit = true;
        const { ret } = await userApi.updateCustomer({
          ...this.form,
          international: this.form.mobile.no.international,
          significant: this.form.mobile.no.significant,
        });
        if (ret == 0) {
          this.$router.replace({ name: "user-list" });
        }
      } catch (e) {
        throw e;
      } finally {
        this.loading.edit = false;
      }
    },
    async deleteCustomerInfo() {
      try {
        if (id) {
          this.loading.delete = true;
          const { ret } = await userApi.deleteCustomer({
            id,
          });
          if (ret == 0) this.getList();
          else throw "delete failed";
        }
      } catch (e) {
        throw e;
      } finally {
        this.loading.delete = false;
      }
    },
    back() {
      return this.$router.replace({ name: "user-list" });
    },
  },
};
</script>
<style lang="scss">
.user-detail {
}
</style>
