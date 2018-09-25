# simplest-screenshot
最简单的网页截图工具   
`puppeteer`

# 安装说明

## 本地
> 执行 npm install

## 服务器
目前支持centos7以上   

> 执行 npm install  
> 由于服务器下载chrome极慢 这里手动上传[chrome-linux](https://drive.google.com/open?id=1jfhnVCKvAXr7hoB7Cep-d0QL4BVa1nBb)至服务器解压  
> (需在ScreentshotLinux.js文件中显示指定chrome位置 executablePath)

另需安装chrome依赖和字体依赖
```bash
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y

yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y
```
如果发现有汉字显示不完整 执行所有字体安装
```bash
yum groupinstall "Font"
```

# 使用
-u 需要截取的网址  
-s 需要截取的dom  
-p 图片保存的路径  

```bash
node ScreentshotLocal.js  -u 'https://github.com/pioneerzcy/simplest-screenshot' -s 'body' -p '/tmp/screen.jpg'
```
