window.LESSON_CONTENT_LEVEL5 = [
  {
    id: "level5-1-string-deep-dive",
    title: "String 深入",
    subtitle: "不可变和常用方法",
    intro: [
      "String 是 Java 里最常用的类之一。它看起来像普通文字，实际是对象；你写下的每一段双引号文本，都是一个字符串对象。",
      "String 最大的特点是不可变。调用 `strip()`、`toLowerCase()`、`replace()` 这类方法时，原字符串不会被改掉，方法会返回一个新的字符串。想保留结果，就要接住返回值。",
      "字符串比较要用 `equals()` 或 `equalsIgnoreCase()`，不要用 `==` 判断内容。`==` 比较的是两个引用是不是指向同一个对象，结果容易和你的直觉不一致。",
      "很多字符串方法都和下标有关。Java 的下标从 0 开始，`substring(begin, end)` 包含 begin 位置，不包含 end 位置。理解这一点，切片和查找会清楚很多。"
    ],
    syntax: [
      "`length()` 返回字符串长度，中文、英文、空格都会参与计数。",
      "`strip()` 去掉首尾空白并返回新字符串；旧代码里也常见 `trim()`。",
      "`contains(text)` 判断是否包含某段文本，返回 boolean。",
      "`indexOf(text)` 返回第一次出现的位置；找不到时返回 -1。",
      "`substring(begin, end)` 截取一段内容，begin 包含，end 不包含。",
      "`toLowerCase()` 和 `toUpperCase()` 返回大小写转换后的新字符串。",
      "比较内容用 `equals()`；忽略大小写比较用 `equalsIgnoreCase()`。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        String raw = "  java-path  ";
        String cleaned = raw.strip();

        System.out.println("原长度：" + raw.length());
        System.out.println("新长度：" + cleaned.length());
        System.out.println("是否以 Java 开头：" + cleaned.startsWith("Java"));
        System.out.println("小写：" + cleaned.toLowerCase());

        int spaceIndex = cleaned.indexOf(" ");
        String firstWord = cleaned.substring(0, spaceIndex);
        System.out.println("第一个单词：" + firstWord);
    }
}`,
    task: "补全程序：把 raw 清理成没有首尾空白的字符串，输出清理后的文本；判断它是否包含 Spring；截取第一项 Java；再输出小写版本。要求使用 String 的常用方法完成，不要手写固定结果。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        String raw = "  Java,Spring,SQL  ";

        // TODO: 去掉首尾空白，保存到 cleaned
        // TODO: 输出“清理后：...” 
        // TODO: 判断 cleaned 是否包含 Spring
        // TODO: 找到第一个逗号的位置，并截取第一项
        // TODO: 输出 cleaned 的小写形式
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        String raw = "  Java,Spring,SQL  ";

        String cleaned = raw.strip();
        System.out.println("清理后：" + cleaned);
        System.out.println("包含 Spring：" + cleaned.contains("Spring"));

        int commaIndex = cleaned.indexOf(",");
        String firstItem = cleaned.substring(0, commaIndex);
        System.out.println("第一项：" + firstItem);
        System.out.println("小写：" + cleaned.toLowerCase());
    }
}`,
    checks: [
      "是否使用 `strip()` 或类似方法去掉首尾空白，并保存返回的新字符串。",
      "是否输出清理后的 Java,Spring,SQL，而不是原始 raw。",
      "是否用 `contains()` 判断是否包含 Spring。",
      "是否用 `indexOf()` 找到第一个逗号的位置。",
      "是否用 `substring()` 截取出第一项 Java。",
      "是否理解 String 方法不会修改原字符串本身。"
    ],
    commonMistakes: [
      "调用 `raw.strip();` 后没有赋值，结果后面仍然在使用带空格的 raw。",
      "用 `==` 比较字符串内容，导致相同文字也可能判断失败。",
      "把 `substring(0, commaIndex)` 写成 `substring(1, commaIndex)`，漏掉第一个字符。",
      "忘记 `indexOf()` 找不到内容时会返回 -1，真实项目里要先检查。",
      "以为 `toLowerCase()` 会修改原字符串，其实它也返回新字符串。",
      "把逗号、引号或分号写成中文标点，导致编译失败。"
    ],
    sources: [
      {
        title: "Dev.java: Strings",
        url: "https://dev.java/learn/numbers-strings/strings/"
      },
      {
        title: "Oracle Java SE 21 API: String",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html"
      }
    ]
  },
  {
    id: "level5-2-string-builder",
    title: "StringBuilder",
    subtitle: "高效拼接文本",
    intro: [
      "String 适合保存稳定文本，但如果你在循环里不断拼接字符串，每次拼接都可能产生新对象。数据量小时没关系，次数多了就会浪费内存和时间。",
      "StringBuilder 像一个可变的文本缓冲区。你可以不断 `append()`、`insert()`、`delete()`，最后再用 `toString()` 取出完整字符串。",
      "StringBuilder 不是 String 的替代品。普通短文本直接用 String 更清楚；当你需要在循环里逐步组装文本，StringBuilder 才特别合适。",
      "初学时可以把它想成一张草稿纸：先把内容一段段写上去，确认完成后，再把整张草稿纸变成最终文本。"
    ],
    syntax: [
      "`new StringBuilder()` 创建一个空的可变文本对象。",
      "`append(value)` 把内容追加到末尾，可以追加字符串、数字、字符等。",
      "`insert(index, value)` 在指定位置插入内容。",
      "`delete(start, end)` 删除一段内容，start 包含，end 不包含。",
      "`length()` 返回当前 Builder 中已有字符数量。",
      "`toString()` 把 StringBuilder 转成普通 String，常用于返回值或保存结果。",
      "循环拼接较多内容时，优先考虑 StringBuilder。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        StringBuilder builder = new StringBuilder();
        builder.append("订单");
        builder.append("#");
        builder.append(1024);
        builder.append(" 已创建");

        builder.insert(0, "[INFO] ");

        String message = builder.toString();
        System.out.println(message);
    }
}`,
    task: "补全程序：使用 StringBuilder 和循环，把 items 数组组装成一行购物清单，格式为：购物清单：1.面包 2.牛奶 3.鸡蛋。不要在循环里使用 `result = result + ...`。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        String[] items = {"面包", "牛奶", "鸡蛋"};

        StringBuilder builder = new StringBuilder();
        // TODO: 先追加清单标题
        // TODO: 使用 for 循环追加编号和商品名
        // TODO: 转成 String 并输出
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        String[] items = {"面包", "牛奶", "鸡蛋"};

        StringBuilder builder = new StringBuilder();
        builder.append("购物清单：");

        for (int i = 0; i < items.length; i++) {
            if (i > 0) {
                builder.append(" ");
            }
            builder.append(i + 1);
            builder.append(".");
            builder.append(items[i]);
        }

        String result = builder.toString();
        System.out.println(result);
    }
}`,
    checks: [
      "是否创建并使用了 `StringBuilder`。",
      "是否使用 `append()` 逐步追加清单内容。",
      "是否用循环处理 items 数组，而不是手写三次商品名。",
      "编号是否从 1 开始，而不是从 0 开始。",
      "商品之间是否只有一个空格，末尾不多出奇怪分隔符。",
      "是否最后用 `toString()` 得到完整结果。"
    ],
    commonMistakes: [
      "在循环里继续使用 `result = result + item`，没有发挥 StringBuilder 的作用。",
      "忘记编号要用 `i + 1`，输出成 0.面包。",
      "每次循环都重新 `new StringBuilder()`，导致前面拼好的内容丢失。",
      "分隔符处理不清，结果开头或末尾多出空格。",
      "把 StringBuilder 当成线程安全工具；多线程共享文本缓冲区时要另外考虑同步或使用其他方案。",
      "以为 `append()` 会返回普通 String，其实它返回的仍然是 Builder，方便继续链式调用。"
    ],
    sources: [
      {
        title: "Dev.java: String Builders",
        url: "https://dev.java/learn/numbers-strings/string-builders/"
      },
      {
        title: "Oracle Java SE 21 API: StringBuilder",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/StringBuilder.html"
      }
    ]
  },
  {
    id: "level5-3-math-random-bigdecimal",
    title: "Math、Random、BigDecimal",
    subtitle: "数字处理",
    intro: [
      "Java 里处理数字不只是加减乘除。常见需求包括取最大值、四舍五入、生成随机数、计算金额，这些都可以交给标准库里的类来完成。",
      "Math 是工具类，大多数方法都是静态方法，可以直接写 `Math.max(a, b)`、`Math.round(value)`、`Math.sqrt(value)`。",
      "Random 用来生成伪随机数。它适合普通随机练习、抽奖模拟、测试数据；如果是密码、令牌这类安全场景，要使用更专门的安全随机工具。",
      "金额、积分兑换、税率这类十进制计算，不建议用 double 直接算最终结果。BigDecimal 可以表达更精确的十进制，并且要求你明确舍入规则。"
    ],
    syntax: [
      "`Math.max(a, b)` 返回两个数中较大的一个，`Math.min(a, b)` 返回较小的一个。",
      "`Math.round(x)` 返回最接近的整数结果，常用于简单四舍五入。",
      "`new Random()` 创建随机数生成器；`nextInt(bound)` 返回 0 到 bound-1 之间的整数。",
      "生成 1 到 6 的随机整数常写作 `random.nextInt(6) + 1`。",
      "创建金额类 BigDecimal 时，优先使用字符串或 `BigDecimal.valueOf()`，避免 `new BigDecimal(0.1)`。",
      "BigDecimal 运算使用 `add()`、`subtract()`、`multiply()`、`divide()`，不要使用 `+ - * /`。",
      "除法或保留小数时通常要指定 `RoundingMode`，例如 `setScale(2, RoundingMode.HALF_UP)`。"
    ],
    exampleCode: `import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        int score = Math.max(0, -8);
        System.out.println("修正后的分数：" + score);

        Random random = new Random(2026);
        int dice = random.nextInt(6) + 1;
        System.out.println("骰子点数：" + dice);

        BigDecimal price = new BigDecimal("19.90");
        BigDecimal count = BigDecimal.valueOf(3);
        BigDecimal total = price.multiply(count).setScale(2, RoundingMode.HALF_UP);
        System.out.println("合计：" + total);
    }
}`,
    task: "补全程序：用 BigDecimal 计算单价 19.90、数量 3、折扣 0.85 后的应付金额，保留 2 位小数；用 Math.max 把积分修正为不小于 0；用 Random 生成 1 到 6 的骰子点数并输出。",
    starterCode: `import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigDecimal price = new BigDecimal("19.90");
        int quantity = 3;
        BigDecimal discount = new BigDecimal("0.85");
        int rawPoints = -5;

        // TODO: 计算折后金额，并保留 2 位小数
        // TODO: 使用 Math.max 修正积分
        // TODO: 使用 Random 生成 1 到 6 的骰子点数
        // TODO: 输出金额、积分和点数
    }
}`,
    answerCode: `import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        BigDecimal price = new BigDecimal("19.90");
        int quantity = 3;
        BigDecimal discount = new BigDecimal("0.85");
        int rawPoints = -5;

        BigDecimal total = price
                .multiply(BigDecimal.valueOf(quantity))
                .multiply(discount)
                .setScale(2, RoundingMode.HALF_UP);

        int points = Math.max(0, rawPoints);

        Random random = new Random(2026);
        int dice = random.nextInt(6) + 1;

        System.out.println("折后应付：" + total);
        System.out.println("修正积分：" + points);
        System.out.println("骰子点数：" + dice);
    }
}`,
    checks: [
      "金额计算是否使用 BigDecimal，而不是 double 直接连乘。",
      "数量是否通过 `BigDecimal.valueOf(quantity)` 或等价方式参与计算。",
      "结果是否使用 `setScale(2, RoundingMode.HALF_UP)` 保留 2 位小数。",
      "积分是否用 `Math.max(0, rawPoints)` 修正为不小于 0。",
      "骰子点数是否通过 `random.nextInt(6) + 1` 得到 1 到 6。",
      "是否正确导入 `java.math` 和 `java.util.Random` 相关类。"
    ],
    commonMistakes: [
      "用 `new BigDecimal(0.85)` 创建小数，可能把 double 的二进制误差一起带进去。",
      "对 BigDecimal 使用 `*` 或 `+`，这在 Java 中不能编译。",
      "调用 `setScale()` 后没有保存返回值，导致保留小数的结果没有被使用。",
      "把 `nextInt(6)` 当成 1 到 6，实际上它返回 0 到 5。",
      "需要随机整数时写成 `(int) Math.random() * 6 + 1`，强制转换位置错误会让结果总是 1。",
      "进行 BigDecimal 除法时没有提供舍入规则，遇到除不尽的小数可能抛异常。"
    ],
    sources: [
      {
        title: "Dev.java: Numbers",
        url: "https://dev.java/learn/numbers-strings/numbers/"
      },
      {
        title: "Oracle Java SE 21 API: Math",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Math.html"
      },
      {
        title: "Oracle Java SE 21 API: Random",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Random.html"
      },
      {
        title: "Oracle Java SE 21 API: BigDecimal",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigDecimal.html"
      }
    ]
  },
  {
    id: "level5-4-date-time-api",
    title: "日期时间 API",
    subtitle: "LocalDateTime",
    intro: [
      "现代 Java 推荐使用 `java.time` 包处理日期时间。它比早期的 Date、Calendar 更清楚，也更不容易写出含糊的时间代码。",
      "LocalDate 表示日期，比如 2026-05-01；LocalTime 表示时间，比如 09:30；LocalDateTime 同时表示日期和时间，但不包含时区。",
      "日期时间对象大多也是不可变的。调用 `plusDays()`、`minusHours()`、`withMonth()` 时，不会修改原对象，而是返回一个新对象。",
      "显示给用户看的时间通常要格式化。DateTimeFormatter 用来把日期时间转成指定格式的字符串，也可以把符合格式的文本解析回日期时间对象。"
    ],
    syntax: [
      "`LocalDate.now()` 获取当前本地日期，`LocalDate.of(year, month, day)` 创建指定日期。",
      "`LocalTime.of(hour, minute)` 创建指定时间。",
      "`LocalDateTime.of(date, time)` 可以把日期和时间组合起来。",
      "`plusDays(n)`、`plusHours(n)`、`minusWeeks(n)` 等方法用于日期时间计算。",
      "`DateTimeFormatter.ofPattern(pattern)` 创建格式化器，例如 `yyyy-MM-dd HH:mm`。",
      "`dateTime.format(formatter)` 把日期时间格式化成字符串。",
      "`ChronoUnit.DAYS.between(start, end)` 可以计算两个日期之间相隔多少天。"
    ],
    exampleCode: `import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2026, 5, 1);
        LocalTime time = LocalTime.of(9, 30);
        LocalDateTime start = LocalDateTime.of(date, time);
        LocalDateTime end = start.plusDays(10);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        System.out.println("开始：" + start.format(formatter));
        System.out.println("截止：" + end.format(formatter));
    }
}`,
    task: "补全程序：创建 2026-05-01 09:30 的开始时间，计算 10 天后的截止时间；使用 `yyyy-MM-dd HH:mm` 格式输出开始和截止；再输出两个日期之间相隔的天数。",
    starterCode: `import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class Main {
    public static void main(String[] args) {
        // TODO: 创建日期、时间，并组合成 LocalDateTime
        // TODO: 计算 10 天后的截止时间
        // TODO: 创建 DateTimeFormatter
        // TODO: 输出开始时间、截止时间和相隔天数
    }
}`,
    answerCode: `import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2026, 5, 1);
        LocalTime time = LocalTime.of(9, 30);
        LocalDateTime start = LocalDateTime.of(date, time);
        LocalDateTime deadline = start.plusDays(10);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        long days = ChronoUnit.DAYS.between(start.toLocalDate(), deadline.toLocalDate());

        System.out.println("开始：" + start.format(formatter));
        System.out.println("截止：" + deadline.format(formatter));
        System.out.println("相隔天数：" + days);
    }
}`,
    checks: [
      "是否使用 `LocalDate` 和 `LocalTime` 创建明确的日期与时间。",
      "是否组合出 `LocalDateTime`，而不是用字符串假装日期时间。",
      "截止时间是否来自 `start.plusDays(10)` 的返回值。",
      "是否使用 `DateTimeFormatter.ofPattern(\"yyyy-MM-dd HH:mm\")` 格式化输出。",
      "是否用 `ChronoUnit.DAYS.between()` 或等价方式计算相隔天数。",
      "是否正确导入 `java.time` 相关类。"
    ],
    commonMistakes: [
      "把 `plusDays(10)` 当成会修改 start，实际上要把返回值保存到新变量。",
      "月份参数写错。`LocalDate.of(2026, 5, 1)` 的 5 就是五月，不需要减 1。",
      "格式化模式大小写混乱：`MM` 表示月份，`mm` 表示分钟。",
      "用 LocalDateTime 表示跨时区的精确瞬间；需要时区时应了解 ZonedDateTime 或 Instant。",
      "把日期当字符串拼接处理，后续比较、加减和格式校验都会变麻烦。",
      "忘记导入 `DateTimeFormatter` 或 `ChronoUnit`。"
    ],
    sources: [
      {
        title: "Dev.java: The Date Time API",
        url: "https://dev.java/learn/date-time/"
      },
      {
        title: "Dev.java: Date and Time",
        url: "https://dev.java/learn/date-time/local-time/"
      },
      {
        title: "Oracle Java SE 21 API: LocalDateTime",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalDateTime.html"
      },
      {
        title: "Oracle Java SE 21 API: DateTimeFormatter",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/format/DateTimeFormatter.html"
      }
    ]
  },
  {
    id: "level5-5-optional",
    title: "Optional",
    subtitle: "减少空指针",
    intro: [
      "空指针问题通常来自一句话：你以为这里一定有对象，实际却是 null。Optional 提供了一种更直白的表达：这个结果可能有值，也可能没有值。",
      "Optional 最适合作为方法返回值使用，告诉调用者要处理“没有结果”的情况。它不是为了把所有变量都包起来，也不是为了完全消灭 null。",
      "拿到 Optional 后，不要急着 `get()`。更常见的做法是用 `orElse()` 给默认值，用 `map()` 转换里面的值，用 `ifPresent()` 在有值时执行动作。",
      "Optional 的价值在于把风险提前摆到代码表面：调用者一看到返回类型，就知道要处理空结果，而不是运行到某一行才被 NullPointerException 打断。"
    ],
    syntax: [
      "`Optional.of(value)` 创建有值的 Optional，value 不能是 null。",
      "`Optional.ofNullable(value)` 可以接收可能为 null 的值；为 null 时得到空 Optional。",
      "`Optional.empty()` 表示没有值。",
      "`isPresent()` 判断是否有值，`isEmpty()` 判断是否为空。",
      "`orElse(defaultValue)` 在没有值时返回默认值。",
      "`map(function)` 在有值时转换内容，没有值时继续保持为空。",
      "`orElseThrow()` 在没有值时抛出异常，适合确实不能继续的场景。"
    ],
    exampleCode: `import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        Optional<String> nickname = findNickname("u100");

        String displayName = nickname
                .map(String::toUpperCase)
                .orElse("游客");

        System.out.println("显示名称：" + displayName);
    }

    static Optional<String> findNickname(String userId) {
        if ("u100".equals(userId)) {
            return Optional.of("ada");
        }
        return Optional.empty();
    }
}`,
    task: "补全程序：`findNickname` 根据用户编号返回 Optional。u100 返回 ada，其他编号返回空。main 中分别查询 u100 和 u404，把存在的昵称转成大写，不存在时显示 游客。",
    starterCode: `import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        Optional<String> first = findNickname("u100");
        Optional<String> second = findNickname("u404");

        // TODO: 把 first 中的昵称转成大写，没有值时使用 游客
        // TODO: 对 second 做同样处理
        // TODO: 输出两个显示名称
    }

    static Optional<String> findNickname(String userId) {
        // TODO: u100 返回 Optional.of("ada")
        // TODO: 其他编号返回 Optional.empty()
        return Optional.empty();
    }
}`,
    answerCode: `import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        Optional<String> first = findNickname("u100");
        Optional<String> second = findNickname("u404");

        String firstName = first
                .map(String::toUpperCase)
                .orElse("游客");
        String secondName = second
                .map(String::toUpperCase)
                .orElse("游客");

        System.out.println("用户昵称：" + firstName);
        System.out.println("用户昵称：" + secondName);
    }

    static Optional<String> findNickname(String userId) {
        if ("u100".equals(userId)) {
            return Optional.of("ada");
        }
        return Optional.empty();
    }
}`,
    checks: [
      "`findNickname(\"u100\")` 是否返回包含 ada 的 Optional。",
      "其他用户编号是否返回 `Optional.empty()`。",
      "是否使用 `map()` 把存在的昵称转换成大写。",
      "是否使用 `orElse(\"游客\")` 处理没有值的情况。",
      "main 中是否分别输出 u100 和 u404 的显示名称。",
      "是否避免直接对空 Optional 调用 `get()`。"
    ],
    commonMistakes: [
      "把 Optional 变量本身设为 null，这会失去 Optional 的意义。",
      "不判断就调用 `get()`，空 Optional 会抛出 NoSuchElementException。",
      "用 `Optional.of(possiblyNull)` 包装可能为 null 的值，应使用 `ofNullable()`。",
      "把 Optional 用在字段、方法参数、集合元素上到处传播，代码反而更重。",
      "用 `isPresent()` 加 `get()` 写回普通 null 判断风格，错过了 `map()`、`orElse()` 的表达力。",
      "误以为 Optional 会自动捕获异常；它只表达有值或无值，不处理所有错误。"
    ],
    sources: [
      {
        title: "Dev.java: Using Optionals",
        url: "https://dev.java/learn/api/streams/optionals/"
      },
      {
        title: "Oracle Java SE 21 API: Optional",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html"
      }
    ]
  },
  {
    id: "level5-6-regular-expression",
    title: "正则表达式",
    subtitle: "校验邮箱和手机号",
    intro: [
      "正则表达式是一种描述文本规则的小语言。它常用于校验格式、查找片段、替换内容，比如检查邮箱、手机号、日期文本是否符合约定。",
      "Java 的正则主要在 `java.util.regex` 包里。Pattern 表示编译好的规则，Matcher 表示把规则应用到某段文本上的匹配器。",
      "对于只用一次的简单校验，可以用 `String.matches(regex)`。如果同一个规则要反复使用，先 `Pattern.compile(regex)` 会更清楚，也能避免重复编译规则。",
      "正则有两层转义要注意：正则本身要写反斜杠，Java 字符串也要写反斜杠。所以正则里的数字匹配符放进 Java 字符串时，通常要写成两个反斜杠加 d。"
    ],
    syntax: [
      "`Pattern.compile(regex)` 把正则文本编译成 Pattern。",
      "`pattern.matcher(input)` 为某段输入创建 Matcher。",
      "`matcher.matches()` 要求整段文本都符合规则。",
      "`matcher.find()` 查找下一段符合规则的内容，不要求整段都匹配。",
      "`^` 表示开头，`$` 表示结尾，常用于完整格式校验。",
      "`[A-Za-z0-9._%+-]+` 可以描述邮箱 @ 前面的常见用户名部分。",
      "`\\\\.` 用来匹配普通英文点号；如果只写点号，它在正则里表示任意字符。",
      "`1[3-9]\\\\d{9}` 可以描述一个简化版中国大陆手机号规则：1 开头，第二位 3 到 9，后面 9 位数字。"
    ],
    exampleCode: `import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        String email = "student@example.com";
        Pattern emailPattern = Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\\.[A-Za-z]{2,}$");
        Matcher emailMatcher = emailPattern.matcher(email);

        System.out.println("邮箱有效：" + emailMatcher.matches());
    }
}`,
    task: "补全程序：校验 email 和 phone。邮箱要求包含 @，域名里有英文点号，结尾至少 2 个英文字母；手机号使用简化规则：1 开头，第二位 3 到 9，后面 9 位数字。分别输出是否有效。",
    starterCode: `import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        String email = "student@example.com";
        String phone = "13800138000";

        // TODO: 编译邮箱正则
        // TODO: 编译手机号正则
        // TODO: 分别创建 Matcher 并使用 matches 校验整段文本
        // TODO: 输出“邮箱有效：...”和“手机号有效：...”
    }
}`,
    answerCode: `import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        String email = "student@example.com";
        String phone = "13800138000";

        Pattern emailPattern = Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\\.[A-Za-z]{2,}$");
        Pattern phonePattern = Pattern.compile("^1[3-9]\\\\d{9}$");

        Matcher emailMatcher = emailPattern.matcher(email);
        Matcher phoneMatcher = phonePattern.matcher(phone);

        System.out.println("邮箱有效：" + emailMatcher.matches());
        System.out.println("手机号有效：" + phoneMatcher.matches());
    }
}`,
    checks: [
      "邮箱正则是否包含用户名、@、域名和后缀这几个基本部分。",
      "邮箱里的英文点号是否写成匹配普通点号，而不是任意字符。",
      "手机号正则是否限制为 1 开头、第二位 3 到 9、总共 11 位数字。",
      "是否使用 `^` 和 `$` 保证整段文本匹配。",
      "是否分别创建邮箱和手机号的 `Pattern` 与 `Matcher`。",
      "是否使用 `matches()` 做完整校验，而不是误用 `find()`。"
    ],
    commonMistakes: [
      "在 Java 字符串里少写反斜杠，导致正则规则不是你以为的样子。",
      "邮箱正则里把点号写成普通 `.`，导致任意字符都能通过这一位。",
      "忘记 `^` 和 `$`，让前后夹杂其他字符的输入也被误判通过。",
      "用 `find()` 做完整格式校验，结果只要找到一段符合就算通过。",
      "把手机号规则写成只要 11 位数字，没有限制开头和第二位。",
      "把 `{2}`、`{9}` 写成全角符号或中文括号。",
      "试图用一个过度复杂的正则解决所有输入问题，反而难以维护。"
    ],
    sources: [
      {
        title: "Dev.java: Regular Expressions",
        url: "https://dev.java/learn/regex/"
      },
      {
        title: "Dev.java: The Matcher Class",
        url: "https://dev.java/learn/regex/matchers/"
      },
      {
        title: "Oracle Java SE 21 API: Pattern",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/regex/Pattern.html"
      },
      {
        title: "Oracle Java SE 21 API: Matcher",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/regex/Matcher.html"
      }
    ]
  },
  {
    id: "level5-7-exception-hierarchy",
    title: "异常体系",
    subtitle: "try、catch、自定义异常",
    intro: [
      "异常是程序运行中发生的异常事件。它可能来自用户输入错误、文件不存在、网络失败，也可能来自代码本身的逻辑问题。",
      "Java 的异常根类型是 Throwable，下面常见两大分支是 Error 和 Exception。普通业务代码通常处理 Exception；Error 多表示虚拟机或系统层面的严重问题，一般不由业务代码恢复。",
      "Exception 又分为受检异常和运行时异常。受检异常需要在编译期通过 `throws` 声明或 `try-catch` 处理；RuntimeException 及其子类通常表示编程错误或调用方式不对。",
      "自定义异常适合表达业务规则。例如年龄不满足、余额不足、库存不够，比直接抛一个普通 Exception 更能说明问题。"
    ],
    syntax: [
      "`try { ... } catch (ExceptionType e) { ... }` 用来捕获并处理异常。",
      "多个 catch 从上到下匹配，子类异常要写在父类异常前面。",
      "`finally` 里的代码通常用于清理资源，不管是否发生异常都会尝试执行。",
      "`throw new XxxException(message)` 主动抛出一个异常对象。",
      "方法签名里的 `throws XxxException` 表示这个方法可能把异常交给调用者处理。",
      "自定义受检异常通常继承 `Exception`；自定义运行时异常通常继承 `RuntimeException`。",
      "`getMessage()` 可以取出异常携带的说明文本。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        try {
            int age = readAge("abc");
            System.out.println("年龄：" + age);
        } catch (NumberFormatException e) {
            System.out.println("输入不是整数：" + e.getMessage());
        } finally {
            System.out.println("校验结束");
        }
    }

    static int readAge(String text) {
        return Integer.parseInt(text);
    }
}`,
    task: "补全程序：定义自定义异常 InvalidAgeException。readAdultAge 把文本转成整数，如果年龄小于 18 就抛出 InvalidAgeException。main 中捕获 NumberFormatException 和 InvalidAgeException，输出注册失败原因。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        String input = "16";

        try {
            // TODO: 调用 readAdultAge，并输出注册成功
        } catch (NumberFormatException | InvalidAgeException e) {
            // TODO: 输出注册失败原因
        }
    }

    static int readAdultAge(String text) throws InvalidAgeException {
        // TODO: 转成整数
        // TODO: 年龄小于 18 时抛出 InvalidAgeException
        return 0;
    }

    static class InvalidAgeException extends Exception {
        // TODO: 添加接收 message 的构造器
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        String input = "16";

        try {
            int age = readAdultAge(input);
            System.out.println("注册成功，年龄：" + age);
        } catch (NumberFormatException | InvalidAgeException e) {
            System.out.println("注册失败：" + e.getMessage());
        }
    }

    static int readAdultAge(String text) throws InvalidAgeException {
        int age = Integer.parseInt(text);
        if (age < 18) {
            throw new InvalidAgeException("年龄必须至少 18 岁");
        }
        return age;
    }

    static class InvalidAgeException extends Exception {
        InvalidAgeException(String message) {
            super(message);
        }
    }
}`,
    checks: [
      "是否定义了 `InvalidAgeException` 并继承 `Exception`。",
      "自定义异常是否有接收 message 的构造器，并调用 `super(message)`。",
      "`readAdultAge` 是否声明 `throws InvalidAgeException`。",
      "文本转整数是否使用 `Integer.parseInt(text)`。",
      "年龄小于 18 时是否主动 `throw new InvalidAgeException(...)`。",
      "main 是否捕获并输出 NumberFormatException 或 InvalidAgeException 的信息。"
    ],
    commonMistakes: [
      "自定义异常类没有继承 Exception 或 RuntimeException，导致不能作为异常抛出。",
      "写了 `new InvalidAgeException(...)` 却忘记前面的 `throw`。",
      "方法会抛受检异常，却没有写 `throws`，也没有在内部捕获。",
      "catch 顺序错误，把父类 Exception 写在前面，后面的子类 catch 变成不可达。",
      "捕获异常后什么都不做，问题被悄悄吞掉，后续排查更困难。",
      "把所有错误都 catch 成 Exception，缺少具体处理和清晰信息。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: Exceptions",
        url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html"
      },
      {
        title: "Oracle Java Tutorials: Creating Exception Classes",
        url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/creating.html"
      },
      {
        title: "Oracle Java SE 21 API: Throwable",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Throwable.html"
      },
      {
        title: "Oracle Java SE 21 API: Exception",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Exception.html"
      }
    ]
  },
  {
    id: "level5-8-logging-intro",
    title: "日志入门",
    subtitle: "不要只靠 println",
    intro: [
      "`System.out.println` 很适合初学阶段观察结果，但真实程序需要更有层次的运行记录：普通信息、警告、严重错误、异常堆栈、输出位置和开关配置。",
      "日志框架能记录消息级别。比如 INFO 表示普通流程，WARNING 表示需要注意但程序还能继续，SEVERE 表示严重问题。",
      "Java 标准库自带 `java.util.logging`。它不需要额外依赖，足够用来理解 Logger、Level、Handler 这些基本概念。",
      "好的日志不是越多越好，而是能帮助你回答关键问题：程序走到了哪里、使用了哪些重要输入、失败原因是什么、是否带上了异常对象。"
    ],
    syntax: [
      "`Logger.getLogger(name)` 获取一个 Logger，name 通常使用类名或包名。",
      "常见做法是把 Logger 定义成 `private static final` 字段，避免重复创建和丢失引用。",
      "`logger.info(message)` 记录普通信息。",
      "`logger.warning(message)` 记录警告信息。",
      "`logger.log(Level.SEVERE, message, exception)` 记录严重错误并带上异常对象。",
      "日志消息里避免记录密码、令牌、身份证等敏感信息。",
      "真实项目中，日志输出位置、格式和级别通常由配置决定，而不是散落在业务代码里硬编码。"
    ],
    exampleCode: `import java.util.logging.Level;
import java.util.logging.Logger;

public class Main {
    private static final Logger LOGGER = Logger.getLogger(Main.class.getName());

    public static void main(String[] args) {
        LOGGER.info("开始处理任务");

        try {
            int result = 10 / 0;
            LOGGER.info("结果：" + result);
        } catch (ArithmeticException e) {
            LOGGER.log(Level.SEVERE, "计算失败", e);
        }
    }
}`,
    task: "补全程序：定义 Logger。程序开始时用 INFO 记录订单编号；库存小于等于 0 时用 WARNING 记录库存不足；数量文本无法转成整数时，用 SEVERE 记录异常对象。",
    starterCode: `import java.util.logging.Level;
import java.util.logging.Logger;

public class Main {
    // TODO: 定义 Logger

    public static void main(String[] args) {
        String orderId = "A100";
        int stock = 0;
        String quantityText = "three";

        // TODO: 用 INFO 记录开始处理订单
        // TODO: 库存不足时记录 WARNING
        // TODO: 尝试解析 quantityText，失败时记录 SEVERE 和异常对象
    }
}`,
    answerCode: `import java.util.logging.Level;
import java.util.logging.Logger;

public class Main {
    private static final Logger LOGGER = Logger.getLogger(Main.class.getName());

    public static void main(String[] args) {
        String orderId = "A100";
        int stock = 0;
        String quantityText = "three";

        LOGGER.log(Level.INFO, "开始处理订单：{0}", orderId);

        if (stock <= 0) {
            LOGGER.warning("库存不足，订单暂不能发货：" + orderId);
        }

        try {
            int quantity = Integer.parseInt(quantityText);
            LOGGER.log(Level.INFO, "订单数量：{0}", quantity);
        } catch (NumberFormatException e) {
            LOGGER.log(Level.SEVERE, "数量不是整数：" + quantityText, e);
        }
    }
}`,
    checks: [
      "是否导入 `java.util.logging.Logger` 和 `java.util.logging.Level`。",
      "是否定义了 `private static final Logger LOGGER` 或等价 Logger 字段。",
      "开始处理订单时是否记录 INFO 级别日志。",
      "库存不足时是否记录 WARNING 级别日志。",
      "解析数量失败时是否捕获 NumberFormatException。",
      "SEVERE 日志是否把异常对象一起传入，方便看到堆栈信息。"
    ],
    commonMistakes: [
      "继续只用 `System.out.println` 输出所有信息，没有体现日志级别。",
      "每次要打日志时都重新创建 Logger，代码重复且不利于统一管理。",
      "捕获异常后只打印一句失败，没有把异常对象传给日志方法。",
      "把普通流程都记成 SEVERE，导致真正严重的问题被噪声淹没。",
      "在日志里输出密码、密钥、完整身份证号等敏感信息。",
      "认为日志会自动替代错误处理；日志负责记录，程序仍然要决定如何恢复或失败退出。"
    ],
    sources: [
      {
        title: "Oracle Java Logging Overview",
        url: "https://docs.oracle.com/en/java/javase/21/core/java-logging-overview.html"
      },
      {
        title: "Oracle Java SE 21 API: Module java.logging",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.logging/module-summary.html"
      },
      {
        title: "Oracle Java SE 21 API: Logger",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.logging/java/util/logging/Logger.html"
      },
      {
        title: "Oracle Java SE 21 API: Level",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.logging/java/util/logging/Level.html"
      }
    ]
  }
];
