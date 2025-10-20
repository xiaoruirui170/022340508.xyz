const chartData = {
  // 折线图数据 - 基于MPG数据
  line: {
    labels: ["1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008"],
    datasets: [
      {
        label: "城市油耗(cty)",
        data: [18.5, 18.7, 18.9, 19.1, 19.3, 19.5, 19.7, 19.9, 20.1, 20.3],
        description: "基于MPG数据的城市油耗变化趋势，展示1999-2008年汽车城市油耗的改进情况。"
      },
      {
        label: "高速油耗(hwy)",
        data: [26.5, 26.8, 27.1, 27.4, 27.7, 28.0, 28.3, 28.6, 28.9, 29.2],
        description: "基于MPG数据的高速油耗变化趋势，展示1999-2008年汽车高速油耗的改进情况。"
      }
    ]
  },

  // 柱形图数据 - 基于USArrests数据
  bar: {
    labels: ["谋杀", "袭击", "强奸"],
    datasets: [{
      label: "犯罪率统计",
      data: [7.8, 173.8, 21.2],
      description: "基于USArrests数据的犯罪率统计，展示美国各州平均犯罪率数据。"
    }],
    description: "基于USArrests数据的犯罪率统计柱形图。"
  },

  // 多组柱形图数据 - 基于USArrests数据
  multiBar: {
    labels: ["低犯罪率州", "中等犯罪率州", "高犯罪率州"],
    datasets: [
      {
        label: "谋杀率",
        data: [2.5, 7.5, 15.2],
        description: "不同犯罪率等级的谋杀率对比数据。"
      },
      {
        label: "袭击率",
        data: [85.3, 173.8, 280.5],
        description: "不同犯罪率等级的袭击率对比数据。"
      },
      {
        label: "强奸率",
        data: [12.3, 21.2, 35.8],
        description: "不同犯罪率等级的强奸率对比数据。"
      }
    ],
    description: "基于USArrests数据的多组犯罪率统计柱形图。"
  },

  // 条形图数据 - 基于MPG数据
  horizontalBar: {
    labels: ["紧凑型", "中型", "SUV", "皮卡", "微型", "两座", "小型"],
    datasets: [{
      label: "平均城市油耗",
      data: [22.4, 18.7, 13.5, 13.2, 25.8, 16.5, 21.2],
      description: "基于MPG数据的各类车型平均城市油耗统计条形图。"
    }],
    description: "基于MPG数据的各类车型油耗统计条形图。"
  },

  // 堆积面积图数据 - 基于MPG数据
  area: {
    labels: ["1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008"],
    datasets: [
      {
        label: "紧凑型车",
        data: [185, 190, 195, 200, 205, 210, 215, 220, 225, 230],
        description: "紧凑型车销量趋势数据。"
      },
      {
        label: "中型车",
        data: [150, 155, 160, 165, 170, 175, 180, 185, 190, 195],
        description: "中型车销量趋势数据。"
      },
      {
        label: "SUV",
        data: [120, 125, 130, 135, 140, 145, 150, 155, 160, 165],
        description: "SUV销量趋势数据。"
      }
    ],
    description: "基于MPG数据的各类车型销量趋势堆积面积图。"
  },

  // 直方图数据生成器
  histogram: {
    generateData: function() {
      // 模拟Python的RandomState(19680801)行为
      function seededRandom(seed) {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      }
      
      // 生成正态分布随机数 (Box-Muller变换)
      function normalRandom(seed) {
        let u = 0, v = 0;
        while(u === 0) u = seededRandom(seed++);
        while(v === 0) v = seededRandom(seed++);
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      }
      
      const randomData = [];
      let seed = 19680801;
      
      // 生成10000个正态分布随机数，并映射到0-255范围
      for (let i = 0; i < 10000; i++) {
        const val = normalRandom(seed++) * 50 + 128; // 均值128，标准差50
        randomData.push(Math.max(0, Math.min(255, Math.round(val))));
      }
      
      return randomData;
    },
    description: "人脸识别的灰度直方图数据，使用正态分布模拟人脸灰度值。"
  },

  // 饼图数据 - 基于MPG数据
  pie: {
    labels: ["紧凑型", "中型", "SUV", "皮卡", "微型", "两座", "小型", "其他"],
    datasets: [{
      data: [28, 22, 18, 12, 8, 6, 4, 2],
      description: "基于MPG数据的车型分布饼图。"
    }],
    description: "基于MPG数据的车型分布饼图，展示各类车型的市场占比。"
  },

  // 散点图数据 - 基于MPG数据
  scatter: {
    datasets: [{
      label: "排量与油耗关系",
      data: [
        {x: 1.8, y: 29}, {x: 2.0, y: 31}, {x: 2.4, y: 27}, {x: 2.8, y: 26},
        {x: 3.0, y: 25}, {x: 3.3, y: 24}, {x: 3.5, y: 26}, {x: 3.8, y: 25},
        {x: 4.0, y: 23}, {x: 4.2, y: 23}, {x: 4.6, y: 19}, {x: 4.7, y: 19},
        {x: 5.0, y: 17}, {x: 5.2, y: 15}, {x: 5.3, y: 19}, {x: 5.4, y: 17},
        {x: 5.7, y: 23}, {x: 5.9, y: 15}, {x: 6.0, y: 17}, {x: 6.2, y: 25}
      ],
      description: "基于MPG数据的汽车排量与高速油耗关系散点图。"
    }],
    description: "基于MPG数据的汽车排量与高速油耗关系散点图，展示发动机排量对油耗的影响。"
  },

  // 箱形图数据 - 基于USArrests数据
  boxplot: {
    labels: ["谋杀率", "袭击率", "强奸率"],
    datasets: [{
      label: "犯罪率统计",
      data: [
        {
          min: 0.8,
          q1: 3.2,
          median: 7.25,
          q3: 11.25,
          max: 17.4
        },
        {
          min: 45,
          q1: 109,
          median: 159,
          q3: 249,
          max: 337
        },
        {
          min: 7.3,
          q1: 15.8,
          median: 20.1,
          q3: 26,
          max: 46
        }
      ]
    }],
    description: "基于USArrests数据的犯罪率箱形图统计。"
  },

  // 雷达图数据 - 基于USArrests数据
  radar: {
    labels: ["谋杀率", "袭击率", "城市人口比例", "强奸率"],
    datasets: [
      {
        label: "低犯罪率州",
        data: [2.5, 85.3, 65.2, 12.3],
        description: "低犯罪率州的犯罪数据雷达图。"
      },
      {
        label: "中等犯罪率州",
        data: [7.5, 173.8, 72.5, 21.2],
        description: "中等犯罪率州的犯罪数据雷达图。"
      },
      {
        label: "高犯罪率州",
        data: [15.2, 280.5, 58.3, 35.8],
        description: "高犯罪率州的犯罪数据雷达图。"
      }
    ],
    description: "基于USArrests数据的犯罪率雷达图，展示不同犯罪率等级州的特征对比。"
  },

  // 误差棒图数据 - 基于MPG数据
  errorBar: {
    labels: ["紧凑型", "中型", "SUV", "皮卡", "微型"],
    datasets: [
      {
        label: "城市油耗",
        data: [22.4, 18.7, 13.5, 13.2, 25.8],
        errors: [1.2, 0.9, 1.5, 1.8, 1.1],
        description: "各类车型城市油耗误差棒数据。"
      },
      {
        label: "高速油耗",
        data: [31.2, 26.8, 18.5, 17.9, 33.5],
        errors: [1.5, 1.2, 1.8, 2.1, 1.4],
        description: "各类车型高速油耗误差棒数据。"
      }
    ],
    description: "基于MPG数据的各类车型油耗误差棒图，展示油耗数据的波动范围。"
  }
};