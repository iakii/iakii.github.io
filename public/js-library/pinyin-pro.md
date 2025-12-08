# 文档地址：https://pinyin-pro.cn/use/pinyin.html

```js

<script src="https://unpkg.com/pinyin-pro"></script>

<script>
  var { pinyin } = pinyinPro;
  pinyin('汉语拼音'); // 'hàn yǔ pīn yīn'
</script>

// 获取声母
pinyin('汉语拼音', { pattern: 'initial' }); // 'h y p y'
// 获取数组形式声母
pinyin('汉语拼音', { pattern: 'initial', type: 'array' }); // ["h", "y", "p", "y"]
```
