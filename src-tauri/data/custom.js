window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>打包测试应用</title>
    <style>
        *{margin: 0;padding: 0;box-sizing: border-box;}
        body{padding: 30px;text-align: center;}
        .save-btn{
            padding: 10px 25px;
            font-size: 16px;
            cursor: pointer;
            background: #2488ff;
            color: #fff;
            border: none;
            border-radius: 6px;
            margin-bottom: 30px;
        }
        .img-box img{
            max-width: 300px;
            border-radius: 8px;
        }
        /* 自定义弹窗样式 */
        .modal{
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        }
        .modal-content{
            width: 300px;
            background: #fff;
            margin: 150px auto;
            padding: 25px;
            border-radius: 8px;
        }
        .modal-btn{
            margin: 10px 8px;
            padding: 6px 18px;
            cursor: pointer;
            border: none;
            border-radius: 4px;
        }
        .confirm{background: #2488ff;color:#fff;}
        .cancel{background: #eee;color:#333;}
    </style>
</head>
<body>
    <!-- 保存按钮 -->
    <button class="save-btn" onclick="openSaveModal()">点击保存</button>

    <!-- 测试图片 右键可保存 -->
    <div class="img-box">
        < img src="https://picsum.photos/300/200" alt="测试图片">
        <p style="margin-top:10px;color:#666;">右键图片即可另存为</p >
    </div>

    <!-- 保存弹窗 -->
    <div class="modal" id="saveModal">
        <div class="modal-content">
            <h3>确认保存文件</h3>
            <p style="margin:15px 0;color:#555;">是否确认执行保存操作？</p >
            <button class="modal-btn confirm" onclick="saveSuccess()">确认保存</button>
            <button class="modal-btn cancel" onclick="closeSaveModal()">取消</button>
        </div>
    </div>

<script>
    // 打开保存弹窗
    function openSaveModal(){
        document.getElementById('saveModal').style.display = 'block';
    }
    // 关闭弹窗
    function closeSaveModal(){
        document.getElementById('saveModal').style.display = 'none';
    }
    // 保存成功逻辑
    function saveSuccess(){
        closeSaveModal();
        alert('文件保存成功！');
    }
</script>
</body>
</html>