import MediaRequestApi from "../../api/MediaRequestApi";

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
    error(e: any) {
      console.error('相机错误:', e.detail);
      wx.showToast({
        title: '相机出现错误',
        icon: 'none'
      });
      this.setData({
        showCamera: false
      });
    },

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
          MediaRequestApi.upload(picPath);
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