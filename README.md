# kimmiel.github.io
# 期末專題報告
 
## 409410075 林柏恩 資工三
### 專題方向是做一個網站,内容是把同一間公司的 vtuber 的直播,twitter,影片,
### 音樂作品等内容按時間順序展示.這次期末專題報告内容會是簡單介紹網站規劃 和報告制作網站以及相關技術的資料，並撰寫相關心得報告.

# 開啓步驟:

### 1.下載檔案
### 2.在終端機打開檔案
### 3.在backend檔案中的終端機須序打下以下的commmand line
>#### rm -rf node_modules/
>#### npm update
>#### npm run dev
### 4.在frontend檔案中的終端機須序打下以下的commmand line
>#### npm install
>#### npm start
### 5.成功開啓網站

# 網站使用方法:
### 1.先在sign up 頁面注册
### 2.在login 頁面 login
### 3.在首頁的data欄位填入資料
>### 測試資料
>### youtube key: AIzaSyAuuvfn_e76jh6EPxi7uIDFBfPj1HZJ7Ig
>### Channel Id: UCIM92Ok_spNKLVB5TsgwseQ
>### Twitch Key: 1dzor0oyndgwy1nbxcm5by3yz08fw0
>### Twitch Secret: wmkol61mxnpyiry633kxqfe8m3dktu
>### Twitch Channel: skullrazor1
### 4.待播影片會呈現在

# 1 網站規劃 

## 1.1 網站結構設計
### 使用者流程圖(User Flowchart)
### 這網站為一個顯示 vtuber 直播和資訊的網站。首先使用者登入首頁時會進 入介紹網頁并且可以與顯示 vtuber 們即將直播時間的網頁,顯示 vtuber 們在其 他社交媒體發佈的訊息網頁這四和顯示 vtuber 們音樂作品的網頁,四個網頁之 間來回切換。在各個網頁中，使用者可以選擇網頁只顯示特定 vtuber 資訊。 ,網站串接 youtuber,twitter,...等網站的 data API，再篩選資料，最后將分析結 果呈現給使用者。

## 1.2 軟體大概設計分解 前端
### 網頁外觀設計
### 串接 API 採用響應式網頁設計
### 後端 網頁伺服器架設
### 資料庫建立與資料傳遞
## 1.3 網站開發工具與使用程式語言
### 開發工具
### Vscode

### Node.js
### 網站開發程式語言
### Html
### Css Javascript
### 資料庫
### mongodb


# 2 報告制作網站以及相關技術的資料

## 2.1 Node.js
### Node.js 是一個免費的開源服務器環境，能在各種平台上運行
### (Windows、Linux、Unix、Mac OS X 等)，Node.js 是運行在服務端的 JavaScript。Node.js 可以生成動態頁面內容，並創建、打開、讀取、 寫入、刪除和關閉服務器上的文件。以及可以收集表單數據，和數 據庫中添加、刪除、修改數據。

## 2.2 mongodb
### MongoDB 是一個開源的 NoSQL 數據庫管理程序。 NoSQL 被用作傳統
### 關係數據庫的替代品。 NoSQL 數據庫對於處理大量分佈式數據非常 有用。 MongoDB 是一個可以管理面向文檔的信息、存儲或檢索信息 的工具。
## 2.3 API
### API 是 Application Programming Interface 的縮寫， API 通過為兩個程

### 序或應用程序提供必要的工具和功能來幫助它們相互通信。 它接受 用戶的請求並將其發送給服務提供商，然後再次將服務提供商生成 的結果發送給所需的用戶。 可以在軟件或網站中廣泛使用 API，通 過使用 API 調用來實現各種功能，而無需為其編寫複雜的代碼。
## 2.4 響應式網頁設計(Responsive Web Design) 響應式網頁設計可以根據視窗的大小，改變介面的排版。 令同一網 頁可以使用許多不同大小的設備查看，都可以有合適的介面，並且 令網頁在各類設備都可以易於使用。
