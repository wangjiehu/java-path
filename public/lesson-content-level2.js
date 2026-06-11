window.LESSON_CONTENT_LEVEL2 = [
  {
    id: "level2-if-else",
    title: "if-else 条件分支",
    subtitle: "让程序根据条件走不同路线",
    intro: [
      "程序并不总是从上到下一条路走到底。很多时候，它要先判断一件事是否成立，再决定接下来执行哪段代码。比如分数是否及格、余额是否足够、年龄是否达到要求，这些都适合用 if-else 表达。",
      "if 后面的条件必须是 boolean 结果，也就是 true 或 false。条件为 true 时执行 if 代码块；条件为 false 时跳过 if，转去 else 或后面的代码。",
      "当选择不止两种时，可以使用 else if 继续判断。Java 会从上往下检查条件，一旦某个条件成立，就执行对应代码块，并跳过后面的分支。"
    ],
    syntax: [
      "基本格式：if (条件) { 条件成立时执行的代码 }。",
      "二选一格式：if (条件) { ... } else { ... }。",
      "多选一格式：if (条件1) { ... } else if (条件2) { ... } else { ... }。",
      "条件表达式通常来自比较运算：score >= 60、age < 18、name.equals(\"Java\")。",
      "即使代码块里只有一行，也建议写上花括号，后面添加代码时不容易出错。",
      "多个条件有顺序要求时，把更具体、更严格的条件放在前面，例如 score >= 90 应该写在 score >= 60 之前。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        int score = 76;

        if (score >= 90) {
            System.out.println("优秀");
        } else if (score >= 60) {
            System.out.println("通过");
        } else {
            System.out.println("需要复习");
        }
    }
}`,
    task: "补全程序：根据变量 temperature 的值输出天气提示。temperature 大于等于 30 时输出“天气炎热”；大于等于 15 且小于 30 时输出“天气舒适”；低于 15 时输出“注意保暖”。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int temperature = 22;

        // TODO: 使用 if、else if、else 完成判断
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        int temperature = 22;

        if (temperature >= 30) {
            System.out.println("天气炎热");
        } else if (temperature >= 15) {
            System.out.println("天气舒适");
        } else {
            System.out.println("注意保暖");
        }
    }
}`,
    checks: [
      "是否使用了 if、else if、else 三个分支。",
      "temperature 为 30 或更高时是否输出“天气炎热”。",
      "temperature 为 15 到 29 时是否输出“天气舒适”。",
      "temperature 低于 15 时是否输出“注意保暖”。",
      "每个代码块是否使用了成对的花括号。"
    ],
    commonMistakes: [
      "把判断顺序写反：先写 temperature >= 15，会让 30 以上的温度也进入“天气舒适”。",
      "把比较写成赋值，例如 if (temperature = 30)，这在 Java 中不是合法的 boolean 条件。",
      "忘记 else，导致多个 if 同时判断，输出可能不止一行。",
      "中文标点混入代码，例如使用中文括号或中文分号。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: The if-then and if-then-else Statements",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html"
      },
      {
        title: "Oracle Java Tutorials: Control Flow Statements",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html"
      }
    ]
  },
  {
    id: "level2-switch-expression",
    title: "switch 表达式",
    subtitle: "把固定选项的多分支写得更清楚",
    intro: [
      "当你要根据一个固定值选择结果时，switch 往往比一长串 else if 更清晰。比如星期几、菜单编号、等级代号、方向指令，这类值通常只有有限几个可能。",
      "现代 Java 支持 switch 表达式。它可以直接算出一个值，然后赋给变量。箭头写法 case 值 -> 结果 会在匹配后停止，不需要像旧式 switch 那样手写 break 来防止继续向下执行。",
      "switch 表达式需要覆盖所有可能情况。对初学者来说，最稳妥的方式是在最后写 default，处理没有被前面 case 匹配到的值。"
    ],
    syntax: [
      "基本表达式格式：String text = switch (value) { case 1 -> \"一\"; default -> \"其他\"; };。",
      "多个 case 可以合并：case 1, 2, 3 -> \"工作日\"。",
      "箭头右侧可以是一个表达式，也可以是抛出异常的语句。",
      "如果箭头右侧需要写多行代码，要使用代码块，并用 yield 给出表达式结果。",
      "switch 表达式末尾的右花括号后面通常还有一个分号，因为它是赋值语句的一部分。",
      "适合 switch 的值包括 int、char、String、enum 等常见固定类型。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        int day = 3;

        String message = switch (day) {
            case 1, 2, 3, 4, 5 -> "工作日";
            case 6, 7 -> "周末";
            default -> "未知日期";
        };

        System.out.println(message);
    }
}`,
    task: "补全程序：根据变量 level 的值生成会员名称。level 为 1 输出“青铜会员”；level 为 2 输出“白银会员”；level 为 3 输出“黄金会员”；其他值输出“普通访客”。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int level = 2;

        String title = switch (level) {
            // TODO: 在这里补全 case
        };

        System.out.println(title);
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        int level = 2;

        String title = switch (level) {
            case 1 -> "青铜会员";
            case 2 -> "白银会员";
            case 3 -> "黄金会员";
            default -> "普通访客";
        };

        System.out.println(title);
    }
}`,
    checks: [
      "是否使用 switch 表达式给 title 赋值。",
      "case 1、case 2、case 3 是否分别返回正确文本。",
      "是否包含 default 分支。",
      "switch 表达式结束后是否有分号。",
      "是否避免了旧式 case 冒号加 break 的混用写法。"
    ],
    commonMistakes: [
      "忘记 default，导致 switch 表达式没有覆盖所有输入。",
      "漏写 switch 赋值语句末尾的分号。",
      "把 -> 写成 =>，这是 JavaScript 等语言里的习惯，不是 Java 的 switch 箭头。",
      "在箭头右侧写多行代码却没有使用 yield 返回结果。"
    ],
    sources: [
      {
        title: "Oracle Java SE 21: Switch Expressions",
        url: "https://docs.oracle.com/en/java/javase/21/language/switch-expressions-and-statements.html"
      },
      {
        title: "Oracle Java Tutorials: The switch Statement",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html"
      }
    ]
  },
  {
    id: "level2-while-loop",
    title: "while 循环",
    subtitle: "条件成立时重复执行",
    intro: [
      "while 循环适合处理“还不知道要重复多少次，但知道什么时候该停”的任务。比如余额还没扣完就继续扣、输入不合法就继续提示、数字还没增长到目标就继续累加。",
      "while 会先判断条件，再决定是否执行循环体。如果第一次判断就是 false，循环体一次也不会执行。",
      "写 while 时要特别关注循环变量的变化。如果条件永远不会变成 false，程序就会一直运行下去，形成死循环。"
    ],
    syntax: [
      "基本格式：while (条件) { 循环体 }。",
      "条件必须能得到 boolean 结果，例如 count <= 5。",
      "循环体里通常要更新条件相关的变量，例如 count++、left -= 2。",
      "先判断再执行：条件一开始不成立时，循环体执行 0 次。",
      "while (true) 可以写无限循环，但通常要配合 break 或明确的退出逻辑。",
      "适合用 while 的场景：等待条件满足、重复读取输入、按状态推进流程。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        int count = 1;

        while (count <= 3) {
            System.out.println("第 " + count + " 次练习");
            count++;
        }
    }
}`,
    task: "补全程序：使用 while 循环计算 1 到 5 的总和，并输出“总和: 15”。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int number = 1;
        int sum = 0;

        // TODO: 使用 while 循环累加 1 到 5

        System.out.println("总和: " + sum);
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        int number = 1;
        int sum = 0;

        while (number <= 5) {
            sum += number;
            number++;
        }

        System.out.println("总和: " + sum);
    }
}`,
    checks: [
      "是否使用 while 循环，而不是手动写 5 次加法。",
      "循环条件是否能覆盖数字 1、2、3、4、5。",
      "sum 是否在循环中累加 number。",
      "number 是否在循环中更新，避免死循环。",
      "最终输出是否为“总和: 15”。"
    ],
    commonMistakes: [
      "忘记 number++，导致 while 条件一直成立。",
      "把条件写成 number < 5，只累加到 4。",
      "在循环内部重新声明 int sum = 0，导致每次循环都把总和清零。",
      "把输出语句放进循环里，导致打印多次中间结果。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: The while and do-while Statements",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/while.html"
      },
      {
        title: "Oracle Java Tutorials: Control Flow Statements",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html"
      }
    ]
  },
  {
    id: "level2-for-loop",
    title: "for 循环",
    subtitle: "固定次数的重复更紧凑",
    intro: [
      "for 循环常用于“明确知道循环次数”的任务。比如打印 1 到 10、遍历一组编号、重复执行 8 次训练。它把初始化、条件判断、每轮更新放在同一行，读起来更集中。",
      "最常见的 for 写法包含三部分：先设置计数器，再判断是否继续，最后更新计数器。循环体每执行一轮，更新表达式就会执行一次。",
      "for 循环和 while 循环能做很多相同的事。区别不在能力，而在表达意图：固定次数、按序号推进时，for 往往更合适。"
    ],
    syntax: [
      "基本格式：for (初始化; 条件; 更新) { 循环体 }。",
      "初始化通常只执行一次，例如 int i = 1。",
      "条件在每轮循环前判断，例如 i <= 5。",
      "更新在每轮循环体结束后执行，例如 i++。",
      "循环变量 i 通常只在 for 循环内部使用，离开循环后就不能再访问。",
      "注意边界：i < 5 和 i <= 5 的循环次数不同。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.println("当前编号: " + i);
        }
    }
}`,
    task: "补全程序：使用 for 循环输出 2、4、6、8、10，每个数字单独一行。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        // TODO: 使用 for 循环输出 2 到 10 之间的偶数
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        for (int number = 2; number <= 10; number += 2) {
            System.out.println(number);
        }
    }
}`,
    checks: [
      "是否使用 for 循环。",
      "循环是否从 2 开始。",
      "循环是否包含 10。",
      "每轮是否让数字增加 2。",
      "输出是否为 2、4、6、8、10，各占一行。"
    ],
    commonMistakes: [
      "把条件写成 number < 10，导致 10 没有输出。",
      "使用 number++，输出了奇数或多余数字。",
      "把 System.out.println 写在循环外，只输出最后一个值。",
      "循环变量名字前后不一致，例如声明 i 却打印 number。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: The for Statement",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html"
      },
      {
        title: "Oracle Java Tutorials: Expressions, Statements, and Blocks",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/expressions.html"
      }
    ]
  },
  {
    id: "level2-break-continue",
    title: "循环的中断与继续",
    subtitle: "提前结束或跳过本轮循环",
    intro: [
      "循环不一定每次都要完整跑到自然结束。遇到目标后可以提前停止，遇到不想处理的数据可以跳过这一轮。break 和 continue 就是用来控制循环节奏的两个关键字。",
      "break 表示直接结束当前循环，跳到循环后面的代码继续执行。比如找到第一个合格结果后，就没有必要继续搜索。",
      "continue 表示跳过当前这一轮循环体剩下的代码，直接进入下一轮判断和更新。比如只处理偶数，遇到奇数时就可以 continue。"
    ],
    syntax: [
      "break：结束离它最近的一层循环或 switch。",
      "continue：跳过离它最近的一层循环的本轮剩余代码。",
      "break 常和 if 搭配：if (found) { break; }。",
      "continue 常用于过滤：if (不需要处理) { continue; }。",
      "在嵌套循环里，普通 break 只跳出内层循环，不会自动跳出所有循环。",
      "过度使用 break 和 continue 会让流程难读，先让条件清晰，再决定是否需要它们。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 6; i++) {
            if (i == 3) {
                continue;
            }

            if (i == 5) {
                break;
            }

            System.out.println(i);
        }
    }
}`,
    task: "补全程序：遍历 1 到 10。跳过所有奇数，只输出偶数；当数字大于 6 时停止循环。最终应输出 2、4、6。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        for (int number = 1; number <= 10; number++) {
            // TODO: 如果 number 大于 6，结束循环

            // TODO: 如果 number 是奇数，跳过本轮

            System.out.println(number);
        }
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        for (int number = 1; number <= 10; number++) {
            if (number > 6) {
                break;
            }

            if (number % 2 != 0) {
                continue;
            }

            System.out.println(number);
        }
    }
}`,
    checks: [
      "是否使用 break 在 number 大于 6 时结束循环。",
      "是否使用 continue 跳过奇数。",
      "是否使用 number % 2 判断奇偶。",
      "是否只输出 2、4、6。",
      "break 判断是否放在输出语句之前。"
    ],
    commonMistakes: [
      "把 break 和 continue 的作用记反。",
      "先输出再判断 number > 6，导致 8 或其他数字被打印出来。",
      "用 number % 2 == 0 时 continue，反而跳过了偶数。",
      "以为 continue 会结束整个循环，其实它只结束当前这一轮。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: Branching Statements",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/branch.html"
      },
      {
        title: "Oracle Java Tutorials: The for Statement",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html"
      }
    ]
  },
  {
    id: "level2-method-basics",
    title: "方法入门",
    subtitle: "把一段代码打包成可复用动作",
    intro: [
      "方法可以把一段有名字的代码打包起来，需要时再调用。它能减少重复，让 main 方法不至于塞满所有细节。",
      "初学时可以先把方法理解为“一个会做事的小工具”。例如 printLine() 负责打印分隔线，sayHello() 负责打招呼。main 方法只需要调用它们，不必重复写内部细节。",
      "在当前单文件练习里，我们通常把辅助方法写成 static，这样 main 这个 static 方法可以直接调用它。"
    ],
    syntax: [
      "方法定义通常包含：修饰符、static、返回类型、方法名、参数列表、方法体。",
      "没有返回值的方法使用 void。",
      "方法名建议使用小驼峰命名，例如 printMenu、sayHello。",
      "调用方法时写方法名和括号，例如 printLine();。",
      "方法可以定义在 class 内部，但不能定义在另一个方法内部。",
      "main 方法也是一个方法，只是它是 Java 程序的入口。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        printLine();
        System.out.println("欢迎学习 Java");
        printLine();
    }

    static void printLine() {
        System.out.println("----------");
    }
}`,
    task: "补全程序：定义一个名为 printWelcome 的方法，在方法中输出“欢迎进入方法世界”，并在 main 方法中调用它。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        // TODO: 调用 printWelcome 方法
    }

    // TODO: 在这里定义 printWelcome 方法
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        printWelcome();
    }

    static void printWelcome() {
        System.out.println("欢迎进入方法世界");
    }
}`,
    checks: [
      "是否定义了 static void printWelcome() 方法。",
      "printWelcome 方法是否写在 class 内部、main 方法外部。",
      "main 方法中是否调用了 printWelcome();。",
      "是否输出“欢迎进入方法世界”。",
      "方法名定义和调用是否完全一致。"
    ],
    commonMistakes: [
      "把 printWelcome 方法写进 main 方法内部，Java 不允许这样定义普通方法。",
      "定义方法时写了参数，调用时却没有传参。",
      "忘记在 main 中调用方法，导致方法虽然存在但没有执行。",
      "方法名大小写不一致，例如 printwelcome 和 printWelcome。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: Defining Methods",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html"
      },
      {
        title: "Oracle Java Tutorials: Classes",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/classes.html"
      }
    ]
  },
  {
    id: "level2-parameters-return-values",
    title: "参数与返回值",
    subtitle: "给方法输入数据，让方法交回结果",
    intro: [
      "只有固定动作的方法还不够灵活。参数能让调用者把数据传给方法，返回值能让方法把计算结果交回调用者。",
      "参数写在方法名后面的括号里，像方法的输入口。返回类型写在方法名前面，告诉 Java 这个方法执行完会交回什么类型的值。",
      "return 会结束当前方法，并把后面的值返回出去。对于有返回值的方法，所有正常执行路径都应该能走到 return。"
    ],
    syntax: [
      "带参数的方法：static void greet(String name) { ... }。",
      "带返回值的方法：static int add(int a, int b) { return a + b; }。",
      "调用时传入的值叫实参，方法定义中接收的变量叫形参。",
      "返回值可以保存到变量里：int result = add(3, 4);。",
      "void 方法可以单独写 return; 提前结束，但不能 return 一个值。",
      "返回类型必须和 return 后面的值兼容，例如 int 方法不能直接 return \"文本\"。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        int total = add(8, 5);
        System.out.println("结果: " + total);
    }

    static int add(int a, int b) {
        return a + b;
    }
}`,
    task: "补全程序：定义方法 doubleNumber，接收一个 int 参数，返回它的 2 倍。在 main 中调用 doubleNumber(7)，输出“翻倍后: 14”。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        // TODO: 调用 doubleNumber(7)，并输出结果
    }

    // TODO: 定义 doubleNumber 方法
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        int result = doubleNumber(7);
        System.out.println("翻倍后: " + result);
    }

    static int doubleNumber(int number) {
        return number * 2;
    }
}`,
    checks: [
      "doubleNumber 是否接收一个 int 参数。",
      "doubleNumber 的返回类型是否为 int。",
      "方法内部是否使用 return number * 2。",
      "main 中是否调用 doubleNumber(7)。",
      "最终输出是否为“翻倍后: 14”。"
    ],
    commonMistakes: [
      "把方法返回类型写成 void，却又想返回计算结果。",
      "在 doubleNumber 内部只打印结果，没有 return，导致调用者拿不到值。",
      "调用方法时漏写参数，例如 doubleNumber()。",
      "return 后面的表达式类型和方法声明的返回类型不一致。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: Passing Information to a Method or a Constructor",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html"
      },
      {
        title: "Oracle Java Tutorials: Returning a Value from a Method",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/returnvalue.html"
      }
    ]
  },
  {
    id: "level2-recursion-intro",
    title: "递归初识",
    subtitle: "方法在更小的问题上调用自己",
    intro: [
      "递归指的是一个方法在执行过程中调用自己。它常用于问题可以拆成“当前一步 + 更小的同类问题”的场景，例如阶乘、倒计时、目录遍历、树形结构处理。",
      "递归必须有停止条件，也叫基线条件。没有停止条件，方法会一直调用自己，直到调用栈耗尽并报错。",
      "理解递归时，不要急着在脑中展开所有层。先问两个问题：什么时候停？每次调用时，问题有没有变小？这两个问题清楚了，递归就会稳很多。"
    ],
    syntax: [
      "递归方法内部会调用自己，例如 countdown(n - 1)。",
      "先写停止条件：if (n <= 0) { return; }。",
      "再写当前层要做的事，例如打印 n 或计算 n * factorial(n - 1)。",
      "每次递归调用都要让参数向停止条件靠近。",
      "有返回值的递归通常把当前值和下一层结果组合起来。",
      "递归适合表达层级结构，但简单计数问题用循环也很自然。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        countdown(3);
    }

    static void countdown(int number) {
        if (number <= 0) {
            System.out.println("开始");
            return;
        }

        System.out.println(number);
        countdown(number - 1);
    }
}`,
    task: "补全程序：使用递归计算 5 的阶乘。factorial(5) 应返回 120，并输出“5! = 120”。提示：1 的阶乘是 1，n 的阶乘是 n * factorial(n - 1)。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int result = factorial(5);
        System.out.println("5! = " + result);
    }

    static int factorial(int n) {
        // TODO: 写出停止条件

        // TODO: 返回 n * factorial(n - 1)
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        int result = factorial(5);
        System.out.println("5! = " + result);
    }

    static int factorial(int n) {
        if (n <= 1) {
            return 1;
        }

        return n * factorial(n - 1);
    }
}`,
    checks: [
      "factorial 是否返回 int。",
      "是否写了 n <= 1 的停止条件。",
      "停止条件是否返回 1。",
      "递归调用是否使用 factorial(n - 1)，让问题变小。",
      "最终输出是否为“5! = 120”。"
    ],
    commonMistakes: [
      "没有停止条件，导致无限递归。",
      "递归时写成 factorial(n)，参数没有变化。",
      "停止条件返回 0，导致阶乘结果总是被乘成 0。",
      "把 return n * factorial(n - 1) 写在 if 停止条件之前，使停止条件永远没有机会执行。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: Defining Methods",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html"
      },
      {
        title: "Oracle Java Tutorials: Returning a Value from a Method",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/returnvalue.html"
      }
    ]
  }
];
