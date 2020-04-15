<!--
 * @Date         : 2020-04-13 14:18:30
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-15 20:55:15
 * @FilePath     : \src\pages\home\videoList\Index.vue
 -->
<script lang="ts">
import { Component, Vue, Model, Prop, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import VideoListStore from "store/modules/videoList/VideoListStore";
import msg from "common/MessageUtils";
import { promises } from "dns";

@Component({})
export default class VideoListPage extends Vue {
  private store: any;
  private className: string = "el-icon-caret-left";
  private typeOne: any = [
    {
      id: 1,
      name: "新城区教育局",
      schoolList: [
        {
          id: 1,
          name: "黄河中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 2,
          name: "清华附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 3,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 4,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 5,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 6,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 7,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 8,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 5,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 9,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 10,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 6,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 11,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 12,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 7,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 13,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 14,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 8,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 15,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 16,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 9,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 17,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 18,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 10,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 19,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 20,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 11,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 21,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 22,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 12,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 23,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 24,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 13,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 25,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 26,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 14,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 27,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 28,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    },
    {
      id: 15,
      name: "龙华区教育局",
      schoolList: [
        {
          id: 29,
          name: "布吉中学",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        },
        {
          id: 30,
          name: "深大附中",
          videoList: [
            {
              name: "东门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            },
            {
              name: "西门",
              url:
                "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/203751922/1.hd.live&autoplay=1&accessToken=ra.27vcv3ub76c209ty2aar1rp18h7iacm8-2h6hofhnlm-0urvihb-kqd6ajoba"
            }
          ]
        }
      ]
    }
  ];
  private educationShow: number = null;
  private schoolId: number = null;
  private educationId: number = null;
  private videoId: number = null;
  private videoSize: number = 16;
  constructor() {
    super();
    this.store = getModule(VideoListStore);
  }
  mounted() {
    for (let i = 1; i <= this.videoSize; i++) {debugger
      this[`player${i}`] = new EZUIPlayer(`player${i}`);
      this[`player${i}`].play();
    }
  }
  beforeDestroy () {
    for (let i = 1; i <= this.videoSize; i++) {
      if (typeof this[`player${i}`] === "object") {
        this[`player${i}`].stop();
      }
    }
  }
  changeClassName() {
    switch (this.className) {
      case "el-icon-caret-left":
        this.className = "el-icon-caret-right";
        break;
      case "el-icon-caret-right":
        this.className = "el-icon-caret-left";
        break;
      default:
        break;
    }
    setTimeout(() => {
      let iframe = this.$refs.iframe as HTMLIFrameElement;
      iframe.src = iframe.src;
    }, 500);
  }
  getSchoolList(list) {
    this.educationId = this.educationId == list.id ? null : list.id;
    if (this.educationId) {
      console.log("VideoListPage -> schoolList -> list", list);
    }
  }
  getVideoList(list) {
    this.videoId = this.videoId == list.id ? null : list.id;
    if (this.videoId) {
      console.log("VideoListPage -> getVideoList -> list", list);
    }
  }
  getVideo(list) {
    console.log("VideoListPage -> getVideo -> list", list);
  }
  delVideo(id) {
  console.log("VideoListPage -> delVideo -> id", id)
  }
}
</script>
<template lang="pug" src="views/videoList.pug" />
<style lang="stylus" src='styles/videoList.stylus' />