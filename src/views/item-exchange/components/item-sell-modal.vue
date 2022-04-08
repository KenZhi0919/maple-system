<template>
  <app-modal
    ref="appModal"
    size="xl"
    header-class="d-flex align-items-start"
    @hiddenHandler="reset"
    @submit="submitHandler"
  >
    <template v-slot:header>
      <div class="modal-title">上架商品</div>
    </template>

    <template v-if="isLoaded" v-slot:body>
      <div class="row">
        <div class="col-6">
          <div class="px-2" style="overflow-y: scroll; max-height: 60vh">
            <div class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">類別</div>
              <div class="col-9">
                <field
                  validate-on-mount
                  name="類別"
                  rules="required"
                  v-slot="{ field, errorMessage, meta: { valid } }"
                >
                  <input-select
                    v-model="category"
                    v-bind="field"
                    :class="!valid ? 'has-error' : ''"
                    :options="categoryOptions"
                  />
                  <span class="errorMessage">
                    {{ errorMessage }}
                  </span>
                </field>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">種類</div>
              <div class="col-9">
                <field
                  validate-on-mount
                  name="種類"
                  rules="required"
                  v-slot="{ field, errorMessage, meta: { valid } }"
                >
                  <input-select
                    v-bind="field"
                    v-model="type"
                    :class="!valid ? 'has-error' : ''"
                    :place-holder="category ? undefined : '請先選擇類別'"
                    :options="currentTypeOptions"
                    @input="fetchProducts"
                  />
                  <span class="errorMessage">
                    {{ errorMessage }}
                  </span>
                </field>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">階級</div>
              <div class="col-9">
                <field
                  validate-on-mount
                  name="階級"
                  rules="required"
                  v-slot="{ field, errorMessage, meta: { valid } }"
                >
                  <input-select
                    v-bind="field"
                    v-model="stageLevel"
                    :class="!valid ? 'has-error' : ''"
                    :options="stageLevelOptions"
                    @change="setLevelColor"
                  />
                  <span class="errorMessage">
                    {{ errorMessage }}
                  </span>
                </field>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">商品</div>
              <div class="col-9">
                <field
                  validate-on-mount
                  name="商品"
                  rules="required"
                  v-slot="{ field, errorMessage, meta: { valid } }"
                >
                  <input-select
                    v-model="postData.product_list"
                    value-prop="product_list_id"
                    v-bind="field"
                    label="name"
                    :class="!valid ? 'has-error' : ''"
                    :options="currentProductOptions"
                    :place-holder="productPlaceholder"
                    @change="setPostData"
                  />
                  <span class="errorMessage">
                    {{ errorMessage }}
                  </span>
                </field>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">星數</div>
              <div class="col-9">
                <field
                  validate-on-mount
                  name="星數"
                  rules="required|between:1,31"
                  v-slot="{ field, errorMessage, meta: { valid } }"
                >
                  <input-text
                    v-bind="field"
                    v-model="postData.star"
                    :class="!valid ? 'has-error' : ''"
                    @input="setStar(postData.star)"
                  />
                  <span class="errorMessage">
                    {{ errorMessage }}
                  </span>
                </field>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">目前等級</div>
              <div class="col-9">
                <field
                  validate-on-mount
                  name="目前等級"
                  rules="required|between:1,50"
                  v-slot="{ field, errorMessage, meta: { valid } }"
                >
                  <input-text
                    v-model="postData.level"
                    v-bind="field"
                    :class="!valid ? 'has-error' : ''"
                  />
                  <span class="errorMessage">
                    {{ errorMessage }}
                  </span>
                </field>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">總等級</div>
              <div class="col-9">
                <field
                  validate-on-mount
                  name="總等級"
                  rules="required|between:1,50"
                  v-slot="{ field, errorMessage, meta: { valid } }"
                >
                  <input-text
                    v-model="postData.total_level"
                    v-bind="field"
                    :class="!valid ? 'has-error' : ''"
                  />
                  <span class="errorMessage">
                    {{ errorMessage }}
                  </span>
                </field>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">剪刀數</div>
              <div class="col-9">
                <field
                  validate-on-mount
                  name="剪刀數"
                  rules="between:0,10"
                  v-slot="{ field, errorMessage, meta: { valid } }"
                >
                  <input-text
                    v-bind="field"
                    :class="!valid ? 'has-error' : ''"
                    v-model="postData.cut_num"
                  />
                  <span class="errorMessage">
                    {{ errorMessage }}
                  </span>
                </field>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">攻擊力(物/魔)</div>
              <div class="col-9">
                <input-text
                  v-model="postData.attack"
                  type="number"
                  v-bind="field"
                />
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">主屬性</div>
              <div class="col-9">
                <field
                  validate-on-mount
                  name="主屬性"
                  rules="required"
                  v-slot="{ field, errorMessage, meta: { valid } }"
                >
                  <input-select
                    v-model="postData.main_attribute"
                    v-bind="field"
                    :class="!valid ? 'has-error' : ''"
                    :options="mainAttributeOptions"
                  />
                  <span class="errorMessage">
                    {{ errorMessage }}
                  </span>
                </field>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3">是否可裝備靈魂</div>
              <div class="col-9 d-flex align-items-center">
                <div class="form-check me-3">
                  <input
                    v-model="postData.is_equippable_soul"
                    class="form-check-input"
                    :value="true"
                    type="radio"
                    name="soul"
                    id="soulYes"
                  />
                  <label class="form-check-label" for="soulYes"> 是 </label>
                </div>
                <div class="form-check">
                  <input
                    v-model="postData.is_equippable_soul"
                    class="form-check-input"
                    :value="false"
                    type="radio"
                    name="soul"
                    id="soulNo"
                  />
                  <label class="form-check-label" for="soulNo"> 否 </label>
                </div>
              </div>
            </div>

            <div v-if="postData.is_equippable_soul" class="col-12 mb-2">
              <div class="d-flex mb-2">
                <div class="col-3 pt-2">靈魂能力</div>
                <div class="col-9">
                  <field
                    validate-on-mount
                    name="靈魂屬性"
                    rules="required"
                    v-slot="{ field, errorMessage, meta: { valid } }"
                  >
                    <input-select
                      v-model="soulType"
                      v-bind="field"
                      :class="!valid ? 'has-error' : ''"
                      :options="soulTypeOptions"
                    />
                    <span class="errorMessage">{{ errorMessage }}</span>
                  </field>
                </div>
              </div>
              <div class="d-flex">
                <div class="col-3 align-self-center" />
                <div class="col-9">
                  <field
                    validate-on-mount
                    name="靈魂"
                    rules="required"
                    v-slot="{ field, errorMessage, meta: { valid } }"
                  >
                    <input-select
                      v-model="soul"
                      v-bind="field"
                      :options="soulOptions"
                      :class="!valid ? 'has-error' : ''"
                    />
                    <span class="errorMessage">{{ errorMessage }}</span>
                  </field>
                </div>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">星火等級</div>
              <div class="col-9">
                <input-select
                  v-model="postData.spark_level"
                  :options="sparkLevelOptions"
                />
              </div>
            </div>

            <div
              class="col-12 mb-2"
              v-if="postData.spark_capability && postData.spark_level"
            >
              <div class="d-flex mb-2">
                <div class="col-3 pt-2">星火能力</div>
                <div class="col-9">
                  <input-text v-model="postData.spark_capability[0]" />
                </div>
              </div>
              <div class="d-flex">
                <div class="col-3 align-self-center" />
                <div class="col-9">
                  <input-text v-model="postData.spark_capability[1]" />
                </div>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">潛在能力等級</div>
              <div class="col-9">
                <input-select
                  v-model="postData.potential_level"
                  :options="potentialLevelOptions"
                />
              </div>
            </div>

            <div
              class="col-12 mb-2"
              v-if="postData.potential_capability && postData.potential_level"
            >
              <div class="d-flex mb-2">
                <div class="col-3 pt-2">潛在能力</div>
                <div class="col-9">
                  <input-text v-model="postData.potential_capability[0]" />
                </div>
              </div>
              <div class="d-flex mb-2">
                <div class="col-3 align-self-center" />
                <div class="col-9">
                  <input-text v-model="postData.potential_capability[1]" />
                </div>
              </div>
              <div class="d-flex">
                <div class="col-3 align-self-center" />
                <div class="col-9">
                  <input-text v-model="postData.potential_capability[2]" />
                </div>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3">是否楓底</div>
              <div class="col-9 d-flex align-content-center">
                <div class="form-check me-3">
                  <input
                    v-model="postData.is_maple"
                    class="form-check-input"
                    :value="true"
                    type="radio"
                    name="maple"
                    id="isMaple"
                  />
                  <label class="form-check-label" for="isMaple"> 是 </label>
                </div>
                <div class="form-check">
                  <input
                    v-model="postData.is_maple"
                    class="form-check-input"
                    :value="false"
                    type="radio"
                    name="maple"
                    id="isNotMaple"
                  />
                  <label class="form-check-label" for="isNotMaple"> 否 </label>
                </div>
              </div>
            </div>

            <div v-if="postData.is_maple" class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">楓底能力</div>
              <div class="col-9">
                <field
                  validate-on-mount
                  name="楓底能力"
                  rules="required"
                  v-slot="{ field, errorMessage, meta: { valid } }"
                >
                  <input-select
                    v-model="postData.maple_capability"
                    v-bind="field"
                    :class="!valid ? 'has-error' : ''"
                    :options="mapleOptions"
                  />
                  <span class="errorMessage">
                    {{ errorMessage }}
                  </span>
                </field>
              </div>
            </div>

            <div v-if="postData.is_maple" class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">楓底等級</div>
              <div class="col-9">
                <field
                  validate-on-mount
                  name="楓底等級"
                  rules="required|between:1,5"
                  v-slot="{ field, errorMessage, meta: { valid } }"
                >
                  <input-text
                    v-bind="field"
                    type="number"
                    :class="!valid ? 'has-error' : ''"
                    v-model="postData.maple_level"
                  />
                  <span class="errorMessage">
                    {{ errorMessage }}
                  </span>
                </field>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3">說明</div>
              <div class="col-9">
                <textarea
                  v-model="postData.explanation"
                  class="w-100 form-control"
                  rows="4"
                />
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 pt-2">價格</div>
              <div class="col-9">
                <field
                  validate-on-mount
                  name="價格"
                  rules="required"
                  v-slot="{ field, errorMessage, meta: { valid } }"
                >
                  <input-text
                    v-model="postData.price"
                    v-bind="field"
                    type="number"
                    :class="!valid ? 'has-error' : ''"
                  />

                  <span class="errorMessage">
                    {{ errorMessage }}
                  </span>
                </field>
              </div>
            </div>
          </div>
        </div>

        <!-- 預覽 -->
        <div class="col-6">
          <div
            class="px-2 h-100"
            style="max-height: 60vh; overflow-y: scroll; overflow-x: hidden"
          >
            <div class="d-flex mb-2">
              <div class="item-img-box d-flex align-items-center">
                <div
                  class="item-img me-2"
                  :class="`stage-${stageLevelCode}`"
                  style="position: relative; width: 85px; height: 85px"
                >
                  <img v-if="selectedImage" :src="selectedImage" />
                  <img
                    v-if="postData.is_maple"
                    style="
                      width: 20px;
                      height: 20px;
                      position: absolute;
                      right: 0;
                      bottom: 0;
                    "
                    src="@/assets/images/maple-leaves.png"
                  />
                </div>
              </div>

              <div class="ms-1">
                <div>
                  <star-list ref="starList" />
                </div>
                <div class="modal-title">
                  <span class="soul-text">
                    {{ soul && soulType ? `${soulType}${soul}的` : "" }}
                  </span>
                  <span>
                    {{ selectedName ? selectedName : "" }}
                  </span>
                </div>
              </div>
            </div>

            <div class="level_box px-2 my-2">
              <div class="d-flex py-2">
                <div>
                  等級：{{ postData.level || "??" }}/{{
                    postData.total_level || "??"
                  }}
                </div>
                <div class="ms-5">階級：{{ stageLevel || "??" }}</div>
              </div>
            </div>

            <div>
              <div class="row">
                <div class="col-12 d-flex">
                  <div class="col-6">
                    <div>剩餘神奇剪刀</div>
                    <div>使用數：{{ postData.cut_num || "??" }}</div>
                  </div>
                  <div
                    v-if="postData.attack"
                    class="col-6 d-flex justify-content-end"
                    style="font-size: 200%"
                  >
                    {{ formatPrice(parseInt(postData.attack)) }}
                  </div>
                </div>
              </div>

              <div class="divider" />

              <div>
                {{ soulText }}
              </div>

              <div class="d-flex justify-content-between w-100">
                <div>攻擊力(物/魔)</div>
                <div v-if="postData.attack">
                  {{ formatPrice(parseInt(postData.attack)) }}
                </div>
              </div>

              <div>{{ postData.main_attribute }}</div>

              <div v-if="postData.spark_capability">
                <div :class="sparkLevelColor">
                  {{ postData.spark_capability[0] }}
                </div>
                <div :class="sparkLevelColor">
                  {{ postData.spark_capability[1] }}
                </div>
              </div>

              <div
                v-if="postData.potential_level && postData.potential_capability"
                class="divider"
              />

              <div
                v-if="postData.potential_level && postData.potential_capability"
              >
                <div :class="potentialLevelColor">潛在能力</div>
                <div v-if="showPotentialCapability">
                  <div>
                    {{ postData.potential_capability[0] }}
                  </div>
                  <div>
                    {{ postData.potential_capability[1] }}
                  </div>
                  <div>
                    {{ postData.potential_capability[2] }}
                  </div>
                </div>
                <div v-else>
                  潛在能力封印中 <br />
                  可透過底下的檢驗確認潛在能力
                </div>
              </div>

              <div v-if="postData.is_maple" class="divider" />

              <div v-if="postData.is_maple">
                <div>
                  <span v-if="postData.maple_level">
                    Lv. {{ postData.maple_level }}
                  </span>
                  {{ postData.maple_capability }}
                </div>
                <div v-if="postData.maple_capability" class="d-flex">
                  <div class="me-2">
                    <img
                      :src="mapleImagePath"
                      alt=""
                      style="width: 70px; height: 70px"
                    />
                  </div>
                  <div>{{ mapleText }}</div>
                </div>
              </div>

              <div v-if="postData.explanation">
                <div class="divider mt-2" />

                <div>說明：</div>
                <div class="w-100 pre-wrap">
                  {{ postData.explanation }}
                </div>
              </div>

              <div
                class="price_box mt-4 px-3 py-2 d-flex justify-content-between"
              >
                <div class="d-flex align-self-center">
                  <img
                    src="@/assets/images/coin.png"
                    style="width: 22px; height: 22px; margin-top: 1px"
                    class="me-2"
                  />
                  販售金額：
                </div>
                <div>{{ formatPrice(postData.price) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </app-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AppModal, InputSelect, InputText } from "@/components";
import {
  typeOptions,
  categoryOptions,
  stageLevelOptions,
  soulTypeOptions,
  soulOptions,
  mainAttributeOptions,
  sparkLevelOptions,
  potentialLevelOptions,
  mapleOptions,
} from "../data";
import { Product, typeOption } from "@/@types/models";
import StarList from "./star-list.vue";
import { apiGetProductList, apiPostProduct } from "@/services/api";
import { ProductListMultiItem } from "@/@types/models";
import { productMixin } from "@/mixins";
import { Field } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
  mixins: [productMixin],
  components: {
    AppModal,
    StarList,
    InputSelect,
    InputText,
    Field,
  },
  data() {
    return {
      categoryOptions: categoryOptions,
      stageLevelOptions: stageLevelOptions,
      soulOptions: soulOptions,
      soulTypeOptions: soulTypeOptions,
      mainAttributeOptions: mainAttributeOptions,
      sparkLevelOptions: sparkLevelOptions,
      potentialLevelOptions: potentialLevelOptions,
      mapleOptions: mapleOptions,
      typeOptions: typeOptions as typeOption[],
      productList: [] as ProductListMultiItem[],
      category: "",
      type: "",
      stageLevel: "",
      selectedImage: "",
      selectedName: "",
      soulType: "",
      soul: "",
      postData: {} as Product,
      stageLevelCode: 1,
      categoryRules: yup.string().required(),
      schema: yup.object({
        category: yup.string().required().label("test"),
      }),
    };
  },
  methods: {
    show() {
      this.setDefaultProduct();
      (this.$refs["appModal"] as typeof AppModal).show();
    },
    async fetchProducts() {
      let loader = this.$loading.show();

      try {
        if (this.type !== null) {
          this.postData.product_list = null;
          const {
            data: { result },
          } = await apiGetProductList({
            category: this.category,
            type: this.type,
          });
          this.productList = result;
        } else {
          this.clearSelectedItem("type");
        }
      } catch (err) {
        console.error(err);
      } finally {
        loader.hide();
      }
    },
    setPostData(id: string) {
      const item = this.currentProductOptions.find(
        el => el.product_list_id === id
      );
      if (item) {
        this.selectedImage = item.image;
        this.selectedName = item.name;
      }
    },
    setStar(star: string) {
      (this.$refs["starList"] as typeof StarList).setStar(parseInt(star));
    },
    setDefaultProduct() {
      this.postData = {
        product_list: "",
        star: "",
        level: "",
        total_level: "",
        is_maple: false,
        maple_capability: "",
        price: "",
        is_equippable_soul: false,
        spark_capability: ["", ""],
        potential_capability: ["", "", ""],
      };
    },
    setLevelColor(level: string) {
      switch (level) {
        case "普通":
          this.stageLevelCode = 1;
          break;
        case "稀有":
          this.stageLevelCode = 2;
          break;
        case "史詩":
          this.stageLevelCode = 3;
          break;
        case "罕見":
          this.stageLevelCode = 4;
          break;
        case "傳說":
          this.stageLevelCode = 5;
          break;
        case "神話":
          this.stageLevelCode = 6;
          break;
        case "古代":
          this.stageLevelCode = 7;
          break;
      }
      this.clearSelectedItem("level");
    },
    clearSelectedItem(type: string) {
      this.postData.product_list = null;
      this.selectedImage = "";
      this.selectedName = "";
      switch (type) {
        case "type":
          this.productList = [];
          break;
      }
    },
    reset() {
      this.productList = [] as ProductListMultiItem[];
      this.category = "";
      this.type = "";
      this.stageLevel = "";
      this.selectedImage = "";
      this.selectedName = "";
      this.soulType = "";
      this.soul = "";
      this.postData = {} as Product;
      this.stageLevelCode = 1;
    },
    async submitHandler() {
      let loader = this.$loading.show();
      const {
        is_maple,
        maple_capability,
        is_equippable_soul,
        potential_level,
        potential_capability,
        spark_level,
        spark_capability,
      } = this.postData;

      try {
        await apiPostProduct({
          ...this.postData,
          maple_capability: is_maple ? maple_capability : undefined,
          soul_capability:
            is_equippable_soul && this.soulType && this.soul
              ? `${this.soulType}${this.soul}的`
              : undefined,
          potential_level: potential_level ? potential_level : undefined,
          potential_capability: potential_level
            ? potential_capability?.join(",")
            : undefined,
          spark_level: spark_level ? spark_level : undefined,
          spark_capability: spark_level
            ? spark_capability?.join(",")
            : undefined,
        });
        (this.$refs["appModal"] as typeof AppModal).hide();
        this.$notify({ type: "success", text: "登錄成功!" });
      } catch (e) {
        console.log(e);
      } finally {
        loader.hide();
      }
    },
  },
  computed: {
    isLoaded(): boolean {
      if (this.postData && this.postData.spark_capability) {
        return true;
      } else {
        return false;
      }
    },
    currentTypeOptions(): typeOption["type"] {
      if (this.category) {
        return (
          this.typeOptions.find(el => el.category === this.category)?.type || []
        );
      } else {
        return [];
      }
    },
    productPlaceholder(): string {
      if (this.type === "" || this.stageLevel === "") {
        return "請完成上面所有選項";
      } else {
        return "請選擇";
      }
    },
    currentProductOptions(): ProductListMultiItem[] {
      return this.productList.filter(
        el => el.zh_stage_level === this.stageLevel
      );
    },
    soulText(): string {
      if (this.postData.is_equippable_soul && this.soul && this.soulType) {
        return "已裝備靈魂";
      } else if (this.postData.is_equippable_soul) {
        return "可裝備靈魂";
      } else {
        return "可使用靈魂附魔";
      }
    },
    sparkLevelColor(): string {
      switch (this.postData.spark_level) {
        case "稀有":
          return "blue-text";
        case "罕見":
          return "orange-text";
        case "傳說":
          return "green-text";
        case "神話":
          return "red-text";
        default:
          return "";
      }
    },
    mapleText(): string {
      switch (this.postData.maple_capability) {
        case "殘忍的紋章":
          return "致命攻擊傷害";
        case "征服紋章":
          return "對BOSS攻擊力增加";
        case "機靈紋章":
          return "對BOSS防禦力增加";
        case "強力紋章":
          return "物理攻擊力增加";
        case "神聖紋章":
          return "魔法攻擊力增加";
        default:
          return "";
      }
    },
    mapleImagePath(): string {
      switch (this.postData.maple_capability) {
        case "殘忍的紋章":
          return require("@/assets/images/deadly.jpg");
        case "征服紋章":
          return require("@/assets/images/boss.jpg");
        case "機靈紋章":
          return require("@/assets/images/defend.jpg");
        case "強力紋章":
          return require("@/assets/images/attack.jpg");
        case "神聖紋章":
          return require("@/assets/images/magic.jpg");
        default:
          return "";
      }
    },
    potentialLevelColor(): string {
      switch (this.postData.potential_level) {
        case "稀有":
          return "blue-text";
        case "史詩":
          return "purple-text";
        case "罕見":
          return "orange-text";
        case "傳說":
          return "green-text";
        case "神話":
          return "red-text";
        default:
          return "";
      }
    },
    showPotentialCapability(): boolean {
      if (this.postData.potential_capability) {
        let result = false;
        this.postData.potential_capability.forEach(el => {
          if (el !== "") {
            return (result = true);
          }
        });
        return result;
      } else {
        return false;
      }
    },
  },
});
</script>
