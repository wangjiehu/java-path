window.LESSON_CONTENT_LEVEL8 = [
  {
    id: "level8-1-debug",
    title: "Debug 调试",
    subtitle: "断点和变量观察",
    intro: [
      "调试不是“把代码盯到它自己承认错误”，而是让程序在关键位置停下来，观察变量、调用路径和执行顺序。初学时最常用的方法是打印日志，但只靠 println 很容易把控制台刷满，也不容易看清某一行代码执行前后的状态。",
      "断点可以理解成你放在代码路上的暂停标记。程序运行到断点时会停住，IDE 会显示当前变量的值、调用栈、线程状态等信息。你可以一行一行往下走，而不是靠猜测判断程序到底执行到了哪里。",
      "调试时要带着问题进去：哪个输入触发了错误？期望值是什么？实际值从哪一步开始变坏？把问题缩小到一个最小可复现例子，通常比在整段大程序里乱翻更有效。",
      "好的调试习惯会直接提升独立开发能力。你不只是修掉这一次 bug，还会学会验证假设、读懂错误现场、记录修复原因，并在修复后补上测试或检查，防止同类问题再回来。"
    ],
    syntax: [
      "断点 Breakpoint：让程序在指定行暂停，方便观察这一行执行前后的状态。",
      "继续 Continue：从当前暂停点继续运行，直到下一个断点、异常或程序结束。",
      "单步跳过 Step Over：执行当前行；如果当前行调用方法，不进入方法内部。",
      "单步进入 Step Into：进入当前行调用的方法内部，适合追踪自己写的方法。",
      "单步跳出 Step Out：从当前方法继续运行到返回调用者的位置。",
      "变量 Variables：查看当前作用域里变量的实时值，尤其适合观察循环变量和方法参数。",
      "监视 Watch：手动添加表达式，例如 `total / count`，每次暂停时观察它的值。",
      "调用栈 Call Stack：查看程序是从哪些方法一步步走到当前位置的。",
      "异常断点 Exception Breakpoint：让程序在抛出异常的位置暂停，而不是只看到最后打印的错误信息。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        int[] prices = {120, 80, 50};
        int total = calculateTotal(prices, true);

        System.out.println("应付金额：" + total);
    }

    static int calculateTotal(int[] prices, boolean member) {
        int total = 0;

        for (int i = 0; i < prices.length; i++) {
            total += prices[i];
        }

        if (member) {
            total -= 30;
        }

        return total;
    }
}`,
    task: "starterCode 里有两个常见逻辑错误。请用调试思路修复：统计及格人数时，60 分也应该算及格；循环也不能漏掉最后一个成绩。修复后程序输出“及格人数：4”。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int[] scores = {59, 60, 75, 88, 100};
        int passed = countPassed(scores);

        System.out.println("及格人数：" + passed);
    }

    static int countPassed(int[] scores) {
        int count = 0;

        for (int i = 0; i < scores.length - 1; i++) {
            if (scores[i] > 60) {
                count++;
            }
        }

        return count;
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        int[] scores = {59, 60, 75, 88, 100};
        int passed = countPassed(scores);

        System.out.println("及格人数：" + passed);
    }

    static int countPassed(int[] scores) {
        int count = 0;

        for (int i = 0; i < scores.length; i++) {
            if (scores[i] >= 60) {
                count++;
            }
        }

        return count;
    }
}`,
    checks: [
      "是否能说明断点应该放在循环内部的 if 附近，而不是只盯着最后一行输出。",
      "循环条件是否改为 `i < scores.length`，确保最后一个成绩会被检查。",
      "及格判断是否使用 `>= 60`，包含刚好 60 分的边界。",
      "是否保留 countPassed 方法，让问题仍然可以在方法内部单步观察。",
      "最终输出是否为“及格人数：4”。",
      "修复时是否没有把结果直接写死成 4。"
    ],
    commonMistakes: [
      "看到结果不对就直接改输出文本，而不是追踪数据从哪里变错。",
      "只在 main 方法里打断点，没进入真正产生结果的 countPassed 方法。",
      "把 `scores.length - 1` 理解成最后一个下标，却忘了循环条件已经使用小于号。",
      "修复了循环漏项，却忘记 60 分边界也应该算通过。",
      "调试时不停点击继续，跳过了最应该观察的变量变化。",
      "修完 bug 后不再用原始数据运行一遍，导致只改了一半。"
    ],
    sources: [
      {
        title: "Visual Studio Code: Running and Debugging Java",
        url: "https://code.visualstudio.com/docs/java/java-debugging"
      },
      {
        title: "Visual Studio Code: Debug Code",
        url: "https://code.visualstudio.com/docs/debugtest/debugging"
      },
      {
        title: "Oracle JDK 26 Tool Guide: The jdb Command",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/man/jdb.html"
      }
    ]
  },
  {
    id: "level8-2-junit-5-intro",
    title: "JUnit 5 入门",
    subtitle: "给代码写测试",
    intro: [
      "当程序变大以后，只靠手动运行 main 方法很难保证每次修改都没有破坏旧功能。JUnit 5 可以让你把“这个方法应该得到什么结果”写成可重复运行的测试代码。",
      "测试不是为了证明自己永远正确，而是为了快速发现哪里不对。一个好的单元测试通常很小，只验证一个明确行为：给定输入、调用方法、检查输出。这种结构也常被叫作 Arrange、Act、Assert。",
      "JUnit 5 里的测试方法通常用 `@Test` 标记。运行测试时，测试框架会自动找到这些方法，执行它们，并报告通过、失败或异常。失败信息越清楚，你定位问题就越快。",
      "小白阶段要先养成两个习惯：业务代码和测试代码分开放；测试名字写清楚场景。未来接触 Maven、Gradle、持续集成时，这些测试会成为工具链自动检查代码质量的基础。"
    ],
    syntax: [
      "`@Test` 标记一个测试方法，方法通常不需要 public，也不需要返回值。",
      "`assertEquals(expected, actual)` 检查期望值和实际值是否相等。",
      "`assertTrue(condition)` 和 `assertFalse(condition)` 检查 boolean 条件。",
      "`@DisplayName` 可以给测试写更容易阅读的说明，测试报告里会显示它。",
      "测试类名通常以 Test 结尾，例如 `CalculatorTest`，方便工具识别和团队阅读。",
      "测试方法应该彼此独立，不能依赖另一个测试先运行或留下的数据。",
      "Maven 项目通常把业务代码放在 `src/main/java`，测试代码放在 `src/test/java`。",
      "运行测试常见命令是 `mvn test` 或 `gradle test`，IDE 里也可以直接点击测试按钮。"
    ],
    exampleCode: `// 文件：src/main/java/Calculator.java
class Calculator {
    int add(int left, int right) {
        return left + right;
    }

    boolean isEven(int number) {
        return number % 2 == 0;
    }
}

// 文件：src/test/java/CalculatorTest.java
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CalculatorTest {
    @Test
    @DisplayName("add 可以计算两个整数的和")
    void addReturnsSum() {
        Calculator calculator = new Calculator();

        int result = calculator.add(2, 3);

        assertEquals(5, result);
    }

    @Test
    void isEvenReturnsTrueForEvenNumber() {
        Calculator calculator = new Calculator();

        assertTrue(calculator.isEven(8));
    }
}`,
    task: "给 GradeService 写 JUnit 5 测试：score 为 90 时返回 A，score 为 75 时返回 B，score 为 59 时返回 C。测试要调用方法得到实际结果，不要只测试固定字符串。",
    starterCode: `// 文件：src/main/java/GradeService.java
class GradeService {
    String level(int score) {
        if (score >= 90) {
            return "A";
        }
        if (score >= 60) {
            return "B";
        }
        return "C";
    }
}

// 文件：src/test/java/GradeServiceTest.java
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GradeServiceTest {
    @Test
    void returnsAForExcellentScore() {
        // TODO: 创建 GradeService，并断言 90 分返回 A
    }

    @Test
    void returnsBForPassedScore() {
        // TODO: 断言 75 分返回 B
    }

    @Test
    void returnsCForFailedScore() {
        // TODO: 断言 59 分返回 C
    }
}`,
    answerCode: `// 文件：src/main/java/GradeService.java
class GradeService {
    String level(int score) {
        if (score >= 90) {
            return "A";
        }
        if (score >= 60) {
            return "B";
        }
        return "C";
    }
}

// 文件：src/test/java/GradeServiceTest.java
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GradeServiceTest {
    @Test
    void returnsAForExcellentScore() {
        GradeService service = new GradeService();

        assertEquals("A", service.level(90));
    }

    @Test
    void returnsBForPassedScore() {
        GradeService service = new GradeService();

        assertEquals("B", service.level(75));
    }

    @Test
    void returnsCForFailedScore() {
        GradeService service = new GradeService();

        assertEquals("C", service.level(59));
    }
}`,
    checks: [
      "是否导入了 `org.junit.jupiter.api.Test`。",
      "是否使用静态导入 `assertEquals`，让断言写法简洁清楚。",
      "是否至少写了三个测试方法，分别覆盖 A、B、C 三类结果。",
      "每个测试是否都真正调用了 `service.level(...)`。",
      "断言顺序是否是期望值在前、实际值在后。",
      "测试方法名是否能表达被测场景，而不是只写 test1、test2。"
    ],
    commonMistakes: [
      "把测试写进 main 方法里，导致它不能被 JUnit 自动发现。",
      "忘记给测试方法加 `@Test`，运行测试时显示没有测试。",
      "把 `assertEquals(service.level(90), \"A\")` 的顺序写反，失败信息会变得不好读。",
      "只测试 90 分，不测试通过和不通过的普通场景。",
      "测试依赖运行顺序，例如第一个测试创建的对象被第二个测试继续使用。",
      "为了让测试通过去修改测试期望，而不是先确认业务规则。"
    ],
    sources: [
      {
        title: "JUnit 5 User Guide",
        url: "https://docs.junit.org/5.9.1/user-guide/index.html"
      },
      {
        title: "JUnit 5 API: Assertions",
        url: "https://docs.junit.org/5.14.4/api/org.junit.jupiter.api/org/junit/jupiter/api/Assertions.html"
      },
      {
        title: "Visual Studio Code: Testing Java",
        url: "https://code.visualstudio.com/docs/java/java-testing"
      }
    ]
  },
  {
    id: "level8-3-assertions-boundaries",
    title: "断言与测试边界",
    subtitle: "让测试真正抓住问题",
    intro: [
      "断言是测试里的“验收标准”。程序运行出一个结果以后，断言负责判断这个结果是否符合预期。没有断言的测试，就像只把程序跑了一遍，却没有认真检查结果。",
      "边界值是测试中特别容易发现 bug 的地方。比如及格线 60、数组最后一个下标、满减活动的门槛、空字符串、0 个元素，这些位置最容易出现大于和大于等于、少循环一次、空值没处理等问题。",
      "测试边界不是把所有数字都试一遍，而是选择有代表性的点。常见做法是选边界本身、边界前一个值、边界后一个值，再加上一两个普通值。这样测试数量不多，却能覆盖很多真实风险。",
      "写断言时要让失败信息能帮你定位问题。一个测试最好只表达一个主要规则；如果一个测试里塞进太多不相关断言，失败时你会花更多时间判断到底是哪条规则坏了。"
    ],
    syntax: [
      "`assertEquals(expected, actual)` 适合检查计算结果、返回文本、数量等确定值。",
      "`assertTrue(condition)` 适合检查一个业务条件是否成立，例如是否包含某个元素。",
      "`assertFalse(condition)` 适合检查某个条件不成立，例如非法密码不能通过。",
      "`assertThrows(ExceptionType.class, executable)` 检查某段代码是否按预期抛出异常。",
      "`assertAll(...)` 可以把同一场景下的多条相关断言组合起来，看到多处失败信息。",
      "边界测试常选 `min`、`min + 1`、`max - 1`、`max`、`max + 1` 这类点。",
      "等价类测试把输入分成几类，每类挑代表值，例如不及格、及格、优秀。",
      "测试名建议包含条件和期望，例如 `returnsFreeShippingAt200Yuan`。"
    ],
    exampleCode: `import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ShippingFeeTest {
    @Test
    void returnsZeroAtFreeShippingBoundary() {
        assertEquals(0, ShippingFee.calculate(200));
    }

    @Test
    void returnsFeeBeforeFreeShippingBoundary() {
        assertEquals(12, ShippingFee.calculate(199));
    }

    @Test
    void rejectsNegativeAmount() {
        assertThrows(IllegalArgumentException.class, () -> ShippingFee.calculate(-1));
    }
}

class ShippingFee {
    static int calculate(int amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("amount must not be negative");
        }
        if (amount >= 200) {
            return 0;
        }
        return 12;
    }
}`,
    task: "为 PasswordRules.isValid 设计边界测试：密码长度至少 6 位；null、5 位字符串、6 位字符串、普通长字符串都要覆盖。请补全测试类。",
    starterCode: `import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PasswordRulesTest {
    @Test
    void rejectsNullPassword() {
        // TODO: null 应该返回 false
    }

    @Test
    void rejectsPasswordShorterThanSixCharacters() {
        // TODO: "abcde" 应该返回 false
    }

    @Test
    void acceptsPasswordAtSixCharacters() {
        // TODO: "abcdef" 应该返回 true
    }

    @Test
    void acceptsLongerPassword() {
        // TODO: "java2026" 应该返回 true
    }
}

class PasswordRules {
    static boolean isValid(String password) {
        return password != null && password.length() >= 6;
    }
}`,
    answerCode: `import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PasswordRulesTest {
    @Test
    void rejectsNullPassword() {
        assertFalse(PasswordRules.isValid(null));
    }

    @Test
    void rejectsPasswordShorterThanSixCharacters() {
        assertFalse(PasswordRules.isValid("abcde"));
    }

    @Test
    void acceptsPasswordAtSixCharacters() {
        assertTrue(PasswordRules.isValid("abcdef"));
    }

    @Test
    void acceptsLongerPassword() {
        assertTrue(PasswordRules.isValid("java2026"));
    }
}

class PasswordRules {
    static boolean isValid(String password) {
        return password != null && password.length() >= 6;
    }
}`,
    checks: [
      "是否覆盖 null 输入，避免只测试正常字符串。",
      "是否覆盖长度 5，也就是边界前一个非法值。",
      "是否覆盖长度 6，也就是刚好满足规则的边界值。",
      "是否覆盖一个普通合法长密码，确认正常路径可用。",
      "是否分别使用 `assertFalse` 和 `assertTrue` 表达期望。",
      "测试是否没有依赖控制台输出或人工观察。"
    ],
    commonMistakes: [
      "只测试一个合法值，导致小于 6 位的错误实现也可能漏过去。",
      "把边界写成长度大于 6，导致刚好 6 位被错误拒绝。",
      "忘记测试 null，真实调用时可能出现 NullPointerException。",
      "用 `System.out.println` 打印结果，却没有写任何断言。",
      "把测试名写得太抽象，失败报告里看不出是哪条业务规则。",
      "为了追求覆盖率写很多重复测试，却没有覆盖真正的边界。"
    ],
    sources: [
      {
        title: "JUnit 5 User Guide: Writing Tests",
        url: "https://docs.junit.org/5.9.1/user-guide/index.html#writing-tests"
      },
      {
        title: "JUnit 5 User Guide: Assertions",
        url: "https://docs.junit.org/5.9.1/user-guide/index.html#writing-tests-assertions"
      },
      {
        title: "JUnit 5 API: Assertions",
        url: "https://docs.junit.org/5.14.4/api/org.junit.jupiter.api/org/junit/jupiter/api/Assertions.html"
      }
    ]
  },
  {
    id: "level8-4-maven-intro",
    title: "Maven 入门",
    subtitle: "项目结构和依赖管理",
    intro: [
      "当项目只有一个 Main.java 时，点击运行就够了。但真实项目会有很多源码、测试、第三方库和打包需求。Maven 的作用，就是用一套约定和配置把这些事情变得可重复。",
      "Maven 项目的核心文件是 pom.xml。POM 里会写项目坐标、依赖、插件、Java 版本等信息。别人拿到项目后，只要安装了 Maven，就能根据同一份配置编译、测试和打包。",
      "Maven 很重视约定目录。业务代码通常放在 src/main/java，测试代码放在 src/test/java。你不需要每次都告诉工具源码在哪里，因为大家遵守同一套项目结构。",
      "学 Maven 的重点不是背 XML，而是理解构建生命周期：compile 编译，test 运行测试，package 打包。掌握这些命令后，你就能让项目从“我电脑上能跑”变成“团队和流水线都能跑”。"
    ],
    syntax: [
      "`pom.xml` 是 Maven 项目的主要配置文件。",
      "`groupId` 通常表示组织或包名，例如 `com.example`。",
      "`artifactId` 是项目或模块名，例如 `java-toolbox`。",
      "`version` 表示当前项目版本，例如 `1.0-SNAPSHOT`。",
      "`dependencies` 用来声明第三方库，Maven 会按坐标下载依赖。",
      "`src/main/java` 放业务源码，`src/test/java` 放测试源码。",
      "`mvn compile` 编译主代码，`mvn test` 编译并运行测试。",
      "`mvn package` 会先执行前面的必要阶段，再生成 jar 等构建产物。",
      "`mvn clean` 删除 target 目录，适合重新做一次干净构建。"
    ],
    exampleCode: `<!-- 文件：pom.xml -->
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>quality-demo</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.release>17</maven.compiler.release>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.14.4</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.5.4</version>
            </plugin>
        </plugins>
    </build>
</project>

# 常用命令
mvn clean
mvn test
mvn package`,
    task: "补全一个最小 Maven POM：项目坐标为 com.example:toolbox:1.0-SNAPSHOT，Java release 为 17，并添加 JUnit Jupiter 测试依赖。补全后应适合执行 mvn test。",
    starterCode: `<!-- 文件：pom.xml -->
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- TODO: groupId -->
    <!-- TODO: artifactId -->
    <!-- TODO: version -->

    <properties>
        <!-- TODO: 设置 Java release 为 17 -->
    </properties>

    <dependencies>
        <!-- TODO: 添加 JUnit Jupiter 测试依赖 -->
    </dependencies>
</project>`,
    answerCode: `<!-- 文件：pom.xml -->
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>toolbox</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.release>17</maven.compiler.release>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.14.4</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>`,
    checks: [
      "是否保留了 `<modelVersion>4.0.0</modelVersion>`。",
      "项目坐标是否是 `com.example`、`toolbox`、`1.0-SNAPSHOT`。",
      "是否使用 `<maven.compiler.release>17</maven.compiler.release>` 指定 Java 版本。",
      "JUnit 依赖是否写在 `<dependencies>` 内。",
      "JUnit 依赖 scope 是否为 `test`，避免测试库进入主程序依赖。",
      "XML 标签是否成对闭合，嵌套层级是否正确。"
    ],
    commonMistakes: [
      "把 dependency 写到 dependencies 外面，Maven 无法识别依赖列表。",
      "忘记写版本号，导致依赖解析失败或构建不可重复。",
      "把测试依赖写成默认 scope，真实项目打包时会带入不必要的库。",
      "把 src/main/java 和 src/test/java 混在一起，测试和业务代码边界不清。",
      "只在 IDE 里能运行，却从不执行 `mvn test` 检查项目是否可被工具构建。",
      "修改 pom.xml 后没有重新加载 Maven 项目，IDE 里仍然使用旧依赖。"
    ],
    sources: [
      {
        title: "Apache Maven: Maven in 5 Minutes",
        url: "https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html"
      },
      {
        title: "Apache Maven: POM Reference",
        url: "https://maven.apache.org/pom.html"
      },
      {
        title: "Apache Maven: Introduction to the Build Lifecycle",
        url: "https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html"
      }
    ]
  },
  {
    id: "level8-5-gradle-intro",
    title: "Gradle 入门",
    subtitle: "另一种构建方式",
    intro: [
      "Gradle 也是构建工具，目标和 Maven 类似：编译、测试、打包、管理依赖。但 Gradle 使用构建脚本描述项目，脚本可以用 Groovy 或 Kotlin 编写，表达能力比纯 XML 更灵活。",
      "Gradle 的核心概念是任务 task。比如 `compileJava` 负责编译，`test` 负责测试，`run` 可以运行应用。插件会帮你添加一组常用任务，所以入门时先学会使用 java 或 application 插件。",
      "Gradle 项目同样遵守常见目录约定：src/main/java 放主代码，src/test/java 放测试。不同的是，依赖、插件和主类通常写在 build.gradle 或 build.gradle.kts 里。",
      "工程习惯上，更推荐通过 Gradle Wrapper 运行项目，也就是使用 `gradlew` 或 `gradlew.bat`。这样团队成员和自动化环境会使用项目指定的 Gradle 版本，减少“我这里版本不一样”的问题。"
    ],
    syntax: [
      "`settings.gradle` 通常声明项目名，例如 `rootProject.name = 'quality-demo'`。",
      "`build.gradle` 是常见的 Gradle 构建脚本文件。",
      "`plugins { id 'java' }` 添加 Java 插件，获得编译和测试任务。",
      "`plugins { id 'application' }` 添加应用插件，可以使用 `gradle run` 运行主类。",
      "`repositories { mavenCentral() }` 告诉 Gradle 从 Maven Central 下载依赖。",
      "`dependencies { testImplementation 'group:artifact:version' }` 声明测试依赖。",
      "`application { mainClass = 'com.example.Main' }` 配置应用入口类。",
      "`gradle tasks` 查看项目可用任务，`gradle test` 运行测试。",
      "`gradlew.bat test` 在 Windows 上使用项目自带 Wrapper 运行测试。"
    ],
    exampleCode: `// 文件：settings.gradle
rootProject.name = 'quality-demo'

// 文件：build.gradle
plugins {
    id 'application'
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation 'org.junit.jupiter:junit-jupiter:5.14.4'
}

application {
    mainClass = 'Main'
}

test {
    useJUnitPlatform()
}

# 常用命令
gradle tasks
gradle run
gradle test`,
    task: "补全一个 Gradle 构建脚本：使用 application 插件，从 Maven Central 拉依赖，添加 JUnit Jupiter 测试依赖，主类为 Main，并让 test 任务使用 JUnit Platform。",
    starterCode: `// 文件：build.gradle
plugins {
    // TODO: 添加 application 插件
}

repositories {
    // TODO: 使用 Maven Central
}

dependencies {
    // TODO: 添加 JUnit Jupiter 测试依赖
}

application {
    // TODO: 设置主类为 Main
}

test {
    // TODO: 使用 JUnit Platform
}`,
    answerCode: `// 文件：build.gradle
plugins {
    id 'application'
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation 'org.junit.jupiter:junit-jupiter:5.14.4'
}

application {
    mainClass = 'Main'
}

test {
    useJUnitPlatform()
}`,
    checks: [
      "是否使用了 `application` 插件，而不仅仅是手写运行命令。",
      "是否配置了 `mavenCentral()`，让依赖有下载来源。",
      "JUnit 依赖是否使用 `testImplementation`。",
      "是否把主类配置为 `Main`。",
      "test 任务是否调用 `useJUnitPlatform()`。",
      "脚本括号是否成对闭合，代码块层级是否清楚。"
    ],
    commonMistakes: [
      "只添加 JUnit 依赖，却忘记 `useJUnitPlatform()`，导致测试无法按 JUnit 5 运行。",
      "把 `mavenCentral()` 写到 dependencies 里，Gradle 会无法理解仓库配置。",
      "主类名写成文件名 `Main.java`，Gradle 需要的是类名 `Main`。",
      "直接使用系统安装的 gradle，团队项目里却忘了优先使用 Wrapper。",
      "把测试依赖写成 implementation，让主程序也依赖测试框架。",
      "修改 build.gradle 后不刷新项目，IDE 中依赖仍然报红。"
    ],
    sources: [
      {
        title: "Gradle User Manual: The Application Plugin",
        url: "https://docs.gradle.org/current/userguide/application_plugin.html"
      },
      {
        title: "Gradle User Manual: Building Java & JVM Projects",
        url: "https://docs.gradle.org/current/userguide/building_java_projects.html"
      },
      {
        title: "Gradle User Manual: The Java Plugin",
        url: "https://docs.gradle.org/current/userguide/java_plugin.html"
      }
    ]
  },
  {
    id: "level8-6-code-style-formatting",
    title: "代码规范与格式化",
    subtitle: "让代码更像工程作品",
    intro: [
      "代码规范不是为了让代码看起来“漂亮”这么简单。统一的命名、缩进、空行和文件组织，会让团队成员更快读懂代码，也会让 Git diff 更干净，减少无意义的格式争论。",
      "格式化负责把空格、换行、缩进整理一致；代码规范还包括命名、方法长度、注释质量、类的职责等。自动格式化能解决一部分问题，但变量名含义和方法拆分仍然需要开发者自己判断。",
      "初学阶段最值得坚持的是：类名用大驼峰，变量和方法用小驼峰，常量用全大写加下划线；一段代码只做一件清楚的事；复杂逻辑优先拆成有名字的方法。",
      "工具链也能帮助你保持规范。IDE 的 Format Document、保存时格式化、检查器和团队共享配置，都能让“写得整齐”变成默认动作。长期看，这会明显降低维护成本。"
    ],
    syntax: [
      "类名使用大驼峰命名法，例如 `OrderService`、`StudentReport`。",
      "变量名和方法名使用小驼峰命名法，例如 `totalPrice`、`calculateTotal`。",
      "常量通常使用全大写加下划线，例如 `MAX_RETRY_COUNT`。",
      "缩进保持一致，Java 代码中常见做法是每层代码块缩进 4 个空格。",
      "左花括号通常跟在声明或语句同一行，右花括号单独成行。",
      "方法应该尽量短小，方法名要说明它做什么，而不是暴露一堆细节。",
      "注释用来解释原因和约束，不要重复代码已经清楚表达的内容。",
      "提交前先格式化并运行测试，避免把格式噪音和功能修改混在一起。"
    ],
    exampleCode: `public class Main {
    private static final int PASS_SCORE = 60;

    public static void main(String[] args) {
        String studentName = "小林";
        int score = 92;

        printResult(studentName, score);
    }

    static void printResult(String studentName, int score) {
        if (isPassed(score)) {
            System.out.println(studentName + "通过");
        } else {
            System.out.println(studentName + "需要复习");
        }
    }

    static boolean isPassed(int score) {
        return score >= PASS_SCORE;
    }
}`,
    task: "把 starterCode 整理成规范、清晰、可维护的写法，保持输出不变：小林通过。建议提取 PASS_SCORE 常量和 isPassed 方法。",
    starterCode: `public class Main {public static void main(String[] args){int s=92;String n="小林";if(s>=60){System.out.println(n+"通过");}else{System.out.println(n+"需要复习");}}}`,
    answerCode: `public class Main {
    private static final int PASS_SCORE = 60;

    public static void main(String[] args) {
        int score = 92;
        String studentName = "小林";

        if (isPassed(score)) {
            System.out.println(studentName + "通过");
        } else {
            System.out.println(studentName + "需要复习");
        }
    }

    static boolean isPassed(int score) {
        return score >= PASS_SCORE;
    }
}`,
    checks: [
      "代码是否按层级换行和缩进，而不是挤在一行里。",
      "变量名是否从 `s`、`n` 改成更有含义的 `score`、`studentName`。",
      "及格线是否提取为 `PASS_SCORE` 常量。",
      "是否用 `isPassed` 方法表达判断规则。",
      "整理后输出是否仍然是“小林通过”。",
      "是否没有为了格式化而改变业务逻辑。"
    ],
    commonMistakes: [
      "只调整空格，却保留难懂的单字母变量名。",
      "把所有代码都拆成方法，反而让简单逻辑变得绕来绕去。",
      "注释写成代码翻译，例如“判断 score 是否大于 60”，没有提供额外信息。",
      "格式化时不小心改了比较条件，导致行为变化。",
      "团队已有格式规则时仍按个人习惯手动调整，造成无意义 diff。",
      "提交前没有查看 diff，格式化把大量无关文件也带进提交。"
    ],
    sources: [
      {
        title: "Oracle: Code Conventions for the Java Programming Language",
        url: "https://www.oracle.com/java/technologies/javase/codeconventions-contents.html"
      },
      {
        title: "Visual Studio Code: Navigate and Edit Java Source Code",
        url: "https://code.visualstudio.com/docs/java/java-editing"
      },
      {
        title: "Oracle JDK 26 Tool Guide: The javadoc Command",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/man/javadoc.html"
      }
    ]
  },
  {
    id: "level8-7-git-basics",
    title: "Git 基础",
    subtitle: "提交、分支、回滚",
    intro: [
      "Git 是版本控制工具。你可以把它理解成项目的时间线：每次提交 commit 都记录一组文件变化和说明。写错了可以回看历史，做新功能可以开分支，和别人协作时也能合并彼此的修改。",
      "Git 有三个初学者必须分清的区域：工作区、暂存区、仓库历史。你修改文件时变化先出现在工作区；执行 git add 后进入暂存区；执行 git commit 后才真正进入项目历史。",
      "提交信息应该说明“为什么做这个改动”或“完成了什么目标”，不要只写 update、fix、aaa。未来排查问题时，清楚的提交历史会像路标一样帮你快速找到相关变化。",
      "回滚也要谨慎。个人本地练习可以用 restore、reset 学习概念，但团队协作里更常用 revert 生成一个新的反向提交，避免改写别人已经基于其工作的历史。"
    ],
    syntax: [
      "`git init` 在当前目录创建一个新的 Git 仓库。",
      "`git status` 查看工作区和暂存区当前状态。",
      "`git add Main.java` 把指定文件变化放入暂存区。",
      "`git commit -m \"message\"` 把暂存区内容保存为一次提交。",
      "`git log --oneline` 用简短形式查看提交历史。",
      "`git diff` 查看工作区尚未暂存的具体修改。",
      "`git branch feature-a` 创建分支，`git switch feature-a` 切换分支。",
      "`git restore Main.java` 丢弃工作区中某个文件尚未暂存的修改。",
      "`git revert <commit>` 创建一个新提交，用来撤销某次历史提交的效果。"
    ],
    exampleCode: `# 第一次把项目交给 Git 管理
git init
git status

# 创建一次清楚的提交
git add Main.java
git commit -m "Add first runnable Main program"

# 开分支做实验
git branch practice-debug
git switch practice-debug

# 查看修改和历史
git diff
git status
git log --oneline`,
    task: "写出一组 Git 命令：初始化仓库，查看状态，暂存 Main.java，提交“Add grade exercise”，创建并切换到 test-boundary 分支，再查看简短历史。",
    starterCode: `# TODO: 初始化仓库
# TODO: 查看当前状态
# TODO: 暂存 Main.java
# TODO: 提交信息为 Add grade exercise
# TODO: 创建 test-boundary 分支
# TODO: 切换到 test-boundary 分支
# TODO: 查看简短提交历史`,
    answerCode: `git init
git status
git add Main.java
git commit -m "Add grade exercise"
git branch test-boundary
git switch test-boundary
git log --oneline`,
    checks: [
      "是否先使用 `git init` 初始化仓库。",
      "是否用 `git status` 查看状态，而不是凭感觉判断文件是否被跟踪。",
      "是否使用 `git add Main.java` 暂存指定文件。",
      "提交信息是否是清楚的英文短句 `Add grade exercise`。",
      "是否创建了 `test-boundary` 分支并切换过去。",
      "是否使用 `git log --oneline` 查看简短历史。"
    ],
    commonMistakes: [
      "修改了文件但忘记 `git add`，提交时没有包含真正想保存的变化。",
      "提交信息只写 update，几天后看不出这次提交做了什么。",
      "把工作区、暂存区、提交历史混为一谈，不知道变化处在哪一步。",
      "在没确认当前分支的情况下直接提交，结果把实验代码提交到主分支。",
      "用 reset 改写已经共享的历史，给协作者带来合并麻烦。",
      "遇到冲突时不读冲突标记，随手删除代码导致别人改动丢失。"
    ],
    sources: [
      {
        title: "Git: Pro Git Book",
        url: "https://git-scm.com/book/en/v2"
      },
      {
        title: "Git: Command Reference",
        url: "https://git-scm.com/docs/git"
      },
      {
        title: "Git: gitglossary",
        url: "https://git-scm.com/docs/gitglossary"
      }
    ]
  }
];
