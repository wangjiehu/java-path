window.LESSON_CONTENT_LEVEL13 = [
  {
    id: "level13-1-cli-accounting-book",
    title: "命令行记账本",
    subtitle: "变量、集合、文件",
    intro: [
      "这一关把前面学过的变量、集合、日期和文件读写合成一个真正能用的小工具：命令行记账本。它不需要网页界面，用户在控制台输入收入、支出、分类和备注，程序负责保存记录、统计余额，并在下次启动时读回历史数据。",
      "项目的核心需求可以拆成四件事：新增一条账目、查看账目列表、按月份统计收入支出、把数据持久化到本地文件。小白做项目时最容易被“我要做一个系统”吓住，其实系统就是一组清楚的小动作。",
      "数据模型建议先设计成 AccountRecord：id 表示记录编号，type 表示 INCOME 或 EXPENSE，amount 使用 BigDecimal 保存金额，category 保存分类，occurredAt 保存日期，note 保存备注。先把模型想清楚，后面的菜单、文件和统计都会顺很多。",
      "实现顺序建议是：先写一个内存版，用 List 保存账目；再补菜单循环；最后加文件读写。每完成一小步就运行一次，不要等所有功能写完才第一次启动。"
    ],
    syntax: [
      "需求拆解：本项目至少包含新增账目、查看账目、月度汇总、保存和加载五个功能。",
      "数据模型：`AccountRecord` 字段建议包括 `id`、`type`、`amount`、`category`、`occurredAt`、`note`。",
      "金额处理：真实金额不要用 `double` 做核心计算，优先使用 `BigDecimal`。",
      "集合存储：程序运行时用 `List<AccountRecord>` 保存记录，新增时追加到列表末尾。",
      "文件持久化：使用 `Path` 和 `Files` 把记录保存为文本或 CSV，启动时再读回。",
      "菜单循环：用 `while (running)` 反复显示菜单，根据用户输入调用不同方法。",
      "输入校验：金额必须大于 0，日期格式要能解析，类型只能是收入或支出。",
      "统计逻辑：按 `YearMonth` 过滤记录，再分别累加收入和支出。",
      "验收标准：关闭程序再打开，之前保存的账目仍然可以被读取和统计。"
    ],
    exampleCode: `import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

class AccountRecord {
    long id;
    String type;
    BigDecimal amount;
    String category;
    LocalDate occurredAt;
    String note;

    AccountRecord(long id, String type, BigDecimal amount, String category, LocalDate occurredAt, String note) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.category = category;
        this.occurredAt = occurredAt;
        this.note = note;
    }
}

public class Main {
    private static final List<AccountRecord> records = new ArrayList<>();

    public static void main(String[] args) {
        records.add(new AccountRecord(1, "EXPENSE", new BigDecimal("18.50"), "餐饮", LocalDate.now(), "午饭"));
        records.add(new AccountRecord(2, "INCOME", new BigDecimal("200.00"), "兼职", LocalDate.now(), "周末任务"));

        YearMonth month = YearMonth.now();
        BigDecimal income = total(month, "INCOME");
        BigDecimal expense = total(month, "EXPENSE");

        System.out.println(month + " 收入：" + income);
        System.out.println(month + " 支出：" + expense);
        System.out.println("结余：" + income.subtract(expense));
    }

    static BigDecimal total(YearMonth month, String type) {
        BigDecimal result = BigDecimal.ZERO;
        for (AccountRecord record : records) {
            if (record.type.equals(type) && YearMonth.from(record.occurredAt).equals(month)) {
                result = result.add(record.amount);
            }
        }
        return result;
    }
}`,
    task: "完成一个命令行记账本。要求支持新增收入或支出、查看全部记录、按当前月份统计收入支出和结余，并把数据保存到 data/accounts.csv。重新启动程序后，历史账目要能继续读取。",
    starterCode: `import java.math.BigDecimal;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class AccountRecord {
    long id;
    String type;
    BigDecimal amount;
    String category;
    LocalDate occurredAt;
    String note;

    // TODO: 补全构造方法
}

public class Main {
    private static final Path DATA_FILE = Path.of("data", "accounts.csv");
    private static final List<AccountRecord> records = new ArrayList<>();

    public static void main(String[] args) throws Exception {
        // TODO: 启动时 load()
        // TODO: 使用 Scanner 做菜单循环
        // TODO: 支持 1 新增 2 列表 3 月度统计 0 保存并退出
    }

    static void addRecord(Scanner scanner) {
        // TODO: 读取类型、金额、分类、日期、备注，并追加到 records
    }

    static void printRecords() {
        // TODO: 输出每条记录
    }

    static void printMonthlySummary() {
        // TODO: 统计当前月份收入、支出和结余
    }

    static void load() throws Exception {
        // TODO: 如果文件存在，读取 CSV 行并恢复 AccountRecord
    }

    static void save() throws Exception {
        // TODO: 创建 data 目录，把 records 写入 CSV
    }
}`,
    answerCode: `import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class AccountRecord {
    long id;
    String type;
    BigDecimal amount;
    String category;
    LocalDate occurredAt;
    String note;

    AccountRecord(long id, String type, BigDecimal amount, String category, LocalDate occurredAt, String note) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.category = category;
        this.occurredAt = occurredAt;
        this.note = note;
    }
}

public class Main {
    private static final Path DATA_FILE = Path.of("data", "accounts.csv");
    private static final List<AccountRecord> records = new ArrayList<>();

    public static void main(String[] args) throws Exception {
        load();
        try (Scanner scanner = new Scanner(System.in)) {
            boolean running = true;
            while (running) {
                System.out.println("1 新增账目 2 查看账目 3 月度统计 0 保存退出");
                String command = scanner.nextLine().trim();
                if (command.equals("1")) {
                    addRecord(scanner);
                } else if (command.equals("2")) {
                    printRecords();
                } else if (command.equals("3")) {
                    printMonthlySummary();
                } else if (command.equals("0")) {
                    save();
                    running = false;
                } else {
                    System.out.println("未知命令");
                }
            }
        }
    }

    static void addRecord(Scanner scanner) {
        System.out.print("类型 INCOME/EXPENSE：");
        String type = scanner.nextLine().trim().toUpperCase();
        System.out.print("金额：");
        BigDecimal amount = new BigDecimal(scanner.nextLine().trim());
        System.out.print("分类：");
        String category = scanner.nextLine().trim();
        System.out.print("日期 yyyy-MM-dd：");
        LocalDate occurredAt = LocalDate.parse(scanner.nextLine().trim());
        System.out.print("备注：");
        String note = scanner.nextLine().trim();

        long id = records.isEmpty() ? 1 : records.get(records.size() - 1).id + 1;
        records.add(new AccountRecord(id, type, amount, category, occurredAt, note));
        System.out.println("已新增");
    }

    static void printRecords() {
        for (AccountRecord record : records) {
            System.out.println(record.id + " " + record.type + " " + record.amount + " " + record.category + " " + record.occurredAt + " " + record.note);
        }
    }

    static void printMonthlySummary() {
        YearMonth month = YearMonth.now();
        BigDecimal income = total(month, "INCOME");
        BigDecimal expense = total(month, "EXPENSE");
        System.out.println("月份：" + month);
        System.out.println("收入：" + income);
        System.out.println("支出：" + expense);
        System.out.println("结余：" + income.subtract(expense));
    }

    static BigDecimal total(YearMonth month, String type) {
        BigDecimal sum = BigDecimal.ZERO;
        for (AccountRecord record : records) {
            if (record.type.equals(type) && YearMonth.from(record.occurredAt).equals(month)) {
                sum = sum.add(record.amount);
            }
        }
        return sum;
    }

    static void load() throws Exception {
        if (!Files.exists(DATA_FILE)) {
            return;
        }
        for (String line : Files.readAllLines(DATA_FILE, StandardCharsets.UTF_8)) {
            String[] parts = line.split(",", -1);
            records.add(new AccountRecord(
                    Long.parseLong(parts[0]),
                    parts[1],
                    new BigDecimal(parts[2]),
                    parts[3],
                    LocalDate.parse(parts[4]),
                    parts[5]
            ));
        }
    }

    static void save() throws Exception {
        Files.createDirectories(DATA_FILE.getParent());
        List<String> lines = new ArrayList<>();
        for (AccountRecord record : records) {
            lines.add(record.id + "," + record.type + "," + record.amount + "," + record.category + "," + record.occurredAt + "," + record.note);
        }
        Files.write(DATA_FILE, lines, StandardCharsets.UTF_8);
    }
}`,
    checks: [
      "是否有清楚的数据模型，至少包含编号、类型、金额、分类、日期和备注。",
      "新增账目后是否进入集合，并能在列表功能里看到。",
      "金额统计是否使用 `BigDecimal`，收入和支出分开累加。",
      "月度统计是否只统计当前月份，而不是把所有历史记录混在一起。",
      "程序退出前是否写入 `data/accounts.csv`，启动时是否读取已有文件。",
      "输入错误时是否有基本提示，不会静默产生脏数据。"
    ],
    commonMistakes: [
      "直接用 `double` 保存金额，长期累加后出现精度问题。",
      "只做了内存 List，程序一退出数据就全部丢失。",
      "保存 CSV 时没有处理目录不存在，第一次运行就写入失败。",
      "读取文件时假设每一行都绝对正确，遇到空行或坏数据就崩溃。",
      "新增记录没有生成稳定 id，后续修改和删除功能很难扩展。",
      "把菜单、统计、文件读写全部塞在 main 方法里，后续维护会越来越痛苦。"
    ],
    sources: [
      {
        title: "Oracle Java SE 21 API: BigDecimal",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigDecimal.html"
      },
      {
        title: "Oracle Java SE 21 API: Files",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html"
      },
      {
        title: "Oracle Java SE 21 API: LocalDate",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalDate.html"
      },
      {
        title: "Oracle Java SE 21 API: Scanner",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Scanner.html"
      }
    ]
  },
  {
    id: "level13-2-student-management-system",
    title: "学生管理系统",
    subtitle: "OOP 和增删改查",
    intro: [
      "学生管理系统是面向对象练习里很经典的小项目，因为它天然包含实体、服务和操作流程。你需要管理学生的学号、姓名、年龄、班级和成绩，并支持新增、查询、修改、删除这些基本动作。",
      "这一关的重点不是把菜单写得多花，而是学会分层。Student 只负责描述一个学生；StudentService 负责增删改查和业务规则；Main 负责和用户交互。分层以后，项目才不会变成一个巨大的 main 方法。",
      "CRUD 是 Create、Read、Update、Delete 的缩写，也就是新增、读取、更新、删除。几乎所有后台系统都能拆出 CRUD 的影子，所以这个项目是后面 Spring Boot 和数据库项目的前置训练。",
      "验收时要特别注意边界：学号不能重复，查询不存在的学生要有提示，删除前要确认目标存在，修改时不能把数据改成无效状态。能处理这些情况，才算从“能跑”走向“可用”。"
    ],
    syntax: [
      "实体类：`Student` 保存 `id`、`name`、`age`、`className`、`score` 等字段。",
      "服务类：`StudentService` 封装新增、查询、修改、删除和列表功能。",
      "唯一约束：新增学生前检查学号是否已存在，避免同一个学生出现两份记录。",
      "查询方式：按学号精准查询，按姓名关键字模糊搜索，列表按学号或分数排序。",
      "更新规则：修改学生时先找到原对象，再有选择地更新字段。",
      "删除规则：删除前返回是否成功，让界面层决定提示语。",
      "职责边界：`Main` 不直接遍历内部集合做业务判断，而是调用 service 方法。",
      "后续扩展：内存集合可以替换成文件、数据库或远程接口，服务层方法尽量保持稳定。"
    ],
    exampleCode: `import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

class Student {
    private final String id;
    private String name;
    private int age;
    private String className;
    private int score;

    Student(String id, String name, int age, String className, int score) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.className = className;
        this.score = score;
    }

    String getId() {
        return id;
    }

    int getScore() {
        return score;
    }

    public String toString() {
        return id + " " + name + " " + age + " " + className + " " + score;
    }
}

class StudentService {
    private final List<Student> students = new ArrayList<>();

    boolean add(Student student) {
        if (findById(student.getId()).isPresent()) {
            return false;
        }
        students.add(student);
        return true;
    }

    Optional<Student> findById(String id) {
        for (Student student : students) {
            if (student.getId().equals(id)) {
                return Optional.of(student);
            }
        }
        return Optional.empty();
    }
}

public class Main {
    public static void main(String[] args) {
        StudentService service = new StudentService();
        service.add(new Student("S001", "小林", 16, "一班", 92));
        service.add(new Student("S002", "小周", 17, "二班", 85));

        service.findById("S001").ifPresent(System.out::println);
    }
}`,
    task: "实现一个命令行学生管理系统。要求使用 Student 和 StudentService 两个类，支持新增学生、按学号查询、列出全部学生、修改成绩、删除学生。学号不能重复，查询或删除不存在的数据时要给出友好提示。",
    starterCode: `import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;

class Student {
    private final String id;
    private String name;
    private int age;
    private String className;
    private int score;

    // TODO: 构造方法、getter、修改成绩方法、toString
}

class StudentService {
    private final List<Student> students = new ArrayList<>();

    boolean add(Student student) {
        // TODO: 学号重复时返回 false
        return false;
    }

    Optional<Student> findById(String id) {
        // TODO: 按学号查找
        return Optional.empty();
    }

    List<Student> findAll() {
        // TODO: 返回学生列表
        return students;
    }

    boolean updateScore(String id, int score) {
        // TODO: 找到学生后修改成绩
        return false;
    }

    boolean deleteById(String id) {
        // TODO: 删除指定学号
        return false;
    }
}

public class Main {
    public static void main(String[] args) {
        // TODO: 用 Scanner 完成菜单循环
    }
}`,
    answerCode: `import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

class Student {
    private final String id;
    private String name;
    private int age;
    private String className;
    private int score;

    Student(String id, String name, int age, String className, int score) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.className = className;
        this.score = score;
    }

    String getId() {
        return id;
    }

    void changeScore(int score) {
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("成绩必须在 0 到 100 之间");
        }
        this.score = score;
    }

    public String toString() {
        return id + " " + name + " " + age + "岁 " + className + " 成绩：" + score;
    }
}

class StudentService {
    private final List<Student> students = new ArrayList<>();

    boolean add(Student student) {
        if (findById(student.getId()).isPresent()) {
            return false;
        }
        students.add(student);
        return true;
    }

    Optional<Student> findById(String id) {
        for (Student student : students) {
            if (student.getId().equals(id)) {
                return Optional.of(student);
            }
        }
        return Optional.empty();
    }

    List<Student> findAll() {
        return new ArrayList<>(students);
    }

    boolean updateScore(String id, int score) {
        Optional<Student> found = findById(id);
        if (found.isEmpty()) {
            return false;
        }
        found.get().changeScore(score);
        return true;
    }

    boolean deleteById(String id) {
        return students.removeIf(student -> student.getId().equals(id));
    }
}

public class Main {
    public static void main(String[] args) {
        StudentService service = new StudentService();
        service.add(new Student("S001", "小林", 16, "一班", 92));
        service.add(new Student("S002", "小周", 17, "二班", 85));

        System.out.println("全部学生：");
        for (Student student : service.findAll()) {
            System.out.println(student);
        }

        System.out.println("修改 S002 成绩：" + service.updateScore("S002", 90));
        System.out.println("删除 S404：" + service.deleteById("S404"));
        service.findById("S002").ifPresent(System.out::println);
    }
}`,
    checks: [
      "是否定义了 `Student` 实体类，而不是用多个平行数组保存学生信息。",
      "是否把增删改查逻辑放到 `StudentService`，让 `Main` 只负责交互。",
      "新增学生时是否检查学号唯一性。",
      "查询、修改、删除不存在的学号时是否不会抛出空指针异常。",
      "修改成绩时是否校验 0 到 100 的合理范围。",
      "列表功能是否能输出所有学生的关键信息。"
    ],
    commonMistakes: [
      "把所有字段都设成 public，导致任何地方都能随意改坏对象状态。",
      "学号重复也允许新增，后续查询和删除会变得不可预测。",
      "删除时一边 foreach 一边直接 remove，容易触发并发修改异常。",
      "服务层直接打印菜单提示，导致业务逻辑和界面逻辑混在一起。",
      "更新学生时创建了一个新对象，却没有替换回集合。",
      "只测试正常新增，不测试重复学号和不存在学号。"
    ],
    sources: [
      {
        title: "Dev.java: Classes and Objects",
        url: "https://dev.java/learn/classes-objects/"
      },
      {
        title: "Oracle Java SE 21 API: ArrayList",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html"
      },
      {
        title: "Oracle Java SE 21 API: Optional",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html"
      },
      {
        title: "Oracle Java SE 21 API: Comparator",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Comparator.html"
      }
    ]
  },
  {
    id: "level13-3-contacts-csv-tool",
    title: "通讯录与 CSV 工具",
    subtitle: "文件和数据清洗",
    intro: [
      "通讯录项目会把文件读写推进一步：不只是保存几行文本，而是处理带字段的数据。联系人通常包含姓名、手机号、邮箱、城市和标签，CSV 刚好适合做这种轻量数据交换。",
      "真实数据经常不干净：手机号里可能有空格，邮箱大小写混乱，姓名前后带空白，同一个手机号被导入两次。这个项目的价值就在于把“能读取文件”升级成“能清洗和验证数据”。",
      "建议把流程拆成导入、清洗、去重、查询、导出五步。导入负责把 CSV 变成 Contact 对象；清洗负责 trim、统一大小写和标准化手机号；去重负责保留唯一联系人；导出负责写回规范格式。",
      "如果只是练习标准库，可以先处理没有逗号和引号的简单 CSV；如果要做更接近真实项目的版本，应该使用 Apache Commons CSV 这类成熟库，避免自己重新实现复杂 CSV 规则。"
    ],
    syntax: [
      "数据模型：`Contact` 字段建议包含姓名、手机号、邮箱、城市和标签。",
      "导入流程：先读取文件行，再跳过表头，最后把每一行解析成对象。",
      "数据清洗：姓名和城市使用 `trim()`，邮箱转小写，手机号去掉空格和短横线。",
      "数据校验：手机号、邮箱为空时拒绝导入；格式明显错误时记录错误行。",
      "去重规则：可以用手机号作为唯一键，重复时保留信息更完整的一条。",
      "查询功能：支持按姓名关键字、城市或标签筛选联系人。",
      "导出功能：写出统一表头和清洗后的字段，编码明确使用 UTF-8。",
      "工程建议：复杂 CSV 使用 Apache Commons CSV，不要靠简单 split 处理所有情况。"
    ],
    exampleCode: `import java.util.LinkedHashMap;
import java.util.Map;

class Contact {
    String name;
    String phone;
    String email;
    String city;
    String tag;

    Contact(String name, String phone, String email, String city, String tag) {
        this.name = name.trim();
        this.phone = normalizePhone(phone);
        this.email = email.trim().toLowerCase();
        this.city = city.trim();
        this.tag = tag.trim();
    }

    static String normalizePhone(String value) {
        return value.replace(" ", "").replace("-", "");
    }
}

public class Main {
    public static void main(String[] args) {
        Map<String, Contact> contacts = new LinkedHashMap<>();
        Contact first = new Contact(" 小林 ", "138-0000-0001", "LIN@example.com", " 杭州 ", "同学");
        Contact duplicate = new Contact("小林", "13800000001", "lin@EXAMPLE.com", "杭州", "朋友");

        contacts.put(first.phone, first);
        contacts.putIfAbsent(duplicate.phone, duplicate);

        System.out.println("联系人数量：" + contacts.size());
        System.out.println("邮箱：" + contacts.get("13800000001").email);
    }
}`,
    task: "实现一个通讯录 CSV 工具。读取 data/contacts-raw.csv，清洗姓名、手机号、邮箱和城市，按手机号去重，支持按城市筛选，并导出到 data/contacts-clean.csv。导入时要报告被跳过的无效行数量。",
    starterCode: `import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.Map;

class Contact {
    String name;
    String phone;
    String email;
    String city;
    String tag;

    // TODO: 构造方法和清洗逻辑
}

public class Main {
    private static final Path INPUT = Path.of("data", "contacts-raw.csv");
    private static final Path OUTPUT = Path.of("data", "contacts-clean.csv");

    public static void main(String[] args) throws Exception {
        Map<String, Contact> contacts = new LinkedHashMap<>();

        // TODO: 读取 INPUT
        // TODO: 跳过表头
        // TODO: 清洗、校验、按手机号去重
        // TODO: 输出指定城市联系人
        // TODO: 写入 OUTPUT
    }
}`,
    answerCode: `import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

class Contact {
    String name;
    String phone;
    String email;
    String city;
    String tag;

    Contact(String name, String phone, String email, String city, String tag) {
        this.name = name.trim();
        this.phone = phone.replace(" ", "").replace("-", "");
        this.email = email.trim().toLowerCase();
        this.city = city.trim();
        this.tag = tag.trim();
    }

    boolean valid() {
        return !name.isBlank() && phone.matches("1\\\\d{10}") && email.contains("@");
    }

    String toCsvLine() {
        return name + "," + phone + "," + email + "," + city + "," + tag;
    }
}

public class Main {
    private static final Path INPUT = Path.of("data", "contacts-raw.csv");
    private static final Path OUTPUT = Path.of("data", "contacts-clean.csv");

    public static void main(String[] args) throws Exception {
        Map<String, Contact> contacts = new LinkedHashMap<>();
        int skipped = 0;

        List<String> lines = Files.readAllLines(INPUT, StandardCharsets.UTF_8);
        for (int i = 1; i < lines.size(); i++) {
            String[] parts = lines.get(i).split(",", -1);
            if (parts.length < 5) {
                skipped++;
                continue;
            }

            Contact contact = new Contact(parts[0], parts[1], parts[2], parts[3], parts[4]);
            if (!contact.valid()) {
                skipped++;
                continue;
            }
            contacts.putIfAbsent(contact.phone, contact);
        }

        System.out.println("有效联系人：" + contacts.size());
        System.out.println("跳过无效行：" + skipped);
        System.out.println("杭州联系人：");
        for (Contact contact : contacts.values()) {
            if (contact.city.equals("杭州")) {
                System.out.println(contact.name + " " + contact.phone);
            }
        }

        List<String> output = new ArrayList<>();
        output.add("name,phone,email,city,tag");
        for (Contact contact : contacts.values()) {
            output.add(contact.toCsvLine());
        }
        Files.createDirectories(OUTPUT.getParent());
        Files.write(OUTPUT, output, StandardCharsets.UTF_8);
    }
}`,
    checks: [
      "是否明确使用 UTF-8 读取和写入 CSV 文件。",
      "是否跳过表头，并能处理空行、字段数量不足的坏数据。",
      "手机号是否统一去掉空格和短横线，邮箱是否统一小写。",
      "是否按手机号去重，而不是只按整行文本去重。",
      "是否能统计有效联系人数量和跳过的无效行数量。",
      "导出的 CSV 是否包含表头和清洗后的数据。"
    ],
    commonMistakes: [
      "直接用 `split(\",\")` 处理所有 CSV 场景，却不知道带引号逗号会失败。",
      "读取文件时不写编码，换一台电脑后中文变成乱码。",
      "只清洗导出结果，不清洗查询逻辑，导致同一个城市匹配不到。",
      "用姓名去重，现实中同名联系人会被误删。",
      "发现坏数据就让整个程序退出，没有统计并跳过错误行。",
      "导出时忘记写表头，后续再导入很难判断列含义。"
    ],
    sources: [
      {
        title: "Oracle Java SE 21 API: Files",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html"
      },
      {
        title: "Oracle Java SE 21 API: StandardCharsets",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/charset/StandardCharsets.html"
      },
      {
        title: "Oracle Java SE 21 API: LinkedHashMap",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/LinkedHashMap.html"
      },
      {
        title: "Apache Commons CSV: User Guide",
        url: "https://commons.apache.org/proper/commons-csv/user-guide.html"
      }
    ]
  },
  {
    id: "level13-4-local-task-manager",
    title: "本地任务管理器",
    subtitle: "测试和重构",
    intro: [
      "本地任务管理器看起来只是待办清单，但它很适合练习测试和重构。任务有标题、截止日期、优先级、完成状态和创建时间；用户需要新增任务、标记完成、查看未完成任务、按优先级或截止日期排序。",
      "这一关要刻意避免“先写一大坨功能，最后再补测试”。更稳的做法是先写 TaskService 的测试，再实现业务方法。比如：新增任务后列表数量增加；完成任务后状态改变；过期任务能被筛选出来。",
      "重构的目标不是把代码改得高级，而是让职责更清楚。Task 负责保存任务状态；TaskRepository 负责保存和读取；TaskService 负责业务规则；命令行界面只负责输入输出。",
      "验收时除了能手动操作，还要能运行自动化测试。一个本地小工具如果有测试保护，后面你把数据从内存换成 JSON 文件，或者把命令行换成 Web API，都更不容易把旧功能改坏。"
    ],
    syntax: [
      "数据模型：`Task` 包含 `id`、`title`、`dueDate`、`priority`、`done`、`createdAt`。",
      "业务服务：`TaskService` 提供新增、完成、删除、列出未完成、筛选过期任务等方法。",
      "仓储边界：`TaskRepository` 隐藏数据保存方式，开始可以用内存实现。",
      "测试优先：先为新增、完成、排序、过期筛选写 JUnit 测试。",
      "排序规则：未完成任务可以先按优先级，再按截止日期排序。",
      "重构节奏：每次只做一个小重构，重构后立即运行测试。",
      "异常处理：完成不存在的任务时返回 false 或抛出明确异常，不要静默失败。",
      "验收标准：`mvn test` 或 `gradle test` 能稳定通过，命令行功能和测试覆盖同一套服务方法。"
    ],
    exampleCode: `import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Task {
    long id;
    String title;
    LocalDate dueDate;
    int priority;
    boolean done;

    Task(long id, String title, LocalDate dueDate, int priority) {
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class TaskService {
    private final List<Task> tasks = new ArrayList<>();

    Task add(String title, LocalDate dueDate, int priority) {
        Task task = new Task(tasks.size() + 1, title, dueDate, priority);
        tasks.add(task);
        return task;
    }

    List<Task> activeTasks() {
        return tasks.stream()
                .filter(task -> !task.done)
                .sorted(Comparator.comparingInt((Task task) -> task.priority).reversed()
                        .thenComparing(task -> task.dueDate))
                .toList();
    }
}

public class Main {
    public static void main(String[] args) {
        TaskService service = new TaskService();
        service.add("完成 Level 13", LocalDate.now().plusDays(1), 5);
        System.out.println("未完成任务：" + service.activeTasks().size());
    }
}`,
    task: "实现一个本地任务管理器。要求 TaskService 至少支持 add、markDone、delete、activeTasks、overdueTasks 五个方法，并为这些方法写 JUnit 5 测试。通过测试后，再接入命令行菜单或本地文件保存。",
    starterCode: `// 文件：src/main/java/Task.java
import java.time.LocalDate;

class Task {
    long id;
    String title;
    LocalDate dueDate;
    int priority;
    boolean done;

    // TODO: 构造方法和 markDone
}

// 文件：src/main/java/TaskService.java
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

class TaskService {
    private final List<Task> tasks = new ArrayList<>();

    Task add(String title, LocalDate dueDate, int priority) {
        // TODO
        return null;
    }

    boolean markDone(long id) {
        // TODO
        return false;
    }

    List<Task> activeTasks() {
        // TODO
        return List.of();
    }

    List<Task> overdueTasks(LocalDate today) {
        // TODO
        return List.of();
    }
}

// 文件：src/test/java/TaskServiceTest.java
import org.junit.jupiter.api.Test;

class TaskServiceTest {
    @Test
    void addCreatesActiveTask() {
        // TODO: 断言新增任务后出现在未完成列表
    }
}`,
    answerCode: `// 文件：src/main/java/TaskService.java
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Task {
    long id;
    String title;
    LocalDate dueDate;
    int priority;
    boolean done;

    Task(long id, String title, LocalDate dueDate, int priority) {
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    void markDone() {
        done = true;
    }
}

class TaskService {
    private final List<Task> tasks = new ArrayList<>();
    private long nextId = 1;

    Task add(String title, LocalDate dueDate, int priority) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("任务标题不能为空");
        }
        Task task = new Task(nextId++, title.trim(), dueDate, priority);
        tasks.add(task);
        return task;
    }

    boolean markDone(long id) {
        for (Task task : tasks) {
            if (task.id == id) {
                task.markDone();
                return true;
            }
        }
        return false;
    }

    boolean delete(long id) {
        return tasks.removeIf(task -> task.id == id);
    }

    List<Task> activeTasks() {
        return tasks.stream()
                .filter(task -> !task.done)
                .sorted(Comparator.comparingInt((Task task) -> task.priority).reversed()
                        .thenComparing(task -> task.dueDate))
                .toList();
    }

    List<Task> overdueTasks(LocalDate today) {
        return tasks.stream()
                .filter(task -> !task.done)
                .filter(task -> task.dueDate.isBefore(today))
                .toList();
    }
}

// 文件：src/test/java/TaskServiceTest.java
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TaskServiceTest {
    @Test
    void addCreatesActiveTask() {
        TaskService service = new TaskService();
        service.add("写测试", LocalDate.now().plusDays(1), 3);

        assertEquals(1, service.activeTasks().size());
    }

    @Test
    void markDoneRemovesTaskFromActiveList() {
        TaskService service = new TaskService();
        Task task = service.add("提交作业", LocalDate.now().plusDays(1), 5);

        assertTrue(service.markDone(task.id));
        assertEquals(0, service.activeTasks().size());
    }

    @Test
    void overdueTasksOnlyIncludesUnfinishedPastTasks() {
        TaskService service = new TaskService();
        service.add("昨天截止", LocalDate.of(2026, 5, 1), 3);
        Task done = service.add("已完成", LocalDate.of(2026, 5, 1), 3);
        service.markDone(done.id);

        assertEquals(1, service.overdueTasks(LocalDate.of(2026, 5, 2)).size());
        assertFalse(service.markDone(999));
    }
}`,
    checks: [
      "是否把业务逻辑放在 `TaskService`，测试可以绕过命令行直接调用服务。",
      "是否至少覆盖新增、完成、删除、未完成列表和过期筛选。",
      "任务标题为空时是否被拒绝，避免产生无意义任务。",
      "未完成列表排序是否稳定，优先级和截止日期规则清楚。",
      "完成或删除不存在任务时是否有明确返回结果。",
      "重构后是否运行 `mvn test` 或 `gradle test`，而不是只靠手动点菜单。"
    ],
    commonMistakes: [
      "把 Scanner 写进 TaskService，导致服务方法很难测试。",
      "测试只检查方法不报错，没有断言具体结果。",
      "使用系统当天日期写死测试，过几天测试结果就变了。",
      "完成任务时只打印“完成成功”，却没有真正修改 done 状态。",
      "activeTasks 返回内部 List，外部代码可以绕过服务直接改数据。",
      "重构一次改太多地方，测试失败后不知道是哪一步引入问题。"
    ],
    sources: [
      {
        title: "JUnit 5 User Guide",
        url: "https://junit.org/junit5/docs/current/user-guide/"
      },
      {
        title: "JUnit 5 API: Assertions",
        url: "https://docs.junit.org/current/api/org.junit.jupiter.api/org/junit/jupiter/api/Assertions.html"
      },
      {
        title: "Apache Maven: Introduction to the Build Lifecycle",
        url: "https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html"
      },
      {
        title: "Oracle Java SE 21 API: LocalDate",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalDate.html"
      }
    ]
  },
  {
    id: "level13-5-blog-rest-api",
    title: "博客 REST API",
    subtitle: "Spring Boot + 数据库",
    intro: [
      "从这一关开始，项目进入后端服务阶段。博客 REST API 的目标是让前端、移动端或其他服务通过 HTTP 管理文章和评论。用户不再直接操作命令行，而是发送 GET、POST、PUT、DELETE 请求。",
      "一个最小可用的博客后端通常包含 Article 和 Comment 两个核心模型。Article 有标题、内容、状态、发布时间；Comment 关联到某篇文章，有作者昵称、内容和创建时间。数据库负责长期保存这些数据。",
      "Spring Boot 帮你把 Web 服务器、JSON 转换、配置和依赖整合起来；Spring Data JPA 帮你把 Repository 接口变成数据库访问能力。你需要重点理解 Controller、Service、Repository 三层怎么协作。",
      "验收标准应该从接口角度写清楚：创建文章返回 201，查询文章返回 JSON，更新不存在的文章返回 404，删除后再次查询也返回 404。这样的标准比“做一个博客系统”更具体，也更容易测试。"
    ],
    syntax: [
      "接口设计：`POST /api/articles` 创建文章，`GET /api/articles` 分页列表，`GET /api/articles/{id}` 查看详情。",
      "数据模型：`Article` 字段包括 id、title、content、status、publishedAt、createdAt、updatedAt。",
      "分层结构：Controller 接收 HTTP 请求，Service 处理业务规则，Repository 负责数据库访问。",
      "DTO 边界：请求和响应使用 DTO，不把 JPA Entity 原样暴露给外部。",
      "数据库访问：`JpaRepository<Article, Long>` 提供基础增删改查和分页查询。",
      "状态码：创建成功用 201，参数错误用 400，资源不存在用 404。",
      "校验规则：标题不能为空且长度有限，内容不能为空，状态只能是草稿或发布。",
      "测试建议：使用 MockMvc 或 WebTestClient 验证接口状态码和 JSON 字段。"
    ],
    exampleCode: `// 文件：ArticleController.java
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/articles")
class ArticleController {
    private final ArticleService articleService;

    ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    ResponseEntity<ArticleResponse> create(@RequestBody CreateArticleRequest request) {
        ArticleResponse response = articleService.create(request);
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/{id}")
    ResponseEntity<ArticleResponse> findById(@PathVariable Long id) {
        return articleService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

record CreateArticleRequest(String title, String content) {
}

record ArticleResponse(Long id, String title, String content) {
}`,
    task: "搭建一个博客 REST API。要求包含文章的创建、列表、详情、更新、删除接口；使用 Spring Boot Web、Spring Data JPA 和 H2 或 MySQL；接口返回 JSON；错误场景返回合适状态码；至少为创建和查询详情写接口测试。",
    starterCode: `// 目录建议
src/main/java/com/example/blog
  BlogApplication.java
  article/Article.java
  article/ArticleRepository.java
  article/ArticleService.java
  article/ArticleController.java
  article/dto/CreateArticleRequest.java
  article/dto/ArticleResponse.java

// Article.java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
class Article {
    @Id
    @GeneratedValue
    private Long id;

    // TODO: title、content、status、publishedAt、createdAt、updatedAt
}

// ArticleRepository.java
import org.springframework.data.jpa.repository.JpaRepository;

interface ArticleRepository extends JpaRepository<Article, Long> {
}

// ArticleController.java
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/articles")
class ArticleController {
    // TODO: 注入 ArticleService 并实现 CRUD 接口
}`,
    answerCode: `// 实现蓝图
1. 创建 Spring Boot 项目，依赖选择 Spring Web、Spring Data JPA、Validation、H2 Database。
2. 定义 Article Entity：id、title、content、status、publishedAt、createdAt、updatedAt。
3. 定义 DTO：CreateArticleRequest、UpdateArticleRequest、ArticleResponse，避免直接暴露 Entity。
4. ArticleRepository 继承 JpaRepository<Article, Long>，列表接口使用 Pageable。
5. ArticleService 实现 create、findPage、findById、update、delete，并集中处理不存在资源。
6. ArticleController 映射：
   POST /api/articles -> 201 + ArticleResponse
   GET /api/articles?page=0&size=10 -> Page<ArticleResponse>
   GET /api/articles/{id} -> 200 或 404
   PUT /api/articles/{id} -> 200 或 404
   DELETE /api/articles/{id} -> 204 或 404
7. 使用 @RestControllerAdvice 统一返回错误结构，例如 code、message、path、timestamp。
8. 使用 MockMvc 写测试：创建文章成功、标题为空返回 400、查询不存在文章返回 404。

// Controller 关键片段
@RestController
@RequestMapping("/api/articles")
class ArticleController {
    private final ArticleService service;

    ArticleController(ArticleService service) {
        this.service = service;
    }

    @PostMapping
    ResponseEntity<ArticleResponse> create(@Valid @RequestBody CreateArticleRequest request) {
        return ResponseEntity.status(201).body(service.create(request));
    }

    @GetMapping("/{id}")
    ArticleResponse findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping
    Page<ArticleResponse> findPage(Pageable pageable) {
        return service.findPage(pageable);
    }
}`,
    checks: [
      "是否能通过 HTTP 接口完成文章创建、列表、详情、更新和删除。",
      "Controller、Service、Repository 是否职责分离，没有把数据库逻辑写进 Controller。",
      "请求和响应是否使用 DTO，避免 Entity 直接变成外部合同。",
      "创建成功、参数错误、不存在资源、删除成功是否返回合适状态码。",
      "数据库配置是否能在本地启动，测试环境是否使用独立数据源。",
      "是否至少有创建成功和查询不存在资源的接口测试。"
    ],
    commonMistakes: [
      "把所有逻辑都写在 Controller，后续加测试和复用会很困难。",
      "直接返回 JPA Entity，字段和关联关系很容易泄漏给外部。",
      "更新文章时不先查数据库，导致不存在的 id 被当成新增数据。",
      "列表接口一次返回全部数据，没有分页，数据量大后响应很慢。",
      "只测试 Service，不测试 HTTP 状态码和 JSON 结构。",
      "本地用 H2 能跑，但没有说明生产数据库配置如何切换。"
    ],
    sources: [
      {
        title: "Spring Boot Reference: Web",
        url: "https://docs.spring.io/spring-boot/reference/web/index.html"
      },
      {
        title: "Spring Data JPA Reference",
        url: "https://docs.spring.io/spring-data/jpa/reference/"
      },
      {
        title: "Spring Framework Reference: REST Controllers",
        url: "https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller.html"
      },
      {
        title: "Spring Boot Reference: Testing",
        url: "https://docs.spring.io/spring-boot/reference/testing/index.html"
      }
    ]
  },
  {
    id: "level13-6-admin-system",
    title: "后台管理系统",
    subtitle: "登录、权限、分页",
    intro: [
      "后台管理系统比普通 CRUD 多了一个关键问题：不是每个人都能做所有操作。管理员可以创建用户、禁用账号、查看审计日志；普通运营可能只能查看和编辑内容；未登录用户应该被拒绝访问。",
      "本项目要把登录、角色、权限、分页查询和审计日志串起来。它可以继续使用博客项目的数据，也可以单独管理用户和菜单。重点是学会用 Spring Security 保护接口，而不是自己手写一套不可靠的登录判断。",
      "数据模型建议包含 User、Role、Permission 和 AuditLog。小项目可以先把权限简化成角色，例如 ADMIN、EDITOR、VIEWER；真正扩展时再做更细的 permission。",
      "验收标准要从安全角度写：未登录访问管理接口返回 401，权限不足返回 403，管理员能分页查询用户，普通用户不能禁用账号，所有敏感操作都写入审计日志。"
    ],
    syntax: [
      "认证 Authentication：确认用户是谁，常见方式是用户名密码、Session 或 JWT。",
      "授权 Authorization：确认用户能做什么，例如 ADMIN 才能禁用用户。",
      "密码存储：使用 `PasswordEncoder` 哈希密码，不能明文保存。",
      "接口保护：用 Spring Security 配置不同路径的访问规则。",
      "方法级权限：用 `@PreAuthorize` 在 Service 或 Controller 方法上声明角色要求。",
      "分页查询：使用 `Pageable` 和 `Page<T>` 返回用户列表，避免一次加载全部数据。",
      "审计日志：记录操作者、动作、目标资源、结果和时间，方便追踪问题。",
      "验收测试：用安全测试工具模拟不同角色，验证 401、403 和 200。"
    ],
    exampleCode: `// 文件：SecurityConfig.java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/me").authenticated()
                        .anyRequest().permitAll()
                )
                .httpBasic(basic -> {
                })
                .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`,
    task: "实现一个后台管理系统的后端。要求包含登录认证、用户分页列表、创建用户、禁用用户、角色控制和审计日志。管理员可以管理用户，普通用户只能查看自己的信息。请用 Spring Security 保护接口，并写出不同角色访问接口的测试。",
    starterCode: `// User.java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
class User {
    @Id
    @GeneratedValue
    private Long id;

    // TODO: username、passwordHash、roles、enabled、createdAt
}

// AdminUserController.java
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/users")
class AdminUserController {
    @GetMapping
    Page<UserResponse> page(Pageable pageable) {
        // TODO: 只有 ADMIN 可以访问
        return Page.empty();
    }
}

record UserResponse(Long id, String username, boolean enabled) {
}`,
    answerCode: `// 实现蓝图
1. User 表保存 username、passwordHash、role、enabled、createdAt、updatedAt。
2. AuditLog 表保存 actor、action、targetType、targetId、success、createdAt。
3. 使用 PasswordEncoder 保存密码哈希，创建用户时永远不保存明文密码。
4. SecurityConfig 配置：
   /api/auth/login 允许匿名访问
   /api/admin/** 需要 ADMIN
   /api/me 需要登录
   其他接口按业务决定
5. UserDetailsService 从数据库加载用户、密码哈希、enabled 状态和角色。
6. AdminUserService 提供 createUser、disableUser、pageUsers，每个敏感操作写 AuditLog。
7. 分页接口使用 Pageable，响应只返回 UserResponse，不返回 passwordHash。
8. 测试覆盖：
   未登录访问 /api/admin/users 返回 401
   USER 角色访问 /api/admin/users 返回 403
   ADMIN 角色访问 /api/admin/users 返回 200
   ADMIN 禁用用户后，该用户 enabled 为 false，且产生审计日志

// 方法级权限片段
@Service
class AdminUserService {
    @PreAuthorize("hasRole('ADMIN')")
    Page<UserResponse> pageUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(UserResponse::from);
    }

    @PreAuthorize("hasRole('ADMIN')")
    void disableUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        user.disable();
        auditLogRepository.save(AuditLog.success("DISABLE_USER", "User", id));
    }
}`,
    checks: [
      "未登录访问管理接口是否返回 401，而不是直接放行。",
      "普通用户访问管理员接口是否返回 403。",
      "密码是否经过 `PasswordEncoder` 哈希保存，响应里不包含密码字段。",
      "用户列表是否使用分页参数，并返回分页结果。",
      "禁用用户、创建用户等敏感操作是否记录审计日志。",
      "是否有不同角色访问同一接口的安全测试。"
    ],
    commonMistakes: [
      "自己写 if 判断 session 用户，绕开 Spring Security 的统一机制。",
      "数据库保存明文密码，或者把密码哈希返回给前端。",
      "只在前端隐藏按钮，后端接口没有权限控制。",
      "把 401 和 403 混用，导致调用方分不清未登录和权限不足。",
      "分页接口忽略 size 限制，用户传很大的 size 会拖垮查询。",
      "审计日志只记录成功操作，不记录失败尝试，排查安全问题时信息不足。"
    ],
    sources: [
      {
        title: "Spring Security Reference",
        url: "https://docs.spring.io/spring-security/reference/"
      },
      {
        title: "Spring Security Reference: Servlet Authorization",
        url: "https://docs.spring.io/spring-security/reference/servlet/authorization/index.html"
      },
      {
        title: "Spring Data Commons Reference: Repositories",
        url: "https://docs.spring.io/spring-data/commons/reference/repositories/core-concepts.html"
      },
      {
        title: "Spring Data Commons API: Pageable",
        url: "https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Pageable.html"
      }
    ]
  },
  {
    id: "level13-7-message-notification-system",
    title: "消息通知系统",
    subtitle: "异步和重试",
    intro: [
      "消息通知系统模拟真实后端里很常见的场景：用户注册后发欢迎邮件，订单支付后发短信，任务完成后推送站内信。通知通常不应该卡住主流程，所以需要异步处理。",
      "本项目可以先不接真实短信或邮件平台，而是把 Email、SMS、Webhook 作为不同的发送通道。发送请求进入系统后先保存为 Notification，再由后台任务异步发送，失败时记录原因并按规则重试。",
      "核心数据模型建议包含 Notification：接收人、通道、标题、内容、状态、重试次数、下一次重试时间、最后错误。状态可以是 PENDING、SENDING、SENT、FAILED。",
      "验收标准要关注可靠性：提交通知接口很快返回；发送失败不会丢消息；超过最大重试次数后进入失败状态；日志里能看到每次尝试；同一条通知不会被多个线程同时发送。"
    ],
    syntax: [
      "异步边界：接口只负责创建通知记录，真正发送由后台任务执行。",
      "状态流转：`PENDING -> SENDING -> SENT`，失败时根据次数回到 `PENDING` 或进入 `FAILED`。",
      "重试策略：记录 `attempts` 和 `nextRetryAt`，用固定间隔或指数退避控制重试。",
      "发送通道：定义 `NotificationSender` 接口，为 Email、SMS、Webhook 写不同实现。",
      "幂等处理：发送前锁定或更新状态，避免同一条通知被重复消费。",
      "错误记录：保存最后一次异常信息，便于排查第三方接口失败原因。",
      "调度任务：使用 `@Scheduled` 定期扫描可发送通知，或接入消息队列。",
      "测试建议：用假的 Sender 模拟成功和失败，验证状态和重试次数。"
    ],
    exampleCode: `import java.time.Instant;

enum NotificationStatus {
    PENDING, SENDING, SENT, FAILED
}

class Notification {
    long id;
    String channel;
    String receiver;
    String content;
    int attempts;
    Instant nextRetryAt = Instant.now();
    NotificationStatus status = NotificationStatus.PENDING;

    void markSending() {
        status = NotificationStatus.SENDING;
    }

    void markSent() {
        status = NotificationStatus.SENT;
    }

    void markRetry(String error) {
        attempts++;
        status = attempts >= 3 ? NotificationStatus.FAILED : NotificationStatus.PENDING;
        nextRetryAt = Instant.now().plusSeconds(60L * attempts);
    }
}

interface NotificationSender {
    void send(Notification notification);
}`,
    task: "实现一个消息通知系统。要求提供创建通知接口，后台异步发送通知，失败后最多重试 3 次，最终记录 SENT 或 FAILED。至少实现一个假的 EmailSender 方便测试，并验证成功、失败重试、超过次数失败三个场景。",
    starterCode: `// Notification.java
import java.time.Instant;

enum NotificationStatus {
    PENDING, SENDING, SENT, FAILED
}

class Notification {
    Long id;
    String channel;
    String receiver;
    String content;
    int attempts;
    Instant nextRetryAt;
    NotificationStatus status;

    // TODO: 状态流转方法
}

// NotificationWorker.java
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
class NotificationWorker {
    @Scheduled(fixedDelay = 5000)
    void sendPendingNotifications() {
        // TODO: 找到可发送通知，调用 sender，成功标记 SENT，失败安排重试
    }
}`,
    answerCode: `// 实现蓝图
1. Notification Entity：
   id、channel、receiver、title、content、status、attempts、nextRetryAt、lastError、createdAt、sentAt。
2. NotificationRepository：
   查询 status = PENDING 且 nextRetryAt <= now 的通知，并限制批量大小。
3. NotificationService：
   create(request) 只保存 PENDING 通知并快速返回 id。
4. NotificationSender 接口：
   supports(channel) 判断通道，send(notification) 执行具体发送。
5. NotificationWorker：
   @Scheduled 固定间隔扫描待发送通知。
   发送前把状态改成 SENDING。
   成功后标记 SENT 和 sentAt。
   失败后 attempts + 1，未超过 3 次则设置下一次重试时间，超过则标记 FAILED。
6. 可靠性增强：
   使用事务包住状态变更。
   查询时限制批量大小。
   多实例部署时使用数据库锁或消息队列避免重复发送。
7. 测试：
   FakeSender 成功时通知变为 SENT。
   FakeSender 第一次失败第二次成功时 attempts 增加并最终 SENT。
   FakeSender 一直失败时最终 FAILED。

// Worker 关键片段
@Component
class NotificationWorker {
    private final NotificationRepository repository;
    private final NotificationSenderRegistry senderRegistry;

    @Scheduled(fixedDelay = 5000)
    @Transactional
    void sendPendingNotifications() {
        List<Notification> batch = repository.findReadyToSend(Instant.now(), PageRequest.of(0, 20));
        for (Notification notification : batch) {
            notification.markSending();
            try {
                senderRegistry.senderFor(notification.channel()).send(notification);
                notification.markSent();
            } catch (Exception ex) {
                notification.markRetry(ex.getMessage());
            }
        }
    }
}`,
    checks: [
      "创建通知接口是否快速返回，不等待真实发送完成。",
      "通知状态是否有明确流转，失败不会直接丢失。",
      "重试次数和下一次重试时间是否被持久化。",
      "超过最大重试次数后是否进入 FAILED，并保存最后错误。",
      "发送通道是否通过接口抽象，测试可以替换成 FakeSender。",
      "是否有成功、失败后重试、最终失败三个自动化测试。"
    ],
    commonMistakes: [
      "在 HTTP 请求线程里直接调用第三方发送接口，导致用户请求被慢接口拖住。",
      "失败后只打印日志，不保存状态，系统重启后无法继续重试。",
      "没有最大重试次数，坏消息会永远占用资源。",
      "多个定时任务实例同时扫描同一批数据，造成重复发送。",
      "把所有通道写成 if else，新增通道时要修改大量旧代码。",
      "测试依赖真实邮箱或短信平台，导致测试慢、不稳定、成本高。"
    ],
    sources: [
      {
        title: "Spring Framework Reference: Task Execution and Scheduling",
        url: "https://docs.spring.io/spring-framework/reference/integration/scheduling.html"
      },
      {
        title: "Spring Boot Reference: Task Execution and Scheduling",
        url: "https://docs.spring.io/spring-boot/reference/features/task-execution-and-scheduling.html"
      },
      {
        title: "Oracle Java SE 21 API: Instant",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/Instant.html"
      },
      {
        title: "Spring Framework Reference: Transaction Management",
        url: "https://docs.spring.io/spring-framework/reference/data-access/transaction.html"
      }
    ]
  },
  {
    id: "level13-8-high-concurrency-task-processor",
    title: "高并发任务处理器",
    subtitle: "线程池和监控",
    intro: [
      "高并发任务处理器的目标是让系统同时处理很多任务，但又不把机器资源耗尽。比如批量生成报表、处理图片、同步外部数据、消费队列消息，都需要控制并发量、失败重试和运行状态。",
      "这一关的核心不是“线程越多越快”，而是学会使用线程池。线程池可以限制同时工作的线程数量，用队列暂存任务，用拒绝策略保护系统，并通过指标观察当前压力。",
      "数据模型可以设计为 Job 和 JobExecution。Job 表示一个待处理任务，包含类型、参数、状态、优先级；JobExecution 记录每次执行的开始时间、结束时间、耗时和错误。",
      "验收时要看吞吐和稳定性：提交 1000 个任务时系统不会创建 1000 个线程；任务失败会记录错误；队列满时返回明确拒绝信息；监控接口能看到已完成、失败、排队中和正在执行的数量。"
    ],
    syntax: [
      "线程池选择：使用 `ThreadPoolExecutor` 明确核心线程数、最大线程数、队列和拒绝策略。",
      "任务状态：`QUEUED`、`RUNNING`、`SUCCEEDED`、`FAILED`、`CANCELLED` 要有清楚含义。",
      "队列容量：有界队列可以保护内存，队列满时要让调用方知道提交失败。",
      "超时控制：长任务要有超时或取消机制，避免永久占用线程。",
      "结果记录：每次执行都记录开始时间、结束时间、耗时和异常。",
      "并发安全：共享计数器使用 `AtomicInteger`、数据库状态更新或受控锁。",
      "监控指标：暴露活跃线程数、队列长度、成功数、失败数和平均耗时。",
      "优雅关闭：应用停止时先拒绝新任务，再等待正在执行任务结束。"
    ],
    exampleCode: `import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        AtomicInteger success = new AtomicInteger();
        ThreadPoolExecutor executor = new ThreadPoolExecutor(
                4,
                8,
                30,
                TimeUnit.SECONDS,
                new ArrayBlockingQueue<>(100),
                new ThreadPoolExecutor.CallerRunsPolicy()
        );

        for (int i = 0; i < 20; i++) {
            int jobId = i + 1;
            executor.submit(() -> {
                System.out.println("处理任务 " + jobId + " by " + Thread.currentThread().getName());
                success.incrementAndGet();
            });
        }

        executor.shutdown();
        executor.awaitTermination(10, TimeUnit.SECONDS);
        System.out.println("成功数量：" + success.get());
    }
}`,
    task: "实现一个高并发任务处理器。要求提供提交任务接口、后台线程池执行任务、任务状态查询、失败记录、队列容量控制和监控统计。用压测或批量测试提交至少 1000 个任务，证明线程数受控且任务状态最终可查询。",
    starterCode: `import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadPoolExecutor;

enum JobStatus {
    QUEUED, RUNNING, SUCCEEDED, FAILED
}

class Job {
    long id;
    String type;
    String payload;
    JobStatus status;
    String error;

    // TODO: 状态流转方法
}

class JobProcessor {
    private final Map<Long, Job> jobs = new ConcurrentHashMap<>();
    private final ThreadPoolExecutor executor;

    JobProcessor(ThreadPoolExecutor executor) {
        this.executor = executor;
    }

    long submit(String type, String payload) {
        // TODO: 创建 Job，放入 jobs，提交到线程池
        return 0;
    }

    Job findById(long id) {
        // TODO
        return null;
    }
}`,
    answerCode: `// 实现蓝图
1. Job 数据模型：
   id、type、payload、status、createdAt、startedAt、finishedAt、error。
2. ThreadPoolExecutor 配置：
   corePoolSize = CPU 核心数
   maximumPoolSize = CPU 核心数 * 2
   workQueue = 有界队列
   rejectedExecutionHandler = 自定义拒绝策略，返回提交失败
3. JobProcessor.submit：
   生成 id。
   保存 QUEUED 状态。
   executor.execute 包装后的任务。
   队列满时把任务标记 FAILED 或直接抛出明确异常。
4. 执行包装逻辑：
   开始时标记 RUNNING 和 startedAt。
   调用具体 JobHandler。
   成功标记 SUCCEEDED 和 finishedAt。
   异常标记 FAILED，保存错误信息。
5. 监控接口：
   activeCount、poolSize、queueSize、completedTaskCount。
   按状态统计 Job 数量。
6. 并发测试：
   批量提交 1000 个短任务。
   等待最终完成。
   断言线程池大小没有超过 maximumPoolSize。
   断言每个任务最终为 SUCCEEDED 或 FAILED。

// 线程池配置片段
ThreadPoolExecutor executor = new ThreadPoolExecutor(
        4,
        8,
        60,
        TimeUnit.SECONDS,
        new ArrayBlockingQueue<>(500),
        new ThreadPoolExecutor.AbortPolicy()
);

// 监控读取片段
Map<String, Object> metrics = Map.of(
        "activeCount", executor.getActiveCount(),
        "poolSize", executor.getPoolSize(),
        "queueSize", executor.getQueue().size(),
        "completedTaskCount", executor.getCompletedTaskCount()
);`,
    checks: [
      "是否使用受控线程池，而不是每个任务都 new Thread。",
      "线程池队列是否有容量限制，队列满时有明确处理。",
      "任务状态是否从排队、运行到成功或失败完整流转。",
      "任务执行异常是否被捕获并保存到任务记录。",
      "监控接口是否能看到线程池和任务状态统计。",
      "批量提交 1000 个任务后，线程数量是否仍受最大线程数限制。",
      "应用关闭时是否调用 shutdown，并等待正在执行的任务完成。"
    ],
    commonMistakes: [
      "线程越多越快的误解，结果上下文切换和内存占用把系统拖慢。",
      "使用无界队列，流量高时内存持续上涨直到崩溃。",
      "任务抛异常后没有捕获，状态永远停在 RUNNING。",
      "用普通 int 在多线程里统计数量，出现并发安全问题。",
      "没有拒绝策略，队列满时调用方只看到模糊异常。",
      "只看平均耗时，不看失败数、队列长度和最大耗时。",
      "测试只提交几个任务，完全没有暴露并发下的问题。"
    ],
    sources: [
      {
        title: "Oracle Java SE 21 API: ThreadPoolExecutor",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html"
      },
      {
        title: "Oracle Java SE 21 API: ExecutorService",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ExecutorService.html"
      },
      {
        title: "Oracle Java SE 21 API: BlockingQueue",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/BlockingQueue.html"
      },
      {
        title: "Spring Boot Reference: Actuator",
        url: "https://docs.spring.io/spring-boot/reference/actuator/index.html"
      }
    ]
  },
  {
    id: "level13-9-capstone-backend-service",
    title: "毕业项目：完整后端服务",
    subtitle: "设计、开发、部署、复盘",
    intro: [
      "毕业项目不是再做一个孤立练习，而是把你已经学过的 Java、测试、文件、数据库、REST、权限、异步、并发、部署全部收束成一个完整后端服务。它可以是学习平台、个人财务系统、团队任务协作工具，或者你自己真正想长期维护的小产品。",
      "完整后端服务至少要有清楚的业务边界。建议选择一个主业务对象，例如 Project、Task、Article、Order 或 Course，再围绕它设计用户、权限、操作日志、通知和统计。不要一开始就做十几个模块，先把一个核心闭环做扎实。",
      "项目说明书要包含需求、数据模型、接口清单、权限矩阵、错误码、测试计划、部署方式和复盘记录。写这些文档不是形式主义，它会逼你把模糊想法变成可以开发、可以测试、可以交付的任务。",
      "毕业项目的答案不应该是一份上千行代码，而是一套可执行蓝图：目录怎么分，接口怎么定，数据怎么存，如何测试，如何用 Docker 运行，如何用 GitHub Actions 自动检查。你完成它，就真正跨过了“只会写题”到“能独立做后端”的门槛。"
    ],
    syntax: [
      "需求范围：先定义一个核心业务闭环，例如用户创建任务、分配任务、完成任务、收到通知。",
      "数据模型：画出核心表、字段、关系和唯一约束，明确哪些字段可为空。",
      "接口合同：为每个 REST 接口写方法、路径、请求体、响应体、状态码和错误码。",
      "权限矩阵：列出匿名用户、普通用户、管理员分别能访问哪些接口。",
      "分层架构：Controller、Service、Repository、Domain、DTO、Config、Exception 分目录组织。",
      "质量保障：单元测试覆盖业务规则，接口测试覆盖状态码，集成测试覆盖数据库交互。",
      "部署交付：提供 Dockerfile、环境变量说明、健康检查和数据库迁移策略。",
      "持续集成：GitHub Actions 至少执行编译、测试和构建镜像或构建包。",
      "复盘改进：记录已完成能力、未完成取舍、技术债和下一步计划。"
    ],
    exampleCode: `// 推荐目录结构
src/main/java/com/example/capstone
  CapstoneApplication.java
  user/
    User.java
    UserRepository.java
    UserService.java
    UserController.java
  task/
    Task.java
    TaskRepository.java
    TaskService.java
    TaskController.java
    dto/
  notification/
    Notification.java
    NotificationWorker.java
  security/
    SecurityConfig.java
    CurrentUser.java
  common/
    ApiError.java
    GlobalExceptionHandler.java
    PageResponse.java

src/test/java/com/example/capstone
  task/TaskServiceTest.java
  task/TaskControllerTest.java
  security/SecurityAccessTest.java`,
    task: "完成一个完整后端服务毕业项目。你可以选择“团队任务协作系统”作为题目：用户注册登录，创建项目，创建任务，分配负责人，修改任务状态，管理员管理用户，任务完成后异步发送通知。要求提供 README、接口文档、数据库表设计、测试、Dockerfile 和 GitHub Actions 工作流。",
    starterCode: `# README.md 建议大纲
1. 项目名称和目标用户
2. 核心需求列表
3. 数据模型
4. REST API 清单
5. 权限矩阵
6. 本地启动方式
7. 测试命令
8. Docker 运行方式
9. 部署和环境变量
10. 复盘记录

# 最小模块
- user：注册、登录、当前用户、管理员禁用用户
- project：创建项目、成员列表
- task：创建任务、分配负责人、修改状态、分页查询
- notification：任务完成后异步通知
- common：统一错误、分页响应、审计日志

# 验收命令
mvn test
docker build -t capstone-backend .
docker run --rm -p 8080:8080 capstone-backend`,
    answerCode: `// 毕业项目结构化实现蓝图

一、需求
1. 用户可以注册、登录、查看自己的信息。
2. 登录用户可以创建项目，并邀请成员。
3. 项目成员可以创建任务、分配负责人、修改任务状态。
4. 任务状态从 TODO -> IN_PROGRESS -> DONE，非法流转返回 400。
5. 管理员可以分页查询用户、禁用用户。
6. 任务完成后创建通知，后台异步发送。
7. 所有写操作记录审计日志。

二、数据模型
User(id, username, passwordHash, role, enabled, createdAt)
Project(id, name, ownerId, createdAt)
ProjectMember(id, projectId, userId, role)
Task(id, projectId, title, description, assigneeId, status, dueDate, createdAt, updatedAt)
Notification(id, userId, channel, content, status, attempts, nextRetryAt)
AuditLog(id, actorId, action, targetType, targetId, success, createdAt)

三、接口清单
POST /api/auth/register
POST /api/auth/login
GET /api/me
POST /api/projects
GET /api/projects
POST /api/projects/{projectId}/members
POST /api/projects/{projectId}/tasks
GET /api/projects/{projectId}/tasks?page=0&size=20
PATCH /api/tasks/{taskId}/status
GET /api/admin/users
PATCH /api/admin/users/{userId}/disable

四、权限矩阵
匿名用户：注册、登录。
普通用户：查看自己、创建项目、管理自己参与项目内的任务。
项目拥有者：邀请成员、移除成员、修改项目设置。
管理员：用户分页、禁用用户、查看审计日志。

五、测试计划
UserServiceTest：注册重名失败、密码哈希保存。
TaskServiceTest：任务状态合法流转、非法流转失败、非项目成员不能修改。
TaskControllerTest：创建任务返回 201，未登录返回 401，越权返回 403。
NotificationWorkerTest：完成任务后通知最终 SENT 或 FAILED。
SecurityAccessTest：ADMIN 和 USER 访问管理接口结果不同。

六、交付文件
README.md：说明需求、启动、测试、部署、环境变量。
Dockerfile：使用 JDK 构建 jar，再用 JRE 镜像运行。
.github/workflows/ci.yml：push 和 pull_request 时执行 mvn test。
application.yml：按 profile 区分 local、test、prod。
docs/api.md：接口请求和响应示例。
docs/schema.md：数据表和关系说明。

七、完成标准
mvn test 通过。
docker build 成功。
docker run 后 /actuator/health 返回 UP。
README 中的接口示例可以用 curl 跑通。
复盘文档写清楚已完成、取舍、风险和下一步。`,
    checks: [
      "README 是否清楚说明项目目标、启动方式、测试命令和部署方式。",
      "是否有完整数据模型和接口清单，而不是边写边猜。",
      "是否实现认证、权限、分页、统一错误、审计日志和异步通知。",
      "核心业务是否有单元测试、接口测试和安全访问测试。",
      "Dockerfile 是否能构建并运行服务，配置是否通过环境变量注入。",
      "GitHub Actions 是否在提交时自动执行测试。",
      "项目复盘是否写明已完成内容、未完成取舍、风险和下一步计划。"
    ],
    commonMistakes: [
      "毕业项目范围过大，一开始就想做所有功能，最后核心闭环没有跑通。",
      "没有接口文档，前端或测试只能读代码猜请求格式。",
      "权限只做了登录，没有区分项目成员、拥有者和管理员。",
      "测试只覆盖正常路径，不覆盖 400、401、403、404 等错误场景。",
      "Dockerfile 依赖本机路径或本机配置，换环境就无法启动。",
      "CI 只做打包不跑测试，坏代码仍然能被合并。",
      "项目完成后不复盘，下一次项目继续重复同样的设计和排期问题。"
    ],
    sources: [
      {
        title: "Spring Boot Reference Documentation",
        url: "https://docs.spring.io/spring-boot/reference/"
      },
      {
        title: "Spring Security Reference",
        url: "https://docs.spring.io/spring-security/reference/"
      },
      {
        title: "Spring Data JPA Reference",
        url: "https://docs.spring.io/spring-data/jpa/reference/"
      },
      {
        title: "Docker Docs: Dockerfile Reference",
        url: "https://docs.docker.com/reference/dockerfile/"
      },
      {
        title: "GitHub Docs: Workflow syntax for GitHub Actions",
        url: "https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions"
      },
      {
        title: "Spring Boot Reference: Actuator",
        url: "https://docs.spring.io/spring-boot/reference/actuator/index.html"
      }
    ]
  }
];
