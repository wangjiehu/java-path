window.LESSON_CONTENT_LEVEL4 = [
  {
    id: "level4-1-classes-objects",
    title: "类与对象",
    subtitle: "图纸和成品",
    intro: [
      "面向对象的第一步，是分清“类”和“对象”。类像一张图纸，描述一类东西有什么数据、能做什么动作；对象是按这张图纸创建出来的具体实例。",
      "比如 `Book` 是类，表示“书”这种类型；`new Book()` 创建出来的某一本书就是对象。对象通常有自己的状态，例如书名、作者、页数，也能执行方法，例如打印简介。",
      "Java 中绝大多数代码都写在类里。即使是最早见到的 `public class Main`，本质上也是定义了一个类，只是它负责提供程序入口。",
      "对象变量保存的是对象引用。可以先粗略理解成“指向某个对象的地址”。你通过变量名加点号访问对象的字段或方法，例如 `book.title`、`book.describe()`。"
    ],
    syntax: [
      "`class Book { ... }` 定义一个名为 Book 的类，类名通常使用大驼峰命名法。",
      "`Book book = new Book();` 使用 `new` 创建对象，并把对象引用保存到变量 book 中。",
      "类体中可以放字段、方法、构造器等成员。字段保存状态，方法描述行为。",
      "点号 `.` 用来访问对象成员，例如 `book.title` 或 `book.describe()`。",
      "一个类可以创建多个对象，每个对象通常有自己独立的一份实例字段。",
      "在同一个 `.java` 文件中，只能有一个 `public` 顶级类，并且公开类名要和文件名一致。练习文件叫 Main.java，所以入口类保持 `public class Main`。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        Book book = new Book();
        book.title = "Java 入门";
        book.author = "小林";

        book.describe();
    }
}

class Book {
    String title;
    String author;

    void describe() {
        System.out.println("《" + title + "》作者：" + author);
    }
}`,
    task: "定义一个 Pet 类，包含 name 和 type 两个字段，以及一个 introduce 方法。创建一个 Pet 对象，给字段赋值，并输出“小白是一只猫”。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        // 创建一个 Pet 对象
        // 给 name 和 type 赋值
        // 调用 introduce 方法
    }
}

class Pet {
    // 在这里声明字段

    void introduce() {
        // 在这里输出介绍
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        Pet pet = new Pet();
        pet.name = "小白";
        pet.type = "猫";

        pet.introduce();
    }
}

class Pet {
    String name;
    String type;

    void introduce() {
        System.out.println(name + "是一只" + type);
    }
}`,
    checks: [
      "是否定义了 Pet 类，并保留 public class Main 作为程序入口。",
      "Pet 类中是否有 name 和 type 两个字段。",
      "是否使用 new Pet() 创建对象，而不是只声明变量。",
      "是否通过对象调用 introduce 方法。",
      "最终输出是否为“小白是一只猫”。"
    ],
    commonMistakes: [
      "只写 `Pet pet;` 却没有写 `new Pet()`，变量没有真正指向对象。",
      "把类名写成小写 `pet`，类名虽然语法上可行，但不符合 Java 习惯，也容易和变量混淆。",
      "在 Main 类外又写一个 `public class Pet`，导致一个文件里出现多个 public 顶级类。",
      "忘记使用点号访问对象成员，例如写成 `name = \"小白\"`，但当前作用域里没有这个变量。",
      "把方法调用写成 `pet.introduce;`，方法调用需要括号。"
    ],
    sources: [
      {
        title: "Dev.java: Objects, Classes, Interfaces, Packages, and Inheritance",
        url: "https://dev.java/learn/oop/"
      },
      {
        title: "Dev.java: Creating and Using Objects",
        url: "https://dev.java/learn/classes-objects/creating-objects/"
      }
    ]
  },
  {
    id: "level4-2-fields-methods-constructors",
    title: "字段、方法、构造器",
    subtitle: "对象如何出生",
    intro: [
      "一个类最常见的三类成员是字段、方法和构造器。字段保存对象的状态，方法让对象执行动作，构造器负责在对象创建时完成初始化。",
      "字段可以理解成对象随身带的数据。比如一个 `Student` 对象可以有 `name` 和 `score` 字段；每个学生对象都有自己的名字和分数。",
      "方法是一段放在类里的功能代码。它可以读取字段、修改字段，也可以根据参数计算结果。方法名通常用动词或动词短语，例如 `printReport`、`isPassed`。",
      "构造器的名字必须和类名完全相同，并且没有返回类型。写 `new Student(\"小林\", 92)` 时，Java 会调用匹配参数的构造器来初始化新对象。"
    ],
    syntax: [
      "字段声明格式通常是 `类型 名字;`，例如 `String name;`、`int score;`。",
      "方法声明至少包含返回类型、方法名、参数列表和方法体，例如 `int getScore() { return score; }`。",
      "`void` 表示方法不返回值；非 void 方法必须用 `return` 返回对应类型的结果。",
      "构造器写法像方法，但没有返回类型，例如 `Student(String name) { this.name = name; }`。",
      "`this` 表示当前对象，常用于区分字段和同名参数，例如 `this.name = name;`。",
      "一个类可以有多个构造器，只要参数列表不同，这叫构造器重载。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        Student student = new Student("小林", 92);
        student.printReport();
    }
}

class Student {
    String name;
    int score;

    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }

    boolean isPassed() {
        return score >= 60;
    }

    void printReport() {
        System.out.println(name + "成绩：" + score);
        System.out.println("是否通过：" + isPassed());
    }
}`,
    task: "补全 Course 类：用构造器接收课程名和课时数，保存到字段中；再写 printInfo 方法，输出“Java 基础：12课时”。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        Course course = new Course("Java 基础", 12);
        course.printInfo();
    }
}

class Course {
    String title;
    int hours;

    Course(String title, int hours) {
        // 在这里初始化字段
    }

    void printInfo() {
        // 在这里输出课程信息
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        Course course = new Course("Java 基础", 12);
        course.printInfo();
    }
}

class Course {
    String title;
    int hours;

    Course(String title, int hours) {
        this.title = title;
        this.hours = hours;
    }

    void printInfo() {
        System.out.println(title + "：" + hours + "课时");
    }
}`,
    checks: [
      "Course 类是否声明 title 和 hours 字段。",
      "构造器名是否为 Course，并且没有写返回类型。",
      "构造器是否使用参数初始化两个字段。",
      "printInfo 方法是否读取字段，而不是写死无关文本。",
      "最终输出是否为“Java 基础：12课时”。"
    ],
    commonMistakes: [
      "把构造器写成 `void Course(...)`，这样就变成普通方法，不会被 `new Course(...)` 调用。",
      "参数名和字段名相同时忘记 `this`，写成 `title = title;`，字段没有真正被赋值。",
      "在构造器里重新声明 `String title`，导致只创建了局部变量。",
      "非 void 方法缺少 return，或者 return 的值类型不匹配。",
      "调用构造器时参数数量或顺序和声明不一致。"
    ],
    sources: [
      {
        title: "Dev.java: Defining Methods",
        url: "https://dev.java/learn/classes-objects/defining-methods/"
      },
      {
        title: "Dev.java: Providing Constructors for your Classes",
        url: "https://dev.java/learn/classes-objects/defining-constructors/"
      }
    ]
  },
  {
    id: "level4-3-encapsulation",
    title: "封装",
    subtitle: "保护内部状态",
    intro: [
      "封装的核心想法是：对象的内部数据不要随便暴露给外部修改。类应该自己决定哪些数据能看、哪些能改、怎么改才算合法。",
      "如果把字段直接写成 public，任何代码都能绕过检查随意赋值。比如 `account.balance = -999` 这种状态就不应该出现。",
      "更稳妥的做法是把字段设为 `private`，再提供必要的公开方法。外部通过方法提出请求，对象在方法里检查参数并维护自己的状态。",
      "封装不是为了把代码藏起来，而是为了让对象保持可靠。字段名、内部计算方式以后可以调整，只要公开方法的行为稳定，调用方就不容易被影响。"
    ],
    syntax: [
      "`private` 成员只能在当前类内部访问，常用于保护字段。",
      "`public` 方法可以作为对象对外提供的入口，例如 getter、setter 或业务动作。",
      "getter 通常读取字段，例如 `getBalance()`；setter 或业务方法通常会先检查参数，再修改字段。",
      "不要为每个字段机械生成 setter。能不能改、怎么改，要看对象规则。",
      "构造器也可以做初始值校验，避免对象一出生就是非法状态。",
      "封装后的代码通常看起来多几行，但调试时更容易定位状态变化从哪里发生。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        Wallet wallet = new Wallet(50);
        wallet.deposit(30);
        wallet.withdraw(20);

        System.out.println("余额：" + wallet.getBalance());
    }
}

class Wallet {
    private int balance;

    Wallet(int initialBalance) {
        if (initialBalance >= 0) {
            balance = initialBalance;
        }
    }

    int getBalance() {
        return balance;
    }

    void deposit(int amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    void withdraw(int amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }
}`,
    task: "补全 BankAccount 类：把 balance 字段设为 private；deposit 只接受正数；withdraw 只允许取走正数且不能超过余额；最后输出“余额：70”。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(100);
        account.deposit(20);
        account.withdraw(50);
        account.withdraw(999);

        System.out.println("余额：" + account.getBalance());
    }
}

class BankAccount {
    // 把余额字段保护起来

    BankAccount(int initialBalance) {
        // 初始化余额
    }

    int getBalance() {
        // 返回余额
        return 0;
    }

    void deposit(int amount) {
        // 只允许存入正数
    }

    void withdraw(int amount) {
        // 只允许合法取款
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(100);
        account.deposit(20);
        account.withdraw(50);
        account.withdraw(999);

        System.out.println("余额：" + account.getBalance());
    }
}

class BankAccount {
    private int balance;

    BankAccount(int initialBalance) {
        if (initialBalance >= 0) {
            balance = initialBalance;
        }
    }

    int getBalance() {
        return balance;
    }

    void deposit(int amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    void withdraw(int amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }
}`,
    checks: [
      "balance 字段是否声明为 private。",
      "是否通过 getBalance 读取余额，而不是在 Main 中直接访问字段。",
      "deposit 是否拒绝 0 和负数。",
      "withdraw 是否拒绝负数、0 和超过余额的取款。",
      "执行给定操作后是否输出“余额：70”。"
    ],
    commonMistakes: [
      "为了省事把 balance 写成 public，外部代码仍然可以随便改余额。",
      "只检查 `amount <= balance`，忘记检查 amount 必须大于 0。",
      "在 getBalance 中返回固定值，导致对象真实状态没有被读取。",
      "把校验写在 Main 里，而不是写进 BankAccount 自己的方法里。",
      "构造器没有处理负数初始余额，让对象可能从非法状态开始。"
    ],
    sources: [
      {
        title: "Dev.java: Creating Classes",
        url: "https://dev.java/learn/classes-objects/creating-classes/"
      },
      {
        title: "Oracle Java Tutorials: Controlling Access to Members of a Class",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html"
      }
    ]
  },
  {
    id: "level4-4-static-instance-members",
    title: "static 与实例成员",
    subtitle: "公共能力和个体能力",
    intro: [
      "实例成员属于某个具体对象。每创建一个对象，它通常就有自己的一份实例字段；调用实例方法时，方法里的 `this` 指向当前对象。",
      "`static` 成员属于类本身，不属于某一个对象。无论创建多少对象，静态字段通常只有一份，适合保存所有对象共享的数据。",
      "常见例子是计数器：每创建一个 `Ticket` 对象，就让 `static int total` 加 1。每张票有自己的编号，但总票数属于整个类。",
      "静态方法不依赖具体对象，调用时常写成 `ClassName.method()`。它不能直接访问实例字段，因为没有明确的当前对象。"
    ],
    syntax: [
      "`static int count;` 声明类字段，所有对象共享同一份 count。",
      "`String name;` 这种没有 static 的字段是实例字段，每个对象各有一份。",
      "`ClassName.staticMethod()` 是调用静态方法的常见写法。",
      "实例方法可以直接访问静态成员和实例成员；静态方法只能直接访问静态成员。",
      "常量经常写成 `public static final`，例如 `public static final int MAX_SIZE = 100;`。",
      "不要为了少写 new 就把所有东西都改成 static。对象自己的状态仍然应该放在实例字段里。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        Badge first = new Badge("小林");
        Badge second = new Badge("小周");

        first.printInfo();
        second.printInfo();
        System.out.println("已创建：" + Badge.getCreatedCount());
    }
}

class Badge {
    private static int createdCount = 0;
    private String owner;
    private int number;

    Badge(String owner) {
        this.owner = owner;
        createdCount++;
        number = createdCount;
    }

    void printInfo() {
        System.out.println(owner + "的编号：" + number);
    }

    static int getCreatedCount() {
        return createdCount;
    }
}`,
    task: "补全 Counter 类：每创建一个 Counter 对象，就让静态字段 total 加 1；每个对象有自己的 name。创建两个对象后输出“计数器数量：2”。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        Counter first = new Counter("第一个");
        Counter second = new Counter("第二个");

        first.printName();
        second.printName();
        System.out.println("计数器数量：" + Counter.getTotal());
    }
}

class Counter {
    // 声明一个 static 字段记录对象数量
    // 声明一个实例字段保存名字

    Counter(String name) {
        // 初始化名字，并更新总数
    }

    void printName() {
        // 输出当前对象的名字
    }

    static int getTotal() {
        // 返回总数
        return 0;
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        Counter first = new Counter("第一个");
        Counter second = new Counter("第二个");

        first.printName();
        second.printName();
        System.out.println("计数器数量：" + Counter.getTotal());
    }
}

class Counter {
    private static int total = 0;
    private String name;

    Counter(String name) {
        this.name = name;
        total++;
    }

    void printName() {
        System.out.println(name);
    }

    static int getTotal() {
        return total;
    }
}`,
    checks: [
      "是否使用 static 字段保存所有 Counter 对象共享的数量。",
      "name 是否是实例字段，而不是 static 字段。",
      "构造器是否在每次 new Counter 时更新 total。",
      "是否通过 Counter.getTotal() 获取总数。",
      "创建两个对象后是否输出“计数器数量：2”。"
    ],
    commonMistakes: [
      "把 name 写成 static，导致所有对象共享同一个名字，后创建的对象覆盖前一个对象。",
      "在静态方法里直接访问实例字段 name，编译器无法知道你指的是哪个对象。",
      "每次 getTotal 时才临时计算，但类里没有保存创建数量。",
      "用对象调用静态方法虽然能编译，但不如 `Counter.getTotal()` 清楚。",
      "把 total 写在构造器内部，变成局部变量，每次调用都会重新开始。"
    ],
    sources: [
      {
        title: "Dev.java: More on Classes",
        url: "https://dev.java/learn/classes-objects/more-on-classes/"
      },
      {
        title: "Oracle Java Tutorials: Understanding Class Members",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html"
      }
    ]
  },
  {
    id: "level4-5-inheritance-polymorphism",
    title: "继承与多态",
    subtitle: "相同动作不同表现",
    intro: [
      "继承让一个类基于另一个类扩展。父类放共同字段和方法，子类继承这些内容，再补充自己的特殊行为。",
      "Java 使用 `extends` 表示继承。比如 `Cat extends Animal` 表示 Cat 是 Animal 的一种，因此 Cat 对象可以放进 Animal 类型的变量里。",
      "多态指的是：变量看起来是父类类型，运行时却会根据真实对象调用子类重写后的方法。同一句 `animal.speak()`，猫和狗可以发出不同声音。",
      "继承适合表达明确的“是一个”关系。猫是动物、电子书是书，这比较自然；如果只是“会做某件事”，接口往往更合适。"
    ],
    syntax: [
      "`class Cat extends Animal { ... }` 定义 Animal 的子类 Cat。",
      "子类会继承父类的非 private 成员；父类 private 字段不能被子类直接访问。",
      "`@Override` 标记重写方法，能让编译器帮你检查方法签名是否真的匹配。",
      "父类变量可以引用子类对象，例如 `Animal animal = new Cat();`。",
      "实例方法调用具有动态分派：运行时看真实对象类型，而不是只看变量声明类型。",
      "`super` 可以调用父类构造器或父类被重写的方法，例如 `super(name)`、`super.describe()`。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        Animal[] animals = {
            new Cat("小白"),
            new Dog("旺财")
        };

        for (Animal animal : animals) {
            animal.speak();
        }
    }
}

class Animal {
    protected String name;

    Animal(String name) {
        this.name = name;
    }

    void speak() {
        System.out.println(name + "发出声音");
    }
}

class Cat extends Animal {
    Cat(String name) {
        super(name);
    }

    @Override
    void speak() {
        System.out.println(name + "：喵");
    }
}

class Dog extends Animal {
    Dog(String name) {
        super(name);
    }

    @Override
    void speak() {
        System.out.println(name + "：汪");
    }
}`,
    task: "补全 Shape、Circle、Rectangle 三个类。Shape 提供 area 方法；Circle 和 Rectangle 重写 area。用 Shape 数组保存两个子类对象，并输出它们的面积。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(3),
            new Rectangle(4, 5)
        };

        for (Shape shape : shapes) {
            System.out.println("面积：" + shape.area());
        }
    }
}

class Shape {
    double area() {
        return 0;
    }
}

class Circle extends Shape {
    private double radius;

    Circle(double radius) {
        // 初始化半径
    }

    // 重写 area 方法
}

class Rectangle extends Shape {
    private double width;
    private double height;

    Rectangle(double width, double height) {
        // 初始化宽和高
    }

    // 重写 area 方法
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(3),
            new Rectangle(4, 5)
        };

        for (Shape shape : shapes) {
            System.out.println("面积：" + shape.area());
        }
    }
}

class Shape {
    double area() {
        return 0;
    }
}

class Circle extends Shape {
    private double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    @Override
    double area() {
        return 3.14 * radius * radius;
    }
}

class Rectangle extends Shape {
    private double width;
    private double height;

    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    double area() {
        return width * height;
    }
}`,
    checks: [
      "Circle 和 Rectangle 是否都使用 extends Shape。",
      "两个子类是否都重写了 area 方法，并建议使用 @Override。",
      "Circle.area 是否按半径计算圆面积。",
      "Rectangle.area 是否按宽乘高计算矩形面积。",
      "Main 中是否用 Shape 类型数组保存不同子类对象，体现多态。"
    ],
    commonMistakes: [
      "方法名或参数列表写错，导致不是重写，而是新写了另一个方法。",
      "忘记给子类字段赋值，面积计算一直得到 0。",
      "以为父类变量只能调用父类原始方法；实际实例方法会根据真实对象动态选择。",
      "把所有字段都写成 protected 来省 getter，导致子类和父类耦合过深。",
      "在没有“是一个”关系时滥用继承，例如把打印机继承成纸张。"
    ],
    sources: [
      {
        title: "Dev.java: Inheritance",
        url: "https://dev.java/learn/inheritance/what-is-inheritance/"
      },
      {
        title: "Dev.java: Polymorphism",
        url: "https://dev.java/learn/inheritance/polymorphism/"
      }
    ]
  },
  {
    id: "level4-6-abstract-classes",
    title: "抽象类",
    subtitle: "半成品父类",
    intro: [
      "抽象类可以理解成不能直接使用的半成品父类。它能放共同字段和已经写好的方法，也能留下必须由子类完成的抽象方法。",
      "当父类知道“所有子类都应该有某个动作”，但不知道每个子类具体怎么做时，就适合使用抽象方法。比如所有任务都能 `run`，但清理任务和备份任务的执行细节不同。",
      "带有抽象方法的类必须声明为 `abstract`。抽象类不能 `new`，因为它可能还有未完成的方法。",
      "子类继承抽象类后，通常要实现所有抽象方法；如果子类还没实现完，它自己也必须继续声明为抽象类。"
    ],
    syntax: [
      "`abstract class Task { ... }` 定义抽象类。",
      "`abstract void run();` 定义抽象方法，只有方法签名，没有方法体，末尾用分号。",
      "抽象类可以有普通字段、构造器和普通方法。",
      "抽象类不能直接实例化，不能写 `new Task()`。",
      "具体子类用 `extends` 继承抽象类，并用 `@Override` 实现抽象方法。",
      "当多个类共享部分代码，但关键步骤不同，抽象类可以把共同部分放在父类，把变化点留给子类。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        Report report = new DailyReport("学习记录");
        report.print();
    }
}

abstract class Report {
    private String title;

    Report(String title) {
        this.title = title;
    }

    void print() {
        System.out.println("标题：" + title);
        System.out.println("内容：" + content());
    }

    abstract String content();
}

class DailyReport extends Report {
    DailyReport(String title) {
        super(title);
    }

    @Override
    String content() {
        return "今天完成了 Java OOP 练习";
    }
}`,
    task: "补全 Message 抽象类和 EmailMessage 子类：Message 保存 receiver，并提供 print 方法；content 是抽象方法，由 EmailMessage 返回“发送邮件给小林”。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        Message message = new EmailMessage("小林");
        message.print();
    }
}

abstract class Message {
    private String receiver;

    Message(String receiver) {
        // 初始化接收者
    }

    void print() {
        // 输出 content() 的结果
    }

    // 声明抽象方法 content
}

class EmailMessage extends Message {
    EmailMessage(String receiver) {
        // 调用父类构造器
    }

    // 实现 content 方法
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        Message message = new EmailMessage("小林");
        message.print();
    }
}

abstract class Message {
    private String receiver;

    Message(String receiver) {
        this.receiver = receiver;
    }

    String getReceiver() {
        return receiver;
    }

    void print() {
        System.out.println(content());
    }

    abstract String content();
}

class EmailMessage extends Message {
    EmailMessage(String receiver) {
        super(receiver);
    }

    @Override
    String content() {
        return "发送邮件给" + getReceiver();
    }
}`,
    checks: [
      "Message 是否声明为 abstract class。",
      "content 是否是抽象方法，并且没有方法体。",
      "EmailMessage 是否继承 Message 并实现 content。",
      "子类构造器是否通过 super(receiver) 调用父类构造器。",
      "程序是否输出“发送邮件给小林”。"
    ],
    commonMistakes: [
      "给抽象方法写了花括号，结果它就不再是抽象方法。",
      "类里有抽象方法，却忘记把类声明为 abstract。",
      "尝试直接 `new Message(...)`，抽象类不能实例化。",
      "子类没有实现所有抽象方法，又没有声明为 abstract。",
      "父类字段是 private，子类直接访问 receiver 导致编译错误；可以通过 protected 方法或 getter 读取。"
    ],
    sources: [
      {
        title: "Dev.java: Abstract Methods and Classes",
        url: "https://dev.java/learn/inheritance/abstract-classes/"
      },
      {
        title: "Oracle Java Tutorials: Abstract Methods and Classes",
        url: "https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html"
      }
    ]
  },
  {
    id: "level4-7-interfaces",
    title: "接口",
    subtitle: "规定能力，不规定做法",
    intro: [
      "接口用来描述一组能力或约定。它关心“能做什么”，不关心“内部怎么做”。一个类实现接口，就承诺提供接口要求的方法。",
      "接口很适合表达“会某种能力”的关系。比如打印机、日志器、消息发送器都可以实现 `Printable` 或 `Notifier`，它们不一定来自同一个父类。",
      "Java 类只能继承一个父类，但可以实现多个接口。这让对象能同时拥有多种能力，例如既能保存，又能导出。",
      "接口类型也可以作为变量类型。只要对象的类实现了接口，就能赋给这个接口变量，调用方只依赖能力，不依赖具体类名。"
    ],
    syntax: [
      "`interface Notifier { void send(String message); }` 定义接口和抽象方法。",
      "`class EmailNotifier implements Notifier { ... }` 表示类实现接口。",
      "实现接口时，类必须实现接口要求的抽象方法，除非这个类本身也是抽象类。",
      "接口中的普通抽象方法默认是 public abstract，实现时通常要写 public。",
      "接口可以有 `default` 方法和 `static` 方法；初学时先掌握抽象方法和 implements。",
      "接口变量可以引用任何实现类对象，例如 `Notifier notifier = new EmailNotifier();`。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        Notifier notifier = new ConsoleNotifier();
        notifier.send("作业已提交");
    }
}

interface Notifier {
    void send(String message);
}

class ConsoleNotifier implements Notifier {
    @Override
    public void send(String message) {
        System.out.println("通知：" + message);
    }
}`,
    task: "定义一个 Payable 接口，声明 pay 方法；让 CardPayment 实现它，并输出“刷卡支付：80元”。在 Main 中用 Payable 类型接收 CardPayment 对象并调用 pay。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        // 用接口类型保存实现类对象
        // 调用 pay 方法
    }
}

interface Payable {
    // 声明 pay 方法，接收金额
}

class CardPayment implements Payable {
    // 实现 pay 方法
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        Payable payment = new CardPayment();
        payment.pay(80);
    }
}

interface Payable {
    void pay(int amount);
}

class CardPayment implements Payable {
    @Override
    public void pay(int amount) {
        System.out.println("刷卡支付：" + amount + "元");
    }
}`,
    checks: [
      "是否定义 Payable 接口，并声明 pay 方法。",
      "CardPayment 是否使用 implements Payable。",
      "CardPayment.pay 是否写成 public，满足接口方法的访问级别。",
      "Main 中是否使用 Payable 类型保存 CardPayment 对象。",
      "调用 pay(80) 后是否输出“刷卡支付：80元”。"
    ],
    commonMistakes: [
      "把 `implements` 写成 `extends`；类实现接口要用 implements。",
      "实现接口方法时漏写 public，导致访问权限比接口方法更窄。",
      "接口方法声明后写了空方法体；普通接口抽象方法只需要分号。",
      "以为接口可以直接 `new Payable()`，接口不能直接实例化。",
      "把接口当作字段集合使用，忽略它最重要的“能力约定”作用。"
    ],
    sources: [
      {
        title: "Dev.java: Defining an Interface",
        url: "https://dev.java/learn/interfaces/defining-interfaces/"
      },
      {
        title: "Dev.java: Using an Interface as a Type",
        url: "https://dev.java/learn/interfaces/interfaces-as-a-type/"
      }
    ]
  },
  {
    id: "level4-8-enums-state-modeling",
    title: "枚举与状态建模",
    subtitle: "固定选项更安全",
    intro: [
      "当某个值只有固定几个选项时，枚举比字符串或整数更安全。比如订单状态只能是待支付、已支付、已取消，用 enum 可以把这些选项集中定义出来。",
      "如果用字符串表示状态，`\"PAID\"`、`\"Payed\"`、`\"paid\"` 都可能混进来，错误要到运行时才暴露。枚举值写错时，编译器就能直接提醒。",
      "枚举不只是常量列表，它也是一种特殊的类。枚举可以有字段、构造器和方法，用来给每个枚举值附加说明文本或业务行为。",
      "枚举很适合状态建模。配合 `switch`，你可以清楚地列出每种状态对应的处理方式，也更容易发现漏掉的状态。"
    ],
    syntax: [
      "`enum OrderStatus { CREATED, PAID, CANCELED }` 定义三个固定状态。",
      "枚举值通常使用全大写加下划线命名，例如 `IN_PROGRESS`。",
      "比较两个枚举值可以使用 `==`，因为每个枚举常量都是固定实例。",
      "`switch` 可以根据枚举值选择不同逻辑。",
      "枚举可以有 private 字段、构造器和普通方法；枚举构造器不能 public。",
      "枚举常量列表后如果还要写字段或方法，需要先写分号。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        OrderStatus status = OrderStatus.PAID;
        System.out.println(status.label());
        System.out.println(nextAction(status));
    }

    static String nextAction(OrderStatus status) {
        return switch (status) {
            case CREATED -> "等待付款";
            case PAID -> "准备发货";
            case CANCELED -> "关闭订单";
        };
    }
}

enum OrderStatus {
    CREATED("已创建"),
    PAID("已支付"),
    CANCELED("已取消");

    private final String label;

    OrderStatus(String label) {
        this.label = label;
    }

    String label() {
        return label;
    }
}`,
    task: "定义 TaskStatus 枚举，包含 TODO、DOING、DONE 三个状态，并为每个状态保存中文说明。根据当前状态 DONE 输出“状态：已完成”。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        TaskStatus status = TaskStatus.DONE;
        System.out.println("状态：" + status.label());
    }
}

enum TaskStatus {
    // 定义 TODO、DOING、DONE，并给它们绑定中文说明

    // 声明字段、构造器和 label 方法
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        TaskStatus status = TaskStatus.DONE;
        System.out.println("状态：" + status.label());
    }
}

enum TaskStatus {
    TODO("待处理"),
    DOING("进行中"),
    DONE("已完成");

    private final String label;

    TaskStatus(String label) {
        this.label = label;
    }

    String label() {
        return label;
    }
}`,
    checks: [
      "是否使用 enum 定义 TaskStatus，而不是用 String 常量代替。",
      "是否包含 TODO、DOING、DONE 三个枚举常量。",
      "每个枚举常量是否绑定了对应中文说明。",
      "枚举常量列表后是否在需要字段和方法时写了分号。",
      "当前状态为 DONE 时是否输出“状态：已完成”。"
    ],
    commonMistakes: [
      "把枚举值写在引号里，例如 `TaskStatus status = \"DONE\"`，这就不是枚举类型了。",
      "枚举常量列表后忘记分号，后面再写字段或方法会编译失败。",
      "把枚举构造器写成 public；枚举构造器不能公开调用。",
      "用 ordinal 当业务含义保存，后续调整枚举顺序会引发隐蔽问题。",
      "在 switch 里写 default 吞掉所有未来状态，导致新增状态时不容易发现遗漏处理。"
    ],
    sources: [
      {
        title: "Dev.java: Enums",
        url: "https://dev.java/learn/classes-objects/enums/"
      },
      {
        title: "Oracle Java Tutorials: Enum Types",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html"
      }
    ]
  },
  {
    id: "level4-9-packages-access-control",
    title: "包与访问控制",
    subtitle: "组织代码边界",
    intro: [
      "包用来组织相关类型，并减少命名冲突。真实项目不会把所有类都堆在一个目录里，而是按功能放进不同包，例如 `app.model`、`app.service`、`app.util`。",
      "源文件如果属于某个包，`package` 语句必须放在文件最前面，早于 import 和 class 声明。包名通常全小写，并使用域名反写或项目名分层。",
      "访问控制决定哪些类能看见你的类或成员。顶级类常见的是 public 或不写修饰符；成员可以是 public、protected、不写修饰符、private。",
      "不写访问修饰符叫包私有，也常说 package-private。它表示同一个包里的代码能访问，包外不能访问。设计类时，应尽量使用能满足需求的最小可见范围。"
    ],
    syntax: [
      "`package app.model;` 声明当前源文件属于 app.model 包，必须是文件中的第一条非注释语句。",
      "`import app.model.User;` 可以导入其他包的 public 类型，之后就能用简单类名 User。",
      "顶级 public 类能被包外代码访问；不写 public 的顶级类只在同包可见。",
      "`private` 成员只在本类可见；包私有成员在同包可见；`protected` 对同包和子类可见；`public` 对所有可访问该类的代码可见。",
      "优先把字段设为 private，通过方法暴露必要行为，避免外部依赖内部细节。",
      "在单文件练习里通常不写 package；进入多文件项目后，再按目录结构和包名组织代码。"
    ],
    exampleCode: `// 文件：src/app/model/User.java
package app.model;

public class User {
    private String name;

    public User(String name) {
        this.name = name;
    }

    public String displayName() {
        return name;
    }
}

// 文件：src/app/Main.java
package app;

import app.model.User;

public class Main {
    public static void main(String[] args) {
        User user = new User("小林");
        System.out.println(user.displayName());
    }
}`,
    task: "在单文件练习中模拟访问控制：定义 Account 类，字段 owner 和 role 使用 private；提供 public 的 summary 方法；再提供一个不写修饰符的 sameRole 方法。最后输出“小林：admin”。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        Account account = new Account("小林", "admin");
        System.out.println(account.summary());
    }
}

class Account {
    // 使用 private 字段保存 owner 和 role

    Account(String owner, String role) {
        // 初始化字段
    }

    public String summary() {
        // 返回 owner 和 role 组成的摘要
        return "";
    }

    boolean sameRole(Account other) {
        // 判断两个账号角色是否相同
        return false;
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        Account account = new Account("小林", "admin");
        System.out.println(account.summary());
    }
}

class Account {
    private String owner;
    private String role;

    Account(String owner, String role) {
        this.owner = owner;
        this.role = role;
    }

    public String summary() {
        return owner + "：" + role;
    }

    boolean sameRole(Account other) {
        return other != null && role.equals(other.role);
    }
}`,
    checks: [
      "Account 是否是不写 public 的顶级类，适合单文件练习中的包私有类。",
      "owner 和 role 字段是否声明为 private。",
      "summary 是否声明为 public，并返回对外需要的摘要。",
      "sameRole 是否没有写访问修饰符，体现包私有成员。",
      "程序是否输出“小林：admin”。"
    ],
    commonMistakes: [
      "把 package 语句写在 import 或 class 后面；在真实多文件项目中 package 必须靠最前。",
      "认为不写修饰符等于 public；实际上不写是包私有。",
      "顶级类随手都写 public，导致文件名和类名必须一致，也扩大了可见范围。",
      "把字段设为 public，让包边界和类边界都失去保护。",
      "在同一个单文件练习里写多个 package 声明；一个源文件只能属于一个包。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: Creating and Using Packages",
        url: "https://docs.oracle.com/javase/tutorial/java/package/packages.html"
      },
      {
        title: "Oracle Java Tutorials: Controlling Access to Members of a Class",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html"
      }
    ]
  }
];
