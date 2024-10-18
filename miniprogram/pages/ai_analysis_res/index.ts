import MiniAppBizController, { AnalyseResult, ProcessType, QueryAnalyseJobResp, SubmitAnalyseJobResp } from "../../api/controller/MiniAppBizController"

// pages/ai_analysis_res/index.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    analyseResp: {} as SubmitAnalyseJobResp,
    queryAnalyseJobResp: {} as QueryAnalyseJobResp,
    bannerImage: '',
    adText: '',
    possibleResults: [] as AnalyseResult[]
  },

  /**
   * 组件的生命周期函数
   */
  lifetimes: {
    attached() {
      // const eventChannel = this.getOpenerEventChannel()
      // eventChannel.on('acceptAnalyseResult', (data) => {
      //   debugger
      //   const submitAnalyseJobResp = data.analyseResp as SubmitAnalyseJobResp;
      //   this.setData({
      //     analyseResp: submitAnalyseJobResp,
      //   })
      //   this.processAnalyseResult()
      // })

      // 测试数据
      const submitAnalyseJobResp: SubmitAnalyseJobResp = {
        miniAppAnalyseJobId: 3,
        sourceObjectId: "cloud://prod-5g3l0m5je193306f.7072-prod-5g3l0m5je193306f-1259198184/nobita/miniapp/wx13754984438a1b4d/image/2024-10-18/nufjbvv7s8j.png"
      };
      this.setData({
        analyseResp: submitAnalyseJobResp,
      })
      this.queryAnalyseJobUntilFinish(3);
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    queryAnalyseJobUntilFinish(miniAppAnalyseJobId: number) {
      const queryJob = () => {
        MiniAppBizController.queryAnalyseJob({miniAppAnalyseJobId}).then((res) => {
          const queryAnalyseJobResp = res as QueryAnalyseJobResp;
          this.setData({
            queryAnalyseJobResp: queryAnalyseJobResp,
            bannerImage: queryAnalyseJobResp.analyseJobVo?.sourceObjectId || '',
            adText: queryAnalyseJobResp.analyseJobVo?.yoloModel?.name || '未知模型',
            possibleResults: queryAnalyseJobResp.analyseJobVo?.analyseResults || []
          });
          
          const process = queryAnalyseJobResp.analyseJobVo?.process;
          console.log(`流程结果:${process}`);
          if (process?.toString() !== 'FINISH') {
            setTimeout(queryJob, 2000);
          }
        });
      };

      queryJob();
    },

    processAnalyseResult() {
      // 处理分析结果的逻辑
      // 例如：更新 bannerImage、adText 和 possibleResults
      // this.setData({
      //   bannerImage: this.data.analyseResp.someImageUrl,
      //   adText: this.data.analyseResp.someText,
      //   possibleResults: this.data.analyseResp.someResults
      // })
    },

    onTapResult(e: WechatMiniprogram.TouchEvent) {
      const index = e.currentTarget.dataset.index
      const result = this.data.possibleResults[index]
      // 处理点击结果的逻辑
      wx.showToast({
        title: `您选择了: ${result}`,
        icon: 'none'
      })
    }
  }
})
