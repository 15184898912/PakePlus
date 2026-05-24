window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 信达AI老照片修复大师 - 下载功能终极修复脚本
(function() {
    'use strict';

    // ==============================================
    // 1. 自动监听修复完成状态，图片加载后自动保存
    // ==============================================
    const observer = new MutationObserver(() => {
        // 监听修复完成的图片元素
        const resultImg = document.querySelector('img[src*="restore"], img[class*="result"], .preview img');
        if (resultImg && resultImg.src && !resultImg.dataset.downloaded) {
            console.log('✅ 检测到修复完成的图片，自动触发下载');
            resultImg.dataset.downloaded = 'true';
            
            // 直接创建下载链接
            const a = document.createElement('a');
            a.href = resultImg.src;
            a.download = `修复照片_${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    });

    // 监听整个页面的DOM变化
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'class']
    });

    // ==============================================
    // 2. 强制拦截所有下载相关的按钮（扩大匹配范围）
    // ==============================================
    document.addEventListener('click', function(e) {
        // 匹配所有可能的下载按钮（包括div、span、自定义按钮）
        const target = e.target.closest('*');
        if (!target) return;

        const text = target.textContent.trim();
        const className = target.className || '';
        const id = target.id || '';

        // 匹配所有可能的关键词
        if (
            text.includes('下载') || text.includes('保存') || text.includes('导出') ||
            className.includes('download') || className.includes('save') || className.includes('export') ||
            id.includes('download') || id.includes('save') || id.includes('export')
        ) {
            e.preventDefault();
            e.stopPropagation();
            console.log('✅ 匹配到下载按钮，强制触发保存逻辑');

            // 方案1：直接获取页面中的修复图片
            const img = document.querySelector('img[src*="restore"], .preview img, .result img');
            if (img && img.src) {
                const a = document.createElement('a');
                a.href = img.src;
                a.download = `修复照片_${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                return;
            }

            // 方案2：用Canvas截图整个预览区域（兜底）
            const previewArea = document.querySelector('.preview-container, .result-area, .image-container');
            if (previewArea) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const rect = previewArea.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
                ctx.drawImage(previewArea, 0, 0, rect.width, rect.height);
                const url = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = url;
                a.download = `修复照片_${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                return;
            }

            // 方案3：模拟Ctrl+S快捷键（终极兜底）
            const event = new KeyboardEvent('keydown', {
                key: 's',
                ctrlKey: true,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(event);
        }
    }, true);

    // ==============================================
    // 3. 重写Blob/URL下载逻辑
    // ==============================================
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = function(blob) {
        const url = originalCreateObjectURL.call(URL, blob);
        setTimeout(() => {
            const a = document.createElement('a');
            a.href = url;
            a.download = `修复照片_${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }, 100);
        return url;
    };

    console.log('✅ 终极修复脚本已加载，自动保存+按钮拦截+截图兜底三重方案已启用');
})();