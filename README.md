# web-tools

Browser-only utility pages. No build step, no backend, nothing uploaded.

**Site:** https://jinpeng-vnode.github.io/web-tools/

| Page | |
| --- | --- |
| [颜色工具](./color-tools/) | Color picker, palette, gradient, contrast |
| [JSON 工具](./json-tools/) | Format and validate |
| [密码生成](./password-tools/) | Local random passwords |
| [二维码](./qrcode-tools/) | Text to QR |
| [正则测试](./regex-tools/) | Regex scratchpad |
| [图片压缩](./image-compress-tools/) | Compress in the browser |
| [计算器](./calculator-tools/) | BMI, loan, unit conversion |
| [白板](./excalidraw-hub/) | Simple drawing board |

These pages used to live in separate Vue/Astro repos. Those repos are archived; this is the combined static copy.

```bash
python -m http.server -d . 8765
```

Then open http://127.0.0.1:8765/

MIT. See [LICENSE](LICENSE).
