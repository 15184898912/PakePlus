window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// ==============================================
// PakePlus/Tauri 通用功能修复脚本
// 功能：解决 下载/保存/打印/弹窗 失效问题
// 适用：证件大师、上色工具、老照片修复等所有网页应用
// ==============================================
(function() {
    'use strict';

    console.log('🚀 通用修复脚本已启动');

    // ==============================================
    // 一、核心下载/保存功能修复
    // ==============================================
    // 1. 重写URL.createObjectURL，强制触发下载
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = function(blob) {
        const url = originalCreateObjectURL.call(URL, blob);
        console.log('📦 捕获Blob下载链接:', url);

        // 自动触发下载
        setTimeout(() => {
            const a = document.createElement('a');
            a.href = url;
            a.download = `download_${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            console.log('✅ 已触发Blob文件下载');
        }, 100);

        return url;
    };

    // 2. 拦截所有下载/保存按钮点击
    document.addEventListener('click', function(e) {
        const target = e.target.closest('button, a, [role="button"]');
        if (!target) return;

        const btnText = target.textContent.trim();
        const href = target.href || '';
        console.log('🖱️ 点击按钮:', btnText);

        // 匹配所有下载/保存/导出/打印相关按钮
        const downloadKeywords = ['下载', '保存', '导出', '另存', '保存图片', '下载修复', '批量导出'];
        const printKeywords = ['打印', '打印排版', '打印预览'];

        const isDownloadBtn = downloadKeywords.some(key => btnText.includes(key));
        const isPrintBtn = printKeywords.some(key => btnText.includes(key));

        if (isDownloadBtn) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔧 触发下载修复逻辑');

            // 情况A：Blob或图片链接
            if (href.startsWith('blob:') || href.startsWith('data:image/')) {
                const a = document.createElement('a');
                a.href = href;
                a.download = `file_${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                console.log('✅ 已触发图片/Blob下载');
                return;
            }

            // 情况B：通用链接
            if (href) {
                try {
                    window.open(href, '_blank');
                } catch (err) {
                    console.log('⚠️ 新窗口被拦截，使用iframe兜底');
                    const iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    iframe.src = href;
                    document.body.appendChild(iframe);
                    setTimeout(() => iframe.remove(), 3000);
                }
            }
        }

        if (isPrintBtn) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔧 触发打印修复逻辑');
            setTimeout(() => window.print(), 100);
        }
    }, true);

    // ==============================================
    // 二、打印功能强制修复
    // ==============================================
    if (typeof window.print !== 'function') {
        console.log('🖨️ 修复window.print() API');
        window.print = function() {
            // 方案1：调用原生打印
            if (document.execCommand && document.execCommand('print', false, null)) {
                console.log('✅ 原生打印命令已执行');
                return;
            }

            // 方案2：iframe兜底打印
            console.log('⚠️ 使用iframe兜底打印方案');
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.srcdoc = document.documentElement.outerHTML;
            iframe.onload = function() {
                iframe.contentWindow.print();
                setTimeout(() => iframe.remove(), 1000);
                console.log('✅ iframe打印已触发');
            };
            document.body.appendChild(iframe);
        };
    }

    // ==============================================
    // 三、弹窗/新窗口拦截修复
    // ==============================================
    const originalOpen = window.open;
    window.open = function(url, name, specs) {
        console.log('🔓 捕获window.open请求:', url);

        // 下载/打印相关弹窗，强制处理
        if (url && (
            url.includes('download') || url.includes('save') || 
            url.includes('print') || url.includes('preview') ||
            url.includes('export')
        )) {
            console.log('🔧 触发弹窗修复逻辑');
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url;
            iframe.onload = function() {
                if (url.includes('print') || url.includes('preview')) {
                    iframe.contentWindow.print();
                } else {
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `file_${Date.now()}.png`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                }
                setTimeout(() => iframe.remove(), 1000);
            };
            document.body.appendChild(iframe);
            return null;
        }

        // 其他弹窗按原逻辑处理
        return originalOpen.call(this, url, name, specs);
    };

    console.log('✅ 通用修复脚本加载完成，下载/保存/打印/弹窗功能已启用');
})();