window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 信达AI老照片修复大师 - 下载按钮专属修复脚本
(function() {
    'use strict';

    console.log('🚀 老照片修复下载专属脚本已启动');

    // 1. 强制监听所有可能触发下载的操作（包括非标准按钮）
    document.addEventListener('click', function(e) {
        // 扩大匹配范围，包含所有可能的父元素
        const target = e.target.closest('button, [role="button"], div[class*="download"], div[class*="btn"]');
        if (!target) return;

        const text = target.textContent.trim();
        console.log('🖱️ 点击了元素:', text, target);

        // 精准匹配"下载修复照片"按钮
        if (text.includes('下载修复照片') || text.includes('下载')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('✅ 匹配到下载按钮，强制触发下载逻辑');

            // 方案1：直接获取当前图片并下载
            const img = document.querySelector('img[src*="cloud"], img[src*="restore"], img[alt*="修复"], .result-image img');
            if (img && img.src) {
                console.log('📸 找到修复图片:', img.src);
                const a = document.createElement('a');
                a.href = img.src;
                a.download = `修复照片_${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                console.log('✅ 已触发图片下载');
                return;
            }

            // 方案2：兜底 - 截取页面中显示的修复图片
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const displayImg = document.querySelector('.result-image, .preview-container');
            if (displayImg) {
                const rect = displayImg.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
                ctx.drawImage(displayImg, 0, 0, rect.width, rect.height);
                const url = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = url;
                a.download = `修复照片_${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                console.log('✅ 已通过canvas截图方式触发下载');
                return;
            }

            // 方案3：快捷键兜底 - 直接唤起浏览器保存
            setTimeout(() => {
                const event = new KeyboardEvent('keydown', {
                    key: 's',
                    ctrlKey: true,
                    bubbles: true,
                    cancelable: true
                });
                document.dispatchEvent(event);
                console.log('✅ 已模拟Ctrl+S保存快捷键');
            }, 100);
        }
    }, true);

    // 2. 重写Blob/URL下载逻辑
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = function(blob) {
        const url = originalCreateObjectURL.call(URL, blob);
        console.log('📦 捕获Blob下载链接:', url);
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

    // 3. 强制启用打印功能（兼容之前的需求）
    if (typeof window.print !== 'function') {
        window.print = function() {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.srcdoc = document.documentElement.outerHTML;
            iframe.onload = () => {
                iframe.contentWindow.print();
                setTimeout(() => iframe.remove(), 1000);
            };
            document.body.appendChild(iframe);
        };
    }

    console.log('✅ 老照片修复下载专属脚本加载完成');
})();