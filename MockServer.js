let express = require('express'); //引入express
let Mock = require('mockjs'); //引入mock
let bodyparser = require('body-parser');

let app = express(); //实例化express

app.use(
  bodyparser.urlencoded({
    extende: true,
  })
);
app.use(bodyparser.json());

app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*');
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type');
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (req.method.toLowerCase() == 'options') res.send(200);
  //让options尝试请求快速结束
  else next();
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/mode2/DataOne', function (req, res) {
  // res.json(Mock.mock({
  //     'status': 200,
  //     'dataSource|1-9':[{
  //         'id|+1': 1,
  //         'mockTitle|1':['肆无忌惮'],
  //         'mockContent|1': ['角色精湛主题略荒诞', '理由太短 是让人不安', '疑信参半 却无比期盼', '你的惯犯 圆满', '别让纠缠 显得 孤单'],
  //         'mockAction|1': ['下载', '试听', '喜欢']
  //     }]
  // }))
  res.json(
    Mock.mock({
      status: true,
    })
  );
});

app.post('/addUser', function (req, res) {
  console.log('addUser');
  console.log(req.body);
  console.log(req.body.data.name);
  res.json(
    Mock.mock({
      status: true,
    })
  );
});

// 海事大学资讯列表左侧栏
// http://localhost:8090/searchByType
app.post('/searchByType', function (req, res) {
  console.log(req.body);
  let reqType = req.body.type;
  let typeArr = ['学校文件', '办公通知', '科技专栏', '人才专栏', '信息刊物'];
  if (reqType != '今日资讯') {
    typeArr = [];
    typeArr.push(reqType);
  }
  let typeTotals = {
    今日资讯: 120,
    办公通知: 40,
    学生通知: 80,
    科技专栏: 56,
    人才专栏: 12,
    公告: 6,
    信息刊物: 3,
    海报: 12,
    服务指南: 43,
    回音壁: 140,
    项目库: 10,
    学校文件: 23,
    会议纪要: 75,
    规章制度: 30,
    合同文本: 60,
    质量体系: 90,
  };

  setTimeout(() => {
    res.json(
      Mock.mock({
        'total|1': [typeTotals[reqType]],
        'result|6': [
          {
            'id|+1': 1,
            'type|1': typeArr,
            'title|1': '@csentence(30, 50)',
            'date|1': '@DATETIME("yyyy-MM-d")',
            'brief|1': '@csentence(30, 80)',
            'dept|1': [
              '科技处',
              '综合处',
              '工会',
              '研究生院',
              '教务处',
              '团委',
              '后勤保障处',
              '一个很长很长很长很长的部门名称',
            ],
            'read_num|1': '@integer(20, 10000)',
          },
        ],
      })
    );
  }, 2000);
});

// 海事大学资讯列表搜索
// http://localhost:8090/searchByDept
app.post('/searchByDept', function (req, res) {
  console.log(req.body);
  let total = 12;
  if (req.body.content === '没有') {
    total = 0;
  }
  let typeArr = [
    '搜-学校文件',
    '搜-办公通知',
    '搜-科技专栏',
    '搜-人才专栏',
    '搜-信息刊物',
  ];
  if (total === 0) {
    setTimeout(() => {
      res.json(
        Mock.mock({
          total: total,
          'result|0': [],
        })
      );
    }, 2000);
  } else {
    setTimeout(() => {
      res.json(
        Mock.mock({
          total: total,
          'result|6': [
            {
              'id|+1': 1,
              'type|1': typeArr,
              'title|1': '@csentence(30, 50)',
              'date|1': '@DATETIME("yyyy-MM-d")',
              'brief|1': '@csentence(30, 80)',
              'dept|1': [
                '科技处',
                '综合处',
                '工会',
                '研究生院',
                '教务处',
                '团委',
                '后勤保障处',
                '一个很长很长很长很长的部门名称',
              ],
              'read_num|1': '@integer(20, 10000)',
            },
          ],
        })
      );
    }, 2000);
  }
});

app.get('/getContent', function (req, res) {
  console.log(req.query);
  res.json({
    title: '这个杀手不太冷',
    dept: '网络信息与综合服务中心',
    updateTime: '2020-04-10',
    readNum: 2584,
    data: 'http://www.baidu.com',
  });
});

app.listen('8090', () => {
  console.log('监听端口 8090');
});
