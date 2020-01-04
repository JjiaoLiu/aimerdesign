# aimer

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

.env.production  正式环境
.env.development 测试环境

### 打包
#### 测试环境
```
yarn build --mode development
```
####正式环境
```
yarn build --mode production
```

### html2canvas源码修改
文件 node_modules/html2canvas/dist/html2canvas.js
```
line:2528  if (isInlineBase64Image(src) || useCORS) {
line:2529        img.crossOrigin = '';
line:2530  }
line:2531 img.src = src +"?"+new Date().getTime();

```

key  Dfafjoliuwej09235402752079fdafD
