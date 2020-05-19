# 範例文章

這是一篇測試文章，這是一篇測試文章，這是一篇測試文章，
這是一篇測試文章，這是一篇測試文章，這是一篇測試文章

## 使用到的工具

- [monaco](https://github.com/Microsoft/monaco-editor)
- [markdown-it](https://github.com/markdown-it/markdown-it)
- [prismjs](https://prismjs.com/)
- [tailwindcss](https://tailwindcss.com/)
- 我的雙手

## 粗體斜體

*這裡看起來*要**強調一下**這個`文字`

## 項目列表

- 項目
- 項目
- 項目
  - 項目
- 項目

1. 項目
2. 項目
   1. 小項目
   2. 小項目
      1. 小小項目
3. 小項目

## 引言區塊

> hello blockquote

## 標題

### 小標題

#### 小小標題

##### 小小小標題

###### 小小小小標題

## 程式碼範例

支援類型︰`json`, `js`, `ts`, `jsx`, `tsx`, `go`, `css`, `scss`

```tsx
import React from "react"
const Demo: React.FC = () => {
	return (
		<div>Demo</div>
	)
}
```

```js
const md = new MarkdownIt({
	html: true,
	xhtmlOut: true,
	typographer: true,
	linkify: true,
})
	.use(youtube)
	.use(prism)
	.use(emoji)
```

```go
package main
import "fmt"
func main() {
	fmt.Println("helloworld")
}
```

## 表格

| A   | B   | C   |
| --- | --- | --- |
| 1   | 2   | 3   |
| 4   | 5   | 6   |
| 7   | 8   | 9   |

## youtube

[Lemon](yt:NrHRTNeni-U)

https://developers.google.com/youtube/player_parameters
