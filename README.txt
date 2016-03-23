从 file表单控件中获取文件路径：
<input type="file" id="upload" name="upload" />

document.getElementById('upload').onchange = function () {
    console.log(this.value);
};

使用form表单上传二进制文件：
<form method="post" action="" enctype="multipart/form-data"></form>
上传二进制数据必须设置属性：enctype="multipart/form-data"
上传多个文件需要设置HTML5的属性
<form method="post" action="" multiple enctype="multipart/form-data"></form>

得到文件对象：
<input type="file" id="upload" name="upload" />
var upload = document.getElementById('upload');
upload.files[0] ：表示第0个文件

如何让form表单提交数据不发生跳转：
思路是：使用form表单的target属性，target属性表示表单提交跳转的页面，
将target设置为当前页面一个隐藏的iframe，就可以使form表单提交数据不发生跳转
<iframe name="fileUpload" style="display:none"></iframe>
<form name="upload" target="fileUpload" action="" enctype="multipart/form-data"></form>

使用HTML5 API提交数据：
文件读取器：FileReader FormData

<input type="file" id="upload" name="upload" />

var upload = document.getElementById('upload');
upload.onchange = function () {
    var fd = new FileReader();
    var file = this.files[0];
    fd.readAsDataURL(file);

    fd.onload = function () {
    // result的内容就是文件的base64编码内容，可以用来作图片的本地预览，把result的内容赋值给image元素的src属性，就可以做到图片本地预览了
        console.log(this.result);
    }
};

FormData：
var fd = new FormData(upload);
fd.append("upload", upload.files[0]);
$.ajax({
  url: "",
  type: "POST",
  data: fd,
  processData: false,  // 告诉jQuery不要去处理发送的数据
  contentType: false   // 告诉jQuery不要去设置Content-Type请求头
});

还有其他有关于Flash的文件上传插件：swfupload（比较有名的，不过H5出来后，Flash马上就退出江湖了）

后端文件上传处理：
Java：common-fileupload.jar
nodejs：formidable模块 multer模块

622848 0018650985874
18301553106

删除操作的处理：
1：如果当前的li只有一个，则不允许删除
2：如果当前的li有多个，但是当前这个是打对勾的，让li列表中的第一个为对勾，并让第一个选中

在文本框中，输入一个内容时
