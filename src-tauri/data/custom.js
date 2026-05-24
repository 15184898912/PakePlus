window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 强制启用打印功能，修复"打印排版图"按钮灰色/失效问题
(function() {
    'use strict';

    // 1. 强制恢复window.print() 核心打印API
    if (typeof window.print !== 'function') {
        window.print = function() {
            // 调用系统原生打印对话框
            if (document.execCommand && document.execCommand('print', false, null)) {
                return;
            }
            // 备用方案：创建隐藏iframe触发打印
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.srcdoc = document.documentElement.outerHTML;
            iframe.onload = function() {
                iframe.contentWindow.print();
                setTimeout(() => iframe.remove(), 1000);
            };
            document.body.appendChild(iframe);
        };
    }

    // 2. 强制触发打印按钮的点击事件，绕过页面原生逻辑
    document.addEventListener('click', function(e) {
        const target = e.target.closest('button, [role="button"]');
        if (!target) return;

        // 匹配"打印排版图"按钮的文本
        const btnText = target.textContent.trim();
        if (btnText.includes('打印排版图')) {
            e.preventDefault();
            e.stopPropagation();
            // 延迟100ms触发打印，确保排版内容已加载
            setTimeout(() => window.print(), 100);
        }
    }, true);

    // 3. 修复window.open 弹窗拦截（部分打印逻辑依赖新窗口）
    const originalOpen = window.open;
    window.open = function(url, name, specs) {
        // 如果是打印相关的新窗口，直接在当前窗口处理
        if (url && (url.includes('print') || url.includes('preview'))) {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url;
            iframe.onload = function() {
                iframe.contentWindow.print();
                setTimeout(() => iframe.remove(), 1000);
            };
            document.body.appendChild(iframe);
            return null;
        }
        // 其他弹窗按原逻辑处理
        return originalOpen.call(this, url, name, specs);
    };

    console.log('✅ 打印功能修复脚本已加载完成');
})();