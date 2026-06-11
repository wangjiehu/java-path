window.LESSON_CONTENT_LEVEL1 = [
  {
    id: "level1-1-hello-java",
    title: "你好 Java (Hello World)",
    subtitle: "从输出第一句话开始",
    intro: [
      "学习 Java 的第一步，是让程序在控制台输出一句话。控制台可以先理解成程序和你说话的地方：程序运行后，把结果打印到这里。",
      "Java 程序通常写在类里。现在不需要急着理解面向对象，只要先记住：本课程的练习文件叫 Main.java，所以类名也写成 Main。",
      "程序真正开始执行的位置叫 main 方法。你点击运行时，Java 会找到 main 方法，然后从第一行语句开始往下执行。",
      "这一关的目标很小：写出一条输出语句，并养成使用英文半角符号的习惯。分号、括号、引号写错，是初学时最常见的问题。"
    ],
    syntax: [
      "class 用来定义一个类，public class Main 表示定义一个公开的 Main 类。",
      "public static void main(String[] args) 是 Java 应用常见的程序入口。",
      "System.out.println(\"文字\") 会把双引号里的文字输出到控制台，并在末尾换行。",
      "双引号包住的是字符串，也就是一段普通文本。",
      "Java 语句通常用分号 ; 结束，少写分号会导致编译错误。",
      "花括号 { } 用来包住一段代码，左括号和右括号要成对出现。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        System.out.println("我正在学习 Java。");
    }
}`,
    task: "在 main 方法里写一条输出语句，让控制台输出 Hello, Java!。注意 H 和 J 大写，英文逗号后有一个空格。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        // 在这里输出一句问候
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
    checks: [
      "代码保留 public class Main 和 main 方法。",
      "使用 System.out.println 输出内容。",
      "输出文本完全是 Hello, Java!。",
      "语句末尾有英文分号。",
      "括号、引号和分号都使用英文半角符号。"
    ],
    commonMistakes: [
      "把 println 拼成 printIn，注意中间是小写字母 l，不是大写 I。",
      "使用中文引号 “ ” 或中文分号 ；，Java 不能把它们当作语法符号。",
      "忘记在语句末尾写分号。",
      "删掉 main 方法或类的花括号，导致程序没有入口或结构不完整。",
      "把要输出的文字写在引号外面，Java 会把它当成变量名。"
    ],
    sources: [
      {
        title: "Dev.java: Getting Started with Java",
        url: "https://dev.java/learn/getting-started/"
      },
      {
        title: "Dev.java: Single-File Source-Code Programs",
        url: "https://dev.java/learn/single-file-program/"
      },
      {
        title: "Oracle Java Tutorials: A Closer Look at the Hello World Application",
        url: "https://docs.oracle.com/javase/tutorial/getStarted/application/index.html"
      }
    ]
  },
  {
    id: "level1-2-how-java-runs",
    title: "Java 程序怎样跑起来",
    subtitle: "源码、编译、字节码和 JVM",
    intro: [
      "Java 程序不是把 .java 文件直接丢给电脑执行。通常流程是：先写源代码，再由 javac 编译成 .class 文件，最后由 java 命令启动程序。",
      ".java 文件里放的是人能读懂的 Java 代码；.class 文件里放的是字节码。字节码不是普通文本，而是给 Java 虚拟机读取的指令。",
      "Java 虚拟机常简称 JVM。它负责加载 .class 文件、执行字节码，并把程序和具体操作系统隔开。这也是 Java 能跨平台运行的重要原因之一。",
      "编译错误发生在程序运行前，比如少分号、变量没声明；运行时错误发生在程序已经启动后，比如除以 0。先分清这两类错误，排查问题会轻松很多。"
    ],
    syntax: [
      "源文件通常以 .java 结尾，公开类名要和文件名一致，例如 Main.java 里写 public class Main。",
      "javac Main.java 会尝试编译源代码，成功后生成 Main.class。",
      "java Main 会启动名为 Main 的类，不需要写 .class 后缀。",
      "main 方法是 Java 应用的入口，方法签名通常写作 public static void main(String[] args)。",
      "编译器会检查语法和一部分类型问题；JVM 负责运行编译后的字节码。",
      "IDE 或网页练习器通常帮你封装了 javac 和 java，但背后仍然是类似流程。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("1. 编写 Main.java");
        System.out.println("2. 编译得到 Main.class");
        System.out.println("3. JVM 运行字节码");
    }
}`,
    task: "写一个程序，按顺序输出三行：源码文件：Main.java、编译结果：Main.class、运行入口：main 方法。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        // 输出源码文件名
        // 输出编译后的文件名
        // 输出程序运行入口
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("源码文件：Main.java");
        System.out.println("编译结果：Main.class");
        System.out.println("运行入口：main 方法");
    }
}`,
    checks: [
      "程序输出三行内容。",
      "第一行包含 Main.java。",
      "第二行包含 Main.class。",
      "第三行包含 main 方法。",
      "类名仍然是 Main，并且 main 方法完整。"
    ],
    commonMistakes: [
      "运行时写成 java Main.class；java 命令后面通常写类名 Main。",
      "把文件名写成 main.java，但公开类名写 Main，大小写不一致会出问题。",
      "以为编译成功就等于逻辑正确；编译只代表语法和类型检查通过。",
      "看到红色错误信息就全删重写，应该先读第一条错误的行号和提示。",
      "在字符串外写中文冒号或中文内容没有问题，但语法符号仍要用英文半角。"
    ],
    sources: [
      {
        title: "Dev.java: Getting Started with Java",
        url: "https://dev.java/learn/getting-started/"
      },
      {
        title: "Oracle JDK 26 Tool Guide: The javac Command",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/man/javac.html"
      },
      {
        title: "Oracle JDK 26 Tool Guide: The java Command",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/man/java.html"
      }
    ]
  },
  {
    id: "level1-3-variables",
    title: "数据与盒子",
    subtitle: "用变量保存数字和文字",
    intro: [
      "变量可以理解成一个有名字的盒子。盒子里放一个值，盒子名让你以后能再次找到这个值。",
      "Java 是静态类型语言，变量使用前要先声明类型。你要告诉 Java：这个盒子准备放整数、文本、真假值，还是别的东西。",
      "声明变量常见写法是 类型 名字 = 初始值。等号右边的值会放进左边这个变量里。",
      "变量名应该表达含义。age 比 a 更清楚，studentName 比 sn 更适合初学阶段。写给电脑看的代码，也是在写给未来的自己看。"
    ],
    syntax: [
      "int age = 18; 声明一个 int 变量 age，并把 18 放进去。",
      "String name = \"Ada\"; 声明一个字符串变量 name，字符串内容要用双引号包住。",
      "变量可以重新赋值，例如 age = 19; 表示把 age 里的值换成 19。",
      "同一个作用范围内，变量名不能重复声明。",
      "变量名区分大小写，score 和 Score 是两个不同的名字。",
      "final 可以声明常量，例如 final int MAX_SCORE = 100; 之后不能再改它的值。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        String studentName = "小林";
        int age = 16;
        int score = 95;

        System.out.println(studentName + "今年" + age + "岁");
        System.out.println("本次成绩：" + score);
    }
}`,
    task: "声明三个变量：name 保存你的名字，age 保存年龄，city 保存城市。然后输出一句完整介绍，例如：我叫小林，今年16岁，来自杭州。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        // 声明一个 String 变量保存名字
        // 声明一个 int 变量保存年龄
        // 声明一个 String 变量保存城市

        // 把三个变量拼成一句自我介绍并输出
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        String name = "小林";
        int age = 16;
        String city = "杭州";

        System.out.println("我叫" + name + "，今年" + age + "岁，来自" + city + "。");
    }
}`,
    checks: [
      "至少声明 name、age、city 三个变量。",
      "name 和 city 使用 String 类型。",
      "age 使用 int 类型。",
      "输出语句中使用了变量，而不是只写一整段固定文本。",
      "程序能输出一条完整、通顺的自我介绍。"
    ],
    commonMistakes: [
      "声明 String 文本时忘记双引号。",
      "把 int age = \"16\"; 写成字符串，导致类型和用途不一致。",
      "重复写 int age 两次；第二次修改值应该写 age = 17;。",
      "变量名里出现空格，例如 student name，这是不合法的。",
      "拼接字符串时漏掉 +，导致编译器不知道两段内容怎么连起来。"
    ],
    sources: [
      {
        title: "Dev.java: Creating Variables and Naming Them",
        url: "https://dev.java/learn/language-basics/variables/"
      },
      {
        title: "Dev.java: Creating Primitive Type Variables",
        url: "https://dev.java/learn/language-basics/primitive-types/"
      }
    ]
  },
  {
    id: "level1-4-primitive-and-reference",
    title: "基本类型与引用类型",
    subtitle: "值、地址和默认值",
    intro: [
      "Java 的类型可以先粗略分成两类：基本类型和引用类型。基本类型直接保存简单值，引用类型保存的是指向对象的引用。",
      "八个基本类型是 byte、short、int、long、float、double、char、boolean。初学时最常用的是 int、double、char 和 boolean。",
      "String 不是基本类型，它是引用类型，但 Java 对字符串提供了很多特殊支持，所以写起来很方便。",
      "局部变量在使用前必须明确赋值。字段有默认值，但在方法里的局部变量没有默认值，没赋值就使用会编译失败。"
    ],
    syntax: [
      "int count = 3; 保存整数，适合数量、次数、年龄这类数据。",
      "double price = 19.9; 保存小数，适合普通小数计算。",
      "char grade = 'A'; 保存单个字符，字符用单引号。",
      "boolean passed = true; 保存真假值，只能是 true 或 false。",
      "String title = \"Java\"; 保存一段文本，字符串用双引号。",
      "引用类型变量可以是 null，表示暂时没有指向任何对象；基本类型不能赋值为 null。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        int level = 1;
        double progress = 12.5;
        char rank = 'A';
        boolean unlocked = true;
        String title = "Java 入门";

        System.out.println(title);
        System.out.println("等级：" + level);
        System.out.println("进度：" + progress + "%");
        System.out.println("评级：" + rank);
        System.out.println("是否解锁：" + unlocked);
    }
}`,
    task: "声明 int、double、char、boolean、String 五种变量，描述一次课程学习状态，并把它们分别输出到控制台。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        // int：保存关卡编号
        // double：保存学习进度
        // char：保存评级
        // boolean：保存是否完成
        // String：保存课程名称

        // 分别输出这些变量
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        int lessonNumber = 4;
        double progress = 50.0;
        char grade = 'A';
        boolean completed = false;
        String courseName = "java-path";

        System.out.println("课程：" + courseName);
        System.out.println("关卡：" + lessonNumber);
        System.out.println("进度：" + progress + "%");
        System.out.println("评级：" + grade);
        System.out.println("是否完成：" + completed);
    }
}`,
    checks: [
      "代码中出现 int、double、char、boolean、String 五种变量。",
      "char 值使用单引号，例如 'A'。",
      "String 值使用双引号。",
      "boolean 值使用 true 或 false，不加引号。",
      "每个变量都在使用前完成初始化。"
    ],
    commonMistakes: [
      "把 char 写成 \"A\"；双引号得到的是 String，不是 char。",
      "把 boolean 写成 \"true\"；加引号后它就变成字符串。",
      "声明局部变量后没有赋值就输出。",
      "以为 String 是基本类型；它其实是引用类型，只是语法支持很友好。",
      "给 int 变量赋 3.14，小数不能直接放进整数盒子。"
    ],
    sources: [
      {
        title: "Dev.java: Creating Primitive Type Variables",
        url: "https://dev.java/learn/language-basics/primitive-types/"
      },
      {
        title: "Java Language Specification 26: Types, Values, and Variables",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-4.html"
      }
    ]
  },
  {
    id: "level1-5-operators",
    title: "运算符进阶",
    subtitle: "计算、比较和逻辑判断",
    intro: [
      "变量保存数据，运算符让数据动起来。加减乘除可以计算结果，比较运算符可以得到真假值，逻辑运算符可以组合多个条件。",
      "Java 的 / 对整数和小数表现不同。两个 int 相除会得到整数结果，小数部分会被舍掉；只要其中一个是 double，结果就会按小数计算。",
      "% 叫取余或求余，能得到除法剩下的部分。判断奇偶数时经常写 number % 2 == 0。",
      "&& 和 || 是短路逻辑运算符。&& 要两边都为 true 才是 true；|| 只要一边为 true 就是 true。"
    ],
    syntax: [
      "+、-、*、/、% 分别表示加、减、乘、除、取余。",
      "==、!=、>、>=、<、<= 会得到 boolean 结果。",
      "&& 表示并且，两个条件都成立才成立。",
      "|| 表示或者，至少一个条件成立就成立。",
      "! 会把 boolean 结果反过来，!true 是 false。",
      "可以使用括号改变计算顺序，让表达式更清楚。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        int price = 25;
        int count = 3;
        int total = price * count;
        boolean hasCoupon = true;
        boolean freeShipping = total >= 60 && hasCoupon;

        System.out.println("总价：" + total);
        System.out.println("是否免邮：" + freeShipping);
        System.out.println("是否偶数件：" + (count % 2 == 0));
    }
}`,
    task: "已知单价 price、数量 count、余额 balance。计算总价 total，判断余额是否足够支付，并输出总价和判断结果。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int price = 18;
        int count = 4;
        int balance = 100;

        // 计算 total
        // 判断 balance 是否大于等于 total
        // 输出 total 和判断结果
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        int price = 18;
        int count = 4;
        int balance = 100;

        int total = price * count;
        boolean canPay = balance >= total;

        System.out.println("总价：" + total);
        System.out.println("余额足够：" + canPay);
    }
}`,
    checks: [
      "使用 price * count 计算总价。",
      "使用 >= 比较余额和总价。",
      "用 boolean 变量保存判断结果。",
      "输出总价和余额是否足够。",
      "表达式中没有把比较结果写成字符串。"
    ],
    commonMistakes: [
      "把比较写成 balance = total；单个等号是赋值，不是比较。",
      "整数除法误以为会自动保留小数。",
      "复杂表达式不加括号，导致阅读和调试困难。",
      "把 && 写成中文的“且”，或者把 || 写成中文的“或”。",
      "用 == 比较小数计算结果，后续学习浮点数时要格外小心。"
    ],
    sources: [
      {
        title: "Dev.java: Using Operators in Your Programs",
        url: "https://dev.java/learn/language-basics/using-operators/"
      },
      {
        title: "Dev.java: Summary of Operators",
        url: "https://dev.java/learn/language-basics/all-operators/"
      }
    ]
  },
  {
    id: "level1-6-type-conversion",
    title: "类型转换",
    subtitle: "自动转换、强制转换和精度",
    intro: [
      "类型转换发生在一个类型的值要放到另一个类型里时。比如 int 放进 double 通常很自然，因为 double 能表达更大的数值范围和小数。",
      "从小范围到大范围的转换，很多时候 Java 可以自动完成，这叫自动类型转换或拓宽转换。",
      "从大范围到小范围，或者从小数转整数，可能丢失信息。Java 通常要求你显式写出强制转换，让你确认自己知道风险。",
      "类型转换最容易踩坑的地方是整数除法。int / int 先得到 int，再赋值给 double 也救不回已经丢掉的小数。"
    ],
    syntax: [
      "double result = 10; 可以自动把 int 10 转成 double 10.0。",
      "int n = (int) 3.9; 使用强制转换，小数部分会被截掉，结果是 3。",
      "double average = total / 3.0; 只要参与除法的一边是 double，结果就是 double。",
      "double average = (double) total / count; 常用于把整数除法变成小数除法。",
      "强制转换只影响它右边紧挨着的表达式，必要时用括号包清楚范围。",
      "转换不是格式化。想控制小数显示位数，要用字符串格式化或专门的数字格式工具。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        int total = 10;
        int count = 4;

        double wrongAverage = total / count;
        double rightAverage = (double) total / count;
        int shortValue = (int) rightAverage;

        System.out.println("整数除法后：" + wrongAverage);
        System.out.println("小数除法后：" + rightAverage);
        System.out.println("强制转回 int：" + shortValue);
    }
}`,
    task: "已知三门成绩 score1、score2、score3，计算平均分 average。要求平均分保留为 double，不要因为整数除法丢掉小数。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int score1 = 86;
        int score2 = 91;
        int score3 = 88;

        int total = score1 + score2 + score3;
        // 计算 double 类型的 average

        // 输出总分和平均分
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        int score1 = 86;
        int score2 = 91;
        int score3 = 88;

        int total = score1 + score2 + score3;
        double average = (double) total / 3;

        System.out.println("总分：" + total);
        System.out.println("平均分：" + average);
    }
}`,
    checks: [
      "total 使用三个成绩相加得到。",
      "average 的类型是 double。",
      "计算 average 时使用了 (double) 或 3.0，避免整数除法。",
      "输出中包含总分和平均分。",
      "没有把平均分硬编码成固定文本。"
    ],
    commonMistakes: [
      "写 double average = total / 3; 这会先做整数除法。",
      "以为 (int) 3.9 会四舍五入；它实际是截掉小数部分。",
      "把强制转换写成 int(3.9)，Java 的写法是 (int) 3.9。",
      "强制转换范围不清楚，例如 (double) score1 + score2 / 3 和预期不同。",
      "忽略可能的精度损失，把所有转换都当成安全操作。"
    ],
    sources: [
      {
        title: "Java Language Specification 26: Conversions and Contexts",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/jls/jls-5.html"
      },
      {
        title: "Dev.java: Creating Primitive Type Variables",
        url: "https://dev.java/learn/language-basics/primitive-types/"
      }
    ]
  },
  {
    id: "level1-7-strings",
    title: "字符串基础",
    subtitle: "拼接、比较和常用方法",
    intro: [
      "字符串就是一段文本，在 Java 中用 String 表示。你写在双引号里的内容，例如 \"Java\"，就是字符串字面量。",
      "String 是对象，不是基本类型。它有很多方法，比如 length、contains、substring、equals，可以帮你检查和处理文本。",
      "字符串可以用 + 拼接。只要 + 的一边是字符串，Java 会把另一边转换成字符串后再连接。",
      "比较字符串内容时，初学阶段请优先使用 equals。== 比较的是两个引用是否指向同一个对象，不适合用来判断文本内容是否相同。"
    ],
    syntax: [
      "String name = \"Java\"; 创建一个字符串变量。",
      "name.length() 返回字符串长度。",
      "name.contains(\"va\") 判断是否包含某段文本。",
      "name.equals(\"Java\") 判断内容是否相同，区分大小写。",
      "name.substring(0, 2) 截取一段字符串，包含开始位置，不包含结束位置。",
      "String.format(\"%s:%d\", name, score) 可以生成格式化字符串。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        String language = "Java";
        int level = 1;
        String label = language + " Level " + level;

        System.out.println(label);
        System.out.println("长度：" + label.length());
        System.out.println("包含 Java：" + label.contains("Java"));
        System.out.println("内容相同：" + language.equals("java"));
    }
}`,
    task: "声明 firstName、lastName 和 score，拼出 fullName，再用 String.format 生成一句成绩信息并输出。同时输出 fullName 的长度。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        String firstName = "Lin";
        String lastName = "Xiao";
        int score = 96;

        // 拼接 fullName
        // 使用 String.format 生成消息
        // 输出消息和姓名长度
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        String firstName = "Lin";
        String lastName = "Xiao";
        int score = 96;

        String fullName = firstName + " " + lastName;
        String message = String.format("%s 的成绩是 %d 分", fullName, score);

        System.out.println(message);
        System.out.println("姓名长度：" + fullName.length());
    }
}`,
    checks: [
      "声明并使用 firstName、lastName、score。",
      "用 + 拼接得到 fullName。",
      "使用 String.format 生成输出消息。",
      "调用 fullName.length() 获取长度。",
      "字符串内容使用双引号，变量名没有写进引号里当固定文本。"
    ],
    commonMistakes: [
      "用 == 判断两个字符串内容是否相同。",
      "把 length 写成字段 fullName.length；String 的长度要调用 length() 方法。",
      "substring 的结束下标写错，忘记它不包含结束位置。",
      "拼接时漏掉空格，导致 firstName 和 lastName 粘在一起。",
      "把变量写进引号里，例如 \"fullName\"，输出的就只是这几个字母。"
    ],
    sources: [
      {
        title: "Dev.java: Strings",
        url: "https://dev.java/learn/numbers-strings/strings/"
      },
      {
        title: "Oracle Java SE 26 API: String",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html"
      }
    ]
  },
  {
    id: "level1-8-console-input",
    title: "控制台输入",
    subtitle: "用 Scanner 读取用户输入",
    intro: [
      "前面的程序大多是写死数据。控制台输入让程序可以读取用户临时输入的内容，从固定脚本变成简单互动。",
      "Java 常用 Scanner 读取控制台输入。使用 Scanner 前，需要先 import java.util.Scanner，然后创建 Scanner 对象。",
      "Scanner 可以读取不同类型：nextLine 读一整行文本，nextInt 读一个整数，nextDouble 读一个小数。",
      "在这个练习台里，右侧的“标准输入 stdin”区域就相当于你在命令行里输入的内容。每一行输入按回车分隔，程序运行时会按 Scanner 的读取顺序消费它们。",
      "混用 nextInt 和 nextLine 时要小心换行符。nextInt 只拿走数字，用户按下回车留下的换行可能会被后面的 nextLine 直接读走。"
    ],
    syntax: [
      "import java.util.Scanner; 写在 class 前面，用来引入 Scanner。",
      "Scanner scanner = new Scanner(System.in); 创建一个从控制台读取内容的扫描器。",
      "scanner.nextLine() 读取一整行文本，适合名字、城市、句子。",
      "scanner.nextInt() 读取下一个整数，适合年龄、数量、分数。",
      "读取前可以先用 System.out.print 提示用户输入什么。",
      "在网页练习台运行 Scanner 程序前，先把要输入的内容写进“标准输入 stdin”面板。",
      "简单小程序结束前可以调用 scanner.close() 关闭扫描器。"
    ],
    exampleCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("请输入名字：");
        String name = scanner.nextLine();

        System.out.print("请输入年龄：");
        int age = scanner.nextInt();

        System.out.println(name + "，明年你将是" + (age + 1) + "岁。");
        scanner.close();
    }
}`,
    task: "读取用户输入的姓名和年龄，然后输出：你好，姓名！明年你将是 年龄+1 岁。运行前在“标准输入 stdin”里写两行：第一行是姓名，第二行是年龄，例如 Ada 和 18。",
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 提示并读取姓名
        // 提示并读取年龄
        // 输出明年的年龄

        scanner.close();
    }
}`,
    answerCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("请输入姓名：");
        String name = scanner.nextLine();

        System.out.print("请输入年龄：");
        int age = scanner.nextInt();

        System.out.println("你好，" + name + "！明年你将是" + (age + 1) + "岁。");

        scanner.close();
    }
}`,
    checks: [
      "文件顶部引入 java.util.Scanner。",
      "使用 new Scanner(System.in) 创建扫描器。",
      "使用 nextLine 读取姓名。",
      "使用 nextInt 读取年龄。",
      "运行前在标准输入面板里准备两行输入，顺序和 Scanner 读取顺序一致。",
      "输出时计算 age + 1，而不是直接写固定年龄。",
      "程序结尾关闭 scanner。"
    ],
    commonMistakes: [
      "忘记 import java.util.Scanner，导致 Scanner 无法识别。",
      "把 System.in 写成 System.out；in 是输入，out 是输出。",
      "只写了 Scanner 代码，却忘记在标准输入面板填入姓名和年龄，程序就没有可读取的数据。",
      "读取数字后立刻 nextLine，却没有处理剩余换行符。",
      "把 age + 1 写在引号里，导致输出固定文本而不是计算结果。",
      "用户输入的不是整数时，nextInt 会读取失败；后续可以学习输入校验。",
      "在没有 JDK 的静态预览环境中，Scanner 程序不会被当成真实 Java 进程执行；要完整验证输入读取，请使用本地服务并配置可用 JDK。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: Scanning and Formatting",
        url: "https://docs.oracle.com/javase/tutorial/essential/io/scanning.html"
      },
      {
        title: "Oracle Java SE 26 API: Scanner",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Scanner.html"
      },
      {
        title: "Oracle Java SE 26 API: System",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html"
      }
    ]
  }
];
