window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 信达AI老照片修复大师 - 下载功能终极修复脚本
(function() {
    'use strict';

    // 1. 自动监听修复完成状态，图片加载后自动保存
    const observer = new MutationObserver(() => {
        const resultImg = document.querySelector('img[src*="restore"], img[class*="result"], .preview img');
        if (resultImg && resultImg.src && !resultImg.dataset.downloaded) {
            resultImg.dataset.downloaded = 'true';
            const a = document.createElement('a');
            a.href = resultImg.src;
            a.download = `修复照片_${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'class']
    });

    // 2. 强制拦截所有下载相关的按钮
    document.addEventListener('click', function(e) {
        const target = e.target.closest('*');
        if (!target) return;

        const text = target.textContent.trim();
        if (text.includes('下载') || text.includes('保存') || text.includes('导出')) {
            e.preventDefault();
            e.stopPropagation();

            // 直接获取页面中的修复图片
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

            // 兜底：用Canvas截图预览区域
            const previewArea = document.querySelector('.preview-container, .result-area');
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
        }
    }, true);

    // 3. 重写Blob/URL下载逻辑
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
})();