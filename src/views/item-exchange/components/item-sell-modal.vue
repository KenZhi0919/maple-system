<template>
  <app-modal ref="appModal" size="xl" header-class="d-flex align-items-start">
    <template v-slot:header>
      <div class="modal-title">上架商品</div>
    </template>

    <template v-slot:body>
      <div class="row">
        <div class="col-6">
          <div class="px-2" style="overflow-y: scroll; max-height: 60vh">
            <div class="col-12 d-flex mb-2">
              <div class="col-3 align-self-center">類別</div>
              <div class="col-9">
                <input-select v-model="category" :options="categoryOptions" />
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 align-self-center">種類</div>
              <div class="col-9">
                <input-select
                  v-model="type"
                  :place-holder="category ? undefined : '請先選擇類別'"
                  :options="currentTypeOptions"
                  @input="fetchProducts"
                />
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 align-self-center">階級</div>
              <div class="col-9">
                <input-select
                  v-model="stageLevel"
                  :options="stageLevelOptions"
                  @change="setLevelColor"
                />
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 align-self-center">商品</div>
              <div class="col-9">
                <input-select
                  v-model="postData.product_list"
                  value-prop="product_list_id"
                  label="name"
                  :options="currentProductOptions"
                  :place-holder="productPlaceholder"
                  @change="setPostData"
                />
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 align-self-center">星數</div>
              <div class="col-9">
                <input-text
                  v-model="postData.star"
                  @input="setStar(postData.star)"
                />
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 align-self-center">目前等級</div>
              <div class="col-9">
                <input-text v-model="postData.level" />
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 align-self-center">總等級</div>
              <div class="col-9">
                <input-text v-model="postData.total_level" />
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 align-self-center">剪刀數</div>
              <div class="col-9">
                <input-text v-model="postData.cut_num" />
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 align-self-center">攻擊力(物/魔)</div>
              <div class="col-9">
                <input-text v-model="postData.attack" />
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 align-self-center">主屬性</div>
              <div class="col-9">
                <input-select
                  v-model="postData.main_attribute"
                  :options="mainAttributeOptions"
                />
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 align-self-center">是否可裝備靈魂</div>
              <div class="col-9 d-flex">
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
                <div class="col-3 align-self-center">靈魂能力</div>
                <div class="col-9">
                  <input-select v-model="soulType" :options="soulTypeOptions" />
                </div>
              </div>
              <div class="d-flex">
                <div class="col-3 align-self-center" />
                <div class="col-9">
                  <input-select v-model="soul" :options="soulOptions" />
                </div>
              </div>
            </div>

            <div class="col-12 d-flex mb-2">
              <div class="col-3 align-self-center">星火等級</div>
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
                <div class="col-3 align-self-center">星火能力</div>
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
              <div class="col-3 align-self-center">潛在能力等級</div>
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
                <div class="col-3 align-self-center">潛在能力</div>
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
              <div class="col-3 align-self-center">是否楓底</div>
              <div class="col-9 d-flex">
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
              <div class="col-3 align-self-center">楓底能力</div>
              <div class="col-9">
                <input-select
                  v-model="postData.maple_capability"
                  :options="mapleOptions"
                />
              </div>
            </div>

            <div v-if="postData.is_maple" class="col-12 d-flex mb-2">
              <div class="col-3 align-self-center">楓底等級</div>
              <div class="col-9">
                <input-text v-model="postData.maple_level" />
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
              <div class="col-3 align-self-center">價格</div>
              <div class="col-9">
                <input-text v-model="postData.price" />
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
              <div class="item-img-box d-flex align-items-center px-2">
                <div
                  class="item-img me-2"
                  :class="`stage-${stageLevelCode}`"
                  style="position: relative"
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
                <div style="height: fit-content">
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

            <div class="level_box px-2 mb-1">
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
                    class="col-6 d-flex justify-content-end"
                    style="font-size: 200%"
                  >
                    {{ postData.attack }}
                  </div>
                </div>
              </div>

              <div class="divider" />

              <div>
                {{ soulText }}
              </div>

              <div class="d-flex justify-content-between w-100">
                <div>攻擊力(物/魔)</div>
                <div>{{ postData.attack }}</div>
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
                <div class="divider" />

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
                <div>{{ postData.price }}</div>
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
import { apiGetProductList } from "@/services/api";
import { ProductListMultiItem } from "@/@types/models";

export default defineComponent({
  components: {
    AppModal,
    StarList,
    InputSelect,
    InputText,
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
    };
  },
  mounted() {
    this.setDefaultProduct();
  },
  methods: {
    show() {
      (this.$refs["appModal"] as typeof AppModal).show();
    },
    async fetchProducts() {
      let loader = this.$loading.show();
      try {
        const {
          data: { result },
        } = await apiGetProductList({
          category: this.category,
          type: this.type,
        });
        this.productList = result;
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
      this.postData.product_list = "";
      this.selectedImage = "";
      this.selectedName = "";
    },
  },
  computed: {
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
          return "/img/deadly.522214e7.jpg";
        case "征服紋章":
          return "/img/Boss.c147f76c.jpg";
        case "機靈紋章":
          return "/img/defend.b1bc1780.jpg";
        case "強力紋章":
          return "/img/attack.cdd75373.jpg";
        case "神聖紋章":
          return "/img/magic.a760e25f.jpg";
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

<style lang="scss" scoped>
.modal-title {
  font-size: 130%;
}

.level_box {
  border-radius: 10px;
  background-color: #e5e7e9;
}

.price_box {
  border-radius: 7px;
  background-color: white;
}

.soul-text {
  color: rgb(39, 207, 6);
}
</style>
