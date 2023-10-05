# kimmiel.github.io
# 畢業專題-智能瀏覽直播平台
 
## 409410075 林柏恩 資工三
### 專題方向是做一個網站,内容是把用户喜爱的直播主們,在兩個主要直播平台(youtube,twitch),中的直播一起顯示出來。
### 方便用戶選擇現在上觀看的直播和安排時間

# 開啓步驟:

### 1.下載檔案
### 2.在終端機/PowerShell打開檔案
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
>### 可以傳入以下測試資料
>### youtube key: AIzaSyAuuvfn_e76jh6EPxi7uIDFBfPj1HZJ7Ig
>### Channel Id: UCIM92Ok_spNKLVB5TsgwseQ
>### Twitch Key: 1dzor0oyndgwy1nbxcm5by3yz08fw0
>### Twitch Secret: wmkol61mxnpyiry633kxqfe8m3dktu
>### Twitch Channel: skullrazor1
>>![这是图片](/img/2_1.jpg "Magic Gardens")
### 4.待播影片會呈現在頁面
>![这是图片](/img/2_2.png "Magic Gardens")
# 1 網站規劃 

## 1.1 網站結構設計
### 使用者流程圖(User Flowchart)
### 這網站為一個顯示 vtuber 直播和資訊的網站。首先使用者登入首頁時會進 入介紹網頁并且可以與顯示 vtuber 們即將直播時間的網頁,顯示 vtuber 們在其 他社交媒體發佈的訊息網頁這四和顯示 vtuber 們音樂作品的網頁,四個網頁之 間來回切換。在各個網頁中，使用者可以選擇網頁只顯示特定 vtuber 資訊。 ,網站串接 youtuber,twitch,...等網站的 data API，再篩選資料，最后將分析結 果呈現給使用者。
![这是图片](/img/web繪圖.jpg "Magic Gardens")


## 1.3 網站開發工具與使用程式語言
### 開發工具
### Vscode

### Node.js
### 網站開發程式語言
### Html
### Css Javascript
### 資料庫
### mongodb


