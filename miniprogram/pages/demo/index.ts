Component({
  data: {
    menuItems: [
      {
        id: 1,
        name: '白米饭',
        description: '白米饭',
        price: '1.00',
        status: '已售罄',
        image: '/images/white-rice.jpg'
      },
      {
        id: 2,
        name: '杂粮米',
        description: '杂粮米',
        price: '1.30',
        status: '已售罄',
        image: '/images/mixed-grain-rice.jpg'
      },
      {
        id: 3,
        name: '传统酱油烧肉',
        description: '五花肉焖油煎至金黄，葱、蒜、姜',
        price: '7.00',
        status: '已售罄',
        image: '/images/soy-sauce-pork.jpg'
      },
      {
        id: 4,
        name: '传统酱油烧肉（半份）',
        description: '五花肉焖油煎至金黄，葱、蒜、姜',
        price: '3.50',
        status: '已售罄',
        image: '/images/soy-sauce-pork-half.jpg'
      }
    ]
  },

  methods: {
    onItemTap(event: any) {
      const item = event.currentTarget.dataset.item;
      wx.navigateTo({
        url: `/pages/ai_analysis/index?item=${JSON.stringify(item)}`,
      });
    }
  }
})