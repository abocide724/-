**CDN**
1. 彩带飘落: https://cdn.jsdelivr.net/gh/abocide724/Picture@c3f3b27848a862b3658f0f24c0fd762709d740f5/彩带飘落.js
2. 彩泡鼠标跟随: https://cdn.jsdelivr.net/gh/abocide724/Picture@665050374408962fb60633d211a07bdedff354a7/%E5%BD%A9%E6%B3%A1%E9%BC%A0%E6%A0%87%E8%B7%9F%E9%9A%8F.js
3. 彩色心跳: https://cdn.jsdelivr.net/gh/abocide724/Picture@2a13f2505c5e8ad45e756ef126d6c65056ab5548/%E5%BD%A9%E8%89%B2%E5%BF%83%E8%B7%B3.js
4. ip地理信息: https://cdn.jsdelivr.net/gh/abocide724/Code@b3960783be0de588d47ff0a627da99559a92cab7/ip_geographyText.js
6. 自动拼音输入文本：https://cdn.jsdelivr.net/gh/shenlan823/Code@main/typinyin/js/typinyin.js
```js
<!--<script src="typinyin.js"></script>-->
<script src="https://cdn.jsdelivr.net/gh/shenlan823/Code@main/typinyin/js/typinyin.js"></script>
<script>
	window.onload = function(){
		var demo = new Typinyin();
		demo.attach('#typinyin_demo'); // 绑定元素
		demo.setOptions({
			sentences: [
				{
					ch: ["这",{pause: 1500}/* 暂停1500毫秒 */,"是","一个","实例",{del: 2}/* 删除两个字符 */,"示例"],
					py: ["zhe","","shi","yige","shili","","shili"],
				}, {
					ch: ["This is an example."],
					py: ["This is an exaaaaaaaa\b\b\b\b\b\b\bmple."], // 用"\b" 来删除一个字符
				}, {
					ch: ["完全","无需","jQuery"],
					py: ["wanquan","wuxu","jQuery"],
				}, {
					ch: ["让","输入","打动","你的","心","\b","❤"], // 用"\b" 来删除一个字符
					py: [["ranfff",{pause: 281},{del: 3}/* 暂停281毫秒后删除三个字符 */,"g"],"shuru","dadong","nide","xin","","xin"],
				}, {
					ch: ["赶紧","尝试一下","吧","！"],
					py: ["ganjin","changshiyixia","ba","！"]
				}
			], // 需要输入的句子
			startDelay: 1000, // 启动延时，以毫秒记
			typeSpeed: 100, // 打字速度，以毫秒记
			pause: 1000, // 每一句话打完后的停顿时间，以毫秒记
			backSpeed: 60, // 删除文字的速度，以毫秒记
			cursorChar: "|", // 光标字符
			loop: false, // 是否循环播放
		});
		demo.finished = function() {
			console.log("Typinyin.js Demo 演示完毕！");
		}; // 输入完毕时执行，loop 为 true 的时无效
		demo.init(); // 初始化并开始打字
	}
</script>
...

<span id="typinyin_demo"></span>
```
