# Household Data Dashboard

使用 Next.js 製作的戶政資料 dashboard，串接政府的 API 資料([API 文件](https://data.gov.tw/dataset/14299))。

[Live Demo](https://household-display.vercel.app/110/%E8%87%BA%E5%8C%97%E5%B8%82/%E5%A4%A7%E5%AE%89%E5%8D%80)

## Requirements

-   Node.js _16.8_ or later。
-   `package.json` contains [volta](https://volta.sh/) setting, if you have **volta** installed on your device, it will fetch correct version automatically.

## 啟動專案

1.  安裝 npm 套件

```
npm i --legacy-peer-deps
```

因 ESLint 相依套件有衝突，一定要加上 `--legacy-peer-deps`。

2. 啟動專案

```
npm run dev
```

3. 打包專案

```
npm run build
```
