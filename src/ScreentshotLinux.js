const puppeteer = require('puppeteer');
const program = require('commander');

program.option('-u, --url [type]', 'url address')
    .option('-s, --selector [type]', 'selector')
    .option('-p, --path [type]', 'shot path')
    .parse(process.argv);

let url = '';
let selector = '';
let path = '';
if (program.url && program.path != true) {
    console.log(program.url);
    url = program.url;
} else {
    console.log("Please Input Url -u 'http://xxx'");
    process.exit();
}

if (program.selector && program.path != true) {
    console.log(program.selector);
    selector = program.selector;
} else {
    console.log("Please Input Selector -s 'x | .x | #x'");
    process.exit();
}

if (program.path && program.path != true) {
    console.log(program.path);
    path = program.path;
}
else {
    console.log("Please Input Path To Save -p '/tmp/x.jpg'");
    process.exit();
}

puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
    executablePath: '/tmp/chrome-linux/chrome'
}).then(async browser => {
    try {
        const page = await browser.newPage();
        await page.setViewport({width: 2560, height: 1000});
        console.log("加载网页...");
        await page.goto(url, {waitUntil: 'networkidle2'});
        await page.waitFor(selector);

        let table = await page.$(selector);
        if (!table) {
            console.log(selector + " 没有找到该元素");
            await browser.close();
            process.exit();
        }
        let viewport = page.viewport();
        let clip = await table.boundingBox();
        viewport['height'] = parseInt(clip['y'] + clip['height']) + 10;
        await page.setViewport(viewport);
        console.log("图片截取中...");
        await table.screenshot({
            path: path,
            clip: clip,
            quality: 100
        });
        console.log("截取成功");
    } catch (error) {
        console.log("截取失败");
        console.log(error);
    }
    await browser.close();
});