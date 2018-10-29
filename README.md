## 简介
定位服务

### 更新记录
#### [2018-10-30]
1. 初始化项目，添加上传坐标API
2. 添加获取全部坐标API

### 项目结构
| 文件夹名称     |备注           | 
| ------------- |:-------------:| 
| bin      | 启动文件 | 
| node_modules      | npm模块      |
| controller      | 控制器      |
| public | 静态文件     |   
| reporter | 测试html输出      |   
| routes | 路由      |   
| test | 测试脚本      |   
| views | 页面      |   
| package.json |配置文件    |   
| README.md | 备注     |   

### 配置
```bash
$node -v
v10.12.0

$npm -v
6.4.1
```

### 启动方法
```bash
git clone https://github.com/ddzyan/positionServe.git

npm install 

npm start
```

#### 测试
```bash
npm test
```
输出文件将保存在`reporter`下