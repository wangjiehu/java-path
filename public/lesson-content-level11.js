window.LESSON_CONTENT_LEVEL11 = [
  {
    id: "level11-1-config-management",
    title: "配置管理",
    subtitle: "dev/test/prod",
    intro: [
      "一个真实项目不会只在你的电脑上运行。它通常会经过本地开发环境 dev、测试环境 test、正式环境 prod。代码应该尽量保持同一份，变化的部分放到配置里，例如端口、数据库地址、日志级别、第三方接口开关。",
      "配置管理的核心想法是：代码负责逻辑，配置负责环境差异。开发时可以使用本地数据库和更详细的日志；上线后要使用正式数据库、更保守的日志级别，并且不能把密码、token 这类敏感信息写进代码仓库。",
      "Spring Boot 支持 externalized configuration，也就是从 application.yml、环境变量、命令行参数等多个地方读取配置。Profile 则像一个环境标签，启动时告诉应用当前是 dev、test 还是 prod，Spring Boot 会加载对应的配置。",
      "小白最容易踩的坑是把所有东西都写死：端口写死、地址写死、密码写死。这样本地能跑，一换服务器就要改代码。工程化的第一步，就是让同一份程序通过不同配置在不同地方稳定运行。"
    ],
    syntax: [
      "`application.yml` 放通用配置，适合写所有环境都一样的项目名、默认端口等。",
      "`application-dev.yml`、`application-prod.yml` 可以放某个 profile 专属配置。",
      "`spring.config.activate.on-profile: dev` 表示这段配置只在 dev profile 生效。",
      "`--spring.profiles.active=prod` 可以在启动命令里指定当前环境。",
      "`SPRING_PROFILES_ACTIVE=prod` 可以用环境变量指定当前环境，适合服务器和容器。",
      "`server.port`、`logging.level.root` 这类 key 要保持命名清楚，避免同一个含义在不同文件里叫不同名字。",
      "密码、密钥、数据库账号不要提交到 Git，正式环境通常从环境变量、Secret 或部署平台注入。",
      "`@ConfigurationProperties` 适合把一组配置绑定成 Java 对象，比到处写零散的 `@Value` 更容易维护。"
    ],
    exampleCode: `# 文件：src/main/resources/application.yml
spring:
  application:
    name: order-service

server:
  port: 8080

logging:
  level:
    root: INFO

# 文件：src/main/resources/application-dev.yml
spring:
  config:
    activate:
      on-profile: dev

app:
  payment-mode: fake

logging:
  level:
    com.example: DEBUG

# 文件：src/main/resources/application-prod.yml
spring:
  config:
    activate:
      on-profile: prod

app:
  payment-mode: real

logging:
  level:
    root: WARN

# 启动正式环境配置
java -jar order-service.jar --spring.profiles.active=prod`,
    task: "补全三段 Spring Boot 配置：通用配置里项目名为 order-service，端口为 8080；dev profile 使用 fake 支付模式并把 com.example 日志设为 DEBUG；prod profile 使用 real 支付模式并把 root 日志设为 WARN。",
    starterCode: `# 文件：src/main/resources/application.yml
spring:
  application:
    name:

server:
  port:

# 文件：src/main/resources/application-dev.yml
spring:
  config:
    activate:
      on-profile:

app:
  payment-mode:

logging:
  level:
    com.example:

# 文件：src/main/resources/application-prod.yml
spring:
  config:
    activate:
      on-profile:

app:
  payment-mode:

logging:
  level:
    root:`,
    answerCode: `# 文件：src/main/resources/application.yml
spring:
  application:
    name: order-service

server:
  port: 8080

# 文件：src/main/resources/application-dev.yml
spring:
  config:
    activate:
      on-profile: dev

app:
  payment-mode: fake

logging:
  level:
    com.example: DEBUG

# 文件：src/main/resources/application-prod.yml
spring:
  config:
    activate:
      on-profile: prod

app:
  payment-mode: real

logging:
  level:
    root: WARN`,
    checks: [
      "通用配置里是否写了 `spring.application.name: order-service`。",
      "通用配置里是否写了 `server.port: 8080`，而不是在 Java 代码里写死端口。",
      "dev 配置是否通过 `spring.config.activate.on-profile: dev` 生效。",
      "prod 配置是否通过 `spring.config.activate.on-profile: prod` 生效。",
      "dev 是否使用 `payment-mode: fake`，prod 是否使用 `payment-mode: real`。",
      "日志级别是否按环境区分：dev 更详细，prod 更克制。"
    ],
    commonMistakes: [
      "把数据库密码、token、私钥直接写进配置文件并提交到仓库。",
      "忘记设置 active profile，结果应用一直使用默认配置启动。",
      "dev 和 prod 的 key 名不一致，代码读取时有的环境能读到，有的环境读不到。",
      "把配置写在 Java 常量里，导致每换环境都要重新打包。",
      "生产环境仍然打开 DEBUG 日志，日志量过大，还可能泄露敏感信息。",
      "以为 application-prod.yml 会自动生效，其实必须激活 prod profile。"
    ],
    sources: [
      {
        title: "Spring Boot: Externalized Configuration",
        url: "https://docs.spring.io/spring-boot/reference/features/external-config.html"
      },
      {
        title: "Spring Boot: Profiles",
        url: "https://docs.spring.io/spring-boot/reference/features/profiles.html"
      },
      {
        title: "Spring Boot: Logging",
        url: "https://docs.spring.io/spring-boot/reference/features/logging.html"
      }
    ]
  },
  {
    id: "level11-2-logging-troubleshooting",
    title: "日志与排错",
    subtitle: "定位线上问题",
    intro: [
      "线上问题最麻烦的地方是：你不能像本地一样随便打断点、随便重启、随便改代码试。这个时候日志就是你和程序之间的对话记录，它告诉你程序什么时候收到请求、走到了哪一步、哪里失败了。",
      "日志不是把所有变量都打印出来。好的日志应该有层次：INFO 记录重要流程，WARN 记录值得注意但还能继续的情况，ERROR 记录真正失败并需要处理的问题。DEBUG 适合开发和临时排查，生产环境要谨慎打开。",
      "排错时不要一上来就改代码。更稳的顺序是：确认现象，查看状态，找相关日志，确认配置和依赖，再定位代码。Spring Boot Actuator 可以提供 health、loggers 等运行时信息，帮助你先判断应用是否活着、日志级别是否正确。",
      "日志里也有安全边界。用户密码、身份证号、完整 token、银行卡号这类信息不要打印。真实工程里，一条错误日志既要让工程师能定位问题，也要避免把用户和系统暴露出去。"
    ],
    syntax: [
      "`logging.level.root=INFO` 设置默认日志级别。",
      "`logging.level.com.example=DEBUG` 可以只给某个包打开更详细的日志。",
      "`logging.file.name=logs/app.log` 可以把日志写入指定文件。",
      "`logger.info(\"message\")` 用于记录正常关键流程，例如请求开始、任务完成。",
      "`logger.warn(\"message\")` 用于记录异常但可恢复的情况，例如参数不推荐、外部服务变慢。",
      "`logger.error(\"message\", exception)` 用于记录失败，并保留异常堆栈。",
      "`/actuator/health` 常用于检查应用是否启动和依赖是否健康。",
      "`/actuator/loggers` 可以查看或调整日志级别，但正式环境必须做好访问控制。"
    ],
    exampleCode: `# 文件：src/main/resources/application.yml
logging:
  level:
    root: INFO
    com.example.orders: DEBUG
  file:
    name: logs/order-service.log

management:
  endpoints:
    web:
      exposure:
        include: health,loggers

// 文件：OrderController.java
package com.example.orders;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
class OrderController {
    private static final Logger log = LoggerFactory.getLogger(OrderController.class);

    @GetMapping("/orders/{id}")
    String detail(@PathVariable long id) {
        log.info("Query order {}", id);

        if (id <= 0) {
            log.warn("Invalid order id {}", id);
            return "bad id";
        }

        try {
            return "order-" + id;
        } catch (RuntimeException e) {
            log.error("Failed to query order {}", id, e);
            return "error";
        }
    }
}`,
    task: "把 starterCode 改成更适合排错的版本：配置 root 日志为 INFO、com.example.orders 为 DEBUG；Controller 里使用 Logger，不要用 System.out；非法 id 记录 warn；异常记录 error 并带上异常对象。",
    starterCode: `# 文件：src/main/resources/application.yml
logging:
  level:
    root:
    com.example.orders:

// 文件：OrderController.java
@RestController
class OrderController {
    @GetMapping("/orders/{id}")
    String detail(@PathVariable long id) {
        try {
            if (id <= 0) {
                return "bad id";
            }
            return "order-" + id;
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return "error";
        }
    }
}`,
    answerCode: `# 文件：src/main/resources/application.yml
logging:
  level:
    root: INFO
    com.example.orders: DEBUG

// 文件：OrderController.java
@RestController
class OrderController {
    private static final Logger log = LoggerFactory.getLogger(OrderController.class);

    @GetMapping("/orders/{id}")
    String detail(@PathVariable long id) {
        log.info("Query order {}", id);

        try {
            if (id <= 0) {
                log.warn("Invalid order id {}", id);
                return "bad id";
            }
            return "order-" + id;
        } catch (RuntimeException e) {
            log.error("Failed to query order {}", id, e);
            return "error";
        }
    }
}`,
    checks: [
      "是否使用 `LoggerFactory.getLogger` 创建 Logger。",
      "是否用 `log.info` 记录查询订单的关键流程。",
      "非法 id 是否记录为 `warn`，而不是静默返回。",
      "异常日志是否使用 `log.error(..., e)` 保留堆栈信息。",
      "是否移除了 `System.out.println`。",
      "配置里是否把 root 设置为 INFO，把业务包设置为 DEBUG。"
    ],
    commonMistakes: [
      "只打印 `e.getMessage()`，没有异常堆栈，线上很难定位真实出错位置。",
      "把所有日志都写成 ERROR，导致真正严重的问题被噪音淹没。",
      "在生产环境长期打开大量 DEBUG 日志，影响性能并增加日志成本。",
      "日志里打印密码、token、完整手机号等敏感信息。",
      "没有记录关键参数，看到报错却不知道是哪一次请求触发的。",
      "把日志当成业务逻辑的一部分，删除日志后程序行为竟然变化。"
    ],
    sources: [
      {
        title: "Spring Boot: Logging",
        url: "https://docs.spring.io/spring-boot/reference/features/logging.html"
      },
      {
        title: "Spring Boot Actuator: Endpoints",
        url: "https://docs.spring.io/spring-boot/reference/actuator/endpoints.html"
      },
      {
        title: "Spring Boot Actuator: Loggers",
        url: "https://docs.spring.io/spring-boot/reference/actuator/loggers.html"
      }
    ]
  },
  {
    id: "level11-3-docker-intro",
    title: "Docker 入门",
    subtitle: "把应用装进容器",
    intro: [
      "Docker 可以把应用、运行环境和启动方式打包在一起。以前你可能会说“我电脑上能跑”，但到了服务器缺 JDK、目录不一样、命令不一样，就会失败。容器的目标就是减少这些环境差异。",
      "要分清两个词：image 和 container。image 像一个打包好的模板，里面有 JRE、jar 包和启动命令；container 是根据 image 跑起来的进程。一个 image 可以启动很多个 container。",
      "Dockerfile 是制作 image 的说明书。它通常会指定基础镜像、工作目录、复制文件、暴露端口和启动命令。对 Java Web 项目来说，最常见的做法是先用 Maven 或 Gradle 打出 jar，再把 jar 放进一个带 JRE 的镜像里。",
      "Docker 不是魔法。应用的端口、配置、日志仍然要想清楚。比如容器内应用监听 8080，外部访问时还需要通过 `-p 8080:8080` 做端口映射；配置也应该用环境变量或启动参数注入。"
    ],
    syntax: [
      "`FROM eclipse-temurin:17-jre` 选择一个包含 Java 运行时的基础镜像。",
      "`WORKDIR /app` 设置容器里的工作目录。",
      "`COPY target/app.jar app.jar` 把本地构建产物复制到镜像中。",
      "`EXPOSE 8080` 声明应用在容器内使用的端口，主要起文档提示作用。",
      "`ENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]` 定义容器启动时执行的命令。",
      "`docker build -t order-service:1.0 .` 根据当前目录 Dockerfile 构建镜像。",
      "`docker run --rm -p 8080:8080 order-service:1.0` 启动容器并映射端口。",
      "`docker ps`、`docker logs`、`docker stop` 分别用于查看容器、查看日志、停止容器。"
    ],
    exampleCode: `# 文件：Dockerfile
FROM eclipse-temurin:17-jre

WORKDIR /app
COPY target/order-service.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# 构建镜像
docker build -t order-service:1.0 .

# 启动容器
docker run --rm --name order-service -p 8080:8080 order-service:1.0

# 查看日志
docker logs order-service`,
    task: "补全一个最小 Dockerfile 和运行命令：使用 eclipse-temurin:17-jre，工作目录为 /app，把 target/order-service.jar 复制为 app.jar，声明 8080 端口，用 java -jar app.jar 启动，并写出 build 与 run 命令。",
    starterCode: `# 文件：Dockerfile
FROM

WORKDIR
COPY

EXPOSE
ENTRYPOINT

# TODO: 构建镜像，名称 order-service:1.0

# TODO: 启动容器，容器名 order-service，映射 8080:8080`,
    answerCode: `# 文件：Dockerfile
FROM eclipse-temurin:17-jre

WORKDIR /app
COPY target/order-service.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# 构建镜像，名称 order-service:1.0
docker build -t order-service:1.0 .

# 启动容器，容器名 order-service，映射 8080:8080
docker run --rm --name order-service -p 8080:8080 order-service:1.0`,
    checks: [
      "Dockerfile 是否从 `eclipse-temurin:17-jre` 开始。",
      "是否设置了 `WORKDIR /app`，让后续路径更清楚。",
      "是否把 `target/order-service.jar` 复制为容器内的 `app.jar`。",
      "是否声明了 `EXPOSE 8080`。",
      "启动命令是否是 `java -jar app.jar`。",
      "构建命令是否带有镜像名 `order-service:1.0`。",
      "运行命令是否映射了 `8080:8080`。"
    ],
    commonMistakes: [
      "没有先打包 jar，就直接 `docker build`，导致 COPY 找不到文件。",
      "把源码复制进运行镜像却没有构建步骤，容器启动后没有可运行的 jar。",
      "写了 `EXPOSE 8080` 就以为外部能访问，忘记 `docker run -p`。",
      "镜像名和运行时使用的名字不一致，build 成功但 run 找不到镜像。",
      "把数据库地址写死在镜像里，导致同一个镜像不能用于不同环境。",
      "容器启动失败后只反复重启，不先看 `docker logs`。"
    ],
    sources: [
      {
        title: "Docker Docs: What is Docker?",
        url: "https://docs.docker.com/get-started/docker-overview/"
      },
      {
        title: "Docker Docs: Dockerfile Reference",
        url: "https://docs.docker.com/reference/dockerfile/"
      },
      {
        title: "Docker Docs: Containerize an Application",
        url: "https://docs.docker.com/get-started/workshop/02_our_app/"
      }
    ]
  },
  {
    id: "level11-4-linux-deploy",
    title: "Linux 部署",
    subtitle: "服务启动和端口",
    intro: [
      "很多 Java Web 应用最后会运行在 Linux 服务器上。部署不是简单地把 jar 复制过去然后手动敲 `java -jar`，因为手动进程容易因为终端关闭、服务器重启、人员忘记命令而出问题。",
      "Linux 部署要关注几个基础点：文件放在哪里、用哪个用户运行、端口有没有被占用、日志去哪里看、服务失败后是否自动重启。把这些想清楚，应用才像一个真正的服务，而不是一次临时实验。",
      "systemd 是很多 Linux 发行版上常见的服务管理方式。你可以写一个 `.service` 文件，告诉系统如何启动应用、在哪个目录运行、失败后怎么处理。之后就能用 systemctl start、stop、restart、status 管理服务。",
      "排查部署问题时，顺序也很重要：先看服务状态，再看日志，再看端口，最后看配置。比如服务已经启动但访问不到，可能是端口没监听、防火墙没放行、应用绑定地址不对，或者请求打到了另一台机器。"
    ],
    syntax: [
      "`ssh app@server` 登录服务器，实际用户名和地址按环境填写。",
      "`mkdir -p /opt/order-service` 创建应用目录，`-p` 表示父目录不存在时一起创建。",
      "`java -jar app.jar --spring.profiles.active=prod` 手动验证 jar 能否启动。",
      "`systemctl start order-service` 启动服务，`systemctl stop` 停止服务。",
      "`systemctl status order-service` 查看服务当前状态和最近日志摘要。",
      "`journalctl -u order-service -f` 持续查看某个 systemd 服务的日志。",
      "`ss -ltnp` 查看监听中的 TCP 端口，常用于确认 8080 是否真的起来了。",
      "`User=app`、`WorkingDirectory=`、`ExecStart=` 是 Java 服务单元里常见的关键配置。"
    ],
    exampleCode: `# 文件：/etc/systemd/system/order-service.service
[Unit]
Description=Order Service
After=network.target

[Service]
Type=simple
User=app
WorkingDirectory=/opt/order-service
ExecStart=/usr/bin/java -jar /opt/order-service/app.jar --spring.profiles.active=prod
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target

# 加载并启动服务
sudo systemctl daemon-reload
sudo systemctl enable order-service
sudo systemctl start order-service
sudo systemctl status order-service

# 看日志和端口
sudo journalctl -u order-service -f
ss -ltnp | grep 8080`,
    task: "补全一个 systemd 服务文件：服务名用于 order-service，运行用户 app，工作目录 /opt/order-service，启动命令为 /usr/bin/java -jar /opt/order-service/app.jar --spring.profiles.active=prod，失败后自动重启，并写出重新加载、启动、查看状态和查看日志的命令。",
    starterCode: `# 文件：/etc/systemd/system/order-service.service
[Unit]
Description=
After=

[Service]
Type=simple
User=
WorkingDirectory=
ExecStart=
Restart=
RestartSec=5

[Install]
WantedBy=

# TODO: 重新加载 systemd 配置
# TODO: 启动 order-service
# TODO: 查看 order-service 状态
# TODO: 持续查看 order-service 日志`,
    answerCode: `# 文件：/etc/systemd/system/order-service.service
[Unit]
Description=Order Service
After=network.target

[Service]
Type=simple
User=app
WorkingDirectory=/opt/order-service
ExecStart=/usr/bin/java -jar /opt/order-service/app.jar --spring.profiles.active=prod
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target

# 重新加载 systemd 配置
sudo systemctl daemon-reload

# 启动 order-service
sudo systemctl start order-service

# 查看 order-service 状态
sudo systemctl status order-service

# 持续查看 order-service 日志
sudo journalctl -u order-service -f`,
    checks: [
      "`[Unit]` 中是否有清楚的 `Description` 和 `After=network.target`。",
      "`[Service]` 中是否指定 `User=app`，避免长期用 root 跑业务应用。",
      "`WorkingDirectory` 是否是 `/opt/order-service`。",
      "`ExecStart` 是否完整写出 Java 路径、jar 路径和 prod profile。",
      "`Restart=on-failure` 是否能在异常退出后尝试重启。",
      "修改 service 文件后是否执行 `systemctl daemon-reload`。",
      "是否会用 `status` 和 `journalctl -u` 查看服务状态与日志。"
    ],
    commonMistakes: [
      "改了 `.service` 文件但忘记 `daemon-reload`，systemd 仍然使用旧配置。",
      "用 root 用户运行应用，文件权限和安全风险都更难控制。",
      "jar 路径写相对路径，服务启动时工作目录不对导致找不到文件。",
      "端口被占用时只看应用日志，不用 `ss -ltnp` 查是谁占用了端口。",
      "服务启动失败后只看浏览器报错，不看 `systemctl status` 和 `journalctl`。",
      "把生产环境配置留成 dev，连接到了错误的数据库或外部服务。"
    ],
    sources: [
      {
        title: "Linux Manual: systemd.service",
        url: "https://man7.org/linux/man-pages/man5/systemd.service.5.html"
      },
      {
        title: "Linux Manual: systemctl",
        url: "https://man7.org/linux/man-pages/man1/systemctl.1.html"
      },
      {
        title: "Linux Manual: journalctl",
        url: "https://man7.org/linux/man-pages/man1/journalctl.1.html"
      },
      {
        title: "Linux Manual: ss",
        url: "https://man7.org/linux/man-pages/man8/ss.8.html"
      }
    ]
  },
  {
    id: "level11-5-ci-cd-intro",
    title: "CI/CD 初识",
    subtitle: "自动测试和发布",
    intro: [
      "CI 是 Continuous Integration，持续集成。它的意思不是“高级发布系统”，而是每次提交或合并前，机器自动帮你拉代码、装依赖、编译、运行测试。这样很多低级错误不会等到上线才发现。",
      "CD 可以表示 Continuous Delivery 或 Continuous Deployment，重点是把构建好的结果安全地送到测试环境或生产环境。初学阶段先把 CI 做扎实：能自动跑测试、能打包、失败时能清楚地告诉你哪一步坏了。",
      "GitHub Actions 的工作流写在 `.github/workflows` 目录下，使用 YAML 描述什么时候触发、在哪台 runner 上运行、执行哪些步骤。它本质上就是把你手动敲过的命令交给云端机器按顺序执行。",
      "真实团队里，CI/CD 还会涉及缓存、制品、环境保护、审批、Secret 管理等。不要一开始就追求复杂流水线。一个能在 push 和 pull request 时自动执行 `mvn test` 的流程，已经能明显提升项目质量。"
    ],
    syntax: [
      "`name:` 是工作流名称，会显示在 GitHub Actions 页面。",
      "`on:` 描述触发条件，例如 push、pull_request、workflow_dispatch。",
      "`jobs:` 下面可以定义一个或多个任务，每个任务有自己的 runner 和步骤。",
      "`runs-on: ubuntu-latest` 表示任务运行在 GitHub 托管的 Ubuntu runner 上。",
      "`uses: actions/checkout@v4` 把仓库代码检出到 runner。",
      "`uses: actions/setup-java@v4` 安装指定版本和发行版的 JDK。",
      "`run: mvn -B test` 执行 Maven 测试，`-B` 表示批处理模式，适合 CI。",
      "部署需要账号、密钥、服务器地址时，应该使用 GitHub Actions Secrets，不要写进 YAML。"
    ],
    exampleCode: `# 文件：.github/workflows/java-ci.yml
name: Java CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '17'

      - run: mvn -B test
      - run: mvn -B package -DskipTests`,
    task: "补全一个 GitHub Actions 工作流：名称 Java CI，在 push 和 pull_request 到 main 时触发，使用 ubuntu-latest，先 checkout，再安装 Temurin JDK 17，然后执行 mvn -B test 和 mvn -B package -DskipTests。",
    starterCode: `# 文件：.github/workflows/java-ci.yml
name:

on:
  push:
    branches:
  pull_request:
    branches:

jobs:
  build:
    runs-on:

    steps:
      - uses:

      - uses:
        with:
          distribution:
          java-version:

      - run:
      - run:`,
    answerCode: `# 文件：.github/workflows/java-ci.yml
name: Java CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '17'

      - run: mvn -B test
      - run: mvn -B package -DskipTests`,
    checks: [
      "工作流名称是否是 `Java CI`。",
      "是否在 push 到 main 时触发。",
      "是否在 pull_request 到 main 时触发。",
      "job 是否运行在 `ubuntu-latest`。",
      "是否先执行 `actions/checkout@v4` 再安装 Java。",
      "是否安装 Temurin JDK 17。",
      "是否先测试再打包，避免打包掩盖测试失败。"
    ],
    commonMistakes: [
      "YAML 缩进错误，导致工作流文件看起来对但无法解析。",
      "忘记 checkout，runner 上没有项目代码，后面的 Maven 命令自然失败。",
      "本地依赖了某个未提交文件，CI 环境没有这个文件就失败。",
      "把服务器密码、私钥直接写在 workflow 文件里。",
      "为了让流水线变绿而跳过所有测试，失去了 CI 的意义。",
      "只在 main 上跑 CI，pull request 合并前没有自动检查。"
    ],
    sources: [
      {
        title: "GitHub Actions: Quickstart",
        url: "https://docs.github.com/en/actions/get-started/quickstart"
      },
      {
        title: "GitHub Actions: Workflow Syntax",
        url: "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax"
      },
      {
        title: "GitHub Actions: Building and Testing Java with Maven",
        url: "https://docs.github.com/en/actions/tutorials/build-and-test-code/java-with-maven"
      },
      {
        title: "GitHub Actions: Using Secrets",
        url: "https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets"
      }
    ]
  },
  {
    id: "level11-6-api-testing",
    title: "接口测试",
    subtitle: "Postman/HTTPie",
    intro: [
      "接口测试就是站在调用方的角度检查 HTTP API。你不关心 Controller 里面具体怎么写，先关心请求发出去以后，状态码、响应头、响应体是否符合约定。这是前后端联调、自动化测试和上线验收都绕不开的一步。",
      "一个 HTTP 请求至少要看四件事：方法、地址、请求头、请求体。一个 HTTP 响应至少要看三件事：状态码、响应头、响应体。比如创建订单通常是 POST，请求体是 JSON，成功时可能返回 201 或 200。",
      "Postman 适合可视化调试和保存请求集合；curl 和 HTTPie 更适合命令行、文档和 CI。初学时不要只点按钮成功就算完，要能把一次请求写成清楚的文本命令，这样别人才能复现。",
      "接口测试不是只测“正常输入”。你还应该测试缺少字段、错误类型、非法 id、未登录等情况。真实工程里，很多线上问题都来自边界请求，而不是最顺利的那条路径。"
    ],
    syntax: [
      "`GET /orders/1` 常用于查询资源，不应该改变服务器状态。",
      "`POST /orders` 常用于创建资源，请求体通常是 JSON。",
      "`curl -i URL` 会显示响应头和响应体，适合检查状态码与 header。",
      "`-H \"Content-Type: application/json\"` 指定请求体格式是 JSON。",
      "`-d '{\"count\":2}'` 给 curl 传请求体；配合 POST/PUT/PATCH 使用较多。",
      "`http POST :8080/orders productId:=1001 count:=2` 是 HTTPie 的 JSON 写法之一。",
      "`200`、`201`、`400`、`401`、`404`、`500` 是接口测试里经常关注的状态码。",
      "Postman Collection 可以保存一组请求，Environment 可以保存 baseUrl、token 等环境变量。"
    ],
    exampleCode: `# 健康检查
curl -i http://localhost:8080/actuator/health

# 创建订单
curl -i -X POST http://localhost:8080/orders -H "Content-Type: application/json" -d '{"productId":1001,"count":2}'

# 查询订单
curl -i http://localhost:8080/orders/1

# 用 HTTPie 创建订单
http POST :8080/orders productId:=1001 count:=2`,
    task: "写出三条接口测试命令：GET 健康检查 /actuator/health；POST /orders 创建订单，请求体包含 productId=1001 和 count=2，并声明 JSON Content-Type；GET /orders/1 查询订单。",
    starterCode: `# TODO: GET 健康检查

# TODO: POST 创建订单，JSON 包含 productId=1001 和 count=2

# TODO: GET 查询 1 号订单`,
    answerCode: `# GET 健康检查
curl -i http://localhost:8080/actuator/health

# POST 创建订单，JSON 包含 productId=1001 和 count=2
curl -i -X POST http://localhost:8080/orders -H "Content-Type: application/json" -d '{"productId":1001,"count":2}'

# GET 查询 1 号订单
curl -i http://localhost:8080/orders/1`,
    checks: [
      "健康检查是否使用 GET 请求访问 `/actuator/health`。",
      "创建订单是否使用 POST 请求访问 `/orders`。",
      "POST 请求是否声明 `Content-Type: application/json`。",
      "JSON 请求体是否包含 `productId` 和 `count`，并且数字没有被错误写成字段名。",
      "查询订单是否访问 `/orders/1`。",
      "命令是否带 `-i`，方便看到响应状态和响应头。"
    ],
    commonMistakes: [
      "只看响应体，不看状态码，结果 500 错误页面也被误认为成功。",
      "POST JSON 时忘记设置 Content-Type，后端无法按 JSON 解析。",
      "JSON 少了引号、逗号或大括号，实际请求根本不是合法 JSON。",
      "本地端口写错，测试到的不是当前启动的服务。",
      "只测试成功路径，不测试缺字段、非法 id、未登录等失败路径。",
      "Postman 里能跑，但没有保存环境变量和请求集合，别人无法复现。"
    ],
    sources: [
      {
        title: "Postman Docs: Send API Requests",
        url: "https://learning.postman.com/docs/sending-requests/requests/"
      },
      {
        title: "curl: Command Line Tool Manual",
        url: "https://curl.se/docs/manpage.html"
      },
      {
        title: "HTTPie Docs: Request Items",
        url: "https://httpie.io/docs/cli/request-items"
      },
      {
        title: "Spring Boot Actuator: Endpoints",
        url: "https://docs.spring.io/spring-boot/reference/actuator/endpoints.html"
      }
    ]
  },
  {
    id: "level11-7-code-review",
    title: "代码审查",
    subtitle: "可读性和风险",
    intro: [
      "代码审查不是找茬，也不是展示谁更厉害。它的目标是让代码在进入主分支前多一层保护：逻辑是否正确、命名是否清楚、边界是否考虑、测试是否覆盖、有没有安全和维护风险。",
      "好的审查会同时关注代码和上下文。比如一个方法看起来能跑，但如果名字表达不清、魔法数字太多、异常被吞掉、没有测试，未来别人修改时就容易出事故。工程化越成熟，越重视这些“现在不爆、以后会痛”的问题。",
      "审查意见也要讲方式。能给原因就不要只写“改掉”；能区分建议和阻塞就不要所有意见都像命令。作者也应该认真回应，不要把审查看成个人否定。大家是在一起保护项目。",
      "对初学者来说，先学会一张简单清单就够了：代码能不能读懂，输入边界是否处理，异常和资源是否安全，日志是否合适，测试是否说明了预期行为，配置和密钥是否安全。"
    ],
    syntax: [
      "先看 PR 标题和说明，确认这次改动想解决什么问题。",
      "按 diff 阅读变化，重点看新增逻辑、删除逻辑和配置变化。",
      "优先审查正确性、数据安全、异常处理和边界条件，再看格式细节。",
      "使用项目统一的代码规范，例如 Google Java Style 或团队自己的约定。",
      "看到重复数字、重复字符串、过长方法时，可以建议提取常量或小方法。",
      "看到 `catch` 后什么都不做、资源手动关闭、日志打印敏感信息，要提高警惕。",
      "审查意见要落到具体行，并说明风险或收益。",
      "小 PR 更容易审查；一次 PR 混入重构、功能、格式化，会让风险变难判断。"
    ],
    exampleCode: `# 一份轻量代码审查清单
1. 这次改动的目标是否清楚？
2. 正常输入和边界输入是否都能得到合理结果？
3. 异常是否被记录或向上抛出，而不是被吞掉？
4. 是否有测试覆盖关键规则？
5. 命名是否能让新同事读懂？
6. 是否引入了密码、token、个人信息泄露风险？

// 修改前：资源关闭和异常处理都不稳
FileWriter writer = new FileWriter(path);
writer.write(text);
writer.close();

// 修改后：try-with-resources 自动关闭资源
try (FileWriter writer = new FileWriter(path)) {
    writer.write(text);
}`,
    task: "审查 starterCode 中的折扣计算代码，并改成更容易通过代码审查的版本：不要暴露可变 public 字段，提取有意义的常量，方法名表达业务含义，负数金额要抛出 IllegalArgumentException。",
    starterCode: `public class DiscountService {
    public double rate = 0.9;

    double price(double total, boolean vip) {
        if (vip) {
            return total * rate;
        }
        if (total > 1000) {
            return total * 0.95;
        }
        return total;
    }
}`,
    answerCode: `public class DiscountService {
    private static final double VIP_DISCOUNT_RATE = 0.90;
    private static final double LARGE_ORDER_DISCOUNT_RATE = 0.95;
    private static final double LARGE_ORDER_THRESHOLD = 1000.0;

    public double calculatePrice(double originalPrice, boolean vip) {
        if (originalPrice < 0) {
            throw new IllegalArgumentException("originalPrice must be >= 0");
        }

        if (vip) {
            return originalPrice * VIP_DISCOUNT_RATE;
        }

        if (originalPrice > LARGE_ORDER_THRESHOLD) {
            return originalPrice * LARGE_ORDER_DISCOUNT_RATE;
        }

        return originalPrice;
    }
}`,
    checks: [
      "是否移除了可变的 `public double rate` 字段。",
      "VIP 折扣、满额折扣、满额门槛是否提取为有意义的常量。",
      "方法名是否从模糊的 `price` 改成更清楚的 `calculatePrice`。",
      "负数金额是否抛出 `IllegalArgumentException`。",
      "普通订单、VIP 订单、大额订单的分支是否仍然清楚。",
      "代码格式是否稳定，缩进和空行是否便于阅读。"
    ],
    commonMistakes: [
      "审查时只看格式，不看业务规则和边界条件。",
      "看到 public 可变字段不处理，后续任何地方都可能改坏对象状态。",
      "魔法数字散落在代码里，读者不知道 0.95 和 1000 分别代表什么。",
      "负数、null、空集合等边界输入没有约定，线上遇到后行为不可预测。",
      "把审查意见写成情绪化评价，而不是指出具体风险和改法。",
      "一次 PR 改太多主题，审查者很难判断每个变化是否安全。"
    ],
    sources: [
      {
        title: "Google Java Style Guide",
        url: "https://google.github.io/styleguide/javaguide.html"
      },
      {
        title: "Oracle: Code Conventions for the Java Programming Language",
        url: "https://www.oracle.com/java/technologies/javase/codeconventions-contents.html"
      },
      {
        title: "Oracle Java Tutorials: The try-with-resources Statement",
        url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html"
      },
      {
        title: "GitHub Docs: About Pull Request Reviews",
        url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews"
      }
    ]
  }
];
