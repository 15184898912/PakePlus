window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 本地免登录
localStorage.setItem('coze_auto_login','true');
sessionStorage.setItem('user_info','{"id":1,"name":"本地用户","token":"local000000"}');

// 清除弹窗
function clearPop(){
  document.querySelectorAll('.modal,.login-dialog,.tips-popup,.upgrade-pop').forEach(e=>e.remove());
}
clearPop();
setInterval(clearPop,300);

// 禁止跳转
window.open=()=>null;
location.assign=()=>{};

// 离线伪装在线
Object.defineProperty(navigator,'onLine',{value:true});

// 拦截 coze 接口
const f=window.fetch;
window.fetch=u=>u.includes('coze.cn')
  ? Promise.resolve({ok:true,json:()=>({})})
  : f(u);

// 移除水印文字
document.querySelectorAll('*').forEach(e=>{
  if(/扣子|Coze|平台/.test(e.innerText))e.remove();
});