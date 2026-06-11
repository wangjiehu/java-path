window.COURSE_GROUPS = [
  {
    title: "Level 1: 启程与环境 (Start)",
    lessons: [
      { title: "你好 Java (Hello World)", subtitle: "输出第一句话", active: true },
      { title: "Java 程序怎样跑起来", subtitle: "源码、编译、运行", locked: true },
      { title: "数据与盒子 (变量声明)", subtitle: "保存数字和文字", locked: true },
      { title: "基本类型与引用类型", subtitle: "值、地址和默认值", locked: true },
      { title: "运算符进阶", subtitle: "计算、比较、逻辑", locked: true },
      { title: "类型转换", subtitle: "自动、强制和精度", locked: true },
      { title: "字符串基础", subtitle: "拼接、比较和格式化", locked: true },
      { title: "控制台输入", subtitle: "Scanner 和参数", locked: true }
    ]
  },
  {
    title: "Level 2: 分支、循环、方法 (Flow)",
    lessons: [
      { title: "命运抉择 (if-else 条件分支)", subtitle: "让程序做选择", locked: true },
      { title: "switch 表达式", subtitle: "多分支更清晰", locked: true },
      { title: "循环往复 (while 循环)", subtitle: "重复做一件事", locked: true },
      { title: "步履不停 (for 循环)", subtitle: "固定次数循环", locked: true },
      { title: "循环的中断与继续", subtitle: "break 与 continue", locked: true },
      { title: "方法入门", subtitle: "把代码打包复用", locked: true },
      { title: "参数与返回值", subtitle: "输入和输出", locked: true },
      { title: "递归初识", subtitle: "自己调用自己", locked: true }
    ]
  },
  {
    title: "Level 3: 数据容器 (Structures)",
    lessons: [
      { title: "宝藏清单 (数组入门)", subtitle: "一排固定柜子", locked: true },
      { title: "二维数组", subtitle: "表格和棋盘", locked: true },
      { title: "集合背包 (List 入门)", subtitle: "可变长度清单", locked: true },
      { title: "Set 去重集合", subtitle: "唯一值和哈希", locked: true },
      { title: "映射字典 (Map 入门)", subtitle: "用 key 找 value", locked: true },
      { title: "迭代与遍历", subtitle: "for-each 和 Iterator", locked: true },
      { title: "排序与比较器", subtitle: "Comparable 与 Comparator", locked: true },
      { title: "安全读取与边界", subtitle: "避免越界和空值", locked: true }
    ]
  },
  {
    title: "Level 4: 对象世界 (OOP)",
    lessons: [
      { title: "类与对象", subtitle: "图纸和成品", locked: true },
      { title: "字段、方法、构造器", subtitle: "对象如何出生", locked: true },
      { title: "封装", subtitle: "保护内部状态", locked: true },
      { title: "static 与实例成员", subtitle: "公共能力和个体能力", locked: true },
      { title: "继承与多态", subtitle: "相同动作不同表现", locked: true },
      { title: "抽象类", subtitle: "半成品父类", locked: true },
      { title: "接口", subtitle: "规定能力，不规定做法", locked: true },
      { title: "枚举与状态建模", subtitle: "固定选项更安全", locked: true },
      { title: "包与访问控制", subtitle: "组织代码边界", locked: true }
    ]
  },
  {
    title: "Level 5: 核心 API (Core API)",
    lessons: [
      { title: "String 深入", subtitle: "不可变和常用方法", locked: true },
      { title: "StringBuilder", subtitle: "高效拼接文本", locked: true },
      { title: "Math、Random、BigDecimal", subtitle: "数字处理", locked: true },
      { title: "日期时间 API", subtitle: "LocalDateTime", locked: true },
      { title: "Optional", subtitle: "减少空指针", locked: true },
      { title: "正则表达式", subtitle: "校验邮箱和手机号", locked: true },
      { title: "异常体系", subtitle: "try、catch、自定义异常", locked: true },
      { title: "日志入门", subtitle: "不要只靠 println", locked: true }
    ]
  },
  {
    title: "Level 6: 现代 Java (Modern)",
    lessons: [
      { title: "泛型", subtitle: "类型安全的容器", locked: true },
      { title: "Lambda 表达式", subtitle: "把行为当参数", locked: true },
      { title: "方法引用", subtitle: "更短的 Lambda", locked: true },
      { title: "Stream 基础", subtitle: "过滤、映射、收集", locked: true },
      { title: "Stream 进阶", subtitle: "分组、统计、扁平化", locked: true },
      { title: "record", subtitle: "轻量数据对象", locked: true },
      { title: "sealed class", subtitle: "受控继承", locked: true },
      { title: "模式匹配", subtitle: "更安全的类型判断", locked: true },
      { title: "模块系统", subtitle: "module-info.java", locked: true }
    ]
  },
  {
    title: "Level 7: 文件、网络、数据格式 (IO)",
    lessons: [
      { title: "文件读写", subtitle: "Path、Files", locked: true },
      { title: "字符集与编码", subtitle: "UTF-8 和乱码", locked: true },
      { title: "NIO 基础", subtitle: "更现代的文件 API", locked: true },
      { title: "JSON 处理", subtitle: "对象和文本互转", locked: true },
      { title: "HTTP Client", subtitle: "请求外部接口", locked: true },
      { title: "Socket 初识", subtitle: "网络通信基础", locked: true }
    ]
  },
  {
    title: "Level 8: 测试与工具链 (Quality)",
    lessons: [
      { title: "Debug 调试", subtitle: "断点和变量观察", locked: true },
      { title: "JUnit 5 入门", subtitle: "给代码写测试", locked: true },
      { title: "断言与测试边界", subtitle: "正常、异常、边界值", locked: true },
      { title: "Maven 入门", subtitle: "依赖和项目结构", locked: true },
      { title: "Gradle 入门", subtitle: "另一种构建方式", locked: true },
      { title: "代码规范与格式化", subtitle: "让代码可维护", locked: true },
      { title: "Git 基础", subtitle: "提交、分支、回滚", locked: true }
    ]
  },
  {
    title: "Level 9: 数据库与后端基础 (Backend)",
    lessons: [
      { title: "SQL 入门", subtitle: "表、行、查询", locked: true },
      { title: "表设计", subtitle: "主键、外键、索引", locked: true },
      { title: "JDBC", subtitle: "Java 连接数据库", locked: true },
      { title: "连接池", subtitle: "复用数据库连接", locked: true },
      { title: "事务", subtitle: "提交、回滚、一致性", locked: true },
      { title: "DAO 与 Repository", subtitle: "数据访问分层", locked: true },
      { title: "分页、搜索、排序", subtitle: "真实列表接口", locked: true }
    ]
  },
  {
    title: "Level 10: Spring Boot 实战 (Web)",
    lessons: [
      { title: "Spring Boot 项目结构", subtitle: "启动和配置", locked: true },
      { title: "Controller", subtitle: "接收 HTTP 请求", locked: true },
      { title: "Service 分层", subtitle: "业务逻辑放哪里", locked: true },
      { title: "参数校验", subtitle: "Bean Validation", locked: true },
      { title: "全局异常处理", subtitle: "统一错误响应", locked: true },
      { title: "登录注册", subtitle: "Session 与 JWT", locked: true },
      { title: "权限控制", subtitle: "角色和资源", locked: true },
      { title: "文件上传", subtitle: "头像和附件", locked: true },
      { title: "接口文档", subtitle: "OpenAPI/Swagger", locked: true }
    ]
  },
  {
    title: "Level 11: 工程化与部署 (Delivery)",
    lessons: [
      { title: "配置管理", subtitle: "dev/test/prod", locked: true },
      { title: "日志与排错", subtitle: "定位线上问题", locked: true },
      { title: "Docker 入门", subtitle: "把应用装进容器", locked: true },
      { title: "Linux 部署", subtitle: "服务启动和端口", locked: true },
      { title: "CI/CD 初识", subtitle: "自动测试和发布", locked: true },
      { title: "接口测试", subtitle: "Postman/HTTPie", locked: true },
      { title: "代码审查", subtitle: "可读性和风险", locked: true }
    ]
  },
  {
    title: "Level 12: 并发与 JVM (Advanced)",
    lessons: [
      { title: "线程基础", subtitle: "Thread 与 Runnable", locked: true },
      { title: "线程池", subtitle: "ExecutorService", locked: true },
      { title: "锁与同步", subtitle: "synchronized 与 Lock", locked: true },
      { title: "并发集合", subtitle: "ConcurrentHashMap", locked: true },
      { title: "CompletableFuture", subtitle: "异步任务编排", locked: true },
      { title: "虚拟线程", subtitle: "现代高并发模型", locked: true },
      { title: "JVM 内存结构", subtitle: "堆、栈、方法区", locked: true },
      { title: "GC 基础", subtitle: "对象回收", locked: true },
      { title: "JFR 与诊断工具", subtitle: "jcmd、jstack、jmap", locked: true }
    ]
  },
  {
    title: "Level 13: 项目实战 (Projects)",
    lessons: [
      { title: "命令行记账本", subtitle: "变量、集合、文件", locked: true },
      { title: "学生管理系统", subtitle: "OOP 和增删改查", locked: true },
      { title: "通讯录与 CSV 工具", subtitle: "文件和数据清洗", locked: true },
      { title: "本地任务管理器", subtitle: "测试和重构", locked: true },
      { title: "博客 REST API", subtitle: "Spring Boot + 数据库", locked: true },
      { title: "后台管理系统", subtitle: "登录、权限、分页", locked: true },
      { title: "消息通知系统", subtitle: "异步和重试", locked: true },
      { title: "高并发任务处理器", subtitle: "线程池和监控", locked: true },
      { title: "毕业项目：完整后端服务", subtitle: "设计、开发、部署、复盘", locked: true }
    ]
  }
];
