window.LESSON_CONTENT_LEVEL10 = [
  {
    id: "level10-1-spring-boot-project-structure",
    title: "Spring Boot 项目结构",
    subtitle: "启动和配置",
    intro: [
      "Spring Boot 可以理解成“帮你把 Spring 项目先搭好”的工具箱。以前做 Web 项目要自己配置很多依赖、服务器和扫描规则；Spring Boot 通过启动类、自动配置和 starter 依赖，把常见选择先准备好，让你更快进入业务开发。",
      "一个典型项目会把 Java 代码放在 `src/main/java`，配置文件放在 `src/main/resources`，测试代码放在 `src/test/java`。这不是硬性魔法，而是 Maven、Gradle 和 Spring Boot 共同约定出来的工程结构，遵守它会让工具少出问题。",
      "启动类通常带有 `@SpringBootApplication`，并且放在项目根包下面。根包可以先理解成所有业务包的共同上级，例如 `com.example.demo`。这样 Controller、Service、配置类等组件才容易被 Spring 自动扫描到。",
      "配置文件常见名字是 `application.properties` 或 `application.yml`。端口、数据库地址、上传限制、业务开关等都应该放进配置，而不是散落在代码里写死。真实开发里，配置会随着 dev、test、prod 环境切换。"
    ],
    syntax: [
      "`@SpringBootApplication` 是组合注解，包含自动配置、组件扫描和配置类能力。",
      "`SpringApplication.run(DemoApplication.class, args)` 会启动 Spring Boot 应用并创建 Spring 容器。",
      "`src/main/java` 放主代码，`src/main/resources` 放配置和静态资源，`src/test/java` 放测试代码。",
      "启动类建议放在根包，例如 `com.example.demo`，业务包放在它下面，例如 `web`、`service`、`repository`。",
      "`application.yml` 可以用缩进表达层级，例如 `server.port`、`app.name` 这类配置。",
      "starter 依赖负责打包常用组件，例如 `spring-boot-starter-web` 会带上 Spring MVC 和内嵌服务器。",
      "不要使用默认包，也就是不要让 Java 文件没有 `package` 声明；默认包会让组件扫描和测试更难维护。",
      "启动失败时先看第一段异常和 `Caused by`，常见原因是端口占用、配置拼错或 Bean 没被扫描。"
    ],
    exampleCode: `// 文件：src/main/java/com/example/demo/DemoApplication.java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

// 文件：src/main/java/com/example/demo/web/PingController.java
package com.example.demo.web;

import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class PingController {
    private final Environment environment;

    PingController(Environment environment) {
        this.environment = environment;
    }

    @GetMapping("/api/ping")
    String ping() {
        String appName = environment.getProperty("app.name", "demo");
        return appName + " is running";
    }
}

// 文件：src/main/resources/application.yml
server:
  port: 8080
app:
  name: java-path`,
    task: "补全一个最小 Spring Boot Web 项目：启动类放在 `com.example.demo` 根包；新增 `/api/ping` 接口；从配置中读取 `app.name`，返回 `java-path is running`。",
    starterCode: `// 文件：src/main/java/com/example/demo/DemoApplication.java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// TODO: 添加启动注解
public class DemoApplication {
    public static void main(String[] args) {
        // TODO: 启动 Spring Boot 应用
    }
}

// 文件：src/main/java/com/example/demo/web/PingController.java
package com.example.demo.web;

import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// TODO: 声明这是一个 REST Controller
class PingController {
    private final Environment environment;

    PingController(Environment environment) {
        this.environment = environment;
    }

    // TODO: 映射 GET /api/ping
    String ping() {
        // TODO: 读取 app.name，默认值为 demo，并返回运行状态
    }
}

// 文件：src/main/resources/application.yml
server:
  port: 8080
app:
  name: java-path`,
    answerCode: `// 文件：src/main/java/com/example/demo/DemoApplication.java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

// 文件：src/main/java/com/example/demo/web/PingController.java
package com.example.demo.web;

import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class PingController {
    private final Environment environment;

    PingController(Environment environment) {
        this.environment = environment;
    }

    @GetMapping("/api/ping")
    String ping() {
        String appName = environment.getProperty("app.name", "demo");
        return appName + " is running";
    }
}

// 文件：src/main/resources/application.yml
server:
  port: 8080
app:
  name: java-path`,
    checks: [
      "启动类是否位于 `com.example.demo` 根包，并添加了 `@SpringBootApplication`。",
      "main 方法是否调用 `SpringApplication.run(DemoApplication.class, args)`。",
      "Controller 是否放在根包下面的子包中，能被组件扫描发现。",
      "是否使用 `@RestController` 和 `@GetMapping(\"/api/ping\")` 暴露接口。",
      "是否从配置读取 `app.name`，而不是把应用名只写死在返回值里。",
      "访问 GET /api/ping 时是否能得到 `java-path is running`。"
    ],
    commonMistakes: [
      "启动类放在业务包旁边或更深层，导致其他包里的 Controller 没被扫描到。",
      "Java 文件没有写 `package`，项目变成默认包，后续组件扫描和测试都容易混乱。",
      "只创建了 Controller 类，却忘记添加 `spring-boot-starter-web` 依赖。",
      "配置文件缩进不正确，YAML 把 `app.name` 解析成了别的结构。",
      "端口 8080 被占用时反复改 Controller，实际应该检查启动日志里的端口错误。",
      "把环境相关配置写死在代码里，之后切换测试环境或生产环境会很痛苦。"
    ],
    sources: [
      {
        title: "Spring Boot Reference: Structuring Your Code",
        url: "https://docs.spring.io/spring-boot/reference/using/structuring-your-code.html"
      },
      {
        title: "Spring Boot Reference: Using the @SpringBootApplication Annotation",
        url: "https://docs.spring.io/spring-boot/reference/using/using-the-springbootapplication-annotation.html"
      },
      {
        title: "Spring Boot Reference: Externalized Configuration",
        url: "https://docs.spring.io/spring-boot/reference/features/external-config.html"
      }
    ]
  },
  {
    id: "level10-2-controller",
    title: "Controller",
    subtitle: "接收 HTTP 请求",
    intro: [
      "Controller 是后端和浏览器、App、前端页面打交道的第一站。一次 HTTP 请求会带着方法、路径、参数、请求头和请求体来到服务器，Controller 负责把这些信息接住，并把结果转换成 HTTP 响应。",
      "HTTP 方法表达动作：GET 常用于查询，POST 常用于创建，PUT/PATCH 常用于修改，DELETE 常用于删除。路径表达资源位置，例如 `/api/books/1` 表示编号为 1 的书。方法和路径搭配起来，接口的意图才清楚。",
      "请求数据可能来自不同地方：路径变量如 `/api/books/{id}`，查询参数如 `?keyword=java`，JSON 请求体如创建订单时提交的一整段数据。Spring MVC 用不同注解把这些数据绑定到方法参数上。",
      "真实项目里，Controller 不应该塞满业务逻辑。它更像前台接待：校验基本输入、调用 Service、决定响应状态码。复杂规则、数据库操作和事务通常交给 Service、Repository 等层处理。"
    ],
    syntax: [
      "`@RestController` 表示这个类的返回值通常直接写入 HTTP 响应体，常见格式是 JSON。",
      "`@RequestMapping(\"/api/books\")` 可以给整个 Controller 统一加路径前缀。",
      "`@GetMapping(\"/{id}\")` 映射 GET 请求，并用 `{id}` 表示路径变量。",
      "`@PathVariable Long id` 从路径中读取变量，例如 `/api/books/10` 里的 10。",
      "`@RequestParam String keyword` 从查询字符串读取参数，例如 `?keyword=spring`。",
      "`@RequestBody CreateBookRequest request` 把 JSON 请求体转换成 Java 对象或 record。",
      "`ResponseEntity` 可以同时控制响应体、状态码和响应头，例如创建成功返回 201。",
      "DTO 是接口层的数据对象，适合表达请求和响应，不要把数据库实体直接暴露给外部。"
    ],
    exampleCode: `package com.example.demo.web;

import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/books")
class BookController {
    @GetMapping
    List<BookResponse> search(@RequestParam(defaultValue = "") String keyword) {
        return List.of(new BookResponse(1L, "Spring Boot 入门", "小林"));
    }

    @GetMapping("/{id}")
    BookResponse findById(@PathVariable Long id) {
        return new BookResponse(id, "Spring Boot 入门", "小林");
    }

    @PostMapping
    ResponseEntity<BookResponse> create(@RequestBody CreateBookRequest request) {
        BookResponse saved = new BookResponse(2L, request.title(), request.author());
        return ResponseEntity.created(URI.create("/api/books/" + saved.id())).body(saved);
    }
}

record CreateBookRequest(String title, String author) {
}

record BookResponse(Long id, String title, String author) {
}`,
    task: "补全 CourseController：GET `/api/courses/{id}` 返回课程详情；POST `/api/courses` 接收 JSON 创建课程，并返回 201 Created 和新课程地址。",
    starterCode: `package com.example.demo.web;

import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/courses")
class CourseController {
    // TODO: 映射 GET /api/courses/{id}
    CourseResponse findById(Long id) {
        return new CourseResponse(id, "Spring Boot", 12);
    }

    // TODO: 映射 POST /api/courses，并从请求体读取 CreateCourseRequest
    ResponseEntity<CourseResponse> create(CreateCourseRequest request) {
        CourseResponse saved = new CourseResponse(100L, request.title(), request.hours());
        // TODO: 返回 201 Created，Location 为 /api/courses/100
    }
}

record CreateCourseRequest(String title, int hours) {
}

record CourseResponse(Long id, String title, int hours) {
}`,
    answerCode: `package com.example.demo.web;

import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/courses")
class CourseController {
    @GetMapping("/{id}")
    CourseResponse findById(@PathVariable Long id) {
        return new CourseResponse(id, "Spring Boot", 12);
    }

    @PostMapping
    ResponseEntity<CourseResponse> create(@RequestBody CreateCourseRequest request) {
        CourseResponse saved = new CourseResponse(100L, request.title(), request.hours());
        return ResponseEntity.created(URI.create("/api/courses/" + saved.id())).body(saved);
    }
}

record CreateCourseRequest(String title, int hours) {
}

record CourseResponse(Long id, String title, int hours) {
}`,
    checks: [
      "Controller 是否添加 `@RestController` 和统一路径 `/api/courses`。",
      "查询详情接口是否使用 `@GetMapping(\"/{id}\")`。",
      "方法参数是否用 `@PathVariable` 接收路径里的 id。",
      "创建接口是否使用 `@PostMapping` 和 `@RequestBody` 接收 JSON。",
      "是否使用 DTO/record 表达请求和响应数据。",
      "创建成功时是否返回 201 Created，并设置新资源的 Location。"
    ],
    commonMistakes: [
      "把 GET 和 POST 都写成同一个路径和同一个方法名，却没有区分 HTTP 方法。",
      "忘记给 `id` 参数加 `@PathVariable`，导致 Spring 不知道从哪里取值。",
      "POST 方法接收 JSON 时漏掉 `@RequestBody`，请求体不会自动绑定到对象。",
      "所有接口都返回 200，不区分创建成功、参数错误、找不到资源等状态。",
      "Controller 里直接写大量业务规则和数据库代码，后续测试和复用都会变困难。",
      "把数据库实体原样返回给前端，可能暴露内部字段或造成循环序列化。"
    ],
    sources: [
      {
        title: "Spring Framework Reference: Annotated Controllers",
        url: "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller.html"
      },
      {
        title: "Spring Framework Reference: @RequestMapping",
        url: "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html"
      },
      {
        title: "Spring Framework Reference: @RequestBody",
        url: "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestbody.html"
      }
    ]
  },
  {
    id: "level10-3-service-layer",
    title: "Service 分层",
    subtitle: "业务逻辑放哪里",
    intro: [
      "分层不是为了把项目弄复杂，而是为了让每类代码各做各的事。Controller 处理 HTTP，Service 处理业务规则，Repository 处理数据访问。代码量一多，这种边界会让修改更稳，也更容易测试。",
      "Service 是业务语言最集中的地方。比如“报名课程时要检查课程是否存在、名额是否足够、用户是否重复报名”，这些规则不应该散在多个 Controller 里，而应该集中到一个清楚的 Service 方法中。",
      "Spring 推荐使用构造器注入依赖。也就是 Service 需要 Repository，就通过构造器接收它。这样依赖关系写在类的入口处，测试时也可以传入假的实现，比到处 `new` 更可控。",
      "DTO 和实体也要分清。Controller 面向外部接口，适合使用请求 DTO 和响应 DTO；Service 可以操作领域对象或实体，并负责把业务结果交给 Controller。不要为了省事让每一层都互相乱拿对象。"
    ],
    syntax: [
      "`@Service` 标记业务服务类，让 Spring 把它注册成 Bean。",
      "`@Repository` 常用于数据访问层，也能让数据访问异常被 Spring 统一转换。",
      "构造器注入写法是声明 `private final` 字段，并在构造器中接收依赖。",
      "Controller 调用 Service，不直接写复杂业务规则或数据库访问代码。",
      "Service 可以抛出业务异常，例如资源不存在、余额不足、重复提交。",
      "同一条业务规则只放一个地方，避免多个 Controller 复制同样判断。",
      "事务通常放在 Service 方法上，因为一个业务动作可能包含多次数据操作。",
      "单元测试 Service 时，可以替换 Repository，专注验证业务规则。"
    ],
    exampleCode: `package com.example.demo.order;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
class OrderController {
    private final OrderService orderService;

    OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    OrderResponse create(@RequestBody CreateOrderRequest request) {
        return orderService.create(request);
    }
}

@Service
class OrderService {
    private final ProductRepository productRepository;

    OrderService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    OrderResponse create(CreateOrderRequest request) {
        Product product = productRepository.findById(request.productId());
        if (product.stock() < request.quantity()) {
            throw new IllegalStateException("库存不足");
        }
        int total = product.price() * request.quantity();
        return new OrderResponse(product.id(), product.name(), request.quantity(), total);
    }
}

@Repository
class ProductRepository {
    private final Map<Long, Product> products = new ConcurrentHashMap<>();

    ProductRepository() {
        products.put(1L, new Product(1L, "Java 课程", 99, 10));
    }

    Product findById(Long id) {
        Product product = products.get(id);
        if (product == null) {
            throw new IllegalArgumentException("商品不存在");
        }
        return product;
    }
}

record CreateOrderRequest(Long productId, int quantity) {
}

record OrderResponse(Long productId, String productName, int quantity, int total) {
}

record Product(Long id, String name, int price, int stock) {
}`,
    task: "补全课程报名分层：Controller 只接收请求并调用 EnrollmentService；Service 检查名额是否足够；Repository 提供课程数据。报名 3 人到剩余 5 个名额的课程，应返回 remainingSeats 为 2。",
    starterCode: `package com.example.demo.enrollment;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/enrollments")
class EnrollmentController {
    private final EnrollmentService enrollmentService;

    EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    EnrollmentResponse enroll(@RequestBody EnrollmentRequest request) {
        // TODO: 调用 Service
    }
}

@Service
class EnrollmentService {
    private final CourseRepository courseRepository;

    EnrollmentService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    EnrollmentResponse enroll(EnrollmentRequest request) {
        Course course = courseRepository.findById(request.courseId());
        // TODO: 检查 seats 是否足够，不足时抛出异常
        // TODO: 返回剩余名额
    }
}

@Repository
class CourseRepository {
    Course findById(Long id) {
        return new Course(id, "Spring Boot", 5);
    }
}

record EnrollmentRequest(Long courseId, int seats) {
}

record EnrollmentResponse(Long courseId, String courseTitle, int remainingSeats) {
}

record Course(Long id, String title, int availableSeats) {
}`,
    answerCode: `package com.example.demo.enrollment;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/enrollments")
class EnrollmentController {
    private final EnrollmentService enrollmentService;

    EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    EnrollmentResponse enroll(@RequestBody EnrollmentRequest request) {
        return enrollmentService.enroll(request);
    }
}

@Service
class EnrollmentService {
    private final CourseRepository courseRepository;

    EnrollmentService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    EnrollmentResponse enroll(EnrollmentRequest request) {
        Course course = courseRepository.findById(request.courseId());
        if (request.seats() <= 0) {
            throw new IllegalArgumentException("报名人数必须大于 0");
        }
        if (request.seats() > course.availableSeats()) {
            throw new IllegalStateException("课程名额不足");
        }
        int remainingSeats = course.availableSeats() - request.seats();
        return new EnrollmentResponse(course.id(), course.title(), remainingSeats);
    }
}

@Repository
class CourseRepository {
    Course findById(Long id) {
        return new Course(id, "Spring Boot", 5);
    }
}

record EnrollmentRequest(Long courseId, int seats) {
}

record EnrollmentResponse(Long courseId, String courseTitle, int remainingSeats) {
}

record Course(Long id, String title, int availableSeats) {
}`,
    checks: [
      "Controller 是否只做 HTTP 入口和调用 Service，没有塞入名额计算细节。",
      "Service 是否添加 `@Service`，并通过构造器注入 Repository。",
      "Repository 是否负责提供课程数据，而不是让 Controller 自己查数据。",
      "Service 是否检查报名人数必须大于 0。",
      "Service 是否检查报名人数不能超过剩余名额。",
      "报名 3 人到剩余 5 个名额的课程时，结果是否为 remainingSeats = 2。"
    ],
    commonMistakes: [
      "把所有代码都写进 Controller，短期能跑，后期每加一个入口都要复制规则。",
      "在 Service 里手动 `new CourseRepository()`，绕开 Spring 容器和依赖注入。",
      "字段不是 `final`，构造器也不清楚依赖来源，测试时很难替换依赖。",
      "只检查课程存在，不检查报名人数是否为 0 或负数。",
      "把 DTO、实体、数据库表完全混在一起，接口字段一变就影响内部模型。",
      "业务异常没有统一处理，最后让用户看到一整段服务器异常堆栈。"
    ],
    sources: [
      {
        title: "Spring Boot Reference: Spring Beans and Dependency Injection",
        url: "https://docs.spring.io/spring-boot/reference/using/spring-beans-and-dependency-injection.html"
      },
      {
        title: "Spring Framework Reference: Classpath Scanning and Managed Components",
        url: "https://docs.spring.io/spring-framework/reference/core/beans/classpath-scanning.html"
      },
      {
        title: "Spring Framework Reference: Annotation-based Container Configuration",
        url: "https://docs.spring.io/spring-framework/reference/core/beans/annotation-config.html"
      }
    ]
  },
  {
    id: "level10-4-validation",
    title: "参数校验",
    subtitle: "Bean Validation",
    intro: [
      "接口收到请求后，第一件事不是马上写数据库，而是确认数据能不能用。用户名不能为空、邮箱格式要正确、密码长度要够、数量不能小于 1，这些都属于参数校验。",
      "Bean Validation 的好处是把常见规则写在 DTO 字段旁边。看到 `@NotBlank`、`@Email`、`@Size`，读代码的人立刻知道接口对这个字段有什么要求，比手写一堆 if 更集中也更容易复用。",
      "Spring MVC 中，Controller 方法参数加上 `@Valid` 后，请求体绑定完成会自动触发校验。校验失败时，Spring 会抛出参数绑定或校验异常，通常再交给全局异常处理转换成统一错误响应。",
      "校验不是安全的全部。它能挡住很多明显无效输入，但业务规则仍要放在 Service 里继续检查，例如用户名是否已存在、库存是否足够、当前用户是否能操作这条资源。"
    ],
    syntax: [
      "`spring-boot-starter-validation` 会引入 Jakarta Bean Validation 和常用实现。",
      "`@Valid @RequestBody RegisterRequest request` 表示请求体绑定后要执行校验。",
      "`@NotBlank` 适合校验字符串不能为 null、空字符串或全空格。",
      "`@Email` 校验字符串是否符合常见邮箱格式。",
      "`@Size(min = 8, max = 30)` 校验字符串、集合等长度范围。",
      "`@Min(1)`、`@Max(100)`、`@Positive` 常用于数字范围校验。",
      "`message` 可以自定义错误提示，例如 `@NotBlank(message = \"标题不能为空\")`。",
      "嵌套对象也需要校验时，外层字段上也要加 `@Valid`。"
    ],
    exampleCode: `package com.example.demo.user;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
class UserController {
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    UserResponse register(@Valid @RequestBody RegisterRequest request) {
        return new UserResponse(1L, request.username(), request.email());
    }
}

record RegisterRequest(
        @NotBlank(message = "用户名不能为空")
        @Size(min = 3, max = 20, message = "用户名长度必须在 3 到 20 之间")
        String username,

        @Email(message = "邮箱格式不正确")
        @NotBlank(message = "邮箱不能为空")
        String email,

        @Size(min = 8, max = 30, message = "密码长度必须在 8 到 30 之间")
        String password) {
}

record UserResponse(Long id, String username, String email) {
}`,
    task: "补全 Todo 创建接口的参数校验：title 不能为空且最长 50；priority 必须在 1 到 5；Controller 参数要触发校验。",
    starterCode: `package com.example.demo.todo;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todos")
class TodoController {
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    TodoResponse create(/* TODO: 触发校验 */ @RequestBody CreateTodoRequest request) {
        return new TodoResponse(1L, request.title(), request.priority());
    }
}

record CreateTodoRequest(
        // TODO: title 不能为空，最长 50
        String title,

        // TODO: priority 最小 1，最大 5
        int priority) {
}

record TodoResponse(Long id, String title, int priority) {
}`,
    answerCode: `package com.example.demo.todo;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todos")
class TodoController {
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    TodoResponse create(@Valid @RequestBody CreateTodoRequest request) {
        return new TodoResponse(1L, request.title(), request.priority());
    }
}

record CreateTodoRequest(
        @NotBlank(message = "标题不能为空")
        @Size(max = 50, message = "标题最多 50 个字符")
        String title,

        @Min(value = 1, message = "优先级最小为 1")
        @Max(value = 5, message = "优先级最大为 5")
        int priority) {
}

record TodoResponse(Long id, String title, int priority) {
}`,
    checks: [
      "Controller 方法参数是否同时保留 `@RequestBody` 并添加 `@Valid`。",
      "title 是否使用 `@NotBlank`，能挡住 null、空字符串和全空格。",
      "title 是否使用 `@Size(max = 50)` 限制最长字符数。",
      "priority 是否使用 `@Min(1)` 和 `@Max(5)` 限制范围。",
      "校验注解是否写在请求 DTO 上，而不是只在响应 DTO 上。",
      "是否给关键规则添加了清楚的 message，方便前端展示。"
    ],
    commonMistakes: [
      "只在 DTO 上写注解，却忘记在 Controller 参数上加 `@Valid`，校验不会触发。",
      "用 `@NotNull` 校验字符串，以为能挡住空字符串和全空格。",
      "把校验写在实体类上，然后所有接口被迫使用同一套规则，创建和更新很难区分。",
      "对基本类型 int 使用 `@NotNull`，它本来就不能为 null，应该检查范围。",
      "以为参数校验能替代业务校验，例如用户名是否重复仍然要去 Service 或数据库查。",
      "没有引入 validation starter，注解写了但运行时没有校验能力。"
    ],
    sources: [
      {
        title: "Spring Boot Reference: Validation",
        url: "https://docs.spring.io/spring-boot/reference/io/validation.html"
      },
      {
        title: "Spring Framework Reference: Validation",
        url: "https://docs.spring.io/spring-framework/reference/core/validation/beanvalidation.html"
      },
      {
        title: "Jakarta Validation Specification",
        url: "https://jakarta.ee/specifications/bean-validation/"
      }
    ]
  },
  {
    id: "level10-5-global-exception-handling",
    title: "全局异常处理",
    subtitle: "统一错误响应",
    intro: [
      "接口出错并不可怕，可怕的是每个接口返回的错误格式都不一样：有的返回字符串，有的返回一整段异常堆栈，有的只返回 500。前端和调用方会很难处理，用户也看不懂。",
      "全局异常处理的思路是：业务代码只负责在发现问题时抛出清楚的异常，全局处理器统一把异常翻译成 HTTP 状态码和错误响应体。这样 Controller 和 Service 不需要到处写重复的 try-catch。",
      "Spring MVC 提供 `@RestControllerAdvice` 和 `@ExceptionHandler` 来集中处理异常。你可以处理自己的业务异常，也可以处理参数校验失败、类型转换失败、请求体格式错误等框架异常。",
      "真实项目建议返回稳定的错误结构，例如 `code`、`message`、`details`，或者使用 Spring 支持的 `ProblemDetail`。不要把内部类名、SQL、服务器路径直接返回给外部用户。"
    ],
    syntax: [
      "`@RestControllerAdvice` 会把异常处理结果作为响应体返回，适合 REST API。",
      "`@ExceptionHandler(SomeException.class)` 表示这个方法处理指定类型的异常。",
      "`ProblemDetail` 是 Spring 支持的错误响应模型，适合表达状态码、标题和详情。",
      "业务异常可以携带 `HttpStatus` 和 message，让 Service 抛出时就表达错误语义。",
      "`MethodArgumentNotValidException` 常见于 `@Valid @RequestBody` 校验失败。",
      "404 表示资源不存在，400 表示请求参数不合法，401 表示未登录，403 表示已登录但无权限。",
      "未知异常通常记录日志后返回 500，不要把完整堆栈暴露给调用方。",
      "统一错误响应要保持字段稳定，前端才能按同一套逻辑展示错误。"
    ],
    exampleCode: `package com.example.demo.error;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(ApiException.class)
    ProblemDetail handleApiException(ApiException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(ex.status(), ex.getMessage());
        problem.setTitle(ex.title());
        return problem;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ProblemDetail handleValidation(MethodArgumentNotValidException ex) {
        List<String> fieldErrors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .toList();

        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "请求参数不合法");
        problem.setTitle("参数校验失败");
        problem.setProperty("fieldErrors", fieldErrors);
        return problem;
    }
}

class ApiException extends RuntimeException {
    private final HttpStatus status;
    private final String title;

    ApiException(HttpStatus status, String title, String message) {
        super(message);
        this.status = status;
        this.title = title;
    }

    HttpStatus status() {
        return status;
    }

    String title() {
        return title;
    }

    static ApiException notFound(String message) {
        return new ApiException(HttpStatus.NOT_FOUND, "资源不存在", message);
    }
}`,
    task: "补全统一异常处理：ApiException 携带 HTTP 状态码；GlobalExceptionHandler 处理 ApiException；Service 找不到课程时抛出 404，而不是返回 null。",
    starterCode: `package com.example.demo.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
class GlobalExceptionHandler {
    // TODO: 处理 ApiException，返回 ProblemDetail
}

class ApiException extends RuntimeException {
    private final HttpStatus status;

    ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    HttpStatus status() {
        return status;
    }
}

@Service
class CourseService {
    CourseResponse findById(Long id) {
        CourseResponse course = null;
        if (course == null) {
            // TODO: 抛出 404 业务异常
        }
        return course;
    }
}

record CourseResponse(Long id, String title) {
}`,
    answerCode: `package com.example.demo.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(ApiException.class)
    ProblemDetail handleApiException(ApiException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(ex.status(), ex.getMessage());
        problem.setTitle("业务处理失败");
        return problem;
    }
}

class ApiException extends RuntimeException {
    private final HttpStatus status;

    ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    HttpStatus status() {
        return status;
    }
}

@Service
class CourseService {
    CourseResponse findById(Long id) {
        CourseResponse course = null;
        if (course == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "课程不存在：" + id);
        }
        return course;
    }
}

record CourseResponse(Long id, String title) {
}`,
    checks: [
      "是否使用 `@RestControllerAdvice` 定义全局异常处理类。",
      "是否用 `@ExceptionHandler(ApiException.class)` 捕获业务异常。",
      "ApiException 是否携带 HTTP 状态码，而不是所有错误都返回 500。",
      "处理方法是否返回 `ProblemDetail` 或稳定的错误响应结构。",
      "Service 找不到课程时是否抛出 404 异常，而不是返回 null。",
      "错误信息是否面向调用方可读，没有暴露内部堆栈或数据库细节。"
    ],
    commonMistakes: [
      "每个 Controller 方法都写 try-catch，最后错误格式仍然不统一。",
      "业务出错时返回 null，让后面的代码再触发空指针异常。",
      "把所有异常都吞掉并返回 200，调用方无法知道请求失败。",
      "直接把 `Exception.getStackTrace()` 返回给前端，泄露内部实现细节。",
      "参数校验失败没有单独处理，前端拿不到具体哪个字段错了。",
      "异常类太随意，既没有状态码也没有业务语义，排查时只能看字符串。"
    ],
    sources: [
      {
        title: "Spring Framework Reference: Exceptions",
        url: "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-exceptionhandler.html"
      },
      {
        title: "Spring Framework API: @RestControllerAdvice",
        url: "https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/RestControllerAdvice.html"
      },
      {
        title: "Spring Framework API: ProblemDetail",
        url: "https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/ProblemDetail.html"
      }
    ]
  },
  {
    id: "level10-6-login-register",
    title: "登录注册",
    subtitle: "Session 与 JWT",
    intro: [
      "注册和登录解决的是“系统怎样认识一个用户”。注册通常负责创建账号、检查用户名是否重复、把密码安全保存；登录负责验证身份，并让后续请求能证明“我是谁”。",
      "密码绝不能明文保存。真实项目会使用 `PasswordEncoder` 这类组件把密码做不可逆哈希，登录时用 `matches` 比对原始密码和哈希值。即使数据库泄露，也不应该直接暴露用户原始密码。",
      "Session 和 JWT 都是在登录成功后维持身份的方案。Session 是服务器保存登录状态，浏览器保存一个会话 ID；JWT 是服务器签发一个带签名的令牌，客户端后续用 Bearer Token 带上它。两者各有取舍，不能只看哪个更流行。",
      "本课用 Session 打通最小流程，因为它更适合初学者理解。JWT 在真实项目里要认真处理签名密钥、过期时间、刷新机制和撤销策略，不要自己拼一个看起来像 token 的字符串就上线。"
    ],
    syntax: [
      "`PasswordEncoder.encode(rawPassword)` 用于保存密码前生成哈希。",
      "`PasswordEncoder.matches(rawPassword, encodedPassword)` 用于登录时校验密码。",
      "`BCryptPasswordEncoder` 是 Spring Security 中常用的密码哈希实现之一。",
      "`HttpSession#setAttribute` 可以在 Session 中记录当前登录用户的 id。",
      "Session 登录常依赖 Cookie 保存会话 id，服务端保存会话数据。",
      "JWT 登录通常使用 `Authorization: Bearer token` 请求头携带令牌。",
      "认证 Authentication 解决“你是谁”，授权 Authorization 解决“你能做什么”。",
      "注册、登录接口要配合参数校验、统一异常处理和限流，不能只看能不能跑通。"
    ],
    exampleCode: `package com.example.demo.auth;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
class AuthController {
    private final AuthService authService;

    AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    UserResponse register(@Valid @RequestBody RegisterRequest request) {
        User user = authService.register(request.username(), request.password());
        return new UserResponse(user.id(), user.username());
    }

    @PostMapping("/login")
    LoginResponse login(@Valid @RequestBody LoginRequest request, HttpSession session) {
        User user = authService.login(request.username(), request.password());
        session.setAttribute("LOGIN_USER_ID", user.id());
        return new LoginResponse(user.id(), user.username(), "SESSION");
    }
}

@Service
class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final AtomicLong idGenerator = new AtomicLong(1);
    private final Map<String, User> users = new ConcurrentHashMap<>();

    AuthService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    User register(String username, String password) {
        if (users.containsKey(username)) {
            throw new IllegalArgumentException("用户名已存在");
        }
        User user = new User(idGenerator.getAndIncrement(), username, passwordEncoder.encode(password));
        users.put(username, user);
        return user;
    }

    User login(String username, String password) {
        User user = users.get(username);
        if (user == null || !passwordEncoder.matches(password, user.passwordHash())) {
            throw new IllegalArgumentException("用户名或密码错误");
        }
        return user;
    }
}

@Configuration
class SecurityBeans {
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

record RegisterRequest(
        @NotBlank String username,
        @Size(min = 8, max = 30) String password) {
}

record LoginRequest(
        @NotBlank String username,
        @NotBlank String password) {
}

record LoginResponse(Long userId, String username, String loginType) {
}

record UserResponse(Long id, String username) {
}

record User(Long id, String username, String passwordHash) {
}`,
    task: "补全最小登录流程：注册时保存密码哈希；登录时用 PasswordEncoder 校验；登录成功后把 userId 放进 HttpSession。不要保存或返回明文密码。",
    starterCode: `package com.example.demo.auth;

import jakarta.servlet.http.HttpSession;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
class AuthController {
    private final AuthService authService;

    AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    UserResponse login(@RequestBody LoginRequest request, HttpSession session) {
        User user = authService.login(request.username(), request.password());
        // TODO: 把 user.id() 保存到 Session
        return new UserResponse(user.id(), user.username());
    }
}

@Service
class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final Map<String, User> users = new ConcurrentHashMap<>();

    AuthService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        // TODO: 保存一个测试用户，密码为 password123，但 Map 中只能保存哈希
    }

    User login(String username, String password) {
        User user = users.get(username);
        // TODO: 用户不存在或密码不匹配时抛出异常
        return user;
    }
}

record LoginRequest(String username, String password) {
}

record UserResponse(Long id, String username) {
}

record User(Long id, String username, String passwordHash) {
}`,
    answerCode: `package com.example.demo.auth;

import jakarta.servlet.http.HttpSession;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
class AuthController {
    private final AuthService authService;

    AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    UserResponse login(@RequestBody LoginRequest request, HttpSession session) {
        User user = authService.login(request.username(), request.password());
        session.setAttribute("LOGIN_USER_ID", user.id());
        return new UserResponse(user.id(), user.username());
    }
}

@Service
class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final Map<String, User> users = new ConcurrentHashMap<>();

    AuthService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        users.put("xiaolin", new User(1L, "xiaolin", passwordEncoder.encode("password123")));
    }

    User login(String username, String password) {
        User user = users.get(username);
        if (user == null || !passwordEncoder.matches(password, user.passwordHash())) {
            throw new IllegalArgumentException("用户名或密码错误");
        }
        return user;
    }
}

record LoginRequest(String username, String password) {
}

record UserResponse(Long id, String username) {
}

record User(Long id, String username, String passwordHash) {
}`,
    checks: [
      "是否通过 `PasswordEncoder.encode` 保存密码哈希，而不是保存明文密码。",
      "登录时是否通过 `PasswordEncoder.matches` 校验密码。",
      "用户名不存在和密码错误时是否都拒绝登录。",
      "登录成功后是否把用户 id 写入 `HttpSession`。",
      "响应对象是否只返回用户 id 和用户名，没有返回 password 或 passwordHash。",
      "是否能说清 Session 和 JWT 都是登录后的身份保持方案，但实现方式不同。"
    ],
    commonMistakes: [
      "把密码原样存进数据库或日志，后续再补救会非常麻烦。",
      "登录时重新 encode 一次再用字符串比较，因为 BCrypt 每次盐不同，结果通常不相等。",
      "为了方便调试把 passwordHash 返回给前端，泄露了敏感信息。",
      "把 JWT 当成普通随机字符串，不做签名、过期时间和服务端校验。",
      "注册和登录不做参数校验，空用户名、超短密码也能进入业务逻辑。",
      "错误提示过细，例如明确告诉用户“用户名存在但密码错”，增加撞库风险。"
    ],
    sources: [
      {
        title: "Spring Security Reference: Password Storage",
        url: "https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html"
      },
      {
        title: "Spring Security Reference: Username/Password Authentication",
        url: "https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/index.html"
      },
      {
        title: "Spring Security Reference: Session Management",
        url: "https://docs.spring.io/spring-security/reference/servlet/authentication/session-management.html"
      },
      {
        title: "Spring Security Reference: OAuth2 Resource Server JWT",
        url: "https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html"
      }
    ]
  },
  {
    id: "level10-7-authorization",
    title: "权限控制",
    subtitle: "角色和资源",
    intro: [
      "登录只能证明“你是谁”，权限控制还要判断“你能不能做这件事”。一个普通用户可以查看自己的订单，但不应该删除别人的订单；管理员可以管理课程，但不应该把所有接口都无条件放开。",
      "Spring Security 会把请求放进一条过滤器链里处理。你可以配置哪些路径允许匿名访问，哪些路径必须登录，哪些路径必须有某个角色或权限。路径级控制适合先守住接口入口。",
      "除了路径控制，真实业务还需要方法级控制。比如同样是 `/api/orders/{id}`，用户 A 只能看自己的订单，管理员可以看全部。这个时候常会在 Service 方法上结合 `@PreAuthorize` 或业务代码检查资源归属。",
      "要分清 401 和 403：401 通常表示还没登录或身份无效；403 表示已经识别出用户，但用户没有权限。状态码准确，前端和调用方才能做正确提示。"
    ],
    syntax: [
      "`SecurityFilterChain` 是 Spring Security 配置 Web 安全规则的核心 Bean。",
      "`authorizeHttpRequests` 用来声明不同请求路径的访问规则。",
      "`requestMatchers(\"/api/admin/**\").hasRole(\"ADMIN\")` 表示需要 ADMIN 角色。",
      "`anyRequest().authenticated()` 表示其他请求都需要登录。",
      "`permitAll()` 放行公开接口，例如登录、注册、公开文档。",
      "`@EnableMethodSecurity` 开启方法级权限注解。",
      "`@PreAuthorize(\"hasRole('ADMIN')\")` 可以在方法执行前检查权限。",
      "角色 Role 常表示身份类别，权限 Authority 更适合表达具体动作，例如 `course:delete`。"
    ],
    exampleCode: `package com.example.demo.security;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Configuration
@EnableMethodSecurity
class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/courses/**").permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .httpBasic(withDefaults())
                .build();
    }
}

@RestController
@RequestMapping("/api/admin/courses")
class AdminCourseController {
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    void delete(@PathVariable Long id) {
        // 删除课程
    }
}

@RestController
@RequestMapping("/api/courses")
class PublicCourseController {
    @GetMapping("/{id}")
    String detail(@PathVariable Long id) {
        return "课程详情：" + id;
    }
}`,
    task: "补全安全规则：登录注册接口允许匿名；GET 课程详情允许匿名；`/api/admin/**` 需要 ADMIN 角色；其他接口只要登录即可。",
    starterCode: `package com.example.demo.security;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> auth
                        // TODO: /api/auth/** 允许匿名
                        // TODO: GET /api/courses/** 允许匿名
                        // TODO: /api/admin/** 需要 ADMIN 角色
                        // TODO: 其他请求需要登录
                )
                .httpBasic(withDefaults())
                .build();
    }
}`,
    answerCode: `package com.example.demo.security;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/courses/**").permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .httpBasic(withDefaults())
                .build();
    }
}`,
    checks: [
      "是否定义了 `SecurityFilterChain` Bean。",
      "`/api/auth/**` 是否使用 `permitAll()`，保证用户能登录和注册。",
      "GET `/api/courses/**` 是否允许匿名访问，而不是放开所有课程写操作。",
      "`/api/admin/**` 是否要求 `hasRole(\"ADMIN\")`。",
      "兜底规则是否使用 `anyRequest().authenticated()`。",
      "规则顺序是否从具体到兜底，避免前面的宽规则提前匹配。"
    ],
    commonMistakes: [
      "把 `anyRequest().permitAll()` 放在最后，等于所有接口都裸奔。",
      "把登录接口也设成必须登录，结果用户永远无法登录。",
      "误以为 `hasRole(\"ADMIN\")` 要给用户存 `ADMIN`，实际默认会匹配 `ROLE_ADMIN`。",
      "只做前端按钮隐藏，不做后端权限检查，请求仍然可以被直接调用。",
      "路径级权限写了，但资源归属没有检查，用户可能访问别人的数据。",
      "分不清 401 和 403，导致前端错误地跳登录或显示无权限。"
    ],
    sources: [
      {
        title: "Spring Security Reference: Authorize HTTP Requests",
        url: "https://docs.spring.io/spring-security/reference/servlet/authorization/authorize-http-requests.html"
      },
      {
        title: "Spring Security Reference: Method Security",
        url: "https://docs.spring.io/spring-security/reference/servlet/authorization/method-security.html"
      },
      {
        title: "Spring Security Reference: Architecture",
        url: "https://docs.spring.io/spring-security/reference/servlet/architecture.html"
      }
    ]
  },
  {
    id: "level10-8-file-upload",
    title: "文件上传",
    subtitle: "头像和附件",
    intro: [
      "文件上传和普通 JSON 请求不一样。上传头像、附件时，请求通常使用 `multipart/form-data`，一部分是表单字段，一部分是文件二进制内容。Spring MVC 会把文件包装成 `MultipartFile`。",
      "上传功能看起来简单，但真实项目里风险很多：文件太大撑爆磁盘，用户上传脚本伪装成图片，文件名带路径导致覆盖系统文件，同名文件互相覆盖。这些都需要在后端认真处理。",
      "后端不要完全相信浏览器传来的文件名和类型。更稳妥的做法是限制大小、限制允许的内容类型、生成新的服务器文件名，并把文件保存到明确的上传目录。",
      "上传接口最好只返回文件 id、访问 URL 或存储后的安全文件名，不要返回服务器绝对路径。后续如果把本地磁盘换成对象存储，外部接口也不应该被迫大改。"
    ],
    syntax: [
      "`MultipartFile` 表示上传上来的一个文件，可以读取原始文件名、大小、类型和输入流。",
      "`@RequestParam(\"file\") MultipartFile file` 用于接收 multipart 表单中的文件字段。",
      "`consumes = MediaType.MULTIPART_FORM_DATA_VALUE` 可以明确接口接收 multipart 请求。",
      "`file.isEmpty()` 用于判断用户是否真的上传了内容。",
      "`file.getContentType()` 可以读取浏览器上报的 MIME 类型，但不能当成唯一安全依据。",
      "`UUID.randomUUID()` 常用于生成服务器端文件名，避免同名覆盖。",
      "`Path.normalize()` 和 `startsWith` 可以帮助检查目标路径是否仍在允许目录下。",
      "`spring.servlet.multipart.max-file-size` 和 `max-request-size` 可以限制上传大小。"
    ],
    exampleCode: `package com.example.demo.upload;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
class FileUploadController {
    private final Path uploadRoot = Path.of("uploads").toAbsolutePath().normalize();
    private final List<String> allowedTypes = List.of("image/png", "image/jpeg");

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    UploadResponse upload(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("上传文件不能为空");
        }
        if (!allowedTypes.contains(file.getContentType())) {
            throw new IllegalArgumentException("只允许上传 PNG 或 JPEG 图片");
        }

        Files.createDirectories(uploadRoot);
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID() + "." + (extension == null ? "bin" : extension.toLowerCase());
        Path target = uploadRoot.resolve(filename).normalize();
        if (!target.startsWith(uploadRoot)) {
            throw new IllegalArgumentException("文件路径不合法");
        }

        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        return new UploadResponse(filename, "/files/" + filename);
    }
}

record UploadResponse(String filename, String url) {
}

// 文件：src/main/resources/application.yml
spring:
  servlet:
    multipart:
      max-file-size: 2MB
      max-request-size: 2MB`,
    task: "补全头像上传接口：接收字段名为 avatar 的文件；拒绝空文件；只允许 image/png；保存前生成 UUID 文件名；返回文件名和访问路径。",
    starterCode: `package com.example.demo.upload;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/avatars")
class AvatarController {
    private final Path uploadRoot = Path.of("uploads", "avatars").toAbsolutePath().normalize();

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    AvatarResponse upload(@RequestParam("avatar") MultipartFile avatar) throws IOException {
        // TODO: 拒绝空文件
        // TODO: 只允许 image/png
        Files.createDirectories(uploadRoot);

        // TODO: 生成 UUID 文件名，后缀为 .png
        Path target = uploadRoot.resolve("TODO.png").normalize();
        // TODO: 检查 target 仍在 uploadRoot 目录下
        // TODO: 保存文件
        return new AvatarResponse(target.getFileName().toString(), "/avatars/" + target.getFileName());
    }
}

record AvatarResponse(String filename, String url) {
}`,
    answerCode: `package com.example.demo.upload;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/avatars")
class AvatarController {
    private final Path uploadRoot = Path.of("uploads", "avatars").toAbsolutePath().normalize();

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    AvatarResponse upload(@RequestParam("avatar") MultipartFile avatar) throws IOException {
        if (avatar.isEmpty()) {
            throw new IllegalArgumentException("头像不能为空");
        }
        if (!MediaType.IMAGE_PNG_VALUE.equals(avatar.getContentType())) {
            throw new IllegalArgumentException("只允许上传 PNG 头像");
        }

        Files.createDirectories(uploadRoot);

        String filename = UUID.randomUUID() + ".png";
        Path target = uploadRoot.resolve(filename).normalize();
        if (!target.startsWith(uploadRoot)) {
            throw new IllegalArgumentException("文件路径不合法");
        }

        Files.copy(avatar.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        return new AvatarResponse(filename, "/avatars/" + filename);
    }
}

record AvatarResponse(String filename, String url) {
}`,
    checks: [
      "接口是否声明接收 `multipart/form-data`。",
      "是否使用 `@RequestParam(\"avatar\") MultipartFile avatar` 接收文件。",
      "是否用 `isEmpty()` 拒绝空文件。",
      "是否限制内容类型为 `image/png`。",
      "是否生成服务器端 UUID 文件名，避免使用用户原始文件名保存。",
      "保存前是否创建目录，并确认目标路径仍在上传目录下。",
      "响应是否只返回安全文件名和访问路径，没有暴露服务器绝对路径。"
    ],
    commonMistakes: [
      "用 `@RequestBody` 接收上传文件，结果 multipart 请求无法正常绑定。",
      "直接使用用户原始文件名保存，可能重名覆盖或包含危险路径片段。",
      "只在前端限制文件类型，后端完全不检查，接口可以被绕过。",
      "不限制上传大小，少量请求就可能占满磁盘或内存。",
      "把上传目录放在源码目录里，部署、清理和版本管理都会混乱。",
      "返回本机绝对路径，例如 `D:\\server\\uploads\\x.png`，暴露内部结构且前端无法稳定访问。"
    ],
    sources: [
      {
        title: "Spring Boot Reference: Multipart Support",
        url: "https://docs.spring.io/spring-boot/reference/web/servlet.html#web.servlet.multipart"
      },
      {
        title: "Spring Guide: Uploading Files",
        url: "https://spring.io/guides/gs/uploading-files/"
      },
      {
        title: "Spring Framework API: MultipartFile",
        url: "https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/multipart/MultipartFile.html"
      }
    ]
  },
  {
    id: "level10-9-api-docs",
    title: "接口文档",
    subtitle: "OpenAPI/Swagger",
    intro: [
      "接口文档是前后端、测试、客户端之间的共同语言。一个接口不只要说明路径，还要说明请求方法、参数、请求体、响应字段、状态码和错误格式。文档越清楚，沟通成本越低。",
      "OpenAPI 是描述 HTTP API 的通用规范，Swagger UI 可以把 OpenAPI 文档渲染成可浏览、可试调的页面。Spring Boot 项目里常用 springdoc-openapi 根据 Controller 和注解生成文档。",
      "Spring REST Docs 是另一种思路：通过测试生成文档。它强调文档和测试一起维护，接口行为变了但文档没更新时，测试可以帮你发现。这种方式更适合对文档准确性要求很高的团队。",
      "无论文档工具怎么选，都不要把文档当成最后才补的说明书。设计接口时就应该想清楚资源命名、状态码、错误响应和权限要求，让文档成为接口契约的一部分。"
    ],
    syntax: [
      "`OpenAPI` 文档通常包含 paths、operations、parameters、requestBody、responses 等部分。",
      "`@Operation(summary = \"...\")` 可以给接口方法补充摘要说明。",
      "`@ApiResponse(responseCode = \"200\", description = \"...\")` 描述响应状态码和含义。",
      "`@Tag(name = \"courses\")` 可以给一组接口分类。",
      "Swagger UI 通常用于浏览和试调 OpenAPI 文档，开发阶段很方便。",
      "Spring REST Docs 通过测试片段生成文档，常和 MockMvc、WebTestClient 搭配。",
      "接口文档应写清请求示例、响应示例、错误格式和认证方式。",
      "不要只写成功响应；400、401、403、404 这些失败场景对调用方同样重要。"
    ],
    exampleCode: `package com.example.demo.docs;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Configuration
class OpenApiConfig {
    @Bean
    OpenAPI courseOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Java Master API")
                        .version("v1")
                        .description("课程学习系统接口"));
    }
}

@RestController
@RequestMapping("/api/courses")
@Tag(name = "courses", description = "课程接口")
class DocumentedCourseController {
    @GetMapping("/{id}")
    @Operation(summary = "查询课程详情", description = "根据课程 id 返回课程标题和课时数")
    @ApiResponse(responseCode = "200", description = "查询成功")
    @ApiResponse(responseCode = "404", description = "课程不存在", content = @Content)
    CourseResponse findById(@PathVariable Long id) {
        return new CourseResponse(id, "Spring Boot", 12);
    }
}

record CourseResponse(Long id, String title, int hours) {
}

// Maven 依赖示例：
// org.springdoc:springdoc-openapi-starter-webmvc-ui`,
    task: "补全课程详情接口文档：添加 OpenAPI 基本信息；给 Controller 加 Tag；给查询方法写 Operation；说明 200 成功和 404 不存在两种响应。",
    starterCode: `package com.example.demo.docs;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Configuration
class OpenApiConfig {
    @Bean
    OpenAPI openAPI() {
        // TODO: 返回带 title、version、description 的 OpenAPI
    }
}

@RestController
@RequestMapping("/api/courses")
// TODO: 给课程接口添加 @Tag
class CourseDocController {
    @GetMapping("/{id}")
    // TODO: 添加 @Operation
    // TODO: 添加 200 和 404 的 @ApiResponse
    CourseResponse findById(@PathVariable Long id) {
        return new CourseResponse(id, "Spring Boot", 12);
    }
}

record CourseResponse(Long id, String title, int hours) {
}`,
    answerCode: `package com.example.demo.docs;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Configuration
class OpenApiConfig {
    @Bean
    OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Java Master API")
                        .version("v1")
                        .description("课程学习系统接口"));
    }
}

@RestController
@RequestMapping("/api/courses")
@Tag(name = "courses", description = "课程接口")
class CourseDocController {
    @GetMapping("/{id}")
    @Operation(summary = "查询课程详情", description = "根据课程 id 返回课程标题和课时数")
    @ApiResponse(responseCode = "200", description = "查询成功")
    @ApiResponse(responseCode = "404", description = "课程不存在", content = @Content)
    CourseResponse findById(@PathVariable Long id) {
        return new CourseResponse(id, "Spring Boot", 12);
    }
}

record CourseResponse(Long id, String title, int hours) {
}`,
    checks: [
      "是否定义了返回 `OpenAPI` 的配置 Bean。",
      "OpenAPI 信息中是否包含 title、version 和 description。",
      "Controller 是否使用 `@Tag` 做接口分类。",
      "查询方法是否使用 `@Operation` 说明接口用途。",
      "是否至少写明 200 成功和 404 资源不存在两种响应。",
      "文档注解是否贴近真实接口行为，而不是写无关描述。",
      "是否知道 OpenAPI/Swagger UI 和 Spring REST Docs 是两种不同的文档路线。"
    ],
    commonMistakes: [
      "只把 Swagger UI 跑起来，却不维护摘要、响应码和错误说明。",
      "文档里写 200，但代码实际可能返回 404、400、403，调用方准备不足。",
      "把内部实现细节写进公开文档，例如数据库表名、服务器文件路径。",
      "接口改名、字段改名后忘记同步文档，前后端按旧契约开发。",
      "只记录成功示例，不记录参数错误和无权限等失败场景。",
      "把文档工具当成替代接口设计的工具，资源命名和状态码仍然混乱。"
    ],
    sources: [
      {
        title: "OpenAPI Specification",
        url: "https://spec.openapis.org/oas/latest.html"
      },
      {
        title: "Spring REST Docs Reference",
        url: "https://docs.spring.io/spring-restdocs/docs/current/reference/htmlsingle/"
      },
      {
        title: "springdoc-openapi Documentation",
        url: "https://springdoc.org/"
      },
      {
        title: "Swagger: OpenAPI Specification",
        url: "https://swagger.io/specification/"
      }
    ]
  }
];
