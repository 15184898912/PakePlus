window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 修复PakePlus打包后，网页下载/保存文件按钮失效问题
(function() {
    'use strict';

    // 1. 强制拦截所有下载请求，绕过沙箱限制
    document.addEventListener('click', function(e) {
        const target = e.target.closest('button, a, [role="button"]');
        if (!target) return;

        const btnText = target.textContent.trim();
        const href = target.href || '';

        // 匹配"下载修复照片"、"下载"、"保存"等按钮
        if (btnText.includes('下载') || btnText.includes('保存')) {
            e.preventDefault();
            e.stopPropagation();

            // 情况A：如果是Blob/图片类型的下载链接
            if (href.startsWith('blob:') || href.startsWith('data:image/')) {
                const a = document.createElement('a');
                a.href = href;
                // 设置默认文件名，避免乱码
                a.download = `修复照片_${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                return;
            }

            // 情况B：通用兜底方案，强制打开新窗口触发下载
            if (href) {
                const newWin = window.open(href, '_blank');
                if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
                    // 被拦截时，用iframe方案兜底
                    const iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    iframe.src = href;
                    document.body.appendChild(iframe);
                    setTimeout(() => iframe.remove(), 3000);
                }
            }
        }
    }, true);

    // 2. 强制重写URL.createObjectURL，避免Blob下载被拦截
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = function(blob) {
        const url = originalCreateObjectURL.call(URL, blob);
        
        // 自动触发下载
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

    // 3. 修复window.open弹窗拦截（部分下载逻辑依赖新窗口）
    const originalOpen = window.open;
    window.open = function(url, name, specs) {
        if (url && (url.includes('download') || url.includes('save') || url.includes('export'))) {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url;
            iframe.onload = function() {
                const a = document.createElement('a');
                a.href = url;
                a.download = `修复照片_${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                setTimeout(() => iframe.remove(), 1000);
            };
            document.body.appendChild(iframe);
            return null;
        }
        return originalOpen.call(this, url, name, specs);
    };

    console.log('✅ 下载/保存功能修复脚本已加载完成');
})();