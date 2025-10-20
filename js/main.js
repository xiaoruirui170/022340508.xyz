/**
 * ECharts数据可视化交互平台 - 主JavaScript文件
 * 负责初始化和事件绑定
 */

// 当文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化图表
    EChartsManager.init('line');
    
    // 设置切换数据集按钮的初始状态
    document.getElementById('toggle-data').dataset.multiBar = 'false';
    document.getElementById('toggle-data').dataset.donut = 'false';
    
    // 绑定导航菜单点击事件
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            navLinks.forEach(item => item.classList.remove('active'));
            
            // 设置当前项为活动状态
            this.classList.add('active');
            
            // 获取图表类型
            const chartType = this.dataset.chart;
            
            // 切换图表类型
            EChartsManager.init(chartType);
            
            // 确保DOM完全更新后再设置选择器值
            setTimeout(() => {
                const typeSelector = document.getElementById('chart-type');
                if (typeSelector) {
                    typeSelector.value = chartType;
                    // 触发change事件以确保所有相关处理程序执行
                    typeSelector.dispatchEvent(new Event('change'));
                }
            }, 0);
            
            // 更新切换数据集按钮文本
            const toggleBtn = document.getElementById('toggle-data');
            if (chartType === 'bar') {
                toggleBtn.textContent = '切换到多组数据';
                toggleBtn.disabled = false;
                toggleBtn.dataset.multiBar = toggleBtn.dataset.multiBar === 'true' ? 'false' : 'true';
            } else if (chartType === 'pie') {
                toggleBtn.textContent = '切换到环形图';
                toggleBtn.disabled = false;
                toggleBtn.dataset.donut = toggleBtn.dataset.donut === 'true' ? 'false' : 'true';
            } else {
                toggleBtn.textContent = '切换数据集';
                toggleBtn.disabled = true;
            }
        });
    });
    
    // 绑定切换数据集按钮点击事件
    document.getElementById('toggle-data').addEventListener('click', function() {
        EChartsManager.toggleDataset();
    });
    
    // 绑定下载图表按钮点击事件
    document.getElementById('download-chart').addEventListener('click', function() {
        EChartsManager.downloadChart();
    });
    
    // 绑定全屏按钮点击事件
    document.getElementById('fullscreen').addEventListener('click', function() {
        EChartsManager.fullscreen();
    });
    
    // 绑定编辑数据按钮点击事件
    document.getElementById('edit-data').addEventListener('click', function() {
        // 编辑数据功能
        alert('数据编辑功能将在后续版本中实现');
    });
    
    // 绑定应用更改按钮点击事件
    document.getElementById('apply-changes').addEventListener('click', function() {
        // 应用更改功能
        alert('数据更改功能将在后续版本中实现');
    });
    
    // 绑定重置数据按钮点击事件
    document.getElementById('reset-data').addEventListener('click', function() {
        // 重置数据功能
        alert('数据重置功能将在后续版本中实现');
    });
    
    // 绑定图表选项更改事件
    document.getElementById('chart-type').addEventListener('change', function() {
        const chartType = this.value;
        
        // 更新导航菜单活动状态
        navLinks.forEach(link => {
            if (link.dataset.chart === chartType) {
                // 移除所有活动状态
                navLinks.forEach(item => item.classList.remove('active'));
                // 设置当前项为活动状态
                link.classList.add('active');
                // 切换图表类型
                EChartsManager.init(chartType);
                
                // 更新切换数据集按钮文本
                const toggleBtn = document.getElementById('toggle-data');
                if (chartType === 'bar') {
                    toggleBtn.textContent = '切换到多组数据';
                    toggleBtn.disabled = false;
                    toggleBtn.dataset.multiBar = toggleBtn.dataset.multiBar === 'true' ? 'false' : 'true';
                } else if (chartType === 'pie') {
                    toggleBtn.textContent = '切换到环形图';
                    toggleBtn.disabled = false;
                    toggleBtn.dataset.donut = toggleBtn.dataset.donut === 'true' ? 'false' : 'true';
                } else {
                    toggleBtn.textContent = '切换数据集';
                    toggleBtn.disabled = true;
                }
            }
        });
    });
    
    document.getElementById('color-scheme').addEventListener('change', function() {
        EChartsManager.applyOptions();
    });
    
    document.getElementById('animation-speed').addEventListener('input', function() {
        EChartsManager.applyOptions();
    });
    
    document.getElementById('show-legend').addEventListener('change', function() {
        EChartsManager.applyOptions();
    });
    
    document.getElementById('show-grid').addEventListener('change', function() {
        EChartsManager.applyOptions();
    });
    
    document.getElementById('show-data-labels').addEventListener('change', function() {
        EChartsManager.applyOptions();
    });
    
    // 添加工具提示功能
    const chartWrapper = document.querySelector('.chart-wrapper');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.style.display = 'none';
    chartWrapper.appendChild(tooltip);
    
    chartWrapper.addEventListener('mousemove', function(e) {
        const rect = chartWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 在实际应用中，这里可以根据鼠标位置获取图表数据点信息
        // 这里只是简单示例
        tooltip.style.display = 'block';
        tooltip.style.left = (x + 10) + 'px';
        tooltip.style.top = (y + 10) + 'px';
    });
    
    chartWrapper.addEventListener('mouseout', function() {
        tooltip.style.display = 'none';
    });
    
    // 添加键盘快捷键支持
    document.addEventListener('keydown', function(e) {
        // Ctrl + S: 保存/下载图表
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            EChartsManager.downloadChart();
        }
        
        // Ctrl + E: 编辑数据
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            alert('数据编辑功能将在后续版本中实现');
        }
        
        // Ctrl + R: 重置数据
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            alert('数据重置功能将在后续版本中实现');
        }
        
        // F11: 全屏显示
        if (e.key === 'F11') {
            e.preventDefault();
            EChartsManager.fullscreen();
        }
    });
    
    // 添加响应式设计支持
    window.addEventListener('resize', function() {
        if (EChartsManager.currentChart) {
            EChartsManager.currentChart.resize();
        }
    });
    
    // 添加页面加载动画
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="spinner"></div><p>加载中...</p>';
    document.body.appendChild(loadingOverlay);
    
    // 模拟加载完成后隐藏加载动画
    setTimeout(function() {
        loadingOverlay.style.opacity = '0';
        setTimeout(function() {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 1000);
});