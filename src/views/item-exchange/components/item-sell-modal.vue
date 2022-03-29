<template>
  <app-modal ref="appModal" size="xl" header-class="d-flex align-items-start">
    <template v-slot:header>
      <div class="modal-title">上架商品</div>
    </template>

    <template v-slot:body>
      <div class="row">
        <!--  -->
        <div class="col-6">
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
                v-model="product_list_id"
                value-prop="product_list_id"
                label="name"
                :options="currentProductOptions"
                :place-holder="productPlaceholder"
                @change="setSelectedItem"
              />
            </div>
          </div>

          <div class="col-12 d-flex mb-2">
            <div class="col-3 align-self-center">星數</div>
            <div class="col-9">
              <input-text v-model="star" @input="setStar(star)" />
            </div>
          </div>

          <div class="col-12 d-flex mb-2">
            <div class="col-3 align-self-center">目前等級</div>
            <div class="col-9">
              <input-text v-model="level" />
            </div>
          </div>
          <div class="col-12 d-flex mb-2">
            <div class="col-3 align-self-center">總等級</div>
            <div class="col-9">
              <input-text v-model="totalLevel" />
            </div>
          </div>

          <div class="col-12 d-flex mb-2">
            <div class="col-3 align-self-center">剪刀數</div>
            <div class="col-9">
              <input-text v-model="cutNum" />
            </div>
          </div>

          <div class="col-6">是否可裝備靈魂</div>
          <div class="col-6">靈魂能力</div>
          <div class="col-6">攻擊力</div>
          <div class="col-6">主屬性</div>
          <div class="col-6">價格</div>
          <div class="col-6">淺在能力等級</div>
          <div class="col-6">淺在能力</div>
          <div class="col-6">星火等級</div>
          <div class="col-6">星火能力</div>
          <div class="col-6">是否楓底</div>
          <div class="col-6">楓底能力</div>
          <div class="col-6">楓底等級</div>
          <div class="col-6">說明</div>
          <div class="col-6">照片</div>
        </div>

        <!-- 預覽 -->
        <div class="col-6">
          <div class="d-flex mb-2">
            <div class="item-img-box d-flex align-items-center px-2">
              <div class="item-img me-2" :class="`stage-${stageLevelCode}`">
                <img
                  v-if="selectedItem && selectedItem.image"
                  :src="selectedItem.image"
                />
              </div>
            </div>

            <div class="ms-1">
              <div style="height: fit-content">
                <star-list ref="starList" />
              </div>
              <div class="modal-title">
                {{ selectedItem ? selectedItem.name : "" }}
              </div>
            </div>
          </div>

          <div class="level_box px-2 mb-1">
            <div class="d-flex py-2">
              <div>等級：{{ level || "??" }}/{{ totalLevel || "??" }}</div>
              <div class="ms-5">階級：{{ stageLevel || "??" }}</div>
            </div>
          </div>
          <div class="">
            <div class="">剩餘神奇剪刀</div>
            <div class="mb-2">使用數：{{ cutNum || "??" }}</div>
            <div class="">可使用靈魂附魔</div>
            <div class="">物理攻擊力</div>
            <div class="">致命攻擊傷害</div>
          </div>
        </div>
      </div>
    </template>
  </app-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AppModal, InputSelect, InputText } from "@/components";
import { typeOptions, categoryOptions, stageLevelOptions } from "../data";
import { defaultOption, typeOption } from "@/@types/models";
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
      typeOptions: typeOptions as typeOption[],
      productList: [] as ProductListMultiItem[],
      category: "",
      type: "",
      stageLevel: "",
      product_list_id: "",
      star: "",
      level: "",
      totalLevel: "",
      cutNum: "",
      selectedItem: {} as ProductListMultiItem,
      stageLevelCode: 1,
    };
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
        console.log(this.productList);
      } catch (err) {
        console.error(err);
      } finally {
        loader.hide();
      }
    },
    setSelectedItem(id: string) {
      const item = this.currentProductOptions.find(
        el => el.product_list_id === id
      );
      if (item) {
        this.selectedItem = item;
      }
    },
    setStar(star: string) {
      (this.$refs["starList"] as typeof StarList).setStar(parseInt(star));
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
  },
});
</script>

<style lang="scss" scoped>
.modal-title {
  font-size: 130%;
}

.level_box {
  border-radius: 10px;
  background-color: grey;
}
</style>
