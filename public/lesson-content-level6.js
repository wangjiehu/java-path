window.LESSON_CONTENT_LEVEL6 = [
  {
    id: "level6-1-generics",
    title: "泛型",
    subtitle: "类型安全的容器",
    intro: [
      "泛型解决的是“同一套代码能不能安全地处理不同类型”的问题。比如 List 可以装字符串，也可以装整数；如果没有泛型，取出来时常常只能当 Object 用，还要自己强制转换，错误会拖到运行时才爆出来。",
      "写成 `List<String>` 以后，Java 编译器就知道这个列表只应该放 String。你不小心放入数字时，编译阶段就会提醒你；你取出元素时，也不用再手动转换成 String。",
      "泛型不只用于集合。你也可以写自己的泛型类、泛型方法，让“类型”像参数一样传进来。这样既能复用逻辑，又能保留类型信息，让调用者少犯错。",
      "初学泛型时先记住一个目标：把原本可能在运行时报错的类型问题，尽量提前到编译时报错。独立开发时，这会让你的代码更稳、更容易重构。"
    ],
    syntax: [
      "`List<String>` 表示这个列表的元素类型是 String，不能随便放入其他类型。",
      "`new ArrayList<>()` 右侧可以使用钻石语法，类型由左侧变量推断出来。",
      "`class Box<T>` 定义泛型类，T 是类型参数，创建对象时再决定 T 代表什么类型。",
      "`static <T> T first(List<T> list)` 定义泛型方法，`<T>` 写在返回值类型前面。",
      "`T extends Number` 表示 T 必须是 Number 或它的子类，这叫类型上界。",
      "`List<?>` 表示未知元素类型，适合只读取、不关心具体类型的场景。",
      "泛型只能使用引用类型，不能写 `List<int>`，要写 `List<Integer>`。",
      "尽量避免原始类型 raw type，例如只写 `List list`，它会绕开泛型检查。"
    ],
    exampleCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Box<String> nameBox = new Box<>("小林");
        Box<Integer> scoreBox = new Box<>(96);

        List<String> names = new ArrayList<>();
        names.add(nameBox.value());
        names.add("小周");

        System.out.println("第一个名字：" + first(names));
        System.out.println("分数：" + scoreBox.value());
    }

    static <T> T first(List<T> items) {
        return items.get(0);
    }

    static class Box<T> {
        private final T value;

        Box(T value) {
            this.value = value;
        }

        T value() {
            return value;
        }
    }
}`,
    task: "补全程序：定义一个泛型类 Pair<K, V> 保存 key 和 value；创建 Pair<String, Integer> 表示课程名和分数；再写一个泛型方法 printPair 输出 key -> value。要求不要使用原始类型 Pair。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        // TODO: 创建 Pair<String, Integer>，key 为 Java，value 为 95
        // TODO: 调用 printPair 输出内容
    }

    // TODO: 定义泛型方法 printPair

    static class Pair<K, V> {
        // TODO: 定义 key 和 value 字段
        // TODO: 编写构造器
        // TODO: 编写 key() 和 value() 方法
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        Pair<String, Integer> courseScore = new Pair<>("Java", 95);
        printPair(courseScore);
    }

    static <K, V> void printPair(Pair<K, V> pair) {
        System.out.println(pair.key() + " -> " + pair.value());
    }

    static class Pair<K, V> {
        private final K key;
        private final V value;

        Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }

        K key() {
            return key;
        }

        V value() {
            return value;
        }
    }
}`,
    checks: [
      "是否定义了 `Pair<K, V>`，并用两个类型参数分别表示 key 和 value。",
      "是否创建了 `Pair<String, Integer>`，而不是原始类型 `Pair`。",
      "字段、构造器和访问方法是否都使用 K、V 保持类型一致。",
      "是否定义了泛型方法 `printPair`，能接收任意类型组合的 Pair。",
      "输出中是否同时使用了 pair 的 key 和 value。",
      "代码是否没有出现不必要的强制类型转换。"
    ],
    commonMistakes: [
      "只写 `Pair pair = ...`，变成原始类型，编译器无法继续保护类型安全。",
      "把泛型类型参数写成具体变量来用，例如试图 `new T()`，这是不允许的。",
      "泛型方法忘记在返回值前写 `<K, V>`，导致 K、V 无法识别。",
      "创建 `Pair<String, Integer>` 时把 value 写成字符串，类型不匹配。",
      "误以为 `List<Integer>` 是 `List<Number>` 的子类型，实际两者不能直接互相赋值。",
      "把泛型当成运行时类型判断工具，忽略了 Java 泛型有类型擦除。"
    ],
    sources: [
      {
        title: "Dev.java: Introducing Generics",
        url: "https://dev.java/learn/generics/intro/"
      },
      {
        title: "Oracle Java Tutorials: Generics",
        url: "https://docs.oracle.com/javase/tutorial/java/generics/index.html"
      },
      {
        title: "Oracle Java SE 21 API: List",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html"
      }
    ]
  },
  {
    id: "level6-2-lambda-expressions",
    title: "Lambda 表达式",
    subtitle: "把行为当参数",
    intro: [
      "Lambda 表达式让你把一小段行为直接传给方法。以前我们常把数据传来传去，比如传一个数字、一个字符串；有了 Lambda，你还可以传“怎么判断”“怎么转换”“怎么处理”。",
      "它最常见的搭档是函数式接口。函数式接口只有一个抽象方法，例如 Predicate 表示一个判断，Function 表示把一种值转换成另一种值，Consumer 表示消费一个值但不返回结果。",
      "Lambda 的重点不是少写几行代码，而是让变化点更清楚。比如筛选列表时，循环逻辑不变，变化的是筛选条件；这个条件就可以用 Lambda 传进去。",
      "独立开发时，Lambda 会频繁出现在集合排序、事件回调、Stream、Optional 和异步任务里。先练熟简单写法，后面看现代 Java API 会轻松很多。"
    ],
    syntax: [
      "基本格式是 `(参数) -> 表达式` 或 `(参数) -> { 多行语句 }`。",
      "只有一个参数且类型可推断时，可以省略参数类型和小括号，例如 `name -> name.length() > 2`。",
      "多行 Lambda 要写花括号；如果需要返回值，花括号里要显式写 `return`。",
      "`Predicate<T>` 表示接收 T 并返回 boolean，常用于过滤和校验。",
      "`Function<T, R>` 表示接收 T 并返回 R，常用于转换数据。",
      "`Consumer<T>` 表示接收 T 但不返回结果，常用于输出、记录、逐个处理。",
      "Lambda 可以读取外部局部变量，但这个变量必须是 final 或事实上的 final。",
      "Lambda 本身没有独立类型，它必须依附在某个函数式接口上。"
    ],
    exampleCode: `import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("Li", "Wang", "Zhao", "Sun");

        List<String> longNames = filter(names, name -> name.length() >= 4);
        List<String> hasA = filter(names, name -> name.toLowerCase().contains("a"));

        System.out.println(longNames);
        System.out.println(hasA);
    }

    static List<String> filter(List<String> items, Predicate<String> rule) {
        List<String> result = new ArrayList<>();
        for (String item : items) {
            if (rule.test(item)) {
                result.add(item);
            }
        }
        return result;
    }
}`,
    task: "补全程序：写一个方法 transform，接收 List<Integer> 和 Function<Integer, Integer>，返回转换后的新列表。main 中使用 Lambda 把每个分数加 5 分，但最高不超过 100。",
    starterCode: `import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        List<Integer> scores = List.of(88, 96, 72);

        // TODO: 使用 Lambda 调用 transform，每个分数加 5，最高不超过 100
        // TODO: 输出转换后的列表
    }

    static List<Integer> transform(List<Integer> items, Function<Integer, Integer> mapper) {
        List<Integer> result = new ArrayList<>();
        // TODO: 遍历 items，把 mapper.apply 的结果加入 result
        return result;
    }
}`,
    answerCode: `import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        List<Integer> scores = List.of(88, 96, 72);

        List<Integer> updated = transform(scores, score -> Math.min(100, score + 5));
        System.out.println(updated);
    }

    static List<Integer> transform(List<Integer> items, Function<Integer, Integer> mapper) {
        List<Integer> result = new ArrayList<>();
        for (Integer item : items) {
            result.add(mapper.apply(item));
        }
        return result;
    }
}`,
    checks: [
      "是否导入并使用了 `Function<Integer, Integer>`。",
      "transform 是否接收列表和 mapper 两个参数。",
      "是否在循环中调用 `mapper.apply(item)` 取得转换结果。",
      "Lambda 是否表达了“加 5 且最高不超过 100”的规则。",
      "是否返回一个新列表，而不是直接修改原始 List.of 创建的不可变列表。",
      "main 是否输出转换后的列表。"
    ],
    commonMistakes: [
      "把 Lambda 写成普通方法调用，忘记 `->`。",
      "多行 Lambda 有返回值时忘记写 `return`。",
      "调用 Function 时写成 `mapper(item)`，Java 中要写 `mapper.apply(item)`。",
      "试图修改 `List.of(...)` 返回的列表，例如直接 `scores.add(...)`。",
      "外部局部变量在 Lambda 中使用后又被重新赋值，导致编译失败。",
      "不知道该选哪个函数式接口：判断用 Predicate，转换用 Function，消费用 Consumer。"
    ],
    sources: [
      {
        title: "Dev.java: Lambda Expressions",
        url: "https://dev.java/learn/lambdas/"
      },
      {
        title: "Dev.java: Writing Your First Lambda Expression",
        url: "https://dev.java/learn/lambdas/first-lambdas/"
      },
      {
        title: "Oracle Java Tutorials: Lambda Expressions",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html"
      },
      {
        title: "Oracle Java SE 21 API: java.util.function",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/package-summary.html"
      }
    ]
  },
  {
    id: "level6-3-method-references",
    title: "方法引用",
    subtitle: "更短的 Lambda",
    intro: [
      "方法引用是 Lambda 的简写形式。当前 Lambda 做的事情如果只是“把参数交给一个已有方法”，就可以用 `::` 直接引用那个方法。",
      "例如 `name -> name.toUpperCase()` 可以写成 `String::toUpperCase`，`text -> System.out.println(text)` 可以写成 `System.out::println`。它们表达的是同一件事：调用一个已经存在的方法。",
      "方法引用不会让程序多出新能力，它主要提升可读性。看到 `Student::score`，你很快知道这是取学生分数；看到 `Integer::parseInt`，你知道这是把文本转成整数。",
      "判断是否适合使用方法引用有一个简单标准：如果 Lambda 体里还有判断、计算、组合逻辑，就继续用 Lambda；如果只是转手调用一个现成方法，再考虑方法引用。"
    ],
    syntax: [
      "`ClassName::staticMethod` 引用静态方法，例如 `Integer::parseInt`。",
      "`object::instanceMethod` 引用某个对象的实例方法，例如 `System.out::println`。",
      "`ClassName::instanceMethod` 引用某类对象的实例方法，例如 `String::trim`。",
      "`ClassName::new` 引用构造器，例如 `ArrayList::new`。",
      "方法引用必须匹配目标函数式接口的参数和返回值。",
      "方法引用适合替代“只调用一个已有方法”的 Lambda。",
      "如果需要额外参数调整、条件判断或多步处理，Lambda 往往更清楚。",
      "方法引用常和 `map`、`forEach`、`sorted`、`Comparator.comparing` 一起出现。"
    ],
    exampleCode: `import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> raw = List.of("  18", "  27 ", "35  ");

        List<Integer> ages = raw.stream()
                .map(String::trim)
                .map(Integer::parseInt)
                .collect(Collectors.toList());

        ages.forEach(System.out::println);
    }
}`,
    task: "补全程序：把 words 中的文本先去掉首尾空白，再转成大写，收集成新列表并输出。要求至少使用两个方法引用：String::trim 和 String::toUpperCase。",
    starterCode: `import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> words = List.of(" java ", " stream", "lambda ");

        List<String> cleaned = words.stream()
                // TODO: 使用方法引用去掉首尾空白
                // TODO: 使用方法引用转成大写
                .collect(Collectors.toList());

        // TODO: 使用方法引用逐个输出
    }
}`,
    answerCode: `import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> words = List.of(" java ", " stream", "lambda ");

        List<String> cleaned = words.stream()
                .map(String::trim)
                .map(String::toUpperCase)
                .collect(Collectors.toList());

        cleaned.forEach(System.out::println);
    }
}`,
    checks: [
      "是否使用 `String::trim` 去掉首尾空白。",
      "是否使用 `String::toUpperCase` 转成大写。",
      "是否使用 `collect(Collectors.toList())` 收集成新列表。",
      "是否使用 `System.out::println` 或等价方式输出每个结果。",
      "方法引用的参数和返回值是否与 `map`、`forEach` 需要的函数式接口匹配。",
      "是否没有为了凑方法引用而牺牲代码可读性。"
    ],
    commonMistakes: [
      "把方法引用写成 `String.toUpperCase`，缺少 `::`。",
      "在方法引用后加括号，例如 `String::trim()`，方法引用里不写调用括号。",
      "引用的方法签名和目标接口不匹配，导致编译器无法推断。",
      "把需要额外逻辑的代码硬改成方法引用，反而读起来更费劲。",
      "忘记导入 `Collectors`，导致收集代码无法编译。",
      "以为方法引用比 Lambda 性能一定更高；通常它主要是可读性工具。"
    ],
    sources: [
      {
        title: "Dev.java: Writing Lambda Expressions as Method References",
        url: "https://dev.java/learn/lambdas/method-references/"
      },
      {
        title: "Oracle Java Tutorials: Method References",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html"
      },
      {
        title: "Oracle Java SE 21 API: Function",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Function.html"
      }
    ]
  },
  {
    id: "level6-4-stream-basics",
    title: "Stream 基础",
    subtitle: "过滤、映射、收集",
    intro: [
      "Stream 是处理集合数据的一种现代写法。它让你把“从哪里来、筛掉什么、变成什么、最终收集到哪里”串成一条清晰的数据流水线。",
      "传统 for 循环强调一步一步怎么做；Stream 更强调你想得到什么结果。比如从学生列表中找出及格的人名，可以写成过滤分数、映射姓名、收集列表三个动作。",
      "Stream 操作常分为中间操作和终端操作。`filter`、`map` 这类中间操作只是描述流水线；只有遇到 `collect`、`count`、`forEach` 这样的终端操作，数据才真正开始流动。",
      "初学时不要把 Stream 当成必须替代所有循环的工具。简单循环依然很好；当你在做筛选、转换、统计、分组时，Stream 往往能让意图更集中。"
    ],
    syntax: [
      "`collection.stream()` 从集合创建 Stream。",
      "`filter(predicate)` 保留满足条件的元素，参数通常是 Lambda。",
      "`map(function)` 把每个元素转换成另一个值，例如从 Student 转成 name。",
      "`sorted()` 或 `sorted(comparator)` 对流中元素排序。",
      "`limit(n)` 只保留前 n 个元素，常用于排行榜和分页前的截断。",
      "`collect(Collectors.toList())` 把结果收集成 List。",
      "`count()` 返回元素数量，是终端操作。",
      "Stream 只能消费一次；一次终端操作后，不要复用同一个 Stream 对象。"
    ],
    exampleCode: `import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Student> students = List.of(
                new Student("小林", 91),
                new Student("小周", 58),
                new Student("小何", 76),
                new Student("小吴", 88)
        );

        List<String> passedNames = students.stream()
                .filter(student -> student.score() >= 60)
                .sorted(Comparator.comparing(Student::score).reversed())
                .map(Student::name)
                .collect(Collectors.toList());

        System.out.println(passedNames);
    }

    static class Student {
        private final String name;
        private final int score;

        Student(String name, int score) {
            this.name = name;
            this.score = score;
        }

        String name() {
            return name;
        }

        int score() {
            return score;
        }
    }
}`,
    task: "补全程序：从 products 中筛选价格小于等于 100 的商品，按价格从低到高排序，转换成商品名列表并输出。要求使用 stream、filter、sorted、map、collect。",
    starterCode: `import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Product> products = List.of(
                new Product("键盘", 129),
                new Product("鼠标", 79),
                new Product("数据线", 29),
                new Product("耳机", 199)
        );

        List<String> names = products.stream()
                // TODO: 筛选价格小于等于 100
                // TODO: 按价格升序排序
                // TODO: 转成商品名
                .collect(Collectors.toList());

        System.out.println(names);
    }

    static class Product {
        private final String name;
        private final int price;

        Product(String name, int price) {
            this.name = name;
            this.price = price;
        }

        String name() {
            return name;
        }

        int price() {
            return price;
        }
    }
}`,
    answerCode: `import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Product> products = List.of(
                new Product("键盘", 129),
                new Product("鼠标", 79),
                new Product("数据线", 29),
                new Product("耳机", 199)
        );

        List<String> names = products.stream()
                .filter(product -> product.price() <= 100)
                .sorted(Comparator.comparing(Product::price))
                .map(Product::name)
                .collect(Collectors.toList());

        System.out.println(names);
    }

    static class Product {
        private final String name;
        private final int price;

        Product(String name, int price) {
            this.name = name;
            this.price = price;
        }

        String name() {
            return name;
        }

        int price() {
            return price;
        }
    }
}`,
    checks: [
      "是否从 `products.stream()` 开始构建流水线。",
      "是否用 `filter` 保留价格小于等于 100 的商品。",
      "是否用 `Comparator.comparing(Product::price)` 按价格升序排序。",
      "是否用 `map(Product::name)` 转换成商品名。",
      "是否用 `collect(Collectors.toList())` 得到 List。",
      "输出结果中是否只包含鼠标和数据线，并且数据线排在前面。"
    ],
    commonMistakes: [
      "写了 `filter` 和 `map`，但没有终端操作，流水线不会真正执行。",
      "在 `filter` 中返回了商品名或价格，而不是 boolean 条件。",
      "把 `map` 放在排序前，转成字符串后就不方便按价格排序了。",
      "终端操作后继续复用同一个 Stream 对象，导致 IllegalStateException。",
      "为了简单问题写很长的 Stream 链，反而不如循环清楚。",
      "误以为 Stream 会自动修改原列表；大多数 Stream 操作会产生新结果。"
    ],
    sources: [
      {
        title: "Dev.java: The Stream API",
        url: "https://dev.java/learn/api/streams/"
      },
      {
        title: "Dev.java: Processing Data in Memory Using the Stream API",
        url: "https://dev.java/learn/api/streams/map-filter-reduce/"
      },
      {
        title: "Oracle Java SE 21 API: Stream",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html"
      },
      {
        title: "Oracle Java SE 21 API: Collectors",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Collectors.html"
      }
    ]
  },
  {
    id: "level6-5-stream-advanced",
    title: "Stream 进阶",
    subtitle: "分组、统计、扁平化",
    intro: [
      "Stream 进阶常见在报表和数据整理场景：按分类分组、统计数量或总和、把嵌套列表摊平成一层、找最大最小值。这些需求用循环也能写，但 Stream 的 Collector 可以让结构更像业务描述。",
      "`groupingBy` 可以把元素按某个键分成 Map。比如按城市分组用户、按部门分组员工、按订单状态分组订单。分组之后，每个 key 对应一组元素。",
      "下游 Collector 可以继续定义每组要怎么收集。默认是收集成 List；你也可以用 `counting` 统计数量，用 `summingInt` 求和，用 `mapping` 只收集某个字段。",
      "`flatMap` 用来处理“列表里面还有列表”的情况。它会把每个元素映射成一个 Stream，再把多个小 Stream 摊平成一个大 Stream，适合标签、订单明细、课程章节这类嵌套数据。"
    ],
    syntax: [
      "`Collectors.groupingBy(classifier)` 按 classifier 的结果分组，返回 Map。",
      "`Collectors.counting()` 统计每组元素数量，结果通常是 Long。",
      "`Collectors.summingInt(function)` 对每组元素求 int 总和。",
      "`Collectors.mapping(mapper, downstream)` 先转换每个元素，再交给下游收集器。",
      "`flatMap(item -> item.list().stream())` 把嵌套集合摊平成单层 Stream。",
      "`distinct()` 去重，依赖元素的 equals 和 hashCode。",
      "`reduce(identity, accumulator)` 可以把多个值折叠成一个结果。",
      "复杂 Stream 链要适度拆变量，否则调试和阅读都会变难。"
    ],
    exampleCode: `import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Order> orders = List.of(
                new Order("北京", 120, List.of("Java", "后端")),
                new Order("上海", 80, List.of("前端", "Java")),
                new Order("北京", 200, List.of("架构", "Java"))
        );

        Map<String, Integer> amountByCity = orders.stream()
                .collect(Collectors.groupingBy(
                        Order::city,
                        Collectors.summingInt(Order::amount)
                ));

        Set<String> tags = orders.stream()
                .flatMap(order -> order.tags().stream())
                .collect(Collectors.toSet());

        System.out.println(amountByCity);
        System.out.println(tags);
    }

    record Order(String city, int amount, List<String> tags) {
    }
}`,
    task: "补全程序：统计每个部门的人数，统计每个部门的总分，并把所有员工技能摊平成一个去重后的 Set。要求使用 groupingBy、counting、summingInt 和 flatMap。",
    starterCode: `import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Employee> employees = List.of(
                new Employee("研发", "小林", 90, List.of("Java", "SQL")),
                new Employee("研发", "小周", 82, List.of("Java", "Linux")),
                new Employee("运营", "小何", 76, List.of("Excel", "SQL"))
        );

        // TODO: 按部门统计人数
        // TODO: 按部门统计总分
        // TODO: 摊平所有技能并去重
        // TODO: 输出三个结果
    }

    record Employee(String department, String name, int score, List<String> skills) {
    }
}`,
    answerCode: `import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Employee> employees = List.of(
                new Employee("研发", "小林", 90, List.of("Java", "SQL")),
                new Employee("研发", "小周", 82, List.of("Java", "Linux")),
                new Employee("运营", "小何", 76, List.of("Excel", "SQL"))
        );

        Map<String, Long> countByDepartment = employees.stream()
                .collect(Collectors.groupingBy(
                        Employee::department,
                        Collectors.counting()
                ));

        Map<String, Integer> scoreByDepartment = employees.stream()
                .collect(Collectors.groupingBy(
                        Employee::department,
                        Collectors.summingInt(Employee::score)
                ));

        Set<String> skills = employees.stream()
                .flatMap(employee -> employee.skills().stream())
                .collect(Collectors.toSet());

        System.out.println(countByDepartment);
        System.out.println(scoreByDepartment);
        System.out.println(skills);
    }

    record Employee(String department, String name, int score, List<String> skills) {
    }
}`,
    checks: [
      "是否用 `groupingBy(Employee::department, Collectors.counting())` 统计部门人数。",
      "是否用 `groupingBy` 搭配 `summingInt(Employee::score)` 统计部门总分。",
      "人数 Map 的值类型是否使用 Long 或能正确接收 counting 的结果。",
      "是否用 `flatMap(employee -> employee.skills().stream())` 摊平技能列表。",
      "是否把技能收集成 Set，避免重复技能出现多次。",
      "是否分别输出人数、总分和技能集合三个结果。"
    ],
    commonMistakes: [
      "把 `map(Employee::skills)` 当成摊平操作，结果得到的是 List 的 Stream，而不是技能的 Stream。",
      "counting 的结果是 Long，却用 `Map<String, Integer>` 接收。",
      "分组时忘记第二个下游 Collector，导致得到的是 Map 到员工列表，而不是统计值。",
      "把复杂 Collector 全写成一行，括号层级看不清，排错很痛苦。",
      "在 Stream 中修改外部可变集合来收集结果，失去 Collector 的优势。",
      "看到 parallelStream 就随手使用，忽略并行流对数据规模、线程安全和顺序的要求。"
    ],
    sources: [
      {
        title: "Dev.java: Using a Collector as a Terminal Operation",
        url: "https://dev.java/learn/api/streams/using-collectors/"
      },
      {
        title: "Dev.java: Reducing a Stream",
        url: "https://dev.java/learn/api/streams/reducing/"
      },
      {
        title: "Dev.java: Adding Intermediate Operations on a Stream",
        url: "https://dev.java/learn/api/streams/intermediate-operation/"
      },
      {
        title: "Oracle Java SE 21 API: Collectors",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Collectors.html"
      }
    ]
  },
  {
    id: "level6-6-record",
    title: "record",
    subtitle: "轻量数据对象",
    intro: [
      "record 是 Java 用来表达“数据载体”的简洁语法。很多类只是为了保存几项数据，然后生成构造器、getter、equals、hashCode、toString；record 可以把这些样板代码交给编译器。",
      "写 `record User(String name, int age) {}` 时，Java 会自动生成构造器、同名访问方法 `name()` 和 `age()`、基于组件的相等比较、hashCode 和可读的 toString。",
      "record 很适合表示请求参数、查询结果、坐标、配置项、统计行这类以数据为主的对象。它不适合表示状态会频繁变化、需要复杂继承层级或隐藏大量行为的对象。",
      "record 的组件字段是 final，record 类本身也是隐式 final。你可以添加方法，也可以写紧凑构造器做校验，但不要把 record 当成“少写代码的普通可变类”。"
    ],
    syntax: [
      "`record User(String name, int age) {}` 声明一个 record，括号里是组件列表。",
      "访问组件用同名方法，例如 `user.name()`，不是 `getName()`。",
      "record 自动生成构造器、访问方法、`equals`、`hashCode` 和 `toString`。",
      "`public User { ... }` 是紧凑构造器，常用于校验或标准化组件值。",
      "record 可以声明普通实例方法和静态方法，也可以实现接口。",
      "record 不能继承其他类，因为它已经隐式继承 `java.lang.Record`。",
      "record 是隐式 final，不能被其他类继承。",
      "组件引用如果指向可变对象，record 只保证引用不可变，不保证对象内容不可变。"
    ],
    exampleCode: `import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Course> courses = List.of(
                new Course("Java 入门", 399),
                new Course("Stream 实战", 499)
        );

        for (Course course : courses) {
            System.out.println(course.name() + "：" + course.discountPrice(0.8));
        }

        System.out.println(courses.get(0));
    }

    record Course(String name, int price) {
        Course {
            if (name == null || name.isBlank()) {
                throw new IllegalArgumentException("课程名不能为空");
            }
            if (price < 0) {
                throw new IllegalArgumentException("价格不能为负数");
            }
        }

        int discountPrice(double discount) {
            return (int) Math.round(price * discount);
        }
    }
}`,
    task: "补全程序：定义 record Book(String title, String author, int pages)，在紧凑构造器中校验 title 不能为空、pages 必须大于 0；添加方法 summary 返回“书名 - 作者”；main 中创建一本书并输出 summary 和 record 默认 toString。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        // TODO: 创建 Book 对象
        // TODO: 输出 summary
        // TODO: 输出 Book 对象本身，观察默认 toString
    }

    // TODO: 定义 record Book
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        Book book = new Book("Java 现代语法", "小林", 320);

        System.out.println(book.summary());
        System.out.println(book);
    }

    record Book(String title, String author, int pages) {
        Book {
            if (title == null || title.isBlank()) {
                throw new IllegalArgumentException("书名不能为空");
            }
            if (pages <= 0) {
                throw new IllegalArgumentException("页数必须大于 0");
            }
        }

        String summary() {
            return title + " - " + author;
        }
    }
}`,
    checks: [
      "是否使用 `record Book(String title, String author, int pages)` 声明数据对象。",
      "是否用紧凑构造器 `Book { ... }` 做参数校验。",
      "title 为空或空白时是否抛出 IllegalArgumentException。",
      "pages 小于等于 0 时是否抛出 IllegalArgumentException。",
      "summary 是否使用 record 组件生成简介。",
      "main 是否同时输出 summary 和 Book 对象本身。"
    ],
    commonMistakes: [
      "把 record 组件当字段直接重新赋值，record 的组件字段是 final。",
      "访问组件时写 `getTitle()`，默认访问方法其实是 `title()`。",
      "紧凑构造器里手动写 `this.title = title`，这是不需要也不允许的。",
      "把 record 用来建模会频繁变化的业务实体，后续修改状态会很别扭。",
      "以为 record 深度不可变；如果组件是 List，列表内容仍可能被外部修改。",
      "给 record 再写一个 extends 父类，record 不能继承其他类。"
    ],
    sources: [
      {
        title: "Dev.java: Using Records to Model Immutable Data",
        url: "https://dev.java/learn/records/"
      },
      {
        title: "Oracle Java Language Updates: Record Classes",
        url: "https://docs.oracle.com/en/java/javase/21/language/records.html"
      },
      {
        title: "JEP 395: Records",
        url: "https://openjdk.org/jeps/395"
      },
      {
        title: "Oracle Java SE 21 API: Record",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Record.html"
      }
    ]
  },
  {
    id: "level6-7-sealed-class",
    title: "sealed class",
    subtitle: "受控继承",
    intro: [
      "sealed class 和 sealed interface 用来限制谁可以继承或实现自己。普通父类默认比较开放，任何可见位置都可能写一个新子类；sealed 则把允许的子类型列出来，让继承边界更清楚。",
      "它适合建模一组已知的可能性：支付结果只有成功、失败、处理中；表达式只有数字、加法、乘法；消息只有文本、图片、系统通知。你希望外部使用这些类型，但不希望别人随意扩展出未知子类。",
      "每个被允许的子类都必须说明自己下一步怎么处理继承：`final` 表示到此为止，`sealed` 表示继续受控扩展，`non-sealed` 表示重新开放。",
      "sealed 和 record 经常配合使用。sealed interface 表示“这一类结果有哪些可能”，record 表示“每种结果携带哪些数据”。再配合模式匹配 switch，编译器还能检查分支是否覆盖完整。"
    ],
    syntax: [
      "`sealed interface Result permits Success, Failure {}` 声明受控接口，并列出允许的实现类。",
      "`permits` 后面的类型必须直接继承或实现这个 sealed 类型。",
      "允许的子类要写 `final`、`sealed` 或 `non-sealed` 三者之一。",
      "如果所有允许的子类写在同一个源文件里，某些情况下可以省略 `permits`，由编译器推断。",
      "record 实现 sealed interface 时隐式 final，适合做允许的子类型。",
      "在命名模块中，sealed 类型和允许的子类型必须在同一个模块里。",
      "在未命名模块中，sealed 类型和允许的子类型必须在同一个包里。",
      "sealed 不是权限控制工具，它是类型建模和继承边界工具。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        PaymentResult result = new Success("P1001", 299);
        System.out.println(message(result));
    }

    static String message(PaymentResult result) {
        if (result instanceof Success success) {
            return "支付成功：" + success.orderId() + "，金额：" + success.amount();
        }
        if (result instanceof Failure failure) {
            return "支付失败：" + failure.reason();
        }
        if (result instanceof Processing processing) {
            return "处理中，预计等待：" + processing.seconds() + " 秒";
        }
        throw new IllegalStateException("未知支付结果");
    }

    sealed interface PaymentResult permits Success, Failure, Processing {
    }

    record Success(String orderId, int amount) implements PaymentResult {
    }

    record Failure(String reason) implements PaymentResult {
    }

    record Processing(int seconds) implements PaymentResult {
    }
}`,
    task: "补全程序：用 sealed interface DeliveryStatus 建模三种配送状态：Preparing、Shipping、Delivered。三个状态都用 record 实现；编写 text 方法返回对应提示，并在 main 中创建 Shipping 后输出提示。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        // TODO: 创建 Shipping 状态并输出 text 结果
    }

    static String text(DeliveryStatus status) {
        // TODO: 使用 instanceof 模式匹配判断三种状态
        return "";
    }

    // TODO: 定义 sealed interface DeliveryStatus
    // TODO: 定义 record Preparing、Shipping、Delivered
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        DeliveryStatus status = new Shipping("SF10086");
        System.out.println(text(status));
    }

    static String text(DeliveryStatus status) {
        if (status instanceof Preparing preparing) {
            return "备货中：" + preparing.warehouse();
        }
        if (status instanceof Shipping shipping) {
            return "运输中，单号：" + shipping.trackingNo();
        }
        if (status instanceof Delivered delivered) {
            return "已签收：" + delivered.receiver();
        }
        throw new IllegalStateException("未知配送状态");
    }

    sealed interface DeliveryStatus permits Preparing, Shipping, Delivered {
    }

    record Preparing(String warehouse) implements DeliveryStatus {
    }

    record Shipping(String trackingNo) implements DeliveryStatus {
    }

    record Delivered(String receiver) implements DeliveryStatus {
    }
}`,
    checks: [
      "是否定义了 `sealed interface DeliveryStatus`。",
      "`permits` 是否列出了 Preparing、Shipping、Delivered 三个实现类型。",
      "三个状态是否用 record 实现 DeliveryStatus。",
      "text 方法是否分别处理三种状态，并读取对应组件。",
      "main 是否创建 Shipping 并输出运输提示。",
      "是否理解 record 实现 sealed interface 时已经是 final。"
    ],
    commonMistakes: [
      "声明 sealed 类型后忘记写 `permits`，且子类型不满足编译器推断条件。",
      "允许的子类没有直接实现 sealed interface。",
      "普通 class 作为允许子类时忘记写 `final`、`sealed` 或 `non-sealed`。",
      "把 sealed 当作防止对象创建的工具；它限制继承，不限制 new 已有子类。",
      "在不同包或不同模块里随意分散 permitted 子类，违反位置约束。",
      "新增一个 permitted 子类后，忘记更新处理逻辑，导致业务分支不完整。"
    ],
    sources: [
      {
        title: "Oracle Java Language Updates: Sealed Classes",
        url: "https://docs.oracle.com/en/java/javase/21/language/sealed-classes-and-interfaces.html"
      },
      {
        title: "JEP 409: Sealed Classes",
        url: "https://openjdk.org/jeps/409"
      },
      {
        title: "Oracle Java SE 21 API: Class",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Class.html"
      }
    ]
  },
  {
    id: "level6-8-pattern-matching",
    title: "模式匹配",
    subtitle: "更安全的类型判断",
    intro: [
      "模式匹配让 Java 在判断类型的同时，把值安全地绑定成目标类型变量。以前你先 `instanceof` 判断，再强制转换；现在可以写成 `if (obj instanceof String text)`，判断成功后直接使用 text。",
      "Java 21 中，模式匹配已经扩展到 switch，并支持 record pattern。它非常适合和 sealed 类型搭配：sealed 列出所有可能，switch 针对每种可能写处理，编译器可以帮你检查是否覆盖完整。",
      "模式匹配的价值不是炫语法，而是减少重复转换和漏分支。处理消息、命令、表达式树、接口返回结果时，它能把“这个值是哪种形状”写得更直接。",
      "适用版本要注意：`instanceof` 模式匹配在 Java 16 成为正式特性；`switch` 模式匹配和 record pattern 在 Java 21 成为正式特性。课程示例使用 Java 21 写法。"
    ],
    syntax: [
      "`obj instanceof String text` 是类型模式，匹配成功后 text 就是 String。",
      "模式变量有作用域，只能在编译器能确认匹配成功的地方使用。",
      "`switch (value) { case Type name -> ... }` 可以按类型分支处理对象。",
      "`case null -> ...` 可以在模式 switch 中显式处理 null。",
      "`case Type name when 条件 -> ...` 可以给模式分支加守卫条件。",
      "record pattern 可以拆开 record，例如 `case Point(int x, int y) -> ...`。",
      "对 sealed 类型做 switch 时，如果覆盖所有 permitted 子类型，通常不需要 default。",
      "更具体的 case 要放在更通用的 case 前面，否则后面的分支可能被支配而无法到达。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        Command command = new Pay("A100", 299);
        System.out.println(handle(command));
    }

    static String handle(Command command) {
        return switch (command) {
            case Login(String username) -> "用户登录：" + username;
            case Pay(String orderId, int amount) when amount > 0 ->
                    "支付订单：" + orderId + "，金额：" + amount;
            case Pay pay -> "支付金额异常：" + pay.amount();
            case Logout logout -> "用户退出：" + logout.username();
        };
    }

    sealed interface Command permits Login, Pay, Logout {
    }

    record Login(String username) implements Command {
    }

    record Pay(String orderId, int amount) implements Command {
    }

    record Logout(String username) implements Command {
    }
}`,
    task: "补全程序：用 Java 21 模式匹配 switch 处理 ApiResponse。Success(String data) 返回“成功：data”；Error(int code, String message) 中 code 大于等于 500 返回“服务器错误：message”，否则返回“请求错误：message”；Loading 返回“加载中”。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        ApiResponse response = new Error(404, "未找到");
        System.out.println(render(response));
    }

    static String render(ApiResponse response) {
        return switch (response) {
            // TODO: 处理 Success，并拆出 data
            // TODO: 处理 500 及以上的 Error
            // TODO: 处理其他 Error
            // TODO: 处理 Loading
        };
    }

    sealed interface ApiResponse permits Success, Error, Loading {
    }

    record Success(String data) implements ApiResponse {
    }

    record Error(int code, String message) implements ApiResponse {
    }

    record Loading() implements ApiResponse {
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        ApiResponse response = new Error(404, "未找到");
        System.out.println(render(response));
    }

    static String render(ApiResponse response) {
        return switch (response) {
            case Success(String data) -> "成功：" + data;
            case Error(int code, String message) when code >= 500 -> "服务器错误：" + message;
            case Error error -> "请求错误：" + error.message();
            case Loading loading -> "加载中";
        };
    }

    sealed interface ApiResponse permits Success, Error, Loading {
    }

    record Success(String data) implements ApiResponse {
    }

    record Error(int code, String message) implements ApiResponse {
    }

    record Loading() implements ApiResponse {
    }
}`,
    checks: [
      "是否使用 `switch` 表达式返回字符串。",
      "是否使用 record pattern 拆出 Success 的 data。",
      "是否使用 `when code >= 500` 区分服务器错误。",
      "其他 Error 是否仍然被处理，避免漏掉 400 类错误。",
      "Loading 是否有独立分支。",
      "ApiResponse 是否是 sealed interface，且 permits 三个 record。",
      "是否没有添加无意义的 default 来掩盖漏分支问题。"
    ],
    commonMistakes: [
      "使用 Java 17 或更早版本直接编译 Java 21 的模式 switch，导致语法不支持。",
      "把 `when` 条件写在 case 外面，模式 switch 的守卫条件位置不对。",
      "先写 `case Error error`，再写带 `when` 的 Error 分支，后者会被前者覆盖。",
      "在 `instanceof` 模式变量的作用域外使用变量，编译器会报找不到符号。",
      "对可能为 null 的值没有处理，真实项目中要决定是否加 `case null` 或提前校验。",
      "为了追求新语法，把简单 if-else 改得更难读。"
    ],
    sources: [
      {
        title: "Dev.java: Using Pattern Matching",
        url: "https://dev.java/learn/pattern-matching/"
      },
      {
        title: "Oracle Java Language Updates: Pattern Matching",
        url: "https://docs.oracle.com/en/java/javase/21/language/pattern-matching.html"
      },
      {
        title: "Oracle Java Language Updates: Pattern Matching for switch",
        url: "https://docs.oracle.com/en/java/javase/21/language/pattern-matching-switch.html"
      },
      {
        title: "JEP 441: Pattern Matching for switch",
        url: "https://openjdk.org/jeps/441"
      },
      {
        title: "JEP 440: Record Patterns",
        url: "https://openjdk.org/jeps/440"
      }
    ]
  },
  {
    id: "level6-9-module-system",
    title: "模块系统",
    subtitle: "module-info.java",
    intro: [
      "模块系统是 Java 9 引入的工程级组织方式。包负责组织类，模块则在更高一层说明：这个工程单元叫什么、依赖哪些模块、哪些包对外公开、哪些内部实现不希望别人直接使用。",
      "`module-info.java` 是模块声明文件。里面常见的关键词是 `requires` 和 `exports`：前者声明当前模块需要读取谁，后者声明当前模块把哪些包作为公开 API 暴露出去。",
      "对小练习来说，一个 Main.java 就够了；对可维护的真实项目，模块系统能减少误用内部包、让依赖关系更明确，并支持 jlink 这类工具创建更小的运行时镜像。",
      "模块不等于包，也不等于 Maven 依赖。Maven/Gradle 管的是构建和第三方库下载；Java 模块系统管的是编译和运行时的可读性、封装边界与服务发现。"
    ],
    syntax: [
      "`module com.example.app { ... }` 声明一个命名模块。",
      "`requires java.logging;` 表示当前模块依赖 java.logging 模块。",
      "`exports com.example.api;` 表示把指定包公开给其他模块使用。",
      "没有 exports 的包默认是模块内部实现，其他模块不能直接访问。",
      "`requires transitive` 表示依赖会传递给读取当前模块的其他模块。",
      "`requires static` 表示编译期需要、运行期可选的依赖。",
      "`uses` 和 `provides ... with ...` 用于模块化服务发现，配合 ServiceLoader。",
      "编译模块化项目通常使用 `javac --module-source-path`，运行时使用 `java --module-path` 和 `--module`。"
    ],
    exampleCode: `// 文件：src/com.example.app/module-info.java
module com.example.app {
    requires java.logging;
    exports com.example.app;
}

// 文件：src/com.example.app/com/example/app/Main.java
package com.example.app;

import java.util.logging.Logger;

public class Main {
    private static final Logger LOGGER = Logger.getLogger(Main.class.getName());

    public static void main(String[] args) {
        LOGGER.info("模块化应用启动");
        System.out.println("Hello Module");
    }
}

// 编译：
// javac -d out --module-source-path src src/com.example.app/module-info.java src/com.example.app/com/example/app/Main.java
//
// 运行：
// java --module-path out --module com.example.app/com.example.app.Main`,
    task: "根据给出的文件结构补全模块声明：模块名为 com.example.shop，Main 使用 java.logging，并且需要对外公开 com.example.shop.api 包。然后补全 Main 输出一条启动信息。模块课程的练习是多文件片段，不是单文件 Main。",
    starterCode: `// 文件：src/com.example.shop/module-info.java
module com.example.shop {
    // TODO: 声明依赖 java.logging
    // TODO: 导出 com.example.shop.api
}

// 文件：src/com.example.shop/com/example/shop/api/GreetingService.java
package com.example.shop.api;

public class GreetingService {
    public String message() {
        return "欢迎来到商城";
    }
}

// 文件：src/com.example.shop/com/example/shop/Main.java
package com.example.shop;

import com.example.shop.api.GreetingService;
import java.util.logging.Logger;

public class Main {
    private static final Logger LOGGER = Logger.getLogger(Main.class.getName());

    public static void main(String[] args) {
        // TODO: 记录启动日志
        // TODO: 创建 GreetingService 并输出 message
    }
}`,
    answerCode: `// 文件：src/com.example.shop/module-info.java
module com.example.shop {
    requires java.logging;
    exports com.example.shop.api;
}

// 文件：src/com.example.shop/com/example/shop/api/GreetingService.java
package com.example.shop.api;

public class GreetingService {
    public String message() {
        return "欢迎来到商城";
    }
}

// 文件：src/com.example.shop/com/example/shop/Main.java
package com.example.shop;

import com.example.shop.api.GreetingService;
import java.util.logging.Logger;

public class Main {
    private static final Logger LOGGER = Logger.getLogger(Main.class.getName());

    public static void main(String[] args) {
        LOGGER.info("商城模块启动");

        GreetingService service = new GreetingService();
        System.out.println(service.message());
    }
}`,
    checks: [
      "module-info.java 是否声明 `module com.example.shop`。",
      "是否写了 `requires java.logging;` 来读取日志模块。",
      "是否写了 `exports com.example.shop.api;` 公开 API 包。",
      "Main 是否位于 `package com.example.shop;`。",
      "GreetingService 是否位于 `package com.example.shop.api;`。",
      "main 方法是否记录启动日志并输出 GreetingService 的 message。",
      "是否理解未 exports 的 `com.example.shop` 包仍是模块内部包。"
    ],
    commonMistakes: [
      "把 `module-info.java` 放进普通包目录里，而不是模块源码根目录。",
      "写了 import 就以为模块依赖自动建立，实际还需要在 module-info.java 中 requires。",
      "把所有包都 exports 出去，失去了模块封装内部实现的意义。",
      "混淆模块名和包名：它们常常相似，但不是同一个概念。",
      "运行模块时继续只写 `java Main`，模块化运行需要 `--module-path` 和 `--module`。",
      "以为 Maven 坐标就是 Java 模块名，真实项目要查看库的模块声明或自动模块名。"
    ],
    sources: [
      {
        title: "Dev.java: Introduction to Modules in Java",
        url: "https://dev.java/learn/modules/intro/"
      },
      {
        title: "Dev.java: Modules",
        url: "https://dev.java/learn/modules/"
      },
      {
        title: "JEP 261: Module System",
        url: "https://openjdk.org/jeps/261"
      },
      {
        title: "Oracle Java SE 21 API: Module java.base",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/module-summary.html"
      }
    ]
  }
];
