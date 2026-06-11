window.LESSON_CONTENT_LEVEL9 = [
  {
    id: "level9-1-sql-intro",
    title: "SQL 入门",
    subtitle: "表、行、查询",
    intro: [
      "数据库可以先理解成一套更严谨的电子表格。表 table 像一张工作表，列 column 描述每一格放什么类型的数据，行 row 是一条具体记录。后端程序经常不是直接把数据写进文件，而是把用户、订单、课程、评论这些业务数据保存到数据库表里。",
      "SQL 是和关系型数据库沟通的语言。你用 `SELECT` 查询数据，用 `INSERT` 新增数据，用 `UPDATE` 修改数据，用 `DELETE` 删除数据。不同数据库有自己的细节差异，但这些核心语句在 PostgreSQL、MySQL 等常见数据库里都很重要。",
      "查询时要学会按步骤想：先从哪张表取数据，再筛选哪些行，再选择哪些列，最后决定排序或数量限制。初学阶段不要急着写很复杂的语句，先把一条查询的输入、过滤条件和输出字段说清楚。",
      "SQL 操作的是集合，不是 Java 里的一个个对象。`WHERE score >= 60` 不是写一个 if 判断某个学生，而是告诉数据库：把所有满足条件的行找出来。理解这一点，后面学习分页、搜索、统计和报表会顺很多。"
    ],
    syntax: [
      "`SELECT column1, column2 FROM table_name` 查询指定列，`SELECT *` 表示查询所有列。",
      "`WHERE` 用来筛选行，例如 `WHERE status = 'ACTIVE'`。",
      "`INSERT INTO table_name (columns) VALUES (values)` 新增一行数据。",
      "`UPDATE table_name SET column = value WHERE condition` 修改满足条件的行。",
      "`DELETE FROM table_name WHERE condition` 删除满足条件的行，真实项目里一定要小心条件。",
      "`ORDER BY column ASC|DESC` 按某列升序或降序排序。",
      "`LIMIT n` 限制返回行数，常用于只看前几条或做分页。",
      "字符串值通常用单引号包住，例如 `'小林'`；数字值不需要引号。",
      "`NULL` 表示没有值，它不是空字符串，也不是数字 0。"
    ],
    exampleCode: `-- 一张学生表可以这样理解：每一行是一名学生，每一列是一类信息
CREATE TABLE students (
    id BIGINT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    city VARCHAR(50)
);

INSERT INTO students (id, name, score, city) VALUES
    (1, '小林', 92, '杭州'),
    (2, '小周', 58, '上海'),
    (3, '小陈', 76, '北京');

SELECT id, name, score
FROM students
WHERE score >= 60
ORDER BY score DESC;`,
    task: "写 SQL：创建 products 表，包含 id、name、price、stock 四列；插入两条商品；查询库存大于 0 的商品名称和价格，并按价格从低到高排序。",
    starterCode: `-- TODO: 创建 products 表
-- 字段：id 主键，name 文本且不能为空，price 整数且不能为空，stock 整数且不能为空

-- TODO: 插入两条商品数据

-- TODO: 查询库存大于 0 的商品名称和价格，按价格升序排序`,
    answerCode: `CREATE TABLE products (
    id BIGINT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL
);

INSERT INTO products (id, name, price, stock) VALUES
    (1, 'Java 入门课', 99, 20),
    (2, '数据库练习册', 59, 0);

SELECT name, price
FROM products
WHERE stock > 0
ORDER BY price ASC;`,
    checks: [
      "是否使用 `CREATE TABLE products` 创建商品表。",
      "是否包含 id、name、price、stock 四个字段。",
      "id 是否被设置为主键，name、price、stock 是否限制不能为空。",
      "是否使用 `INSERT INTO products (...) VALUES (...)` 插入两条数据。",
      "查询结果是否只选择 name 和 price，而不是盲目 `SELECT *`。",
      "是否用 `WHERE stock > 0` 筛选有库存商品。",
      "是否用 `ORDER BY price ASC` 按价格从低到高排序。"
    ],
    commonMistakes: [
      "写了 `DELETE` 或 `UPDATE` 却忘记 `WHERE`，导致影响整张表。",
      "把 SQL 关键字拼错，或者漏掉字段之间的英文逗号。",
      "字符串使用中文引号或双引号，和数据库的字符串语法不匹配。",
      "把 `NULL` 当成空字符串处理，查询时写成 `= NULL` 而不是学习专门的空值判断。",
      "建表时所有字段都用 VARCHAR，后面价格、库存无法自然地做数值比较。",
      "查询练习里总是 `SELECT *`，没有意识到后端接口通常只返回需要的字段。"
    ],
    sources: [
      {
        title: "PostgreSQL Documentation: SQL Tutorial",
        url: "https://www.postgresql.org/docs/current/tutorial-sql.html"
      },
      {
        title: "PostgreSQL Documentation: SELECT",
        url: "https://www.postgresql.org/docs/current/sql-select.html"
      },
      {
        title: "MySQL 8.4 Reference Manual: SELECT Statement",
        url: "https://dev.mysql.com/doc/refman/8.4/en/select.html"
      }
    ]
  },
  {
    id: "level9-2-table-design",
    title: "表设计",
    subtitle: "主键、外键、索引",
    intro: [
      "表设计是在写代码前先想清楚“数据应该怎样摆”。同样是保存订单，你可以把用户姓名、商品名、数量都塞进一张大表，也可以把用户、商品、订单拆成不同表。拆得合理，数据更少重复，修改也更安全。",
      "主键 primary key 是一行数据的身份证。名字、手机号、标题都可能改变或重复，所以真实项目里经常使用单独的 id 做主键。后端代码通过 id 找记录、更新记录、建立关联，都会更稳定。",
      "外键 foreign key 用来表达表和表之间的关系。例如订单表里的 user_id 指向用户表的 id，意思是这笔订单属于哪个用户。外键可以帮助数据库阻止一些明显错误，比如订单指向一个不存在的用户。",
      "索引 index 像书的目录。没有索引时，数据库可能要从头扫到尾找数据；有合适索引时，可以更快定位。但索引不是越多越好，因为新增、修改、删除数据时，数据库也要维护索引。",
      "小白阶段的目标不是一次设计出完美模型，而是能说清楚：这张表代表什么实体，每列代表什么属性，哪一列唯一标识一行，哪些字段会被经常查询，哪些关系需要被约束。"
    ],
    syntax: [
      "`PRIMARY KEY` 定义主键，要求能唯一标识每一行，通常也不能为空。",
      "`NOT NULL` 表示这一列必须有值，不能保存空值。",
      "`UNIQUE` 表示这一列或一组列不能重复，常用于邮箱、用户名等业务唯一值。",
      "`FOREIGN KEY (user_id) REFERENCES users(id)` 表示 user_id 必须指向 users 表已有的 id。",
      "`CREATE INDEX index_name ON table_name(column_name)` 为常用查询列创建索引。",
      "一对多关系常用外键表达，例如一个用户可以有多条订单。",
      "多对多关系通常需要中间表，例如 students、courses、student_courses。",
      "字段类型要贴近业务：金额不要随便用文本，时间不要随便用字符串。"
    ],
    exampleCode: `CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status_created_at ON orders(status, created_at);`,
    task: "设计课程报名表：students 保存学生，courses 保存课程，enrollments 保存报名关系。要求每张表有主键，报名关系用外键连接学生和课程，并防止同一个学生重复报名同一门课。",
    starterCode: `CREATE TABLE students (
    -- TODO: id 主键
    -- TODO: name 不能为空
);

CREATE TABLE courses (
    -- TODO: id 主键
    -- TODO: title 不能为空
);

CREATE TABLE enrollments (
    -- TODO: id 主键
    -- TODO: student_id 外键
    -- TODO: course_id 外键
    -- TODO: 防止同一个学生重复报名同一门课
);`,
    answerCode: `CREATE TABLE students (
    id BIGINT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE courses (
    id BIGINT PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

CREATE TABLE enrollments (
    id BIGINT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    CONSTRAINT fk_enrollments_student
        FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT fk_enrollments_course
        FOREIGN KEY (course_id) REFERENCES courses(id),
    CONSTRAINT uq_enrollments_student_course
        UNIQUE (student_id, course_id)
);`,
    checks: [
      "students、courses、enrollments 是否分别代表清楚的业务对象或关系。",
      "三张表是否都有 `id BIGINT PRIMARY KEY`。",
      "学生姓名和课程标题是否使用 `NOT NULL`。",
      "enrollments.student_id 是否引用 students.id。",
      "enrollments.course_id 是否引用 courses.id。",
      "是否使用组合唯一约束 `UNIQUE (student_id, course_id)` 防止重复报名。"
    ],
    commonMistakes: [
      "用学生姓名当主键，忽略重名和改名的情况。",
      "把课程标题直接复制到报名表里，导致课程改名时多处数据不一致。",
      "只写了 student_id 和 course_id，却没有外键约束，数据库无法帮你发现错误引用。",
      "忘记加组合唯一约束，同一个学生可以重复报名同一门课。",
      "给很少查询或经常变化的字段乱加索引，反而拖慢写入。",
      "把所有时间、金额、数量都设计成字符串，后面排序和计算会很痛苦。"
    ],
    sources: [
      {
        title: "PostgreSQL Documentation: DDL Constraints",
        url: "https://www.postgresql.org/docs/current/ddl-constraints.html"
      },
      {
        title: "PostgreSQL Documentation: Indexes",
        url: "https://www.postgresql.org/docs/current/indexes.html"
      },
      {
        title: "MySQL 8.4 Reference Manual: CREATE TABLE Statement",
        url: "https://dev.mysql.com/doc/refman/8.4/en/create-table.html"
      }
    ]
  },
  {
    id: "level9-3-jdbc",
    title: "JDBC",
    subtitle: "Java 连接数据库",
    intro: [
      "JDBC 是 Java 访问关系型数据库的标准 API。你可以把它理解成 Java 和数据库之间的一套统一接口：Java 代码负责准备 SQL、传入参数、执行语句、读取结果，具体连接 PostgreSQL 还是 MySQL 由对应驱动完成。",
      "最基本的 JDBC 流程是：拿到连接 `Connection`，创建预编译语句 `PreparedStatement`，给占位符设置参数，执行查询或更新，最后处理 `ResultSet`。这些对象都占用资源，所以要及时关闭。",
      "`PreparedStatement` 对新手特别重要。它用 `?` 作为参数占位符，然后通过 `setString`、`setInt` 等方法设置值。这样既让 SQL 和数据分开，也能减少 SQL 注入风险，比把用户输入直接拼进 SQL 字符串安全得多。",
      "查询结果 `ResultSet` 像一个只能向前移动的游标。每次调用 `next()`，游标移动到下一行；然后用列名或列序号取值。写后端接口时，常见做法是把每一行转换成 Java 对象或 DTO，再返回给上层。"
    ],
    syntax: [
      "`DriverManager.getConnection(url, user, password)` 创建数据库连接。",
      "`Connection` 表示一次数据库连接，用完要关闭。",
      "`PreparedStatement ps = conn.prepareStatement(sql)` 创建预编译 SQL 语句。",
      "`?` 是参数占位符，参数下标从 1 开始，不是从 0 开始。",
      "`executeQuery()` 用于 SELECT，返回 `ResultSet`。",
      "`executeUpdate()` 用于 INSERT、UPDATE、DELETE，返回受影响行数。",
      "`ResultSet.next()` 移动到下一行，返回是否还有数据。",
      "`try-with-resources` 可以自动关闭连接、语句和结果集。",
      "不要把用户输入直接拼接到 SQL 中，优先使用 `PreparedStatement` 参数。"
    ],
    exampleCode: `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:postgresql://localhost:5432/school";
        String user = "app_user";
        String password = "secret";
        String sql = "SELECT id, name, score FROM students WHERE score >= ? ORDER BY score DESC";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, 60);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    long id = rs.getLong("id");
                    String name = rs.getString("name");
                    int score = rs.getInt("score");
                    System.out.println(id + " " + name + " " + score);
                }
            }
        }
    }
}`,
    task: "补全 JDBC 查询：根据 city 查询用户列表，只返回 id、username、city。要求使用 PreparedStatement 的参数绑定，不能把 city 直接拼接进 SQL。",
    starterCode: `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:postgresql://localhost:5432/app";
        String user = "app_user";
        String password = "secret";
        String city = "杭州";

        String sql = "SELECT id, username, city FROM users WHERE city = ?";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement ps = conn.prepareStatement(sql)) {

            // TODO: 绑定 city 参数
            // TODO: 执行查询
            // TODO: 循环读取 id、username、city 并输出
        }
    }
}`,
    answerCode: `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:postgresql://localhost:5432/app";
        String user = "app_user";
        String password = "secret";
        String city = "杭州";

        String sql = "SELECT id, username, city FROM users WHERE city = ?";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, city);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    long id = rs.getLong("id");
                    String username = rs.getString("username");
                    String userCity = rs.getString("city");
                    System.out.println(id + " " + username + " " + userCity);
                }
            }
        }
    }
}`,
    checks: [
      "SQL 是否使用 `WHERE city = ?`，而不是把 city 拼进字符串。",
      "是否调用 `ps.setString(1, city)` 绑定第一个参数。",
      "查询是否使用 `executeQuery()`。",
      "是否用 `while (rs.next())` 读取所有结果。",
      "是否读取 id、username、city 三列并输出。",
      "Connection、PreparedStatement、ResultSet 是否能被正确关闭。"
    ],
    commonMistakes: [
      "把参数下标写成 0，JDBC 参数下标应从 1 开始。",
      "用字符串拼接用户输入，留下 SQL 注入风险。",
      "SELECT 查询误用 `executeUpdate()`，导致运行时报错或结果不对。",
      "只调用一次 `rs.next()`，忘记可能有多行结果。",
      "忘记关闭连接，程序跑久后数据库连接被耗尽。",
      "列名写错或和 SQL 查询列不一致，读取结果时才发现异常。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: JDBC Basics",
        url: "https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html"
      },
      {
        title: "Oracle Java SE 21 API: DriverManager",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/DriverManager.html"
      },
      {
        title: "Oracle Java SE 21 API: PreparedStatement",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/PreparedStatement.html"
      },
      {
        title: "Oracle Java SE 21 API: ResultSet",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/ResultSet.html"
      }
    ]
  },
  {
    id: "level9-4-connection-pool",
    title: "连接池",
    subtitle: "复用数据库连接",
    intro: [
      "数据库连接不是普通变量，它背后包含网络连接、认证、会话状态等资源。每次请求来了都新建连接、用完立刻断开，会让后端和数据库都很累。连接池就是提前准备并复用一组连接，像把常用工具放在工具箱里。",
      "后端程序需要连接时，从连接池借一个；用完后调用 `close()`，这个连接通常不是物理断开，而是归还给池子。下一次请求可以继续借用它。这样能减少创建连接的开销，也能限制同时打到数据库的连接数量。",
      "HikariCP 是 Java 生态里常见的高性能连接池。真实项目中你通常通过 `DataSource` 获取连接，而不是每次直接用 `DriverManager`。Spring Boot 也经常自动配置 HikariCP，但理解基本参数仍然很重要。",
      "连接池参数不要凭感觉乱调。最大连接数太小，请求会排队；太大，数据库可能扛不住。小白阶段先记住几个核心参数：jdbcUrl、username、password、maximumPoolSize、connectionTimeout，并在归还连接这件事上养成肌肉记忆。"
    ],
    syntax: [
      "`DataSource` 是获取数据库连接的常用入口，比在业务代码里到处写 `DriverManager` 更适合项目化开发。",
      "`HikariConfig` 用来配置 HikariCP，例如 URL、用户名、密码和连接池大小。",
      "`HikariDataSource` 是 HikariCP 提供的 DataSource 实现。",
      "`maximumPoolSize` 控制池中最多同时存在多少个连接。",
      "`connectionTimeout` 控制借连接最多等待多久，避免请求无限卡住。",
      "从连接池拿到的 `Connection` 仍然要关闭；关闭动作通常表示归还连接。",
      "连接池一般在应用启动时创建，在应用关闭时统一关闭。",
      "不要每次请求都新建一个连接池，那比每次新建连接更糟糕。"
    ],
    exampleCode: `import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) throws SQLException {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://localhost:5432/app");
        config.setUsername("app_user");
        config.setPassword("secret");
        config.setMaximumPoolSize(10);
        config.setConnectionTimeout(3000);

        try (HikariDataSource dataSource = new HikariDataSource(config);
             Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement("SELECT COUNT(*) FROM users");
             ResultSet rs = ps.executeQuery()) {

            if (rs.next()) {
                System.out.println("用户数量：" + rs.getLong(1));
            }
        }
    }
}`,
    task: "写一个最小 HikariCP 配置片段：创建 HikariConfig，设置 jdbcUrl、username、password、maximumPoolSize 为 5，然后通过 HikariDataSource 查询 products 表数量。",
    starterCode: `import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) throws SQLException {
        HikariConfig config = new HikariConfig();
        // TODO: 设置 jdbcUrl
        // TODO: 设置用户名
        // TODO: 设置密码
        // TODO: 设置最大连接数为 5

        try (HikariDataSource dataSource = new HikariDataSource(config)) {
            // TODO: 从 dataSource 获取连接
            // TODO: 查询 SELECT COUNT(*) FROM products
            // TODO: 输出商品数量
        }
    }
}`,
    answerCode: `import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) throws SQLException {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://localhost:5432/app");
        config.setUsername("app_user");
        config.setPassword("secret");
        config.setMaximumPoolSize(5);

        try (HikariDataSource dataSource = new HikariDataSource(config);
             Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement("SELECT COUNT(*) FROM products");
             ResultSet rs = ps.executeQuery()) {

            if (rs.next()) {
                System.out.println("商品数量：" + rs.getLong(1));
            }
        }
    }
}`,
    checks: [
      "是否创建了 `HikariConfig` 并设置 jdbcUrl、username、password。",
      "最大连接数是否设置为 5。",
      "是否用 `new HikariDataSource(config)` 创建连接池。",
      "是否通过 `dataSource.getConnection()` 获取连接。",
      "是否执行 `SELECT COUNT(*) FROM products`。",
      "Connection、PreparedStatement、ResultSet、HikariDataSource 是否能被关闭。"
    ],
    commonMistakes: [
      "每个方法里都创建一个新的 HikariDataSource，导致连接池本身无法复用。",
      "从连接池拿连接后不关闭，连接没有归还，最后所有请求都在等待。",
      "把 maximumPoolSize 调得很大，以为越大越快，结果把数据库压垮。",
      "把数据库密码硬编码在真实公开仓库里，而不是使用环境变量或配置中心。",
      "以为 `Connection.close()` 会一定断开数据库，忽略连接池中它通常是归还连接。",
      "没有设置合理超时，数据库不可用时请求长时间卡住。"
    ],
    sources: [
      {
        title: "HikariCP: Official GitHub Repository",
        url: "https://github.com/brettwooldridge/HikariCP"
      },
      {
        title: "Oracle Java SE 21 API: DataSource",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/javax/sql/DataSource.html"
      },
      {
        title: "Oracle Java SE 21 API: Connection",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/Connection.html"
      }
    ]
  },
  {
    id: "level9-5-transactions",
    title: "事务",
    subtitle: "提交、回滚、一致性",
    intro: [
      "事务 transaction 是数据库里“要么都成功，要么都失败”的工作单元。比如转账时，A 扣 100 元和 B 加 100 元必须一起成功；如果只扣了 A，B 没加上，数据就坏了。",
      "很多数据库默认每条 SQL 自动提交，这叫 auto-commit。做单步练习时很方便，但遇到一组必须一起完成的操作，就需要手动开启事务：关闭自动提交，执行多条 SQL，全部成功后 commit，出错时 rollback。",
      "事务常用 ACID 描述：原子性、一致性、隔离性、持久性。小白阶段不用背概念名词，但要理解核心：事务帮你保护一组相关修改，不让系统停在半成功半失败的尴尬状态。",
      "在 Java JDBC 里，事务由 `Connection` 控制。你通常对同一个连接调用 `setAutoCommit(false)`，执行多条语句，然后 `commit()`。如果中途出现异常，必须 `rollback()`，最后把 auto-commit 状态恢复或关闭连接。"
    ],
    syntax: [
      "`conn.setAutoCommit(false)` 关闭自动提交，开始手动控制事务。",
      "`conn.commit()` 提交事务，让本次修改正式生效。",
      "`conn.rollback()` 回滚事务，撤销本次事务中尚未提交的修改。",
      "同一个事务中的多条 SQL 应使用同一个 `Connection`。",
      "捕获异常后要回滚，否则连接可能停留在未完成事务状态。",
      "提交或回滚后，连接归还连接池前应避免留下异常状态。",
      "事务边界要放在业务动作周围，例如一次下单、一次转账，而不是随意包住整个应用。",
      "查询也可能需要事务，尤其是要求多次读取保持一致时。"
    ],
    exampleCode: `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:postgresql://localhost:5432/bank";

        try (Connection conn = DriverManager.getConnection(url, "app_user", "secret")) {
            try {
                conn.setAutoCommit(false);

                try (PreparedStatement debit = conn.prepareStatement(
                        "UPDATE accounts SET balance = balance - ? WHERE id = ?");
                     PreparedStatement credit = conn.prepareStatement(
                        "UPDATE accounts SET balance = balance + ? WHERE id = ?")) {

                    debit.setInt(1, 100);
                    debit.setLong(2, 1);
                    debit.executeUpdate();

                    credit.setInt(1, 100);
                    credit.setLong(2, 2);
                    credit.executeUpdate();
                }

                conn.commit();
                System.out.println("转账成功");
            } catch (SQLException e) {
                conn.rollback();
                System.out.println("转账失败，已回滚");
                throw e;
            } finally {
                conn.setAutoCommit(true);
            }
        }
    }
}`,
    task: "补全下单事务：扣减 products.stock，并插入 orders 记录。两步必须在同一个事务里完成；任意一步失败都要回滚。",
    starterCode: `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:postgresql://localhost:5432/shop";

        try (Connection conn = DriverManager.getConnection(url, "app_user", "secret")) {
            try {
                // TODO: 关闭自动提交

                // TODO: 扣减商品库存
                // UPDATE products SET stock = stock - ? WHERE id = ?

                // TODO: 插入订单
                // INSERT INTO orders (id, product_id, quantity) VALUES (?, ?, ?)

                // TODO: 提交事务
            } catch (SQLException e) {
                // TODO: 回滚事务
                throw e;
            } finally {
                // TODO: 恢复自动提交
            }
        }
    }
}`,
    answerCode: `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:postgresql://localhost:5432/shop";
        long productId = 10;
        long orderId = 1001;
        int quantity = 2;

        try (Connection conn = DriverManager.getConnection(url, "app_user", "secret")) {
            try {
                conn.setAutoCommit(false);

                try (PreparedStatement updateStock = conn.prepareStatement(
                        "UPDATE products SET stock = stock - ? WHERE id = ?");
                     PreparedStatement insertOrder = conn.prepareStatement(
                        "INSERT INTO orders (id, product_id, quantity) VALUES (?, ?, ?)")) {

                    updateStock.setInt(1, quantity);
                    updateStock.setLong(2, productId);
                    updateStock.executeUpdate();

                    insertOrder.setLong(1, orderId);
                    insertOrder.setLong(2, productId);
                    insertOrder.setInt(3, quantity);
                    insertOrder.executeUpdate();
                }

                conn.commit();
            } catch (SQLException e) {
                conn.rollback();
                throw e;
            } finally {
                conn.setAutoCommit(true);
            }
        }
    }
}`,
    checks: [
      "是否在执行两条修改前调用 `conn.setAutoCommit(false)`。",
      "扣库存和插入订单是否使用同一个 Connection。",
      "两条 SQL 是否都使用 PreparedStatement 参数绑定。",
      "两步成功后是否调用 `conn.commit()`。",
      "捕获 SQLException 后是否调用 `conn.rollback()`。",
      "finally 中是否恢复自动提交状态。"
    ],
    commonMistakes: [
      "扣库存用一个连接，插订单又开一个连接，两个操作不在同一事务里。",
      "关闭自动提交后忘记 commit，程序结束前修改没有按预期生效。",
      "捕获异常只打印日志不回滚，连接可能带着未完成事务被继续使用。",
      "把事务包得太大，把无关查询、网络调用也放进去，导致锁持有时间过长。",
      "以为事务能解决所有并发问题，忽略库存不能扣成负数等业务校验。",
      "没有检查 UPDATE 影响行数，商品不存在时仍然继续插入订单。"
    ],
    sources: [
      {
        title: "PostgreSQL Documentation: Transactions",
        url: "https://www.postgresql.org/docs/current/tutorial-transactions.html"
      },
      {
        title: "Oracle Java SE 21 API: Connection",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/Connection.html"
      },
      {
        title: "MySQL 8.4 Reference Manual: COMMIT and ROLLBACK Statements",
        url: "https://dev.mysql.com/doc/refman/8.4/en/commit.html"
      }
    ]
  },
  {
    id: "level9-6-dao-repository",
    title: "DAO 与 Repository",
    subtitle: "数据访问分层",
    intro: [
      "当项目只有一个 main 方法时，SQL 写在哪里都能跑。但后端项目一变大，如果 Controller、Service、JDBC 代码、SQL 全混在一起，改一个字段就要到处翻，测试也很难写。DAO 和 Repository 的核心作用，就是把数据访问单独放到一层。",
      "DAO 是 Data Access Object，直译就是数据访问对象。它通常负责最具体的数据库操作：根据 id 查用户、插入订单、更新状态。Service 层调用 DAO，不需要知道 SQL 细节。",
      "Repository 更强调领域对象的集合入口。使用 Spring Data 时，你可能只写一个接口继承 `CrudRepository` 或 `JpaRepository`，框架会帮你生成很多常见查询实现。无论叫 DAO 还是 Repository，关键都是让业务逻辑不要直接散落 JDBC 细节。",
      "小白阶段可以先手写一个简单 Repository：接口描述能做什么，实现类负责 JDBC 怎么做。这样既能理解分层边界，也能为以后学习 Spring Data Repository 打基础。",
      "好的数据访问层不是把所有 SQL 都藏起来，而是提供清楚、稳定的方法。比如 `findActiveUsersByCity(city)` 比 `query(String sql)` 更像业务语言，也更不容易被上层乱用。"
    ],
    syntax: [
      "DAO 通常直接处理 SQL、连接、参数绑定和结果映射。",
      "Repository 通常提供面向业务对象的集合式操作，例如保存、查找、删除。",
      "Service 层负责业务规则，不应该到处拼 SQL。",
      "接口可以定义数据访问能力，实现类负责具体技术，例如 JDBC、JPA 或测试假实现。",
      "`findById` 通常返回单个对象或 Optional，`findAll` 返回列表。",
      "结果映射是把 ResultSet 的一行转换成 Java 对象。",
      "不要让 Controller 直接依赖 JDBC 细节，后面改数据库访问方式会很痛苦。",
      "Spring Data Repository 通过接口减少样板代码，但方法命名和边界仍然要认真设计。"
    ],
    exampleCode: `import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;

record User(long id, String username, String city) {
}

interface UserRepository {
    List<User> findByCity(String city) throws SQLException;
}

class JdbcUserRepository implements UserRepository {
    private final DataSource dataSource;

    JdbcUserRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public List<User> findByCity(String city) throws SQLException {
        String sql = "SELECT id, username, city FROM users WHERE city = ? ORDER BY id";
        List<User> users = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, city);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    users.add(new User(
                            rs.getLong("id"),
                            rs.getString("username"),
                            rs.getString("city")));
                }
            }
        }

        return users;
    }
}`,
    task: "补全 ProductRepository：定义 `findById(long id)`，JDBC 实现用 PreparedStatement 查询 products 表，并把结果映射成 Product。找不到时返回 null。",
    starterCode: `import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.sql.DataSource;

record Product(long id, String name, int price) {
}

interface ProductRepository {
    // TODO: 定义 findById
}

class JdbcProductRepository implements ProductRepository {
    private final DataSource dataSource;

    JdbcProductRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // TODO: 实现 findById
}`,
    answerCode: `import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.sql.DataSource;

record Product(long id, String name, int price) {
}

interface ProductRepository {
    Product findById(long id) throws SQLException;
}

class JdbcProductRepository implements ProductRepository {
    private final DataSource dataSource;

    JdbcProductRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public Product findById(long id) throws SQLException {
        String sql = "SELECT id, name, price FROM products WHERE id = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Product(
                            rs.getLong("id"),
                            rs.getString("name"),
                            rs.getInt("price"));
                }
                return null;
            }
        }
    }
}`,
    checks: [
      "ProductRepository 是否定义了 `findById(long id)`。",
      "JdbcProductRepository 是否依赖 DataSource，而不是在方法里硬编码连接信息。",
      "SQL 是否使用 `WHERE id = ?` 参数占位符。",
      "是否调用 `ps.setLong(1, id)` 绑定参数。",
      "是否把 ResultSet 映射成 Product 对象。",
      "找不到数据时是否有明确返回值，本题要求返回 null。",
      "资源是否用 try-with-resources 正确关闭。"
    ],
    commonMistakes: [
      "在 Service 或 Controller 里直接写 JDBC，导致业务逻辑和数据库细节混在一起。",
      "Repository 方法名过于技术化，例如 `executeSql`，上层看不出业务含义。",
      "实现类里硬编码数据库 URL 和密码，难以测试也难以部署。",
      "把 ResultSet 直接返回给上层，连接关闭后结果集已经不能安全使用。",
      "为了省事写一个万能 Repository，所有表共用字符串参数，类型安全和可读性都变差。",
      "误以为用了 Repository 就不需要理解 SQL，结果性能和数据正确性问题无从排查。"
    ],
    sources: [
      {
        title: "Spring Data: Repository Core Concepts",
        url: "https://docs.spring.io/spring-data/commons/reference/repositories/core-concepts.html"
      },
      {
        title: "Oracle Java SE 21 API: DataSource",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/javax/sql/DataSource.html"
      },
      {
        title: "Oracle Java SE 21 API: ResultSet",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/ResultSet.html"
      }
    ]
  },
  {
    id: "level9-7-pagination-search-sort",
    title: "分页、搜索、排序",
    subtitle: "真实列表接口",
    intro: [
      "真实后端很少一次返回整张表。用户列表、商品列表、文章列表通常都要分页：第 1 页看 20 条，第 2 页再看 20 条。分页能减少网络传输和页面渲染压力，也能保护数据库不要被一次大查询拖慢。",
      "搜索是按条件缩小结果范围，比如按关键词查标题、按城市查用户、按状态查订单。搜索条件来自用户输入，所以一定要使用参数绑定，不能直接拼进 SQL。哪怕只是练习，也要把这个习惯从第一天养起来。",
      "排序决定结果的稳定顺序。只写 `LIMIT 10` 而没有 `ORDER BY`，数据库返回哪 10 条并不可靠。常见做法是按创建时间倒序，再加 id 做第二排序条件，让同一时间的数据也有稳定顺序。",
      "列表接口通常要把分页、搜索、排序组合起来：先 `WHERE` 过滤，再 `ORDER BY` 排序，最后 `LIMIT` 和 `OFFSET` 截取当前页。上层传入 page、size、keyword、sortBy 时，后端要校验这些参数，尤其不能让用户随便指定任意 SQL 片段。"
    ],
    syntax: [
      "`LIMIT size` 表示最多返回多少行。",
      "`OFFSET offset` 表示跳过前多少行，常见计算是 `(page - 1) * size`。",
      "`ORDER BY created_at DESC, id DESC` 可以让列表顺序更稳定。",
      "`LIKE ?` 可用于简单模糊搜索，参数常写成 `%keyword%`。",
      "搜索条件为空时，可以不加关键词过滤，或让参数匹配全部数据。",
      "排序字段不能直接信任用户输入，应使用白名单映射。",
      "分页参数要限制范围，例如 size 不能无限大，page 不能小于 1。",
      "大偏移分页在数据很大时可能变慢，后续可以学习基于游标或主键的分页。"
    ],
    exampleCode: `-- 查询第 2 页商品，每页 10 条，搜索名称包含 Java 的商品
-- page = 2, size = 10, offset = (2 - 1) * 10
SELECT id, name, price, created_at
FROM products
WHERE name LIKE '%Java%'
ORDER BY created_at DESC, id DESC
LIMIT 10 OFFSET 10;`,
    task: "补全 JDBC 列表查询：根据 keyword 搜索 products.name，按 price 从低到高、id 从低到高排序，并使用 page 和 size 计算 LIMIT/OFFSET。page 从 1 开始。",
    starterCode: `import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;

record Product(long id, String name, int price) {
}

class ProductRepository {
    private final DataSource dataSource;

    ProductRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    List<Product> search(String keyword, int page, int size) throws SQLException {
        String sql = """
                SELECT id, name, price
                FROM products
                WHERE name LIKE ?
                ORDER BY price ASC, id ASC
                LIMIT ? OFFSET ?
                """;
        List<Product> products = new ArrayList<>();

        // TODO: 计算 offset
        // TODO: 绑定 keyword、size、offset
        // TODO: 执行查询并映射 Product

        return products;
    }
}`,
    answerCode: `import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;

record Product(long id, String name, int price) {
}

class ProductRepository {
    private final DataSource dataSource;

    ProductRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    List<Product> search(String keyword, int page, int size) throws SQLException {
        String sql = """
                SELECT id, name, price
                FROM products
                WHERE name LIKE ?
                ORDER BY price ASC, id ASC
                LIMIT ? OFFSET ?
                """;
        List<Product> products = new ArrayList<>();
        int safePage = Math.max(page, 1);
        int safeSize = Math.min(Math.max(size, 1), 100);
        int offset = (safePage - 1) * safeSize;
        String pattern = "%" + keyword + "%";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, pattern);
            ps.setInt(2, safeSize);
            ps.setInt(3, offset);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    products.add(new Product(
                            rs.getLong("id"),
                            rs.getString("name"),
                            rs.getInt("price")));
                }
            }
        }

        return products;
    }
}`,
    checks: [
      "是否使用 `LIKE ?` 搜索商品名称，并通过参数绑定传入关键词。",
      "是否计算 `offset = (page - 1) * size`，且 page 从 1 开始。",
      "是否使用 `LIMIT ? OFFSET ?` 控制页大小和偏移量。",
      "是否按 `price ASC, id ASC` 排序，保证价格相同时顺序稳定。",
      "是否限制 page 和 size 的范围，避免非法或过大的分页参数。",
      "是否把查询结果映射为 `List<Product>`。",
      "是否没有把 sort 字段或 keyword 直接拼接成 SQL 片段。"
    ],
    commonMistakes: [
      "把 page 当成 offset 使用，导致第 2 页只跳过 2 条而不是一整页。",
      "没有 `ORDER BY` 就分页，结果每次返回顺序可能不稳定。",
      "把用户输入直接拼进 `LIKE '%...%'`，留下 SQL 注入风险。",
      "允许 size 任意大，用户传 100000 时数据库和接口都被拖慢。",
      "只按 price 排序，价格相同的数据顺序漂移，翻页时可能重复或漏数据。",
      "忽略空关键词，本来想查全部，结果拼出 `%%` 之外的异常逻辑。"
    ],
    sources: [
      {
        title: "PostgreSQL Documentation: LIMIT and OFFSET",
        url: "https://www.postgresql.org/docs/current/queries-limit.html"
      },
      {
        title: "PostgreSQL Documentation: Sorting Rows",
        url: "https://www.postgresql.org/docs/current/queries-order.html"
      },
      {
        title: "PostgreSQL Documentation: Pattern Matching",
        url: "https://www.postgresql.org/docs/current/functions-matching.html"
      },
      {
        title: "Spring Data Commons: Paging and Sorting Repositories",
        url: "https://docs.spring.io/spring-data/commons/reference/repositories/core-extensions.html"
      }
    ]
  }
];
