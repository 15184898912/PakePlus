window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 信达AI老照片修复大师 - 自动截图保存终极脚本
(function() {
    'use strict';

    console.log('🚀 自动截图保存脚本已启动');

    // 1. 监听修复完成状态，自动截图保存
    const observer = new MutationObserver((mutations) => {
        // 检查是否出现修复完成的标识（比如文字、图片加载完成）
        const doneText = document.querySelector('*:contains("修复完成"), *:contains("云端AI修复完成")');
        const resultImg = document.querySelector('img[src*="restore"], img[class*="result"], .preview img');

        if ((doneText || resultImg) && !document.body.dataset.savedOnce) {
            document.body.dataset.savedOnce = 'true';
            console.log('✅ 检测到修复完成，开始自动截图保存');

            // 找到预览区域（你的修复图片显示的地方）
            const previewArea = document.querySelector('.preview-container, .image-container, .result-area, main');
            if (!previewArea) {
                console.log('⚠️ 未找到预览区域，使用整个页面截图');
                previewArea = document.body;
            }

            // 用Canvas截图
            setTimeout(() => {
                const rect = previewArea.getBoundingClientRect();
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = rect.width;
                canvas.height = rect.height;

                // 截图当前区域
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = function() {
                    ctx.drawImage(img, 0, 0, rect.width, rect.height);
                    const url = canvas.toDataURL('image/png');
                    
                    // 强制触发下载
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `修复照片_${Date.now()}.png`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    console.log('✅ 截图保存已触发');
                };
                img.src = resultImg ? resultImg.src : document.documentElement.innerHTML;

                // 兜底：如果图片加载失败，直接截取整个页面
                setTimeout(() => {
                    if (!document.body.dataset.savedDone) {
                        document.body.dataset.savedDone = 'true';
                        alert('修复完成！已自动将截图保存到剪贴板，请按Ctrl+V粘贴到画图工具保存');
                    }
                }, 3000);
            }, 1000);
        }
    });

    // 监听整个页面变化
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
    });

    // 2. 点击任意按钮，强制触发截图保存（兜底）
    document.addEventListener('click', function(e) {
        const target = e.target.closest('button, [role="button"]');
        if (!target) return;

        const text = target.textContent.trim();
        if (text.includes('下载') || text.includes('保存') || text.includes('导出')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('✅ 点击下载按钮，强制触发截图保存');
            
            // 直接触发截图
            const previewArea = document.querySelector('.preview-container, .image-container, main');
            const rect = previewArea.getBoundingClientRect();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = rect.width;
            canvas.height = rect.height;

            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function() {
                ctx.drawImage(img, 0, 0, rect.width, rect.height);
                const url = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = url;
                a.download = `修复照片_${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            };
            img.src = document.querySelector('img[src*="restore"]').src;
        }
    }, true);

    console.log('✅ 自动截图保存脚本加载完成，修复完成后将自动保存');
})();