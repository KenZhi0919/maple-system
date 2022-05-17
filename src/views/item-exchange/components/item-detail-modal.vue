<template>
  <app-modal
    ref="appModal"
    header-class="d-flex align-items-start"
    only-close-btn
    scrollable
    @hiddenHandler="reset"
  >
    <template v-slot:header>
      <div class="modal-title">商品資訊</div>
    </template>
    <template v-if="isLoaded" v-slot:body>
      <div class="d-flex mb-2">
        <div class="item-img-box d-flex align-items-center">
          <div
            class="item-img me-2"
            :class="`stage-${product.stage_level}`"
            style="position: relative; width: 100px; height: 100px"
          >
            <img :src="product.image" />
            <img
              v-if="productDetail.is_maple"
              style="
                width: 25px;
                height: 25px;
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
            <start-list :star="productDetail.star" />
          </div>
          <div class="modal-title">
            <span class="soul-text">
              {{ productDetail.soul_capability }}
            </span>
            <span>
              {{ product ? product.name : "" }}
            </span>
          </div>
        </div>
      </div>

      <div class="level_box px-2 my-2">
        <div class="d-flex py-2">
          <div>
            等級：{{ productDetail.level || "??" }}/{{
              productDetail.total_level || "??"
            }}
          </div>
          <div class="ms-5">階級：{{ product.zh_stage_level || "??" }}</div>
        </div>
      </div>

      <div>
        <div class="row">
          <div class="col-12 d-flex">
            <div class="col-6">
              <div>剩餘神奇剪刀</div>
              <div>使用數：{{ productDetail.cut_num || "??" }}</div>
            </div>
            <div
              class="col-6 d-flex justify-content-end"
              style="font-size: 200%"
            >
              {{ formatPrice(productDetail.attack) }}
            </div>
          </div>
        </div>

        <div class="divider" />

        <div>
          {{ soulText }}
        </div>

        <div class="d-flex justify-content-between w-100">
          <div>攻擊力(物/魔)</div>
          <div>{{ formatPrice(productDetail.attack) }}</div>
        </div>

        <div>{{ productDetail.main_attribute }}</div>

        <div v-if="productDetail.spark_capability">
          <div :class="sparkLevelColor">
            {{ productDetail.spark_capability[0] }}
          </div>
          <div :class="sparkLevelColor">
            {{ productDetail.spark_capability[1] }}
          </div>
        </div>

        <div
          v-if="
            productDetail.potential_level && productDetail.potential_capability
          "
          class="divider"
        />

        <div
          v-if="
            productDetail.potential_level && productDetail.potential_capability
          "
        >
          <div :class="potentialLevelColor">潛在能力</div>
          <div v-if="productDetail.potential_capability.length > 0">
            <div
              v-for="(capability, index) in productDetail.potential_capability"
              :key="index"
            >
              {{ capability }}
            </div>
          </div>
          <div v-else>
            潛在能力封印中 <br />
            可透過底下的檢驗確認潛在能力
          </div>
        </div>

        <div v-if="productDetail.is_maple" class="divider" />

        <div v-if="productDetail.is_maple">
          <div>
            <span v-if="productDetail.maple_level">
              Lv. {{ productDetail.maple_level }}
            </span>
            {{ productDetail.maple_capability }}
          </div>
          <div v-if="productDetail.maple_capability" class="d-flex">
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

        <div v-if="productDetail.explanation">
          <div class="divider mt-2" />

          <div>說明：</div>
          <div class="w-100 pre-wrap">
            {{ productDetail.explanation }}
          </div>
        </div>

        <div class="price_box mt-4 px-3 py-2 d-flex justify-content-between">
          <div class="d-flex align-self-center">
            <img
              src="@/assets/images/coin.png"
              style="width: 22px; height: 22px; margin-top: 1px"
              class="me-2"
            />
            販售金額：
          </div>
          <div>{{ formatPrice(productDetail.price) }}</div>
        </div>
      </div>
    </template>
  </app-modal>
</template>

<script lang="js">
import { defineComponent } from "vue"
import { AppModal } from "@/components"
import StartList from "./star-list.vue"
import { productMixin } from "@/mixins"
export default defineComponent({
  mixins: [productMixin],
  components: {
    AppModal,
    StartList,
  },
  data() {
    return {
      product: {} ,
      productDetail: {} ,
    }
  },
  methods: {
    show(productDetail) {
      this.productDetail = productDetail
      this.product = productDetail.product_list_data
      ;(this.$refs["appModal"]).show()
    },
    reset() {
      this.product = {}
      this.productDetail = {}
    },
  },
  computed: {
    isLoaded() {
      if (this.productDetail && this.productDetail.product_id) {
        return true
      } else {
        return false
      }
    },
    soulText() {
      if (this.productDetail.is_equippable_soul) {
        if (this.productDetail.soul_capability) {
          return "已裝備靈魂"
        }
        return "可裝備靈魂"
      } else {
        return "可使用靈魂附魔"
      }
    },
    potentialLevelColor() {
      switch (this.productDetail.potential_level) {
        case "稀有":
          return "blue-text"
        case "史詩":
          return "purple-text"
        case "罕見":
          return "orange-text"
        case "傳說":
          return "green-text"
        case "神話":
          return "red-text"
        default:
          return ""
      }
    },
    sparkLevelColor(){
      switch (this.productDetail.spark_level) {
        case "稀有":
          return "blue-text"
        case "罕見":
          return "orange-text"
        case "傳說":
          return "green-text"
        case "神話":
          return "red-text"
        default:
          return ""
      }
    },
    mapleText() {
      switch (this.productDetail.maple_capability) {
        case "殘忍的紋章":
          return "致命攻擊傷害"
        case "征服紋章":
          return "對BOSS攻擊力增加"
        case "機靈紋章":
          return "對BOSS防禦力增加"
        case "強力紋章":
          return "物理攻擊力增加"
        case "神聖紋章":
          return "魔法攻擊力增加"
        default:
          return ""
      }
    },
    mapleImagePath() {
      switch (this.productDetail.maple_capability) {
        case "殘忍的紋章":
          return require("@/assets/images/deadly.jpg")
        case "征服紋章":
          return require("@/assets/images/boss-attack.jpg")
        case "機靈紋章":
          return require("@/assets/images/defend.jpg")
        case "強力紋章":
          return require("@/assets/images/attack.jpg")
        case "神聖紋章":
          return require("@/assets/images/magic.jpg")
        default:
          return ""
      }
    },
  },
})
</script>
