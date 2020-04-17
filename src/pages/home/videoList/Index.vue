<!--
 * @Date         : 2020-04-13 14:18:30
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-16 17:41:11
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
  private typeOne: Array<VideoObject> = [
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
  private videoSrc: Array<any> = [];
  constructor() {
    super();
    this.store = getModule(VideoListStore);
  }
  created() {
    for (let i = 1; i <= this.videoSize; i++) {
      let obj = (this.videoSrc[i - 1] = {});
      obj["id"] = [`player${i}`];
      obj["src"] =
        "http://hls01open.ys7.com/openlive/86181dda9da844779846f3dad61939ae.hd.m3u8";
    }
  }
  mounted() {
    this.videoStart();
    this.getDeleteIcon();
  }
  videoStart() {
    for (let i = 1; i <= this.videoSize; i++) {
      this[`player${i}`] = new EZUIPlayer(`player${i}`);
      this[`player${i}`].play();
    }
  }
  getDeleteIcon() {
    let wrap = document.getElementsByClassName("video-wrap");
    for (let i = 0; i < wrap.length; i++) {
      (wrap[i] as HTMLElement).onmouseover = () => {
        if (
          wrap[i]
            .getElementsByTagName("video")[0]
            .src.toString()
            .match(/blob/)
        ) {
          wrap[i].getElementsByTagName("i")[0].style.display = "inline-block";
        }
      };
      (wrap[i] as HTMLElement).onmouseout = () => {
        wrap[i].getElementsByTagName("i")[0].style.display = "none";
      };
    }
  }
  beforeDestroy() {
    this.videoStop();
  }
  videoStop() {
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
    this[id].stop();
    let ele = document.getElementById(id);
    let parent = ele.parentElement;
    let video = document.createElement("video");
    video.id = id;
    video.src = "";
    video.controls = true;
    video.muted = true;
    parent.removeChild(ele);
    parent.appendChild(video);
    let newEle = document.getElementById(id);
    newEle.style.width = "100%";
    newEle.style.height = "100%";
    this.videoSrc.forEach((item, index) => {
      if (item.id == id) {
        this.videoSrc[index].src = "";
      }
    });
  }
  verifyVideo(list: Array<any>): Array<any> {
    let videoList: Array<any> = Object.assign({}, list);
    let noRepet: boolean = true;
    let location: number = 0;
    this.videoSrc.forEach(item => {
      if (!item.src) location++;
      list.forEach((a, index) => {
        if (a["src"] == item.src) {
          noRepet = false;
          videoList.splice(index, 1);
        }
      });
    });
    if (!noRepet && list.length == 1) {
      msg.warning("该视频已播放，无法重复播放");
    } else {
      if (list.length > location) {
        msg.warning(
          `选中视频超过可播放总数，仅播放前${location - list.length}个`
        );
      }
      return videoList;
    }
  }
}


  interface VideoObject {
    id: Number;
    name: String;
    schoolList: Array<any>;
  }
</script>
<template lang="pug" src="views/videoList.pug" />
<style lang="stylus" src='styles/videoList.stylus' />