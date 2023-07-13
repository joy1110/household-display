# Household Data Dashboard

使用 Next.js 製作的戶政資料 dashboard，串接政府的 API 資料([API 文件](https://data.gov.tw/dataset/14299))。

[Live Demo](https://household-display.vercel.app/)

## Requirements

-   Node.js _16.8_ or later。
-   `package.json` contains [volta](https://volta.sh/) setting, if you have **volta** installed on your device, it will fetch correct version automatically.

## 啟動專案

1.  安裝 npm 套件

    ```sh
    npm i --legacy-peer-deps
    ```

    因 ESLint 相依套件有衝突，一定要加上 `--legacy-peer-deps`。

2.  啟動專案

    ```sh
    npm run dev
    ```

3.  打包專案

    ```sh
    npm run build
    ```
