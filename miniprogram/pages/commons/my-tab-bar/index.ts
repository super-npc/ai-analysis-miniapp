// pages/home/home.ts
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
    value: 0,
    list: [
      { value: 'label_1', label: '文字', icon: 'home' },
      { value: 'label_2', label: '文字', icon: 'app' },
      { value: 'label_3', label: '文字', icon: 'chat' },
      { value: 'label_4', label: '文字', icon: 'user' },
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e: any) {
      const index:string = e.detail.value;
      console.log("选中索引:"+index);
      if(index == 'label1'){
        wx.switchTab({url:"/pages/index/index",complete: (res) => {
          console.log(res);
        },})
      }
      // ,
      // "pages/index/index",
      // "pages/logs/logs"
      this.setData({
        value: e.detail.value,
      });
    },
  }
})