window.LESSON_CONTENT_LEVEL7 = [
  {
    id: "level7-1-file-read-write",
    title: "文件读写",
    subtitle: "Path、Files",
    intro: [
      "程序运行时，变量里的数据会随着程序结束而消失。文件让数据可以留在磁盘上，下次程序启动时还能读回来。真实开发里，配置、日志、导入导出、缓存、上传文件，都会碰到文件读写。",
      "`Path` 表示一个文件或目录的位置，像是“地址”；`Files` 提供读、写、复制、删除、判断是否存在等操作，像是“工具箱”。初学阶段先把这两个入口用熟，就能完成很多日常文件任务。",
      "读写文本文件时，要关心两件事：内容和编码。内容是你想保存的文字，编码决定文字怎样变成字节。为了减少乱码，示例里会明确使用 `StandardCharsets.UTF_8`。",
      "文件操作可能失败，比如路径不存在、没有权限、文件正在被占用。Java 会用 `IOException` 提醒你处理这些情况。本课先用 `throws IOException` 让示例保持清楚，后面真实项目里通常会结合日志和错误提示处理。"
    ],
    syntax: [
      "`Path.of(\"note.txt\")` 创建一个指向当前目录下 note.txt 的 Path。",
      "`Files.writeString(path, text, charset)` 把字符串写入文本文件，默认会覆盖旧内容。",
      "`Files.readString(path, charset)` 一次性读取整个文本文件，适合小文件。",
      "`Files.readAllLines(path, charset)` 按行读取文本，返回 `List<String>`。",
      "`Files.exists(path)` 判断路径是否存在，常用于读文件前的检查。",
      "`Files.createDirectories(dir)` 创建目录，父目录不存在时也会一起创建。",
      "`StandardOpenOption.APPEND` 可以让写入变成追加，而不是覆盖。",
      "文件读写常见异常是 `IOException`，方法里可以先写 `throws IOException`。"
    ],
    exampleCode: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws IOException {
        Path file = Path.of("level7-note.txt");
        String lineBreak = System.lineSeparator();

        Files.writeString(file, "第一行：学习文件读写" + lineBreak, StandardCharsets.UTF_8);
        Files.writeString(file, "第二行：使用 Path 和 Files" + lineBreak,
                StandardCharsets.UTF_8,
                java.nio.file.StandardOpenOption.APPEND);

        String content = Files.readString(file, StandardCharsets.UTF_8);
        System.out.println("文件内容：");
        System.out.println(content);

        Files.deleteIfExists(file);
    }
}`,
    task: "补全程序：创建 data 目录，在里面写入 study.txt。第一行写“今日主题：文件读写”，第二行写“工具：Path 和 Files”。然后读取整个文件并输出。要求明确使用 UTF-8。",
    starterCode: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws IOException {
        Path dir = Path.of("data");
        Path file = dir.resolve("study.txt");

        // TODO: 创建 data 目录
        // TODO: 写入两行文本，使用 UTF-8
        // TODO: 读取整个文件并输出
    }
}`,
    answerCode: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws IOException {
        Path dir = Path.of("data");
        Path file = dir.resolve("study.txt");
        String lineBreak = System.lineSeparator();

        Files.createDirectories(dir);

        String text = "今日主题：文件读写" + lineBreak
                + "工具：Path 和 Files" + lineBreak;
        Files.writeString(file, text, StandardCharsets.UTF_8);

        String content = Files.readString(file, StandardCharsets.UTF_8);
        System.out.println(content);
    }
}`,
    checks: [
      "是否使用 `Path` 表示目录和文件位置。",
      "是否用 `resolve()` 把目录和文件名组合起来。",
      "是否调用 `Files.createDirectories()` 创建 data 目录。",
      "是否用 `Files.writeString()` 写入文本。",
      "写入和读取时是否都明确使用 `StandardCharsets.UTF_8`。",
      "最终输出是否包含两行指定内容。"
    ],
    commonMistakes: [
      "只创建了 `Path`，却没有真正调用 `Files.writeString()` 写文件。",
      "直接写 `data/study.txt`，但没有先创建 data 目录，导致运行时报错。",
      "写入时覆盖了前一行，误以为会自动追加。",
      "读写时不指定字符集，在不同电脑上可能出现乱码或结果不一致。",
      "把 `Path` 当成文件内容来输出，只看到路径字符串，没有读到文件。",
      "忽略 `IOException`，导致编译器提示必须捕获或声明异常。"
    ],
    sources: [
      {
        title: "Dev.java: The Java I/O API",
        url: "https://dev.java/learn/java-io/"
      },
      {
        title: "Oracle Java Tutorials: File I/O Featuring NIO.2",
        url: "https://docs.oracle.com/javase/tutorial/essential/io/fileio.html"
      },
      {
        title: "Oracle Java SE 21 API: Path",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Path.html"
      },
      {
        title: "Oracle Java SE 21 API: Files",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html"
      }
    ]
  },
  {
    id: "level7-2-charsets-encoding",
    title: "字符集与编码",
    subtitle: "UTF-8 和乱码",
    intro: [
      "电脑最终保存的是字节，不是“你好”这样的文字。字符集和编码负责规定：一个字符怎样变成字节，字节又怎样还原成字符。这个规则用错了，肉眼看到的结果就可能变成乱码。",
      "UTF-8 是现在最常用的编码之一，能表示中文、英文、符号等大量字符。真实项目里，源代码、配置文件、接口响应、数据库连接，通常都会明确约定使用 UTF-8。",
      "乱码常常不是写入那一刻发生的，而是“写入用一种编码，读取用另一种编码”。同一串字节，如果按错误规则解释，就会显示出奇怪字符。",
      "Java 提供了 `StandardCharsets`，让你不用手写 `\"UTF-8\"` 这种字符串。这样既减少拼写错误，也能让代码清楚表达“这里就是按 UTF-8 处理”。"
    ],
    syntax: [
      "`StandardCharsets.UTF_8` 表示 UTF-8 编码，推荐优先使用。",
      "`text.getBytes(StandardCharsets.UTF_8)` 把字符串编码成字节数组。",
      "`new String(bytes, StandardCharsets.UTF_8)` 把字节数组按 UTF-8 解码成字符串。",
      "`Files.writeString(path, text, StandardCharsets.UTF_8)` 按指定编码写文本文件。",
      "`Files.readString(path, StandardCharsets.UTF_8)` 按指定编码读文本文件。",
      "`String.length()` 统计的是 UTF-16 代码单元数量，不等于 UTF-8 字节数。",
      "网络、文件、数据库之间传文本时，发送方和接收方要约定同一种编码。",
      "不要依赖平台默认编码，尤其是课程、脚本、服务器会在不同机器上运行时。"
    ],
    exampleCode: `import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) {
        String text = "你好 Java";

        byte[] utf8Bytes = text.getBytes(StandardCharsets.UTF_8);
        String right = new String(utf8Bytes, StandardCharsets.UTF_8);
        String wrong = new String(utf8Bytes, StandardCharsets.ISO_8859_1);

        System.out.println("原文：" + text);
        System.out.println("字符长度：" + text.length());
        System.out.println("UTF-8 字节数：" + utf8Bytes.length);
        System.out.println("正确解码：" + right);
        System.out.println("错误解码示例：" + wrong);
    }
}`,
    task: "补全程序：把 text 按 UTF-8 转成字节数组，输出字节数；再按 UTF-8 解码回来，输出解码结果；最后把 text 写入 utf8-demo.txt 并读取出来。要求所有转换和文件读写都显式使用 UTF-8。",
    starterCode: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws IOException {
        String text = "Java 编码练习";
        Path file = Path.of("utf8-demo.txt");

        // TODO: 使用 UTF-8 把 text 转成 byte[]
        // TODO: 输出 UTF-8 字节数
        // TODO: 使用 UTF-8 把 byte[] 解码回字符串
        // TODO: 使用 UTF-8 写入并读取文件
    }
}`,
    answerCode: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) throws IOException {
        String text = "Java 编码练习";
        Path file = Path.of("utf8-demo.txt");

        byte[] bytes = text.getBytes(StandardCharsets.UTF_8);
        System.out.println("UTF-8 字节数：" + bytes.length);

        String decoded = new String(bytes, StandardCharsets.UTF_8);
        System.out.println("解码结果：" + decoded);

        Files.writeString(file, text, StandardCharsets.UTF_8);
        String fromFile = Files.readString(file, StandardCharsets.UTF_8);
        System.out.println("文件内容：" + fromFile);
    }
}`,
    checks: [
      "是否导入并使用 `StandardCharsets.UTF_8`。",
      "是否调用 `getBytes(StandardCharsets.UTF_8)` 得到字节数组。",
      "是否用 `new String(bytes, StandardCharsets.UTF_8)` 正确解码。",
      "是否输出 UTF-8 字节数，而不是只输出字符长度。",
      "文件写入和读取是否都显式指定 UTF-8。",
      "最终读取出的文件内容是否仍然是 Java 编码练习。"
    ],
    commonMistakes: [
      "把字符长度当成字节数，中文在 UTF-8 中通常占多个字节。",
      "写入时用 UTF-8，读取时没有指定编码，结果在别的机器上可能不同。",
      "手写 `\"UTF8\"`、`\"utf_8\"` 等字符串，增加拼写和兼容风险。",
      "看到乱码就怀疑 Java 字符串坏了，实际常常是解码规则不一致。",
      "把二进制文件当文本用 `readString()` 读取，可能得到无意义内容。",
      "在网络接口中只处理正文，不检查响应头里的 charset 信息。"
    ],
    sources: [
      {
        title: "Oracle Java SE 21 API: StandardCharsets",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/charset/StandardCharsets.html"
      },
      {
        title: "Oracle Java SE 21 API: Charset",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/charset/Charset.html"
      },
      {
        title: "Oracle Java SE 21 API: String",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html"
      },
      {
        title: "Oracle Java SE 21 API: Files",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html"
      }
    ]
  },
  {
    id: "level7-3-nio-basics",
    title: "NIO 基础",
    subtitle: "更现代的文件 API",
    intro: [
      "你会在 Java 资料里看到 I/O、NIO、NIO.2 这些名字。初学阶段不用被名词吓住：在文件系统这块，现代 Java 最常用的入口就是 `java.nio.file` 包里的 `Path` 和 `Files`。",
      "NIO 的文件 API 比旧的 `java.io.File` 更清楚。`Path` 只负责表达路径，`Files` 负责真正操作文件，很多方法名也直接说明动作：copy、move、delete、list、walk。",
      "真实开发中，经常要组合路径、创建目录、复制文件、移动文件、遍历目录。只会读写一个固定文件还不够，能把这些操作串起来，才更接近日常工具脚本和后端文件处理。",
      "需要注意的是，`Files.list()`、`Files.walk()` 会打开底层资源，返回的是 Stream。用完以后要关闭，最常见写法是 try-with-resources。"
    ],
    syntax: [
      "`base.resolve(\"logs/app.log\")` 在基础目录下拼出子路径。",
      "`path.normalize()` 清理路径里的多余 `.` 和 `..` 片段。",
      "`Files.createDirectories(path)` 创建多级目录，目录已存在时通常不会报错。",
      "`Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING)` 复制文件并允许覆盖。",
      "`Files.move(source, target, StandardCopyOption.REPLACE_EXISTING)` 移动或重命名文件。",
      "`Files.list(dir)` 列出目录下一层内容，返回 `Stream<Path>`。",
      "`Files.isRegularFile(path)` 判断是否是普通文件，`Files.isDirectory(path)` 判断是否是目录。",
      "对返回 Stream 的文件遍历操作，推荐用 try-with-resources 自动关闭。"
    ],
    exampleCode: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        Path workspace = Files.createTempDirectory("nio-demo-");
        Path logDir = workspace.resolve("logs");
        Path source = logDir.resolve("app.log");
        Path target = workspace.resolve("backup").resolve("app-copy.log");

        Files.createDirectories(logDir);
        Files.createDirectories(target.getParent());
        Files.writeString(source, "INFO 应用启动", StandardCharsets.UTF_8);
        Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);

        try (Stream<Path> paths = Files.list(workspace)) {
            paths.forEach(path -> System.out.println(path.getFileName()));
        }
    }
}`,
    task: "补全程序：创建一个临时工作目录，在 reports 目录下写入 today.txt，再把它复制到 archive/today-copy.txt。最后列出临时工作目录下一层内容。要求使用 `resolve()` 组合路径，并用 try-with-resources 关闭 `Files.list()` 返回的 Stream。",
    starterCode: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        Path workspace = Files.createTempDirectory("nio-task-");

        // TODO: 用 resolve 创建 reports/today.txt
        // TODO: 用 resolve 创建 archive/today-copy.txt
        // TODO: 创建需要的目录
        // TODO: 写入源文件，并复制到目标文件
        // TODO: 列出 workspace 下一层内容
    }
}`,
    answerCode: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        Path workspace = Files.createTempDirectory("nio-task-");

        Path report = workspace.resolve("reports").resolve("today.txt");
        Path copy = workspace.resolve("archive").resolve("today-copy.txt");

        Files.createDirectories(report.getParent());
        Files.createDirectories(copy.getParent());

        Files.writeString(report, "今日报告：NIO 文件操作", StandardCharsets.UTF_8);
        Files.copy(report, copy, StandardCopyOption.REPLACE_EXISTING);

        try (Stream<Path> paths = Files.list(workspace)) {
            paths.forEach(path -> System.out.println(path.getFileName()));
        }
    }
}`,
    checks: [
      "是否使用 `Files.createTempDirectory()` 创建临时工作目录。",
      "是否通过 `resolve()` 组合 reports 和 archive 下的文件路径。",
      "是否使用 `Files.createDirectories()` 创建父目录。",
      "是否使用 `Files.copy()` 复制文件，并处理已存在目标的情况。",
      "是否用 `Files.list()` 列出目录内容。",
      "是否用 try-with-resources 关闭 `Stream<Path>`。"
    ],
    commonMistakes: [
      "把字符串路径手动拼接成 `base + \"/reports\"`，在不同系统上不够稳妥。",
      "忘记创建目标文件的父目录，复制时提示目录不存在。",
      "调用 `Files.list()` 后没有关闭 Stream，长时间运行的程序可能积累资源。",
      "把 `copy` 和 `move` 混淆，移动后源文件就不在原位置了。",
      "以为 `Path.normalize()` 会访问磁盘；它只是整理路径文本，不检查文件是否真实存在。",
      "遍历目录时没有区分文件和目录，后续读取时可能对目录调用了文件读取方法。"
    ],
    sources: [
      {
        title: "Dev.java: Accessing Resources using Paths",
        url: "https://dev.java/learn/java-io/file-system/file-path/"
      },
      {
        title: "Oracle Java Tutorials: Path Operations",
        url: "https://docs.oracle.com/javase/tutorial/essential/io/pathOps.html"
      },
      {
        title: "Oracle Java SE 21 API: Files",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/Files.html"
      },
      {
        title: "Oracle Java SE 21 API: StandardCopyOption",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/file/StandardCopyOption.html"
      }
    ]
  },
  {
    id: "level7-4-json-processing",
    title: "JSON 处理",
    subtitle: "对象和文本互转",
    intro: [
      "JSON 是后端、前端、移动端、第三方接口之间非常常见的数据格式。它本质上是一段文本，但有固定结构：对象用大括号，数组用中括号，字段名通常用双引号包住。",
      "Java SE 标准库没有内置通用 JSON 库。也就是说，不能像使用 `String`、`List` 那样直接在纯 Java SE 里调用一个官方内置的 JSON 对象映射工具。",
      "真实项目里，常见选择是 Jackson、Gson、Jakarta JSON-P 或 Jakarta JSON-B。Jackson 和 Gson 常用于对象和 JSON 文本互转；Jakarta JSON-P 更偏向按 JSON 结构读取、生成和处理。",
      "本课为了保持单文件 `Main` 可运行，不引入第三方依赖，只做一个受控格式的小示范：从简单 JSON 文本里取字段，再把变量拼成 JSON 文本。请记住，这不是完整解析器，真实项目不要靠手写字符串处理复杂 JSON。"
    ],
    syntax: [
      "JSON 对象形如 `{ \"name\": \"小林\", \"score\": 95 }`，字段名和值之间用冒号。",
      "字符串值要用双引号，数字和 boolean 值通常不加引号。",
      "JSON 数组形如 `[1, 2, 3]`，常用于列表数据。",
      "Java SE 没有内置通用 JSON 解析和对象映射库，项目里通常要添加依赖。",
      "Jackson 常见入口是 `ObjectMapper`，Gson 常见入口是 `Gson`。",
      "Jakarta JSON-P 提供 `JsonReader`、`JsonObject`、`JsonWriter` 等 API。",
      "手写拼接 JSON 时，至少要处理双引号和反斜杠等转义问题。",
      "简单字符串查找只能用于受控练习，不能处理真实接口里的嵌套、数组、空值和转义。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        String json = """
                {"name":"小林","score":95,"active":true}
                """.strip();

        String name = readStringField(json, "name");
        int score = readIntField(json, "score");

        System.out.println("姓名：" + name);
        System.out.println("分数：" + score);

        String created = toJson("小周", 88, true);
        System.out.println("生成 JSON：" + created);
    }

    static String readStringField(String json, String field) {
        char quote = 34;
        String marker = quote + field + quote + ":" + quote;
        int start = json.indexOf(marker);
        if (start < 0) {
            return "";
        }
        start += marker.length();
        int end = json.indexOf(quote, start);
        if (end < 0) {
            return "";
        }
        return json.substring(start, end);
    }

    static int readIntField(String json, String field) {
        char quote = 34;
        String marker = quote + field + quote + ":";
        int start = json.indexOf(marker);
        if (start < 0) {
            return 0;
        }
        start += marker.length();
        int end = start;
        while (end < json.length() && Character.isDigit(json.charAt(end))) {
            end++;
        }
        if (end == start) {
            return 0;
        }
        return Integer.parseInt(json.substring(start, end));
    }

    static String toJson(String name, int score, boolean active) {
        char quote = 34;
        return "{"
                + quote + "name" + quote + ":" + quote + escapeJson(name) + quote
                + "," + quote + "score" + quote + ":" + score
                + "," + quote + "active" + quote + ":" + active
                + "}";
    }

    static String escapeJson(String text) {
        StringBuilder result = new StringBuilder();
        char quote = 34;
        char slash = 92;
        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            if (ch == quote || ch == slash) {
                result.append(slash);
            }
            result.append(ch);
        }
        return result.toString();
    }
}`,
    task: "补全程序：从给定 JSON 文本中读取 city 和 temperature，并输出“杭州 26℃”；再把变量 city、temperature、ok 生成一个新的 JSON 文本。提醒：这里只处理课程给出的简单格式，真实项目请使用 Jackson、Gson 或 Jakarta JSON-P 等库。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        String json = """
                {"city":"杭州","temperature":26,"ok":true}
                """.strip();

        // TODO: 使用 readStringField 读取 city
        // TODO: 使用 readIntField 读取 temperature
        // TODO: 输出城市和温度
        // TODO: 使用 toJson 生成新的 JSON 文本并输出
    }

    static String readStringField(String json, String field) {
        // TODO: 只处理形如 "field":"value" 的简单片段
        return "";
    }

    static int readIntField(String json, String field) {
        // TODO: 只处理形如 "field":123 的简单片段
        return 0;
    }

    static String toJson(String city, int temperature, boolean ok) {
        // TODO: 生成简单 JSON 文本
        return "";
    }

    static String escapeJson(String text) {
        // TODO: 转义双引号和反斜杠
        return text;
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        String json = """
                {"city":"杭州","temperature":26,"ok":true}
                """.strip();

        String city = readStringField(json, "city");
        int temperature = readIntField(json, "temperature");
        boolean ok = true;

        System.out.println(city + " " + temperature + "℃");

        String created = toJson(city, temperature, ok);
        System.out.println(created);
    }

    static String readStringField(String json, String field) {
        char quote = 34;
        String marker = quote + field + quote + ":" + quote;
        int start = json.indexOf(marker);
        if (start < 0) {
            return "";
        }
        start += marker.length();
        int end = json.indexOf(quote, start);
        if (end < 0) {
            return "";
        }
        return json.substring(start, end);
    }

    static int readIntField(String json, String field) {
        char quote = 34;
        String marker = quote + field + quote + ":";
        int start = json.indexOf(marker);
        if (start < 0) {
            return 0;
        }
        start += marker.length();
        int end = start;
        while (end < json.length() && Character.isDigit(json.charAt(end))) {
            end++;
        }
        if (end == start) {
            return 0;
        }
        return Integer.parseInt(json.substring(start, end));
    }

    static String toJson(String city, int temperature, boolean ok) {
        char quote = 34;
        return "{"
                + quote + "city" + quote + ":" + quote + escapeJson(city) + quote
                + "," + quote + "temperature" + quote + ":" + temperature
                + "," + quote + "ok" + quote + ":" + ok
                + "}";
    }

    static String escapeJson(String text) {
        StringBuilder result = new StringBuilder();
        char quote = 34;
        char slash = 92;
        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            if (ch == quote || ch == slash) {
                result.append(slash);
            }
            result.append(ch);
        }
        return result.toString();
    }
}`,
    checks: [
      "是否说明并记住 Java SE 没有内置通用 JSON 库。",
      "是否能从简单 JSON 文本中读取 city 字符串字段。",
      "是否能从简单 JSON 文本中读取 temperature 整数字段。",
      "是否输出了“杭州 26℃”。",
      "生成 JSON 时字符串字段是否带双引号，数字和 boolean 是否不加引号。",
      "是否至少处理了双引号和反斜杠的转义问题。",
      "是否没有把这个练习里的简易方法误当成真实项目解析器。"
    ],
    commonMistakes: [
      "以为 Java SE 自带 `JSONObject` 或 `ObjectMapper`，其实常见 JSON 工具通常来自外部依赖。",
      "用普通字符串拼接 JSON，却没有考虑字段值里可能出现双引号。",
      "把数字和 boolean 都加上引号，导致数据类型从 number、boolean 变成 string。",
      "用 `split(\",\")` 解析真实 JSON，一遇到嵌套对象、数组或字符串里的逗号就会错。",
      "忘记真实接口可能有空值、缺字段、字段顺序变化和多余空白。",
      "把 JSON 当成 JavaScript 对象直接写进 Java，忽略它在 Java 中只是字符串文本。"
    ],
    sources: [
      {
        title: "Jakarta JSON Processing",
        url: "https://jakarta.ee/specifications/jsonp/"
      },
      {
        title: "Jakarta EE Tutorial: JSON Processing",
        url: "https://jakarta.ee/learn/docs/jakartaee-tutorial/current/web/jsonp/jsonp.html"
      },
      {
        title: "Google Gson User Guide",
        url: "https://github.com/google/gson/blob/main/UserGuide.md"
      },
      {
        title: "Jackson Databind README",
        url: "https://github.com/FasterXML/jackson-databind"
      }
    ]
  },
  {
    id: "level7-5-http-client",
    title: "HTTP Client",
    subtitle: "请求外部接口",
    intro: [
      "很多 Java 程序不是孤岛。它们需要请求天气接口、支付接口、登录服务、搜索服务，或者访问公司内部的其他系统。HTTP Client 就是让 Java 主动发起 HTTP 请求的工具。",
      "从 Java 11 开始，标准库提供了 `java.net.http.HttpClient`。它可以创建请求、发送请求、接收响应，不再需要初学者一上来就依赖第三方 HTTP 工具。",
      "一次 HTTP 调用通常包括三部分：请求地址、请求方法和响应处理。地址是 URI，方法常见有 GET、POST，响应里最先要看的通常是状态码和响应体。",
      "真实项目里，HTTP 请求还要考虑超时、认证、请求头、JSON 序列化、错误状态码、重试和日志。本课先掌握最小闭环：创建 client，构造 request，发送并读取 response。"
    ],
    syntax: [
      "`HttpClient.newHttpClient()` 创建一个默认 HTTP 客户端。",
      "`HttpRequest.newBuilder(URI.create(url))` 开始构造请求。",
      "`.GET()` 表示发送 GET 请求，适合读取资源。",
      "`.header(name, value)` 添加请求头，例如 Accept 或 Content-Type。",
      "`client.send(request, HttpResponse.BodyHandlers.ofString())` 同步发送请求并把响应体读成字符串。",
      "`response.statusCode()` 获取 HTTP 状态码，200 通常表示成功。",
      "`response.body()` 获取响应体文本。",
      "网络请求可能抛出 `IOException` 和 `InterruptedException`，示例里先用 `throws Exception` 简化。"
    ],
    exampleCode: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder(URI.create("https://example.com/"))
                .header("Accept", "text/html")
                .GET()
                .build();

        HttpResponse<String> response = client.send(
                request,
                HttpResponse.BodyHandlers.ofString()
        );

        System.out.println("状态码：" + response.statusCode());
        System.out.println("响应长度：" + response.body().length());
    }
}`,
    task: "补全程序：使用 Java 标准库 HttpClient 请求 https://example.com/。输出状态码、Content-Type 响应头，如果响应体超过 80 个字符，只输出前 80 个字符。网络不可用时真实运行可能失败，但代码结构要完整。",
    starterCode: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        String url = "https://example.com/";

        // TODO: 创建 HttpClient
        // TODO: 创建 GET 请求
        // TODO: 发送请求，响应体按 String 处理
        // TODO: 输出状态码、Content-Type 和正文预览
    }
}`,
    answerCode: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        String url = "https://example.com/";

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder(URI.create(url))
                .header("Accept", "text/html")
                .GET()
                .build();

        HttpResponse<String> response = client.send(
                request,
                HttpResponse.BodyHandlers.ofString()
        );

        String body = response.body();
        String preview = body.length() > 80 ? body.substring(0, 80) : body;
        String contentType = response.headers()
                .firstValue("Content-Type")
                .orElse("未知");

        System.out.println("状态码：" + response.statusCode());
        System.out.println("Content-Type：" + contentType);
        System.out.println("正文预览：" + preview);
    }
}`,
    checks: [
      "是否导入 `java.net.http.HttpClient`、`HttpRequest` 和 `HttpResponse`。",
      "是否使用 `URI.create(url)` 构造请求地址。",
      "是否创建并发送 GET 请求。",
      "是否使用 `HttpResponse.BodyHandlers.ofString()` 把响应体读成字符串。",
      "是否输出 HTTP 状态码。",
      "是否从响应头里读取 Content-Type，并处理缺失情况。",
      "正文预览是否避免在控制台输出过长内容。"
    ],
    commonMistakes: [
      "把 URL 字符串直接传给 builder，不先转换成 `URI`。",
      "忘记调用 `.build()`，只拿到了请求构造器，没有真正创建请求。",
      "只看响应体，不检查状态码，导致 404 或 500 也被当成成功。",
      "网络请求没有考虑异常、超时或代理限制，真实运行时容易卡住或失败。",
      "把所有接口都写死在代码里，真实项目通常会放到配置中。",
      "请求 JSON 接口时忘记设置 Accept 或 Content-Type，服务端可能按不同格式响应。"
    ],
    sources: [
      {
        title: "Oracle Java SE 21 API: Module java.net.http",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/module-summary.html"
      },
      {
        title: "Oracle Java SE 21 API: HttpClient",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpClient.html"
      },
      {
        title: "Oracle Java SE 21 API: HttpRequest",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpRequest.html"
      },
      {
        title: "Oracle Java SE 21 API: HttpResponse",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpResponse.html"
      }
    ]
  },
  {
    id: "level7-6-socket-intro",
    title: "Socket 初识",
    subtitle: "网络通信基础",
    intro: [
      "HTTP 是应用层协议，而 Socket 更接近网络通信的基础工具。你可以把 Socket 理解成程序之间的一条双向通道：一端写出去，另一端读进来。",
      "最常见的 TCP Socket 通信有服务端和客户端。服务端用 `ServerSocket` 监听端口，客户端用 `Socket` 连接这个端口。连接建立后，双方通过输入流和输出流交换数据。",
      "Socket 编程会让你直接面对端口、连接、阻塞读取、关闭资源这些概念。它比普通方法调用更容易出错，但理解它以后，再看 HTTP、数据库连接、消息队列，会更有底层直觉。",
      "为了让练习单文件可运行，本课在同一个 `Main` 里启动一个本机服务端线程，再用客户端连接它。真实项目里，服务端和客户端通常是不同进程，甚至在不同机器上。"
    ],
    syntax: [
      "`new ServerSocket(0)` 创建服务端并让系统分配一个可用端口。",
      "`server.accept()` 等待客户端连接，这是阻塞操作。",
      "`new Socket(\"127.0.0.1\", port)` 连接本机指定端口。",
      "`socket.getInputStream()` 读取对方发来的字节。",
      "`socket.getOutputStream()` 向对方发送字节。",
      "`BufferedReader` 适合按行读取文本，`PrintWriter` 可以方便地按行发送文本。",
      "`try-with-resources` 可以确保 Socket、流和 ServerSocket 用完后关闭。",
      "TCP 是字节流，没有自动消息边界；本课用一行文本和换行符作为简单边界。"
    ],
    exampleCode: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        try (ServerSocket server = new ServerSocket(0)) {
            int port = server.getLocalPort();

            Thread serverThread = new Thread(() -> handleOneClient(server));
            serverThread.start();

            try (Socket client = new Socket("127.0.0.1", port);
                 BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream(), StandardCharsets.UTF_8));
                 PrintWriter out = new PrintWriter(client.getOutputStream(), true, StandardCharsets.UTF_8)) {

                out.println("你好，Socket");
                System.out.println("客户端收到：" + in.readLine());
            }

            serverThread.join();
        }
    }

    static void handleOneClient(ServerSocket server) {
        try (Socket socket = server.accept();
             BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream(), StandardCharsets.UTF_8));
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true, StandardCharsets.UTF_8)) {

            String message = in.readLine();
            out.println("服务端已收到：" + message);
        } catch (IOException e) {
            System.out.println("服务端错误：" + e.getMessage());
        }
    }
}`,
    task: "补全程序：启动本机服务端线程，客户端发送 PING，服务端读取后回复 PONG，客户端输出“客户端收到：PONG”。要求使用 UTF-8 文本流，并正确关闭 Socket 相关资源。",
    starterCode: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        try (ServerSocket server = new ServerSocket(0)) {
            int port = server.getLocalPort();

            Thread serverThread = new Thread(() -> handleOneClient(server));
            serverThread.start();

            // TODO: 创建客户端 Socket 连接 127.0.0.1 和 port
            // TODO: 发送 PING
            // TODO: 读取服务端回复并输出

            serverThread.join();
        }
    }

    static void handleOneClient(ServerSocket server) {
        // TODO: accept 一个连接，读取一行文本
        // TODO: 收到 PING 时回复 PONG
    }
}`,
    answerCode: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        try (ServerSocket server = new ServerSocket(0)) {
            int port = server.getLocalPort();

            Thread serverThread = new Thread(() -> handleOneClient(server));
            serverThread.start();

            try (Socket client = new Socket("127.0.0.1", port);
                 BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream(), StandardCharsets.UTF_8));
                 PrintWriter out = new PrintWriter(client.getOutputStream(), true, StandardCharsets.UTF_8)) {

                out.println("PING");
                String reply = in.readLine();
                System.out.println("客户端收到：" + reply);
            }

            serverThread.join();
        }
    }

    static void handleOneClient(ServerSocket server) {
        try (Socket socket = server.accept();
             BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream(), StandardCharsets.UTF_8));
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true, StandardCharsets.UTF_8)) {

            String message = in.readLine();
            if ("PING".equals(message)) {
                out.println("PONG");
            } else {
                out.println("UNKNOWN");
            }
        } catch (IOException e) {
            System.out.println("服务端错误：" + e.getMessage());
        }
    }
}`,
    checks: [
      "是否创建了 `ServerSocket` 并取得本机端口。",
      "是否启动服务端线程，避免客户端连接时无人 accept。",
      "客户端是否连接 `127.0.0.1` 和服务端端口。",
      "是否用 UTF-8 创建输入输出文本流。",
      "客户端是否发送 PING，服务端是否回复 PONG。",
      "是否输出“客户端收到：PONG”。",
      "Socket、流和 ServerSocket 是否使用 try-with-resources 关闭。"
    ],
    commonMistakes: [
      "先在主线程调用 `accept()`，导致程序一直等客户端，后面的客户端代码永远执行不到。",
      "忘记给 `PrintWriter` 开启自动刷新，发送后对方迟迟读不到一整行。",
      "只写内容不写换行，但另一端使用 `readLine()` 等待换行结束。",
      "客户端连接错端口，或者服务端还没启动就尝试连接。",
      "没有关闭 Socket，短程序问题不明显，长时间运行会占用资源。",
      "把 TCP 当成一次 `println` 对应一次消息；真实 TCP 是字节流，需要自己设计协议边界。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: All About Sockets",
        url: "https://docs.oracle.com/javase/tutorial/networking/sockets/"
      },
      {
        title: "Oracle Java Tutorials: Reading from and Writing to a Socket",
        url: "https://docs.oracle.com/javase/tutorial/networking/sockets/readingWriting.html"
      },
      {
        title: "Oracle Java SE 21 API: Socket",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/Socket.html"
      },
      {
        title: "Oracle Java SE 21 API: ServerSocket",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/ServerSocket.html"
      }
    ]
  }
];
