/**
 * ECharts数据可视化交互平台 - 图表管理器
 * 使用ECharts实现十种数据可视化图表类型
 */

const EChartsManager = {
    // 当前图表实例
    currentChart: null,
    
    // 当前图表类型
    currentType: 'line',
    
    // 红绿色渐变主题颜色
    colorScheme: {
        primary: ['#90ee90', '#ff6b6b'],
        gradient: [
            '#90ee90', '#7cc47c', '#68b968', '#54ae54', '#40a340',
            '#ff6b6b', '#ff5252', '#ff3838', '#ff1f1f', '#ff0505'
        ],
        pastel: ['#e8f5e8', '#f8e8e8', '#d4f1d4', '#f4d4d4'],
        vibrant: ['#32cd32', '#dc143c', '#228b22', '#b22222']
    },
    
    // 初始化图表
    init: function(type = 'line') {
        this.currentType = type;
        const chartDom = document.getElementById('chart');
        this.currentChart = echarts.init(chartDom);
        this.createChart();
        this.updateChartInfo();
        
        // 绑定窗口大小变化事件
        window.addEventListener('resize', () => {
            this.currentChart.resize();
        });
    },
    
    // 创建图表
    createChart: function() {
        const option = this.getChartOption(this.currentType);
        this.currentChart.setOption(option, true);
        
        // 添加鼠标悬停效果
        this.currentChart.on('mouseover', (params) => {
            this.showTooltip(params);
        });
        
        this.currentChart.on('mouseout', () => {
            this.hideTooltip();
        });
    },
    
    // 获取图表配置选项
    getChartOption: function(type) {
        const baseOption = {
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicOut',
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(144, 238, 144, 0.9)',
                borderColor: '#ff6b6b',
                borderWidth: 2,
                textStyle: {
                    color: '#2c3e50'
                },
                axisPointer: {
                    type: 'shadow',
                    shadowStyle: {
                        color: 'rgba(255, 107, 107, 0.1)'
                    }
                }
            },
            legend: {
                show: true,
                textStyle: {
                    color: '#2c3e50'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            }
        };
        
        switch(type) {
            case 'line':
                return this.getLineChartOption(baseOption);
            case 'bar':
                return this.getBarChartOption(baseOption);
            case 'horizontalBar':
                return this.getHorizontalBarChartOption(baseOption);
            case 'area':
                return this.getAreaChartOption(baseOption);
            case 'histogram':
                return this.getHistogramChartOption(baseOption);
            case 'pie':
                return this.getPieChartOption(baseOption);
            case 'scatter':
                return this.getScatterChartOption(baseOption);
            case 'boxplot':
                return this.getBoxPlotChartOption(baseOption);
            case 'radar':
                return this.getRadarChartOption(baseOption);
            case 'errorBar':
                return this.getErrorBarChartOption(baseOption);
            default:
                return this.getLineChartOption(baseOption);
        }
    },
    
    // 折线图配置
    getLineChartOption: function(baseOption) {
        const data = chartData.line;
        return {
            ...baseOption,
            title: {
                text: '温度变化趋势',
                left: 'center',
                textStyle: {
                    color: '#2c3e50'
                }
            },
            xAxis: {
                type: 'category',
                data: data.labels,
                axisLine: {
                    lineStyle: {
                        color: '#90ee90'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#ff6b6b'
                    }
                }
            },
            series: data.datasets.map((dataset, index) => ({
                name: dataset.label,
                type: 'line',
                data: dataset.data,
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: this.colorScheme.gradient[index * 2]
                },
                itemStyle: {
                    color: this.colorScheme.gradient[index * 2 + 1]
                },
                areaStyle: index === 0 ? {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(144, 238, 144, 0.3)' },
                        { offset: 1, color: 'rgba(255, 107, 107, 0.1)' }
                    ])
                } : null
            }))
        };
    },
    
    // 柱形图配置
    getBarChartOption: function(baseOption) {
        const data = chartData.bar;
        return {
            ...baseOption,
            title: {
                text: 'GMV数据统计',
                left: 'center',
                textStyle: {
                    color: '#2c3e50'
                }
            },
            xAxis: {
                type: 'category',
                data: data.labels,
                axisLine: {
                    lineStyle: {
                        color: '#90ee90'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#ff6b6b'
                    }
                }
            },
            series: [{
                name: data.datasets[0].label,
                type: 'bar',
                data: data.datasets[0].data,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#90ee90' },
                        { offset: 1, color: '#ff6b6b' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#7cc47c' },
                            { offset: 1, color: '#ff5252' }
                        ])
                    }
                }
            }]
        };
    },
    
    // 条形图配置
    getHorizontalBarChartOption: function(baseOption) {
        const data = chartData.horizontalBar;
        return {
            ...baseOption,
            title: {
                text: '网购替代率统计',
                left: 'center',
                textStyle: {
                    color: '#2c3e50'
                }
            },
            xAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#ff6b6b'
                    }
                }
            },
            yAxis: {
                type: 'category',
                data: data.labels,
                axisLine: {
                    lineStyle: {
                        color: '#90ee90'
                    }
                }
            },
            series: [{
                name: data.datasets[0].label,
                type: 'bar',
                data: data.datasets[0].data,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: '#90ee90' },
                        { offset: 1, color: '#ff6b6b' }
                    ])
                }
            }]
        };
    },
    
    // 面积图配置
    getAreaChartOption: function(baseOption) {
        const data = chartData.area;
        return {
            ...baseOption,
            title: {
                text: '物流费用统计',
                left: 'center',
                textStyle: {
                    color: '#2c3e50'
                }
            },
            xAxis: {
                type: 'category',
                data: data.labels,
                axisLine: {
                    lineStyle: {
                        color: '#90ee90'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#ff6b6b'
                    }
                }
            },
            series: data.datasets.map((dataset, index) => ({
                name: dataset.label,
                type: 'line',
                data: dataset.data,
                smooth: true,
                stack: '总量',
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: this.colorScheme.gradient[index * 3] },
                        { offset: 1, color: this.colorScheme.gradient[index * 3 + 6] }
                    ])
                },
                lineStyle: {
                    width: 2
                }
            }))
        };
    },
    
    // 直方图配置
    getHistogramChartOption: function(baseOption) {
        const rawData = chartData.histogram.generateData();
        const binCount = 20;
        const min = Math.min(...rawData);
        const max = Math.max(...rawData);
        const binSize = (max - min) / binCount;
        
        const bins = Array(binCount).fill(0);
        rawData.forEach(value => {
            const binIndex = Math.min(Math.floor((value - min) / binSize), binCount - 1);
            bins[binIndex]++;
        });
        
        const binLabels = Array(binCount).fill(0).map((_, i) => {
            return Math.round(min + i * binSize);
        });
        
        return {
            ...baseOption,
            title: {
                text: '人脸识别灰度直方图',
                left: 'center',
                textStyle: {
                    color: '#2c3e50'
                }
            },
            xAxis: {
                type: 'category',
                data: binLabels,
                name: '灰度值',
                axisLine: {
                    lineStyle: {
                        color: '#90ee90'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '频率',
                axisLine: {
                    lineStyle: {
                        color: '#ff6b6b'
                    }
                }
            },
            series: [{
                name: '频率分布',
                type: 'bar',
                data: bins,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#90ee90' },
                        { offset: 1, color: '#ff6b6b' }
                    ])
                }
            }]
        };
    },
    
    // 饼图配置
    getPieChartOption: function(baseOption) {
        const data = chartData.pie;
        return {
            ...baseOption,
            title: {
                text: '支付宝月账单分布',
                left: 'center',
                textStyle: {
                    color: '#2c3e50'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}元 ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [{
                name: data.datasets[0].label || '消费类别',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 18,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data.labels.map((label, index) => ({
                    name: label,
                    value: data.datasets[0].data[index],
                    itemStyle: {
                        color: this.colorScheme.gradient[index % this.colorScheme.gradient.length]
                    }
                }))
            }]
        };
    },
    
    // 散点图配置
    getScatterChartOption: function(baseOption) {
        const data = chartData.scatter;
        return {
            ...baseOption,
            title: {
                text: '汽车速度与制动距离关系',
                left: 'center',
                textStyle: {
                    color: '#2c3e50'
                }
            },
            xAxis: {
                type: 'value',
                name: '速度 (km/h)',
                axisLine: {
                    lineStyle: {
                        color: '#90ee90'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '制动距离 (m)',
                axisLine: {
                    lineStyle: {
                        color: '#ff6b6b'
                    }
                }
            },
            series: [{
                name: data.datasets[0].label,
                type: 'scatter',
                data: data.datasets[0].data.map(item => [item.x, item.y]),
                symbolSize: 12,
                itemStyle: {
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                        { offset: 0, color: '#90ee90' },
                        { offset: 1, color: '#ff6b6b' }
                    ])
                },
                emphasis: {
                    scale: true,
                    scaleSize: 15
                }
            }]
        };
    },
    
    // 箱形图配置
    getBoxPlotChartOption: function(baseOption) {
        const data = chartData.boxplot;
        const seriesData = data.datasets[0].data.map((item, index) => [
            item.min, item.q1, item.median, item.q3, item.max
        ]);
        
        return {
            ...baseOption,
            title: {
                text: '发电量统计数据',
                left: 'center',
                textStyle: {
                    color: '#2c3e50'
                }
            },
            xAxis: {
                type: 'category',
                data: data.labels,
                axisLine: {
                    lineStyle: {
                        color: '#90ee90'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '发电量 (亿千瓦时)',
                axisLine: {
                    lineStyle: {
                        color: '#ff6b6b'
                    }
                }
            },
            series: [{
                name: data.datasets[0].label,
                type: 'boxplot',
                data: seriesData,
                itemStyle: {
                    color: '#90ee90',
                    borderColor: '#ff6b6b'
                }
            }]
        };
    },
    
    // 雷达图配置
    getRadarChartOption: function(baseOption) {
        const data = chartData.radar;
        return {
            ...baseOption,
            title: {
                text: '霍兰德职业兴趣测试',
                left: 'center',
                textStyle: {
                    color: '#2c3e50'
                }
            },
            radar: {
                indicator: data.labels.map(label => ({ name: label, max: 1 })),
                shape: 'polygon',
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(144, 238, 144, 0.1)', 'rgba(255, 107, 107, 0.1)']
                    }
                }
            },
            series: [{
                name: '测试结果',
                type: 'radar',
                data: data.datasets.map(dataset => ({
                    name: dataset.label,
                    value: dataset.data,
                    areaStyle: {
                        color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                            { offset: 0, color: 'rgba(144, 238, 144, 0.3)' },
                            { offset: 1, color: 'rgba(255, 107, 107, 0.1)' }
                        ])
                    },
                    lineStyle: {
                        width: 2
                    }
                }))
            }]
        };
    },
    
    // 误差棒图配置
    getErrorBarChartOption: function(baseOption) {
        const data = chartData.errorBar;
        return {
            ...baseOption,
            title: {
                text: '树种细根生物量数据',
                left: 'center',
                textStyle: {
                    color: '#2c3e50'
                }
            },
            xAxis: {
                type: 'category',
                data: data.labels,
                axisLine: {
                    lineStyle: {
                        color: '#90ee90'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '生物量 (g)',
                axisLine: {
                    lineStyle: {
                        color: '#ff6b6b'
                    }
                }
            },
            series: data.datasets.map((dataset, index) => ({
                name: dataset.label,
                type: 'scatter',
                data: dataset.data.map((value, i) => ({
                    value: value,
                    itemStyle: {
                        color: this.colorScheme.gradient[index * 2]
                    }
                })),
                markPoint: {
                    data: dataset.data.map((value, i) => ({
                        name: '误差范围',
                        value: value,
                        xAxis: i,
                        yAxis: value,
                        symbol: 'pin',
                        symbolSize: [30, 40],
                        itemStyle: {
                            color: this.colorScheme.gradient[index * 2 + 1]
                        }
                    }))
                }
            }))
        };
    },
    
    // 显示工具提示
    showTooltip: function(params) {
        // 在实际应用中，这里可以显示自定义的工具提示
        console.log('鼠标悬停数据:', params);
    },
    
    // 隐藏工具提示
    hideTooltip: function() {
        // 隐藏自定义工具提示
    },
    
    // 更新图表信息
    updateChartInfo: function() {
        const data = chartData[this.currentType];
        document.getElementById('chart-title').textContent = this.getChartTitle(this.currentType);
        document.getElementById('chart-desc').textContent = data.description;
    },
    
    // 获取图表标题
    getChartTitle: function(type) {
        const titles = {
            line: '温度变化趋势',
            bar: 'GMV数据统计',
            horizontalBar: '网购替代率统计',
            area: '物流费用统计',
            histogram: '人脸识别灰度直方图',
            pie: '支付宝月账单分布',
            scatter: '汽车速度与制动距离关系',
            boxplot: '发电量统计数据',
            radar: '霍兰德职业兴趣测试',
            errorBar: '树种细根生物量数据'
        };
        return titles[type] || '数据可视化图表';
    },
    
    // 切换数据集
    toggleDataset: function() {
        // 实现数据集切换逻辑
        this.createChart();
    },
    
    // 下载图表
    downloadChart: function() {
        const url = this.currentChart.getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: '#fff'
        });
        const link = document.createElement('a');
        link.href = url;
        link.download = `chart-${this.currentType}-${new Date().getTime()}.png`;
        link.click();
    },
    
    // 全屏显示
    fullscreen: function() {
        const chartContainer = document.getElementById('chart-container');
        if (!document.fullscreenElement) {
            chartContainer.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    },
    
    // 应用选项设置
    applyOptions: function() {
        this.createChart();
    }
};