// pages/demo/index.ts
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
    showCamera: false,
    src: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    toggleCamera() {
      this.setData({
        showCamera: !this.data.showCamera
      });
    },

    takePhoto() {
      const camera = wx.createCameraContext();
      camera.takePhoto({
        quality: 'high',
        success: (res) => {
          let picPath = res.tempImagePath;
          console.log("照片路径:" + picPath);
          this.setData({
            src: picPath
          });
          // 上传图片
          debugger
          wx.uploadFile({header:{"appId":"sdfsdfsdf"}, name:"aa",url:"http://127.0.0.1:9090/wx/media/upload",filePath:picPath});
        },
        fail: (res) => {
          console.log("拍照异常" + res.errMsg);
          wx.showToast({
            title: '拍照失败',
            icon: 'none'
          });
        }
      });
    }
  }
})