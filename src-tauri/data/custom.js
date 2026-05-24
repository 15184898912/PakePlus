window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 1. 强制启用window.print()功能
if (!window.print) {
    window.print = () => {
        // 调用系统打印对话框
        document.execCommand('print', false, null);
    };
}

// 2. 拦截打印按钮的点击事件，绕过默认逻辑
document.addEventListener('click', (e) => {
    const target = e.target.closest('button:contains("打印排版图")');
    if (target) {
        e.preventDefault();
        e.stopPropagation();
        // 直接触发打印
        setTimeout(() => window.print(), 100);
    }
}, true);

// 3. 允许弹出新窗口（部分打印逻辑依赖新窗口）
window.open = function(url) {
    const newWin = window.open(url, '_blank');
    if (!newWin) {
        // 如果被拦截，直接在当前窗口加载并打印
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        iframe.onload = () => {
            iframe.contentWindow.print();
        };
        document.body.appendChild(iframe);
    }
    return newWin;
};