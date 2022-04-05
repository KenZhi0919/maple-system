import { typeOption } from "@/@types/models";

export const categoryOptions: string[] = ["武器", "防具", "造型", "消耗品"];

export const soulTypeOptions: string[] = [
  "充滿力量的",
  "敏捷的",
  "聰明的",
  "驚人的",
  "華麗的",
  "強力的",
  "發光的",
  "堅韌的",
  "偉大的",
];

export const soulOptions: string[] = [
  "殘暴炎魔",
  "闇黑龍王",
  "皮卡啾",
  "西格諾斯",
  "斑斑",
  "比艾樂",
  "血腥皇后",
  "貝倫",
  "凡雷恩",
  "希拉",
  "梅格耐斯",
  "阿卡伊農",
];

export const stageLevelOptions: string[] = [
  "普通",
  "稀有",
  "史詩",
  "罕見",
  "傳說",
  "神話",
  "古代",
];

export const mapleOptions: string[] = [
  "殘忍的紋章",
  "征服紋章",
  "機靈紋章",
  "強力紋章",
  "神聖紋章",
];

export const sparkLevelOptions: string[] = ["稀有", "罕見", "傳說", "神話"];

export const potentialLevelOptions: string[] = ["稀有", "史詩", "罕見", "傳說"];

export const mainAttributeOptions: string[] = [
  "致命攻擊傷害",
  "BOSS傷害",
  "經驗值增加",
  "致命攻擊率",
];

export const typeOptions: typeOption[] = [
  {
    category: "武器",
    type: [
      "長槍",
      "雙手劍",
      "矛",
      "雙手斧",
      "單手棍",
      "單手劍",
      "輔助武器",
      "弓",
      "雙弩槍",
      "弩弓",
      "魔劍",
      "能量劍",
      "古代之弓",
      "拳套",
      "短劍",
      "手杖",
      "短杖",
      "長杖",
      "閃耀之杖",
      "槍",
      "指虎",
    ],
  },
  {
    category: "防具",
    type: ["帽子", "套服", "手套", "鞋子", "肩膀", "腰帶", "披風"],
  },
  {
    category: "造型",
    type: [
      "武器",
      "帽子",
      "上衣",
      "下衣",
      "套服",
      "手套",
      "鞋子",
      "披風",
      "臉部裝飾",
      "眼部裝飾",
      "效果",
      "其他",
    ],
  },
];
