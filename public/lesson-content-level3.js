window.LESSON_CONTENT_LEVEL3 = [
  {
    id: "level3-1-arrays-intro",
    title: "数组入门",
    subtitle: "用下标管理一组同类型数据",
    intro: [
      "数组适合保存一批类型相同的数据。比如 5 天的步数、一个班的成绩、几件商品的价格，都可以放进同一个数组里。",
      "数组创建后长度固定。它不像后面要学的 List 那样可以随时变长，所以数组更适合数量比较明确的场景。",
      "访问数组元素要用下标。Java 的下标从 0 开始，长度为 5 的数组可以访问 0、1、2、3、4，不能访问 5。",
      "数组经常和循环一起使用。用 for 循环从 0 走到 length - 1，可以稳定地读出每一个元素，也能避免写很多重复代码。"
    ],
    syntax: [
      "声明数组变量：int[] scores;，更推荐把 [] 写在类型后面。",
      "创建指定长度的数组：int[] scores = new int[5];，此时 int 元素默认是 0。",
      "创建并直接给值：int[] scores = {86, 92, 75};，数组长度由元素个数决定。",
      "读取或修改元素：scores[0] 表示第 1 个元素，scores[2] 表示第 3 个元素。",
      "数组长度使用 scores.length 读取，length 不是方法，后面不加括号。",
      "遍历数组常用 for (int i = 0; i < scores.length; i++)，条件通常写小于 length。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        int[] scores = {86, 92, 75, 100};
        int total = 0;

        for (int i = 0; i < scores.length; i++) {
            total += scores[i];
        }

        System.out.println("成绩数量：" + scores.length);
        System.out.println("总分：" + total);
        System.out.println("平均分：" + total / scores.length);
    }
}`,
    task: "补全程序：数组 steps 保存 5 天步数。请用循环计算总步数和平均步数，并输出两行：总步数：34900、平均步数：6980。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int[] steps = {5200, 6800, 7500, 6100, 9300};
        int total = 0;

        // TODO: 用循环累加数组中的每一天步数

        int average = 0;

        System.out.println("总步数：" + total);
        System.out.println("平均步数：" + average);
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        int[] steps = {5200, 6800, 7500, 6100, 9300};
        int total = 0;

        for (int i = 0; i < steps.length; i++) {
            total += steps[i];
        }

        int average = total / steps.length;

        System.out.println("总步数：" + total);
        System.out.println("平均步数：" + average);
    }
}`,
    checks: [
      "是否保留 steps 数组中的 5 个步数。",
      "是否使用循环遍历数组，而不是手写 5 次相加。",
      "循环条件是否使用 i < steps.length。",
      "total 是否累加了每一个数组元素。",
      "average 是否使用 total / steps.length 计算。",
      "输出是否包含总步数：34900 和平均步数：6980。"
    ],
    commonMistakes: [
      "把最后一个下标写成 steps.length，实际最后一个下标是 steps.length - 1。",
      "把 length 写成 length()，数组的 length 是属性，不是方法。",
      "循环从 1 开始，导致漏掉第 0 个元素。",
      "平均值写死成 6980，换一组数组数据后程序就不对了。",
      "忘记在循环里使用 steps[i]，只是在重复累加同一个数字。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: Arrays",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html"
      },
      {
        title: "Java Language Specification 26: Chapter 10. Arrays",
        url: "https://docs.oracle.com/javase/specs/jls/se26/html/jls-10.html"
      },
      {
        title: "Oracle JDK 26 API: Arrays",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html"
      }
    ]
  },
  {
    id: "level3-2-two-dimensional-arrays",
    title: "二维数组",
    subtitle: "用行和列表示表格数据",
    intro: [
      "二维数组可以先理解成表格：第一层下标选中哪一行，第二层下标选中这一行里的哪一列。",
      "二维数组的类型写成 int[][]、String[][] 这样的形式。它本质上是数组里再放数组，所以每一行也有自己的 length。",
      "访问二维数组时要写两个下标，例如 matrix[0][2] 表示第 1 行第 3 列。外层数组的长度是行数，某一行的长度是列数。",
      "Java 的二维数组允许每一行长度不同。初学时可以先练习整齐的表格，但写循环时仍然建议使用 table[row].length 读取当前行长度。"
    ],
    syntax: [
      "创建二维数组：int[][] grid = new int[2][3]; 表示 2 行 3 列。",
      "直接初始化：int[][] grid = {{1, 2, 3}, {4, 5, 6}}。",
      "读取元素：grid[1][0] 读取第 2 行第 1 列。",
      "外层长度 grid.length 表示行数。",
      "内层长度 grid[row].length 表示第 row 行有多少个元素。",
      "遍历二维数组通常使用嵌套循环：外层循环行，内层循环列。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) {
        int[][] seats = {
            {1, 0, 1},
            {0, 1, 1}
        };

        int available = 0;
        for (int row = 0; row < seats.length; row++) {
            for (int col = 0; col < seats[row].length; col++) {
                if (seats[row][col] == 1) {
                    available++;
                }
            }
        }

        System.out.println("可选座位：" + available);
    }
}`,
    task: "补全程序：temperatures 保存两周每天的温度。请分别计算每一周的平均温度，并输出第1周平均温度：19 和 第2周平均温度：23。",
    starterCode: `public class Main {
    public static void main(String[] args) {
        int[][] temperatures = {
            {18, 21, 20},
            {22, 24, 23}
        };

        // TODO: 外层循环遍历每一周
        // TODO: 内层循环累加这一周每天的温度
        // TODO: 输出每一周的平均温度
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) {
        int[][] temperatures = {
            {18, 21, 20},
            {22, 24, 23}
        };

        for (int week = 0; week < temperatures.length; week++) {
            int total = 0;

            for (int day = 0; day < temperatures[week].length; day++) {
                total += temperatures[week][day];
            }

            int average = total / temperatures[week].length;
            System.out.println("第" + (week + 1) + "周平均温度：" + average);
        }
    }
}`,
    checks: [
      "是否使用 int[][] 保存二维数组。",
      "是否使用外层循环遍历周数。",
      "内层循环条件是否使用 temperatures[week].length。",
      "每一周开始计算前是否把 total 重置为 0。",
      "输出周序号时是否把下标 week 转成 week + 1。",
      "是否输出两行平均温度，分别是 19 和 23。"
    ],
    commonMistakes: [
      "只使用 temperatures.length 当作每天数量，忽略了每一行自己的长度。",
      "把 total 写在外层循环外面，导致第 2 周平均值混入第 1 周数据。",
      "访问元素时只写 temperatures[week]，这拿到的是一整行，不是某一天的温度。",
      "把 week + 1 写成 week++，导致循环变量被意外修改。",
      "以为二维数组必须每行一样长，实际 Java 允许不规则二维数组。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: Arrays",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html"
      },
      {
        title: "Java Language Specification 26: Chapter 10. Arrays",
        url: "https://docs.oracle.com/javase/specs/jls/se26/html/jls-10.html"
      }
    ]
  },
  {
    id: "level3-3-list-intro",
    title: "List 入门",
    subtitle: "会按顺序增长的列表",
    intro: [
      "List 是 Java 集合框架里最常用的结构之一。它和数组一样有顺序、能按下标访问，但它的长度可以随着 add 和 remove 改变。",
      "初学时最常见的实现类是 ArrayList。变量类型通常写 List<String>，创建对象时写 new ArrayList<>()，这样代码更依赖接口而不是具体实现。",
      "List 允许重复元素。比如购物清单里可以出现两次“苹果”，因为它记录的是一串有顺序的项目，不负责自动去重。",
      "List 的下标同样从 0 开始。list.get(0) 读取第一个元素，list.size() 返回当前元素数量，注意 size 是方法，要写括号。"
    ],
    syntax: [
      "使用 List 和 ArrayList 需要导入 java.util.List 和 java.util.ArrayList。",
      "创建列表：List<String> names = new ArrayList<>();。",
      "添加元素：names.add(\"小林\");，元素会追加到列表末尾。",
      "读取元素：names.get(0)，下标必须在 0 到 names.size() - 1 之间。",
      "修改元素：names.set(1, \"新值\");，会替换指定位置的元素。",
      "删除元素：names.remove(0) 按下标删除，names.remove(\"小林\") 按内容删除第一个匹配项。"
    ],
    exampleCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> cities = new ArrayList<>();

        cities.add("杭州");
        cities.add("上海");
        cities.add("苏州");
        cities.set(1, "南京");

        System.out.println("城市数量：" + cities.size());
        System.out.println("第一个城市：" + cities.get(0));
        System.out.println(cities);
    }
}`,
    task: "补全程序：创建一个购物清单，依次加入 牛奶、面包、鸡蛋；把第二项改成 全麦面包；删除第一项；最后输出清单数量和剩余每一项。",
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> shoppingList = new ArrayList<>();

        // TODO: 添加三件商品
        // TODO: 修改第二项
        // TODO: 删除第一项

        System.out.println("清单数量：" + shoppingList.size());

        // TODO: 遍历并输出剩余商品
    }
}`,
    answerCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> shoppingList = new ArrayList<>();

        shoppingList.add("牛奶");
        shoppingList.add("面包");
        shoppingList.add("鸡蛋");

        shoppingList.set(1, "全麦面包");
        shoppingList.remove(0);

        System.out.println("清单数量：" + shoppingList.size());

        for (String item : shoppingList) {
            System.out.println(item);
        }
    }
}`,
    checks: [
      "是否导入并使用 List 和 ArrayList。",
      "是否依次 add 牛奶、面包、鸡蛋。",
      "是否使用 set(1, \"全麦面包\") 修改第二项。",
      "是否删除第一项，而不是删除最后一项。",
      "清单数量是否输出 2。",
      "剩余项目是否包含 全麦面包 和 鸡蛋。"
    ],
    commonMistakes: [
      "忘记导入 java.util.List 或 java.util.ArrayList。",
      "把第二项的下标写成 2，实际第二项下标是 1。",
      "写 shoppingList.length，List 要用 shoppingList.size()。",
      "remove(1) 在修改后会删除第二项，不符合删除第一项的任务。",
      "把 ArrayList 写成数组，试图使用 shoppingList[0] 读取元素。"
    ],
    sources: [
      {
        title: "Dev.java: Extending Collection with List",
        url: "https://dev.java/learn/api/collections-framework/lists/"
      },
      {
        title: "Oracle JDK 26 API: List",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html"
      },
      {
        title: "Oracle JDK 26 API: ArrayList",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html"
      }
    ]
  },
  {
    id: "level3-4-set-dedup",
    title: "Set 去重集合",
    subtitle: "只保留不重复的元素",
    intro: [
      "Set 表示一组不重复的元素。向 Set 里添加已经存在的值，不会让集合变大，这让它特别适合做去重。",
      "HashSet 是常见实现，查找和添加通常很快，但它不保证遍历顺序。需要保留加入顺序时，可以使用 LinkedHashSet。",
      "Set 判断两个元素是否重复，通常依赖 equals 和 hashCode。对于 String、Integer 这类常用类型，Java 已经帮你写好了规则。",
      "Set 没有按下标访问的 get(0)。如果你需要下标和重复项，选 List；如果你只关心是否出现过，选 Set。"
    ],
    syntax: [
      "使用 Set 常导入 java.util.Set，具体实现可导入 HashSet 或 LinkedHashSet。",
      "创建集合：Set<String> names = new HashSet<>();。",
      "添加元素：names.add(\"小林\");，返回值表示这次是否真的加入成功。",
      "判断是否存在：names.contains(\"小林\")。",
      "获取数量：names.size()。",
      "遍历 Set 可以使用增强 for，但不要默认 HashSet 的输出顺序等于添加顺序。"
    ],
    exampleCode: `import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<String> tags = new HashSet<>();

        tags.add("Java");
        tags.add("数组");
        tags.add("Java");

        System.out.println("标签数量：" + tags.size());
        System.out.println("是否包含 Java：" + tags.contains("Java"));
    }
}`,
    task: "补全程序：signups 中有重复报名姓名。请使用 Set 去重，并按首次出现的顺序输出有效报名人数和每个姓名。",
    starterCode: `import java.util.LinkedHashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        String[] signups = {"小林", "小王", "小林", "小赵", "小王", "小陈"};
        Set<String> uniqueNames = new LinkedHashSet<>();

        // TODO: 把报名姓名加入 Set

        System.out.println("有效报名人数：" + uniqueNames.size());

        // TODO: 输出去重后的姓名
    }
}`,
    answerCode: `import java.util.LinkedHashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        String[] signups = {"小林", "小王", "小林", "小赵", "小王", "小陈"};
        Set<String> uniqueNames = new LinkedHashSet<>();

        for (String name : signups) {
            uniqueNames.add(name);
        }

        System.out.println("有效报名人数：" + uniqueNames.size());

        for (String name : uniqueNames) {
            System.out.println(name);
        }
    }
}`,
    checks: [
      "是否使用 Set 保存去重后的姓名。",
      "是否使用 LinkedHashSet 保留首次出现的顺序。",
      "是否通过循环把 signups 中的姓名加入 uniqueNames。",
      "有效报名人数是否输出 4。",
      "输出姓名是否没有重复。",
      "输出顺序是否是 小林、小王、小赵、小陈。"
    ],
    commonMistakes: [
      "以为 Set.add 会报错，实际上添加重复元素只是返回 false，集合内容不变。",
      "用 HashSet 后要求固定输出顺序，HashSet 不保证添加顺序。",
      "试图写 uniqueNames.get(0)，Set 没有按下标读取的方法。",
      "先把数组转成 List 再手动判断重复，代码会比 Set 去重更绕。",
      "只统计数组长度 signups.length，得到的是报名次数，不是去重后人数。"
    ],
    sources: [
      {
        title: "Dev.java: Extending Collection with Set, SortedSet and NavigableSet",
        url: "https://dev.java/learn/api/collections-framework/sets/"
      },
      {
        title: "Oracle JDK 26 API: Set",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html"
      },
      {
        title: "Oracle JDK 26 API: HashSet",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html"
      }
    ]
  },
  {
    id: "level3-5-map-intro",
    title: "Map 入门",
    subtitle: "用键找到对应的值",
    intro: [
      "Map 用来保存键和值的对应关系。可以把它想成字典：用一个词查解释，用商品名查库存，用学生名查成绩。",
      "Map 里的键不能重复。对同一个键再次 put 新值，会覆盖旧值；值可以重复，因为不同键可以对应同样的值。",
      "HashMap 是常见实现，查找速度通常很好，但不保证遍历顺序。需要按加入顺序展示时，可以使用 LinkedHashMap。",
      "读取不存在的键时，get 会返回 null。初学时推荐多用 containsKey 或 getOrDefault，避免拿着 null 继续计算导致错误。"
    ],
    syntax: [
      "创建 Map：Map<String, Integer> stock = new HashMap<>();。",
      "写入或更新：stock.put(\"苹果\", 8);。",
      "读取值：stock.get(\"苹果\")。",
      "安全读取默认值：stock.getOrDefault(\"梨\", 0)。",
      "判断键是否存在：stock.containsKey(\"苹果\")。",
      "遍历键值对：for (Map.Entry<String, Integer> entry : stock.entrySet())。"
    ],
    exampleCode: `import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();

        scores.put("小林", 92);
        scores.put("小王", 85);
        scores.put("小林", 96);

        System.out.println("小林成绩：" + scores.get("小林"));
        System.out.println("小赵成绩：" + scores.getOrDefault("小赵", 0));
        System.out.println("记录数量：" + scores.size());
    }
}`,
    task: "补全程序：用 Map 保存库存。苹果 8 个，香蕉 5 个，橙子 3 个；香蕉补货 2 个；查询梨时没有记录就按 0 处理。输出香蕉库存、梨库存和商品种类。",
    starterCode: `import java.util.LinkedHashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> stock = new LinkedHashMap<>();

        // TODO: 添加三种商品库存
        // TODO: 香蕉补货 2 个
        // TODO: 安全读取梨的库存

        System.out.println("香蕉库存：");
        System.out.println("梨库存：");
        System.out.println("商品种类：");
    }
}`,
    answerCode: `import java.util.LinkedHashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> stock = new LinkedHashMap<>();

        stock.put("苹果", 8);
        stock.put("香蕉", 5);
        stock.put("橙子", 3);

        stock.put("香蕉", stock.get("香蕉") + 2);
        int pearCount = stock.getOrDefault("梨", 0);

        System.out.println("香蕉库存：" + stock.get("香蕉"));
        System.out.println("梨库存：" + pearCount);
        System.out.println("商品种类：" + stock.size());
    }
}`,
    checks: [
      "是否使用 Map<String, Integer> 保存库存。",
      "是否 put 苹果、香蕉、橙子三种商品。",
      "香蕉补货后库存是否从 5 变成 7。",
      "查询梨是否使用 getOrDefault 或等价的安全判断。",
      "商品种类是否输出 3。",
      "输出内容是否包含 香蕉库存：7、梨库存：0、商品种类：3。"
    ],
    commonMistakes: [
      "以为 put 同一个键会新增一条记录，实际会覆盖这个键原来的值。",
      "直接对 stock.get(\"梨\") 做加法，缺少键时会拿到 null。",
      "把 containsValue 当成 containsKey 使用，导致判断方向错了。",
      "把商品名和值的位置写反，Map<String, Integer> 的键是 String，值是 Integer。",
      "用 stock.size() 当作所有库存数量总和，size 表示键值对条数。"
    ],
    sources: [
      {
        title: "Dev.java: Using Maps to Store Key Value Pairs",
        url: "https://dev.java/learn/api/collections-framework/maps/"
      },
      {
        title: "Dev.java: Managing the Content of a Map",
        url: "https://dev.java/learn/api/collections-framework/working-with-keys-and-values/"
      },
      {
        title: "Oracle JDK 26 API: Map",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html"
      }
    ]
  },
  {
    id: "level3-6-iteration-traversal",
    title: "迭代与遍历",
    subtitle: "稳定地访问集合里的每个元素",
    intro: [
      "遍历就是把一组数据一个一个访问一遍。数组、List、Set 都经常需要遍历，Map 则通常遍历 keySet、values 或 entrySet。",
      "如果只是读取元素，增强 for 最简单。它写起来接近日常语言：for (String name : names) 表示从 names 里依次取出 name。",
      "如果需要在遍历时删除集合元素，Iterator 更合适。用 iterator.next() 取元素，用 iterator.remove() 删除刚刚取到的元素。",
      "不要在增强 for 遍历 List 时直接调用 list.remove。这样容易触发 ConcurrentModificationException，因为集合结构在遍历器背后被改动了。"
    ],
    syntax: [
      "数组按下标遍历：for (int i = 0; i < arr.length; i++)。",
      "集合只读遍历：for (String item : list)。",
      "获取迭代器：Iterator<String> it = list.iterator();。",
      "Iterator 的基本模式是 while (it.hasNext()) { String item = it.next(); }。",
      "遍历时安全删除当前元素：先 next，再在满足条件时调用 it.remove()。",
      "遍历 Map 键值对常用 entrySet，每个 entry 可以 getKey 和 getValue。"
    ],
    exampleCode: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> tasks = new ArrayList<>(Arrays.asList("预习", "跳过", "练习", "复盘"));
        Iterator<String> iterator = tasks.iterator();

        while (iterator.hasNext()) {
            String task = iterator.next();
            if (task.equals("跳过")) {
                iterator.remove();
            }
        }

        for (String task : tasks) {
            System.out.println(task);
        }
    }
}`,
    task: "补全程序：scores 中低于 60 的分数不通过。请用 Iterator 安全删除不通过分数，再计算通过人数和通过平均分。期望输出通过人数：4 和 通过平均分：82。",
    starterCode: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> scores = new ArrayList<>(Arrays.asList(88, 42, 76, 94, 58, 70));

        Iterator<Integer> iterator = scores.iterator();
        // TODO: 使用 Iterator 删除低于 60 的分数

        int total = 0;
        // TODO: 遍历剩余分数并累加

        System.out.println("通过人数：" + scores.size());
        System.out.println("通过平均分：");
    }
}`,
    answerCode: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> scores = new ArrayList<>(Arrays.asList(88, 42, 76, 94, 58, 70));

        Iterator<Integer> iterator = scores.iterator();
        while (iterator.hasNext()) {
            int score = iterator.next();
            if (score < 60) {
                iterator.remove();
            }
        }

        int total = 0;
        for (int score : scores) {
            total += score;
        }

        System.out.println("通过人数：" + scores.size());
        System.out.println("通过平均分：" + total / scores.size());
    }
}`,
    checks: [
      "是否创建并使用 Iterator<Integer>。",
      "是否在 while 循环中先判断 hasNext 再调用 next。",
      "是否用 iterator.remove() 删除低于 60 的分数。",
      "是否没有在增强 for 中直接调用 scores.remove。",
      "通过人数是否输出 4。",
      "通过平均分是否输出 82。"
    ],
    commonMistakes: [
      "在增强 for 里写 scores.remove(score)，容易触发 ConcurrentModificationException。",
      "调用 iterator.next() 两次，导致跳过元素或读到意料之外的值。",
      "没有调用 hasNext 就直接 next，集合结束时会出错。",
      "删除元素后继续使用原来的下标循环，容易漏删相邻元素。",
      "忘记删除后再统计，导致不通过分数也参与平均值。"
    ],
    sources: [
      {
        title: "Dev.java: Iterating over the Elements of a Collection",
        url: "https://dev.java/learn/api/collections-framework/iterating/"
      },
      {
        title: "Oracle JDK 26 API: Iterator",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html"
      },
      {
        title: "Dev.java: Getting to Know the Collection Hierarchy",
        url: "https://dev.java/learn/api/collections-framework/organization/"
      }
    ]
  },
  {
    id: "level3-7-sorting-comparator",
    title: "排序与比较器",
    subtitle: "告诉 Java 谁应该排在前面",
    intro: [
      "排序是把一组数据按规则重新排列。数字可以从小到大，文本可以按字典顺序，对象也可以按分数、价格、日期等字段排序。",
      "简单类型通常有自然顺序。比如 Integer 的自然顺序是数值从小到大，String 的自然顺序大致按字符编码比较。",
      "当自然顺序不够用时，就需要 Comparator。Comparator 的作用是告诉排序方法：比较两个元素时，哪个应该排在前面。",
      "List 可以调用 sort 方法排序，数组可以使用 Arrays.sort。排序通常会改变原集合或原数组的顺序，所以排序前要确认是否还需要原始顺序。"
    ],
    syntax: [
      "数组排序：Arrays.sort(numbers);。",
      "List 自然排序：names.sort(Comparator.naturalOrder());。",
      "倒序排序：names.sort(Comparator.reverseOrder());。",
      "按长度排序：names.sort(Comparator.comparingInt(String::length));。",
      "多条件排序可以继续 thenComparing，例如先按长度，再按自然顺序。",
      "Comparator 返回负数、0、正数分别表示第一个元素排前、两者同级、第二个元素排前。"
    ],
    exampleCode: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> words = new ArrayList<>(Arrays.asList("java", "list", "map", "array"));

        words.sort(Comparator
                .comparingInt(String::length)
                .thenComparing(Comparator.naturalOrder()));

        for (String word : words) {
            System.out.println(word);
        }
    }
}`,
    task: "补全程序：把 names 按名字长度从短到长排序；长度相同时按自然顺序排序。期望输出顺序是 Bo、Ada、Amy、Mia、Chris、Alexander。",
    starterCode: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(Arrays.asList("Mia", "Alexander", "Bo", "Chris", "Ada", "Amy"));

        // TODO: 使用 Comparator 排序

        for (String name : names) {
            System.out.println(name);
        }
    }
}`,
    answerCode: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(Arrays.asList("Mia", "Alexander", "Bo", "Chris", "Ada", "Amy"));

        names.sort(Comparator
                .comparingInt(String::length)
                .thenComparing(Comparator.naturalOrder()));

        for (String name : names) {
            System.out.println(name);
        }
    }
}`,
    checks: [
      "是否导入并使用 Comparator。",
      "是否调用 names.sort(...) 对 List 排序。",
      "第一排序规则是否是 String::length。",
      "长度相同时是否使用自然顺序作为第二排序规则。",
      "是否输出所有 6 个名字。",
      "输出顺序是否是 Bo、Ada、Amy、Mia、Chris、Alexander。"
    ],
    commonMistakes: [
      "只按自然顺序排序，结果会变成 Ada、Alexander、Amy 等，不符合按长度优先。",
      "只按长度排序，长度相同的名字顺序可能依赖原始列表，不够明确。",
      "以为 sort 会返回新列表，实际 List.sort 会直接修改原列表。",
      "忘记导入 Comparator，导致编译器找不到类。",
      "把 reversed 加在整个比较器末尾，会让长度和字母顺序一起反过来。"
    ],
    sources: [
      {
        title: "Dev.java: Extending Collection with List",
        url: "https://dev.java/learn/api/collections-framework/lists/"
      },
      {
        title: "Oracle JDK 26 API: Comparator",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html"
      },
      {
        title: "Oracle JDK 26 API: Collections",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html"
      }
    ]
  },
  {
    id: "level3-8-safe-read-boundaries",
    title: "安全读取与边界",
    subtitle: "先检查，再访问",
    intro: [
      "很多程序错误不是因为逻辑很难，而是因为访问数据前没有检查边界。数组下标越界、List 下标越界、输入不是数字，都是常见问题。",
      "安全读取的核心顺序是先判断，再读取。比如访问数组前先确认 index >= 0 && index < array.length，读取整数前先确认 scanner.hasNextInt()。",
      "用户看到的编号常常从 1 开始，但 Java 下标从 0 开始。把用户编号转成下标时，通常要减 1，并且先检查编号是否在 1 到 length 之间。",
      "边界判断要写清楚，不要靠异常控制正常流程。异常适合处理意外情况，普通的输入合法性检查应该用 if 主动完成。"
    ],
    syntax: [
      "数组安全下标：if (index >= 0 && index < items.length) { ... }。",
      "List 安全下标：if (index >= 0 && index < list.size()) { ... }。",
      "Scanner 读取整数前可用 hasNextInt() 判断下一个内容能否转成 int。",
      "用户编号 number 转数组下标时通常使用 number - 1。",
      "范围判断推荐写成 number >= 1 && number <= menu.length，边界一眼可见。",
      "越界访问数组会抛出 ArrayIndexOutOfBoundsException，越界访问 List 通常会抛出 IndexOutOfBoundsException。"
    ],
    exampleCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String input = "3";
        String[] fruits = {"苹果", "香蕉", "橙子"};
        Scanner scanner = new Scanner(input);

        if (scanner.hasNextInt()) {
            int number = scanner.nextInt();

            if (number >= 1 && number <= fruits.length) {
                System.out.println("你选择了：" + fruits[number - 1]);
            } else {
                System.out.println("编号超出范围");
            }
        } else {
            System.out.println("请输入数字编号");
        }

        scanner.close();
    }
}`,
    task: "补全程序：从 input 中读取菜单编号。编号从 1 开始；不是整数时输出 请输入数字编号；编号超出范围时输出 没有这个选项；合法时输出 选择：加上对应菜名。",
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String input = "2";
        String[] menu = {"米饭", "面条", "饺子"};
        Scanner scanner = new Scanner(input);

        // TODO: 先判断输入是不是整数
        // TODO: 再判断编号是否在菜单范围内
        // TODO: 最后安全读取数组元素

        scanner.close();
    }
}`,
    answerCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        String input = "2";
        String[] menu = {"米饭", "面条", "饺子"};
        Scanner scanner = new Scanner(input);

        if (scanner.hasNextInt()) {
            int number = scanner.nextInt();

            if (number >= 1 && number <= menu.length) {
                System.out.println("选择：" + menu[number - 1]);
            } else {
                System.out.println("没有这个选项");
            }
        } else {
            System.out.println("请输入数字编号");
        }

        scanner.close();
    }
}`,
    checks: [
      "是否使用 Scanner 读取 input。",
      "是否先使用 hasNextInt 判断输入能否作为整数读取。",
      "是否检查 number >= 1 && number <= menu.length。",
      "访问数组时是否使用 menu[number - 1]。",
      "input 为 2 时是否输出 选择：面条。",
      "是否为非数字和越界编号分别准备不同提示。"
    ],
    commonMistakes: [
      "直接 nextInt，不判断 hasNextInt，输入不是数字时会出错。",
      "把用户编号 1 当成数组下标 1，导致选择第二项而不是第一项。",
      "边界条件写成 number < menu.length，编号等于最后一项时被误判为越界。",
      "检查了范围却仍然使用 menu[number]，忘记把编号减 1。",
      "用 try-catch 包住所有问题，却没有给用户明确的输入提示。"
    ],
    sources: [
      {
        title: "Oracle JDK 26 API: Scanner",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Scanner.html"
      },
      {
        title: "Java Language Specification 26: Chapter 10. Arrays",
        url: "https://docs.oracle.com/javase/specs/jls/se26/html/jls-10.html"
      },
      {
        title: "Oracle JDK 26 API: IndexOutOfBoundsException",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IndexOutOfBoundsException.html"
      }
    ]
  }
];
