// pages/usercenter/index.ts
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
    username: '张三',
    avatarUrl: 'https://example.com/avatar.png',
    status: '在线',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCellClick(event: any) {
      const index = event.currentTarget.dataset.index;
      // 根据 index 处理点击事件
      console.log(`Clicked setting ${index + 1}`);
    }
  }
})