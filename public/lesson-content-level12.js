window.LESSON_CONTENT_LEVEL12 = [
  {
    id: "level12-1-thread-basics",
    title: "线程基础",
    subtitle: "Thread 与 Runnable",
    intro: [
      "线程可以先理解成程序里的“执行路线”。一个 Java 程序启动后，main 方法就在主线程里运行；如果你再启动新的 Thread，程序就多了一条可以同时推进的路线。",
      "并发不等于一定更快。线程让多个任务可以交替或同时进行，适合把等待网络、文件、用户输入这类时间利用起来；但如果任务全是 CPU 计算，线程太多反而会因为切换和抢资源变慢。",
      "创建线程时，更推荐把“要做的事”写成 Runnable，再交给 Thread 执行。这样任务和线程本身分开，代码更清楚，也为以后使用线程池打基础。",
      "启动线程要调用 start()，不是直接调用 run()。start() 会请求 JVM 安排一个新线程执行 run 方法；直接 run() 只是普通方法调用，仍然在当前线程里顺序执行。",
      "多线程程序的输出顺序通常不能靠肉眼猜。谁先打印、谁后打印，取决于调度器和运行时状态，所以写并发代码时要用 join、锁、Future 等机制表达“等待”和“顺序”。"
    ],
    syntax: [
      "Thread.currentThread().getName() 可以获得当前正在执行代码的线程名。",
      "Runnable 表示一个不返回结果的任务，常见写法是 () -> { 任务代码 }。",
      "new Thread(runnable, \"worker-1\") 创建一个线程对象，并给它一个方便调试的名字。",
      "thread.start() 启动新线程；thread.run() 不会启动新线程，只是当前线程调用普通方法。",
      "thread.join() 让当前线程等待指定线程执行结束，常用于让 main 等待工作线程收尾。",
      "Thread.sleep(毫秒数) 让当前线程暂停一小段时间，方法会抛出 InterruptedException。",
      "InterruptedException 表示线程在等待、睡眠或阻塞时被请求中断，不能简单无视。",
      "线程之间默认共享同一个进程里的堆内存，读写同一个对象时要特别小心。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            String name = Thread.currentThread().getName();
            for (int i = 1; i <= 3; i++) {
                System.out.println(name + " 处理第 " + i + " 个小任务");
            }
        };

        Thread worker = new Thread(task, "worker-1");
        worker.start();

        System.out.println(Thread.currentThread().getName() + " 正在等待工作线程");
        worker.join();
        System.out.println("所有任务结束");
    }
}`,
    task: "创建两个线程，名字分别是 worker-A 和 worker-B。每个线程输出自己开始工作；main 线程要等待两个线程都结束后，再输出“main 收尾”。",
    starterCode: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Runnable job = () -> {
            // 输出：线程名 + " 开始工作"
        };

        // 创建 worker-A 和 worker-B
        // 启动两个线程
        // 等待两个线程结束

        System.out.println("main 收尾");
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Runnable job = () -> {
            System.out.println(Thread.currentThread().getName() + " 开始工作");
        };

        Thread workerA = new Thread(job, "worker-A");
        Thread workerB = new Thread(job, "worker-B");

        workerA.start();
        workerB.start();

        workerA.join();
        workerB.join();

        System.out.println("main 收尾");
    }
}`,
    checks: [
      "是否创建了两个 Thread 对象，而不是只调用两次普通方法。",
      "两个线程名是否分别是 worker-A 和 worker-B。",
      "是否使用 start() 启动线程，而不是直接调用 run()。",
      "任务中是否通过 Thread.currentThread().getName() 输出当前线程名。",
      "main 是否调用 join() 等待两个线程都结束。",
      "“main 收尾”是否在两个工作线程结束后输出。"
    ],
    commonMistakes: [
      "把 thread.run() 当成启动线程，结果代码仍然按顺序在 main 线程里执行。",
      "没有 join()，main 很快结束，观察不到清晰的收尾顺序。",
      "以为输出顺序每次都必须一样，实际上线程调度本来就可能变化。",
      "让很多线程同时修改同一个变量，却没有任何同步保护。",
      "用 sleep() 猜测另一个线程应该执行完了，sleep 只能等时间，不能表达正确的依赖关系。",
      "吞掉 InterruptedException，导致线程被请求停止时没有机会正确收尾。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: Concurrency",
        url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/"
      },
      {
        title: "Oracle Java Tutorials: Defining and Starting a Thread",
        url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/runthread.html"
      },
      {
        title: "Java SE 26 API: Thread",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html"
      },
      {
        title: "Java SE 26 API: Runnable",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Runnable.html"
      }
    ]
  },
  {
    id: "level12-2-executor-service",
    title: "线程池",
    subtitle: "ExecutorService",
    intro: [
      "如果每来一个小任务就 new Thread，程序会很快失控：创建线程有成本，线程太多会占内存，还会让 CPU 忙着在线程之间切换。线程池就是把一组线程管理起来，任务来了交给池子安排。",
      "ExecutorService 把“提交任务”和“创建线程”分开。你只描述任务，线程池负责排队、复用线程、调度执行和关闭资源。这比到处手动 new Thread 更适合真实项目。",
      "线程池不是越大越好。CPU 密集型任务通常接近 CPU 核心数更合理；大量等待 I/O 的任务可以有更多并发，但仍要结合数据库连接数、远程服务限流和内存来设计。",
      "提交任务后，submit 会返回 Future。Future 像一张取货单：任务可能还没完成，你可以稍后用 get() 等结果，也可以在需要时取消任务。",
      "用完线程池一定要关闭。shutdown() 表示不再接收新任务，并让已提交任务继续完成；如果忘记关闭，非守护线程可能让程序迟迟不退出。"
    ],
    syntax: [
      "ExecutorService executor = Executors.newFixedThreadPool(2); 创建固定大小线程池。",
      "executor.execute(runnable) 提交不关心返回值的任务。",
      "Future<T> future = executor.submit(callable) 提交有返回值的任务。",
      "future.get() 会等待任务完成并返回结果，任务抛异常时会包装成 ExecutionException。",
      "executor.shutdown() 发起温和关闭，不再接收新任务。",
      "executor.awaitTermination(时间, 单位) 可以等待线程池在指定时间内结束。",
      "Callable<T> 和 Runnable 类似，但可以返回结果，也可以抛出受检异常。",
      "线程池大小要根据任务类型和外部资源限制估算，不能机械地越大越好。"
    ],
    exampleCode: `import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(2);

        try {
            List<Future<Integer>> futures = new ArrayList<>();
            for (int i = 1; i <= 4; i++) {
                int taskId = i;
                Callable<Integer> task = () -> {
                    System.out.println(Thread.currentThread().getName() + " 执行任务 " + taskId);
                    return taskId * taskId;
                };
                futures.add(pool.submit(task));
            }

            int total = 0;
            for (Future<Integer> future : futures) {
                total += future.get();
            }

            System.out.println("平方和：" + total);
        } finally {
            pool.shutdown();
        }
    }
}`,
    task: "使用固定大小为 3 的线程池提交 5 个 Callable<Integer> 任务，每个任务返回自己的编号。main 收集所有 Future 的结果并输出总和：任务编号总和：15。最后关闭线程池。",
    starterCode: `import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(3);

        try {
            List<Future<Integer>> futures = new ArrayList<>();

            // 提交 5 个 Callable，每个返回自己的编号 1 到 5

            int total = 0;
            // 从 Future 中取出结果并累加

            System.out.println("任务编号总和：" + total);
        } finally {
            // 关闭线程池
        }
    }
}`,
    answerCode: `import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(3);

        try {
            List<Future<Integer>> futures = new ArrayList<>();

            for (int i = 1; i <= 5; i++) {
                int taskId = i;
                Callable<Integer> task = () -> taskId;
                futures.add(pool.submit(task));
            }

            int total = 0;
            for (Future<Integer> future : futures) {
                total += future.get();
            }

            System.out.println("任务编号总和：" + total);
        } finally {
            pool.shutdown();
        }
    }
}`,
    checks: [
      "是否使用 Executors.newFixedThreadPool(3) 创建线程池。",
      "是否提交了 5 个 Callable<Integer> 任务。",
      "循环里是否把 i 保存到局部变量 taskId，再给 lambda 使用。",
      "是否把 submit 返回的 Future 保存起来。",
      "是否通过 future.get() 获取任务结果并累加。",
      "是否在 finally 中调用 shutdown() 关闭线程池。",
      "最终输出是否为“任务编号总和：15”。"
    ],
    commonMistakes: [
      "提交任务后立刻不管结果，导致主线程不知道任务是否成功。",
      "忘记关闭线程池，程序输出结束后仍然不退出。",
      "把线程池大小设得非常大，以为线程越多速度一定越快。",
      "在 lambda 里直接修改循环变量 i，Java 不允许这样捕获变化中的局部变量。",
      "在任务里共享普通 ArrayList 并发写入，可能出现数据竞争或结构损坏。",
      "只调用 shutdownNow() 当作常规关闭方式，导致已提交任务可能被打断。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: Executors",
        url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/executors.html"
      },
      {
        title: "Oracle Java Tutorials: Thread Pools",
        url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/pools.html"
      },
      {
        title: "Java SE 26 API: ExecutorService",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ExecutorService.html"
      },
      {
        title: "Java SE 26 API: Executors",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Executors.html"
      }
    ]
  },
  {
    id: "level12-3-locks-and-synchronization",
    title: "锁与同步",
    subtitle: "synchronized 与 Lock",
    intro: [
      "多个线程读同一个数据通常没问题，但多个线程同时修改同一个数据，就容易出现数据竞争。最经典的例子是 count++：它看起来是一句代码，实际包含读取、加一、写回几个步骤，中间可能被别的线程插队。",
      "锁的作用是保护一段临界区。进入临界区前先拿锁，拿到锁的线程执行完再释放；其他线程必须等待。这样牺牲一部分并行度，换来共享数据的一致性。",
      "synchronized 是 Java 内置的同步机制，写法简单，退出同步块时会自动释放锁。ReentrantLock 属于 java.util.concurrent.locks，功能更灵活，比如可以 tryLock、可中断等待、公平锁等，但必须在 finally 里手动 unlock。",
      "锁不是越多越安全。锁范围太大，程序会变慢；锁范围太小，又保护不住共享状态。初学时先做到：只保护真正共享且会被修改的数据，并让同一份数据始终用同一把锁保护。",
      "同步还和内存可见性有关。一个线程改了共享变量，另一个线程不一定马上看到；进入和退出 synchronized，或者使用 Lock 的加锁解锁，都能建立必要的可见性关系。"
    ],
    syntax: [
      "synchronized (lock) { ... } 用某个对象作为锁，保护花括号里的临界区。",
      "synchronized 修饰实例方法时，锁对象是 this。",
      "synchronized 修饰 static 方法时，锁对象是当前类的 Class 对象。",
      "ReentrantLock lock = new ReentrantLock(); 创建可重入锁。",
      "lock.lock(); try { ... } finally { lock.unlock(); } 是 Lock 的标准写法。",
      "同一把锁可以被同一个线程重复获得，这叫可重入。",
      "不要锁 String 字面量、Integer 缓存对象这类可能被别处共享的对象。",
      "加锁能保证临界区互斥，但不能神奇地让业务逻辑自动正确。"
    ],
    exampleCode: `import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class Main {
    private int balance = 0;
    private final Lock lock = new ReentrantLock();

    public void deposit(int amount) {
        lock.lock();
        try {
            balance += amount;
        } finally {
            lock.unlock();
        }
    }

    public int getBalance() {
        lock.lock();
        try {
            return balance;
        } finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Main account = new Main();

        Thread a = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                account.deposit(1);
            }
        });
        Thread b = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                account.deposit(1);
            }
        });

        a.start();
        b.start();
        a.join();
        b.join();

        System.out.println("余额：" + account.getBalance());
    }
}`,
    task: "修复 starterCode 中的 Counter，让两个线程各自调用 increment 1000 次后，最终稳定输出“计数：2000”。可以使用 synchronized 方法或 synchronized 代码块。",
    starterCode: `public class Main {
    static class Counter {
        private int value = 0;

        void increment() {
            value++;
        }

        int getValue() {
            return value;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        Thread a = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        Thread b = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });

        a.start();
        b.start();
        a.join();
        b.join();

        System.out.println("计数：" + counter.getValue());
    }
}`,
    answerCode: `public class Main {
    static class Counter {
        private int value = 0;

        synchronized void increment() {
            value++;
        }

        synchronized int getValue() {
            return value;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        Thread a = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        Thread b = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });

        a.start();
        b.start();
        a.join();
        b.join();

        System.out.println("计数：" + counter.getValue());
    }
}`,
    checks: [
      "increment 是否被同一把锁保护。",
      "getValue 是否也考虑了可见性，能读到最终结果。",
      "是否保留两个线程各自循环 1000 次的逻辑。",
      "是否使用 join() 等待两个线程结束后再读取结果。",
      "最终结果是否稳定为 2000，而不是偶尔正确。",
      "是否没有把输出直接写死为 2000。"
    ],
    commonMistakes: [
      "认为 value++ 是原子操作，其实它由多个步骤组成。",
      "只给 getValue 加锁，不给 increment 加锁，写入仍然会互相覆盖。",
      "每次 increment 都 new 一个锁对象，导致线程拿的不是同一把锁。",
      "使用 ReentrantLock 后忘记在 finally 中 unlock，异常时可能永远不释放锁。",
      "把锁范围扩大到耗时 I/O 或 sleep，导致其他线程无意义等待。",
      "为了修复并发问题随意加很多锁，引入死锁风险。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: Synchronization",
        url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/sync.html"
      },
      {
        title: "Oracle Java Tutorials: Intrinsic Locks and Synchronization",
        url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/locksync.html"
      },
      {
        title: "Oracle Java Tutorials: Lock Objects",
        url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/newlocks.html"
      },
      {
        title: "Java SE 26 API: ReentrantLock",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html"
      }
    ]
  },
  {
    id: "level12-4-concurrent-collections",
    title: "并发集合",
    subtitle: "ConcurrentHashMap",
    intro: [
      "普通 HashMap 不是为多线程同时修改设计的。如果多个线程同时 put、get、扩容，轻则结果不对，重则出现难以复现的问题。并发集合就是为这些场景准备的工具。",
      "ConcurrentHashMap 允许多个线程安全地访问同一张表。它不是简单地把整张 map 都锁住，而是内部做了更细的并发控制，让常见读写操作在安全和性能之间取得平衡。",
      "安全的集合方法很重要，但还不够。比如先 containsKey 再 put 是两个动作，中间可能被别的线程插队。遇到“如果不存在就放入”“读取后更新”这类组合操作，要优先使用 putIfAbsent、compute、merge 这种原子方法。",
      "并发集合减少了你自己加锁的机会，但不能替你设计业务规则。该不该允许重复扣库存、同一用户能否同时提交两次订单，这些规则仍然需要清晰建模。",
      "选择集合时先问两个问题：哪些线程会读写它？需要保护的是单个操作，还是一组操作的整体一致性？这个习惯比背集合名字更重要。"
    ],
    syntax: [
      "ConcurrentHashMap<K, V> map = new ConcurrentHashMap<>(); 创建线程安全的哈希表。",
      "map.put(key, value) 写入键值对，map.get(key) 读取值。",
      "map.putIfAbsent(key, value) 只有 key 不存在时才放入，整个动作是原子的。",
      "map.compute(key, (k, oldValue) -> newValue) 可以原子地根据旧值计算新值。",
      "map.merge(key, value, remappingFunction) 常用于计数、累加和合并。",
      "keySet()、values()、entrySet() 可以遍历当前内容，但并发修改时不要假设它是固定快照。",
      "ConcurrentHashMap 不允许 null key 或 null value。",
      "并发集合适合共享数据结构，但不代表所有复合业务操作都自动正确。"
    ],
    exampleCode: `import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        List<String> words = List.of("java", "thread", "java", "map", "thread", "java");
        Map<String, Integer> counts = new ConcurrentHashMap<>();

        Thread a = new Thread(() -> {
            for (int i = 0; i < 3; i++) {
                counts.merge(words.get(i), 1, Integer::sum);
            }
        });

        Thread b = new Thread(() -> {
            for (int i = 3; i < words.size(); i++) {
                counts.merge(words.get(i), 1, Integer::sum);
            }
        });

        a.start();
        b.start();
        a.join();
        b.join();

        System.out.println(counts);
    }
}`,
    task: "使用 ConcurrentHashMap 统计数组中每个城市出现的次数。把城市数组分给两个线程处理，使用 merge 原子累加，最后输出 Beijing=3、Shanghai=2、Hangzhou=1 对应的计数。",
    starterCode: `import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        String[] cities = {"Beijing", "Shanghai", "Beijing", "Hangzhou", "Shanghai", "Beijing"};
        Map<String, Integer> counts = new ConcurrentHashMap<>();

        Thread left = new Thread(() -> {
            // 处理下标 0 到 2
        });

        Thread right = new Thread(() -> {
            // 处理下标 3 到 cities.length - 1
        });

        left.start();
        right.start();
        left.join();
        right.join();

        System.out.println("Beijing=" + counts.get("Beijing"));
        System.out.println("Shanghai=" + counts.get("Shanghai"));
        System.out.println("Hangzhou=" + counts.get("Hangzhou"));
    }
}`,
    answerCode: `import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        String[] cities = {"Beijing", "Shanghai", "Beijing", "Hangzhou", "Shanghai", "Beijing"};
        Map<String, Integer> counts = new ConcurrentHashMap<>();

        Thread left = new Thread(() -> {
            for (int i = 0; i <= 2; i++) {
                counts.merge(cities[i], 1, Integer::sum);
            }
        });

        Thread right = new Thread(() -> {
            for (int i = 3; i < cities.length; i++) {
                counts.merge(cities[i], 1, Integer::sum);
            }
        });

        left.start();
        right.start();
        left.join();
        right.join();

        System.out.println("Beijing=" + counts.get("Beijing"));
        System.out.println("Shanghai=" + counts.get("Shanghai"));
        System.out.println("Hangzhou=" + counts.get("Hangzhou"));
    }
}`,
    checks: [
      "counts 是否使用 ConcurrentHashMap 创建。",
      "是否启动了两个线程分别处理不同下标范围。",
      "是否使用 merge 进行原子计数，而不是 get 后再 put。",
      "是否调用 join() 等两个线程处理完再输出。",
      "Beijing 的计数是否为 3。",
      "Shanghai 的计数是否为 2。",
      "Hangzhou 的计数是否为 1。"
    ],
    commonMistakes: [
      "把 HashMap 当成多线程安全集合使用。",
      "用 containsKey 加 put 组合实现计数，中间可能被其他线程插队。",
      "在 ConcurrentHashMap 中放入 null，运行时会抛出异常。",
      "遍历并发集合时以为看到的是绝对固定的完整快照。",
      "把并发集合当成万能锁，忽略跨多个 key 的业务一致性。",
      "线程还没 join 就打印结果，导致偶尔看到不完整统计。"
    ],
    sources: [
      {
        title: "Oracle Java Tutorials: Concurrent Collections",
        url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/collections.html"
      },
      {
        title: "Java SE 26 API: ConcurrentHashMap",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html"
      },
      {
        title: "Java SE 26 API: ConcurrentMap",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentMap.html"
      },
      {
        title: "Java SE 26 API: AtomicInteger",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html"
      }
    ]
  },
  {
    id: "level12-5-completable-future",
    title: "CompletableFuture",
    subtitle: "异步任务编排",
    intro: [
      "CompletableFuture 用来表达“现在还没有结果，但将来会完成”的计算。它适合把多个异步步骤串起来，比如先查用户，再查订单，再组合成页面数据。",
      "它和直接开线程的区别在于：你更关注任务之间的关系，而不是线程本身。thenApply 表示拿到结果后转换，thenCompose 表示继续发起下一个异步任务，thenCombine 表示两个结果都到了再合并。",
      "异步不等于没有等待。只要最终要把结果返回给用户，就总有某个边界需要 join 或 get。关键是等待前可以让多个独立任务同时推进，而不是一个查完再查下一个。",
      "默认的 supplyAsync 会使用公共 ForkJoinPool。真实项目里如果任务会阻塞，比如访问数据库或远程接口，通常要传入自己管理的 Executor，避免把公共线程池占满。",
      "异常也要进入编排模型。exceptionally、handle、whenComplete 可以处理失败、记录日志或给出兜底值。没有异常处理的异步链，失败时常常比同步代码更难定位。"
    ],
    syntax: [
      "CompletableFuture.supplyAsync(() -> value) 异步执行有返回值的任务。",
      "CompletableFuture.runAsync(() -> action) 异步执行没有返回值的任务。",
      "thenApply(result -> newResult) 在上一步成功后转换结果。",
      "thenCompose(result -> nextFuture) 用于串联下一个异步任务，避免 Future 套 Future。",
      "thenCombine(otherFuture, (a, b) -> combined) 等两个 Future 都完成后合并结果。",
      "exceptionally(ex -> fallback) 在异常时返回兜底值。",
      "join() 等待结果，异常会以 CompletionException 形式抛出。",
      "带 Executor 参数的 async 方法可以指定任务运行在哪个线程池。"
    ],
    exampleCode: `import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(2);

        try {
            CompletableFuture<Integer> priceFuture = CompletableFuture.supplyAsync(() -> 80, pool);
            CompletableFuture<Integer> countFuture = CompletableFuture.supplyAsync(() -> 3, pool);

            CompletableFuture<String> billFuture = priceFuture
                    .thenCombine(countFuture, (price, count) -> price * count)
                    .thenApply(total -> "应付金额：" + total);

            System.out.println(billFuture.join());
        } finally {
            pool.shutdown();
        }
    }
}`,
    task: "创建两个 CompletableFuture：一个异步返回商品单价 120，另一个异步返回数量 2。使用 thenCombine 计算总价，再用 thenApply 拼成“订单总价：240”，最后输出结果。请使用自定义固定线程池并在 finally 中关闭。",
    starterCode: `import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(2);

        try {
            // 异步得到 price = 120
            // 异步得到 count = 2
            // 合并计算总价，并转换成输出文本

            // 输出最终结果
        } finally {
            // 关闭线程池
        }
    }
}`,
    answerCode: `import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(2);

        try {
            CompletableFuture<Integer> priceFuture = CompletableFuture.supplyAsync(() -> 120, pool);
            CompletableFuture<Integer> countFuture = CompletableFuture.supplyAsync(() -> 2, pool);

            CompletableFuture<String> resultFuture = priceFuture
                    .thenCombine(countFuture, (price, count) -> price * count)
                    .thenApply(total -> "订单总价：" + total);

            System.out.println(resultFuture.join());
        } finally {
            pool.shutdown();
        }
    }
}`,
    checks: [
      "是否创建了固定大小为 2 的自定义线程池。",
      "是否使用 CompletableFuture.supplyAsync 创建两个异步结果。",
      "两个 supplyAsync 是否传入了同一个自定义 Executor。",
      "是否使用 thenCombine 合并单价和数量。",
      "是否使用 thenApply 把总价转换成文本。",
      "是否通过 join() 或 get() 获取最终结果并输出。",
      "是否在 finally 中关闭线程池。"
    ],
    commonMistakes: [
      "把异步任务写完后不等待最终结果，main 直接结束。",
      "用 thenApply 返回另一个 CompletableFuture，导致出现嵌套 Future；这类场景应考虑 thenCompose。",
      "所有阻塞任务都扔给默认公共线程池，项目变大后容易互相影响。",
      "在每一步都立刻 join，异步链退化成同步顺序执行。",
      "没有处理异常，任务失败时只看到 CompletionException，不知道原始原因。",
      "忘记关闭自定义线程池。"
    ],
    sources: [
      {
        title: "Java SE 26 API: CompletableFuture",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/CompletableFuture.html"
      },
      {
        title: "Java SE 26 API: CompletionStage",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/CompletionStage.html"
      },
      {
        title: "Java SE 26 API: ForkJoinPool",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ForkJoinPool.html"
      },
      {
        title: "Java SE 26 API: Executor",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Executor.html"
      }
    ]
  },
  {
    id: "level12-6-virtual-threads",
    title: "虚拟线程",
    subtitle: "现代高并发模型",
    intro: [
      "虚拟线程是 JDK 21 正式引入的轻量级线程。它仍然是 java.lang.Thread，但不再一对一长期占用操作系统线程，JVM 可以把大量虚拟线程调度到较少的平台线程上运行。",
      "它解决的主要问题是“很多任务都在等 I/O”的伸缩性。比如大量请求在等待数据库、HTTP 或文件系统时，平台线程会被占住；虚拟线程在支持的阻塞点可以挂起，让承载线程去运行别的虚拟线程。",
      "虚拟线程不是更快的 CPU。它不会让单个计算任务跑得更快，也不适合拿来堆很多长期 CPU 密集循环。官方文档也强调它提供的是规模和吞吐，不是降低单个任务延迟的魔法。",
      "使用虚拟线程时，代码风格可以保持同步、直线式：一个请求一个线程，阻塞写法仍然容易读。相比复杂回调，这让很多服务端代码更好维护。",
      "要注意 pinned virtual thread。某些 synchronized 或 native 场景可能让虚拟线程暂时无法从承载线程卸载，影响伸缩性。发现吞吐异常时，可以借助 JFR 和 jcmd 观察虚拟线程行为。"
    ],
    syntax: [
      "Thread.ofVirtual().start(runnable) 创建并启动一个虚拟线程。",
      "Thread.startVirtualThread(runnable) 是创建并启动虚拟线程的快捷方法。",
      "Thread.currentThread().isVirtual() 可以判断当前线程是否是虚拟线程。",
      "Executors.newVirtualThreadPerTaskExecutor() 创建“每个任务一个虚拟线程”的 ExecutorService。",
      "虚拟线程适合大量等待 I/O 的任务，不适合把 CPU 密集任务无限放大。",
      "虚拟线程是守护线程，不会单独阻止 JVM 退出，所以示例中仍要等待任务完成。",
      "ThreadLocal 在虚拟线程中可用，但数量巨大时要谨慎使用，避免内存压力。",
      "JDK 21 及以上才能直接使用正式版虚拟线程 API。"
    ],
    exampleCode: `import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {
    public static void main(String[] args) throws Exception {
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            List<Future<String>> futures = new ArrayList<>();

            for (int i = 1; i <= 5; i++) {
                int id = i;
                futures.add(executor.submit(() -> {
                    Thread.sleep(100);
                    return Thread.currentThread().getName()
                            + " virtual=" + Thread.currentThread().isVirtual()
                            + " task=" + id;
                }));
            }

            for (Future<String> future : futures) {
                System.out.println(future.get());
            }
        }
    }
}`,
    task: "使用 Executors.newVirtualThreadPerTaskExecutor() 提交 3 个任务。每个任务返回“task-编号 virtual=true”。main 收集并输出 3 行结果。要求使用 try-with-resources 管理 ExecutorService。",
    starterCode: `import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {
    public static void main(String[] args) throws Exception {
        // 使用 try-with-resources 创建虚拟线程 executor
        // 提交 3 个有返回值的任务
        // 输出每个 Future 的结果
    }
}`,
    answerCode: `import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {
    public static void main(String[] args) throws Exception {
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            List<Future<String>> futures = new ArrayList<>();

            for (int i = 1; i <= 3; i++) {
                int taskId = i;
                futures.add(executor.submit(() ->
                        "task-" + taskId + " virtual=" + Thread.currentThread().isVirtual()));
            }

            for (Future<String> future : futures) {
                System.out.println(future.get());
            }
        }
    }
}`,
    checks: [
      "是否使用 Executors.newVirtualThreadPerTaskExecutor()。",
      "是否用 try-with-resources 管理 ExecutorService。",
      "是否提交了 3 个任务，而不是手动创建 3 个平台线程。",
      "任务内部是否调用 Thread.currentThread().isVirtual()。",
      "是否通过 Future.get() 等待并取得结果。",
      "输出中是否能看到 3 行 virtual=true。",
      "是否理解该示例需要 JDK 21 或更高版本。"
    ],
    commonMistakes: [
      "以为虚拟线程会让 CPU 计算自动变快。",
      "把虚拟线程池当成固定大小线程池使用，失去每任务一个虚拟线程的模型优势。",
      "没有等待虚拟线程完成，main 提前退出。",
      "在大量虚拟线程中随意放很大的 ThreadLocal 对象，造成内存压力。",
      "在长时间 synchronized 阻塞或 native 调用中忽略 pinned 问题。",
      "在旧 JDK 上编译虚拟线程代码，却没有确认版本至少为 JDK 21。"
    ],
    sources: [
      {
        title: "JEP 444: Virtual Threads",
        url: "https://openjdk.org/jeps/444"
      },
      {
        title: "Oracle JDK 26 Guide: Virtual Threads",
        url: "https://docs.oracle.com/en/java/javase/26/core/virtual-threads.html"
      },
      {
        title: "Java SE 26 API: Thread",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html"
      },
      {
        title: "Java SE 26 API: Executors.newVirtualThreadPerTaskExecutor",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Executors.html#newVirtualThreadPerTaskExecutor()"
      }
    ]
  },
  {
    id: "level12-7-jvm-memory-areas",
    title: "JVM 内存结构",
    subtitle: "堆、栈、方法区",
    intro: [
      "JVM 运行 Java 程序时，会把不同用途的数据放在不同区域。初学阶段先抓住几个核心词：堆、Java 虚拟机栈、方法区、程序计数器和本地方法栈。",
      "堆主要放对象。你 new 出来的对象、数组，通常都在堆里；多个线程可以通过引用访问同一个堆对象，所以并发修改共享对象时才需要同步。",
      "栈主要服务于方法调用。每个线程都有自己的 Java 虚拟机栈，方法调用会创建栈帧，里面保存局部变量、操作数栈、返回信息等。方法调用结束，对应栈帧就弹出。",
      "方法区存放类相关结构，比如类元数据、运行时常量池、方法信息等。很多同学会把“方法区”误解成“方法运行的地方”，更准确地说，它保存类层面的信息，方法执行时仍然会在线程栈上产生栈帧。",
      "理解内存结构不是为了背名词，而是为了排错。StackOverflowError 常和递归太深、栈空间不足有关；OutOfMemoryError 可能来自堆、元空间或其他区域，需要结合错误信息和工具判断。"
    ],
    syntax: [
      "java -Xms128m -Xmx128m Main 可以设置堆初始大小和最大大小。",
      "java -Xss256k Main 可以设置每个线程的栈大小。",
      "jcmd <pid> VM.flags 可以查看目标 JVM 的启动参数和部分 VM 标志。",
      "jcmd <pid> VM.system_properties 可以查看系统属性。",
      "jcmd <pid> GC.heap_info 可以查看堆相关信息。",
      "局部变量本身在线程栈帧里；如果局部变量引用对象，对象通常仍在堆里。",
      "每个线程有自己的栈，因此局部基本变量通常不会被其他线程直接共享。",
      "堆里的可变对象可以被多个线程共享，需要考虑同步和可见性。"
    ],
    exampleCode: `public class Main {
    static class User {
        String name;

        User(String name) {
            this.name = name;
        }
    }

    static void rename(User user) {
        String newName = "小李";
        user.name = newName;
    }

    public static void main(String[] args) {
        int age = 18;
        User user = new User("小林");

        rename(user);

        System.out.println("age=" + age);
        System.out.println("user.name=" + user.name);
    }
}`,
    task: "阅读 starterCode，并在注释处补充输出：先输出局部变量 count，再输出堆对象 box.value。目标是通过代码理解：局部变量 count 在 main 的栈帧里，new Box 创建的对象通常在堆里。",
    starterCode: `public class Main {
    static class Box {
        int value;

        Box(int value) {
            this.value = value;
        }
    }

    public static void main(String[] args) {
        int count = 3;
        Box box = new Box(7);

        // 输出 count
        // 输出 box.value
    }
}`,
    answerCode: `public class Main {
    static class Box {
        int value;

        Box(int value) {
            this.value = value;
        }
    }

    public static void main(String[] args) {
        int count = 3;
        Box box = new Box(7);

        System.out.println("count=" + count);
        System.out.println("box.value=" + box.value);
    }
}`,
    checks: [
      "是否保留 Box 类和 main 方法结构。",
      "是否创建了 new Box(7) 对象。",
      "是否输出 count=3。",
      "是否输出 box.value=7。",
      "是否能说明 count 是 main 方法的局部变量。",
      "是否能说明 box 变量保存引用，Box 对象通常在堆里。"
    ],
    commonMistakes: [
      "以为所有变量都在堆里，忽略线程栈和局部变量的概念。",
      "以为对象引用和对象本身是一回事；引用变量和对象所在区域要分开理解。",
      "把方法区理解成所有方法执行时占用的栈空间。",
      "看到 OutOfMemoryError 就只想到堆，忽略元空间、直接内存等可能性。",
      "用 System.gc() 当作内存管理手段，忽略对象生命周期和引用关系。",
      "用背诵替代理解，无法把 StackOverflowError、堆 OOM 和线程数联系起来排查。"
    ],
    sources: [
      {
        title: "Java Virtual Machine Specification: Run-Time Data Areas",
        url: "https://docs.oracle.com/javase/specs/jvms/se26/html/jvms-2.html#jvms-2.5"
      },
      {
        title: "Oracle JDK 26 Tool Guide: The java Command",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/man/java.html"
      },
      {
        title: "Oracle JDK 26 Tool Guide: The jcmd Command",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/man/jcmd.html"
      },
      {
        title: "Java SE 26 API: Runtime",
        url: "https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Runtime.html"
      }
    ]
  },
  {
    id: "level12-8-gc-basics",
    title: "GC 基础",
    subtitle: "对象回收",
    intro: [
      "GC 是 Garbage Collection，也就是垃圾回收。Java 程序员通常不手动释放对象内存，JVM 会判断哪些对象已经不可达，并把它们占用的内存重新用于后续分配。",
      "“没有变量指向对象”只是初学时的近似说法。更准确的心智模型是可达性：从一组 GC Roots 出发，如果还能沿着引用链找到某个对象，它就是活的；找不到的对象才可能被回收。",
      "GC 不是程序员可以精确指挥的清洁工。System.gc() 只是建议 JVM 进行垃圾回收，JVM 可以选择如何处理。真正可靠的做法是减少无意义对象、及时释放不再需要的引用、关闭外部资源。",
      "现代 HotSpot GC 有不同收集器和策略，常见目标包括吞吐、延迟和内存占用。没有一个 GC 参数适合所有应用，调优必须基于日志、指标和业务目标。",
      "学习 GC 的第一步不是背参数，而是会观察。打开 GC 日志、读懂堆从多少变到多少、知道暂停发生在什么时候，这些比盲目复制调优参数更有价值。"
    ],
    syntax: [
      "java -Xlog:gc Main 可以输出基础 GC 日志。",
      "java -Xlog:gc*:file=gc.log:time,level,tags Main 可以把更详细的 GC 日志写到文件。",
      "java -Xms128m -Xmx128m Main 可以固定堆大小，方便观察 GC 行为。",
      "jcmd <pid> GC.heap_info 可以查看运行中 JVM 的堆信息。",
      "jcmd <pid> GC.run 可以请求目标 JVM 执行一次 GC，但不应把它当作业务逻辑依赖。",
      "对象不可达才可能被回收；仍被静态字段、集合、线程栈等引用时不会被当作垃圾。",
      "内存泄漏在 Java 中常表现为对象仍然被引用，但业务上已经不需要。",
      "GC 调优要同时看吞吐、暂停时间、内存占用和业务响应，不要只看一个数字。"
    ],
    exampleCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<byte[]> holder = new ArrayList<>();

        for (int i = 1; i <= 5; i++) {
            byte[] data = new byte[1024 * 1024];
            holder.add(data);
            System.out.println("已保留约 " + i + " MB 对象");
        }

        holder.clear();
        System.out.println("清空集合后，对象才有机会被 GC 回收");
    }
}`,
    task: "补全 starterCode：循环创建 3 个 1MB byte 数组并放入 List，然后输出集合大小；再 clear 集合并输出清空后的大小。运行时可以尝试命令：java -Xms32m -Xmx32m -Xlog:gc Main。",
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<byte[]> holder = new ArrayList<>();

        // 创建 3 个 1MB byte 数组并加入 holder

        System.out.println("清空前 size=" + holder.size());

        // 清空 holder

        System.out.println("清空后 size=" + holder.size());
    }
}`,
    answerCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<byte[]> holder = new ArrayList<>();

        for (int i = 0; i < 3; i++) {
            holder.add(new byte[1024 * 1024]);
        }

        System.out.println("清空前 size=" + holder.size());

        holder.clear();

        System.out.println("清空后 size=" + holder.size());
    }
}`,
    checks: [
      "是否创建了 List<byte[]> 保存数组引用。",
      "是否循环创建了 3 个 1MB byte 数组。",
      "清空前 holder.size() 是否为 3。",
      "是否调用 holder.clear() 释放集合对数组的引用。",
      "清空后 holder.size() 是否为 0。",
      "是否理解 clear 只是移除引用，对象何时回收由 JVM 决定。",
      "是否能使用 -Xlog:gc 观察 GC 日志。"
    ],
    commonMistakes: [
      "以为把变量设为 null 或 clear 后对象会立刻被回收。",
      "把 System.gc() 当作可靠、必须执行的释放内存语句。",
      "集合长期保存无用对象引用，造成 Java 意义上的内存泄漏。",
      "只看平均响应时间，不看 GC 暂停对高分位延迟的影响。",
      "盲目复制网上 GC 参数，没有结合自己的 JDK 版本和业务目标。",
      "看到 GC 日志就只关注次数，不看回收前后大小和暂停时间。"
    ],
    sources: [
      {
        title: "Oracle HotSpot VM GC Tuning Guide: Introduction",
        url: "https://docs.oracle.com/en/java/javase/26/gctuning/introduction-garbage-collection-tuning.html"
      },
      {
        title: "Oracle HotSpot VM GC Tuning Guide: Garbage Collector Implementation",
        url: "https://docs.oracle.com/en/java/javase/26/gctuning/garbage-collector-implementation.html"
      },
      {
        title: "Oracle JDK 26 Tool Guide: The java Command",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/man/java.html"
      },
      {
        title: "Oracle JDK 26 Tool Guide: The jcmd Command",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/man/jcmd.html"
      }
    ]
  },
  {
    id: "level12-9-jfr-diagnostics",
    title: "JFR 与诊断工具",
    subtitle: "jcmd、jstack、jmap",
    intro: [
      "程序线上变慢、卡住、内存上涨时，最怕只靠猜。JDK 自带了一组诊断工具，可以在不改业务代码或少改代码的情况下观察 JVM：jcmd 发诊断命令，jstack 看线程栈，jmap 看堆相关信息，JFR 记录运行事件。",
      "JFR 是 Java Flight Recorder，会把 JVM 和应用运行时的事件记录成 .jfr 文件。它适合分析一段时间内发生了什么，比如 GC、锁等待、线程、CPU、对象分配等。JFR 的价值在于保留时间线，而不是只给你一个瞬间截图。",
      "jstack 更像给线程拍一张照片：每个线程现在在哪个方法、处于什么状态。排查死锁、卡住、CPU 飙高时，它经常是第一批要看的信息。jcmd Thread.print 也能提供类似线程转储。",
      "jmap 常用于堆直方图或 dump。堆 dump 可能很大，也可能包含敏感数据，所以真实环境要评估磁盘、权限和隐私风险。初学时先学会 jmap -histo 看对象数量和占用趋势。",
      "诊断工具不是越多越好，而是要带着问题使用：是线程卡住？内存涨？GC 暂停？CPU 高？先明确症状，再选择最小足够的命令，记录时间点和命令输出，才能让排查可复盘。"
    ],
    syntax: [
      "jcmd 可以列出当前用户可见的 Java 进程及其 pid。",
      "jcmd <pid> Thread.print 可以打印目标 JVM 的线程栈。",
      "jcmd <pid> GC.heap_info 可以查看堆信息。",
      "jcmd <pid> JFR.start name=demo settings=profile filename=demo.jfr duration=30s 可以启动一段 JFR 记录。",
      "jcmd <pid> JFR.check 可以查看 JFR 记录状态。",
      "jcmd <pid> JFR.dump name=demo filename=demo.jfr 可以导出正在记录的数据。",
      "jstack <pid> 可以打印 Java 线程栈，适合查看卡住和死锁线索。",
      "jmap -histo:live <pid> 可以查看 live 对象直方图，执行前通常会触发一次 Full GC。",
      "jfr summary demo.jfr 可以查看 JFR 文件中的事件概览。"
    ],
    exampleCode: `public class Main {
    public static void main(String[] args) throws Exception {
        Object lock = new Object();

        Thread worker = new Thread(() -> {
            synchronized (lock) {
                try {
                    Thread.sleep(60_000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }, "sleeping-worker");

        worker.start();

        System.out.println("pid=" + ProcessHandle.current().pid());
        System.out.println("可以在另一个终端尝试：jcmd <pid> Thread.print");
        System.out.println("也可以尝试：jcmd <pid> JFR.start name=demo settings=profile filename=demo.jfr duration=10s");

        worker.join();
    }
}`,
    task: "补全 starterCode，让程序打印自己的 pid，并保持运行 30 秒。然后你可以在另一个终端练习命令：jcmd <pid> Thread.print、jcmd <pid> GC.heap_info、jcmd <pid> JFR.start name=demo settings=profile filename=demo.jfr duration=10s、jfr summary demo.jfr。",
    starterCode: `public class Main {
    public static void main(String[] args) throws Exception {
        long pid = 0L;

        // 获取当前进程 pid
        // 输出 pid
        // 让程序保持运行 30 秒，方便在另一个终端诊断
    }
}`,
    answerCode: `public class Main {
    public static void main(String[] args) throws Exception {
        long pid = ProcessHandle.current().pid();

        System.out.println("pid=" + pid);
        System.out.println("程序会保持运行 30 秒，请在另一个终端执行诊断命令。");

        Thread.sleep(30_000);
    }
}`,
    checks: [
      "是否使用 ProcessHandle.current().pid() 获取当前 JVM 进程号。",
      "是否把 pid 输出到控制台，方便复制到诊断命令里。",
      "是否让程序保持运行一段时间，而不是立刻结束。",
      "是否能使用 jcmd <pid> Thread.print 查看线程栈。",
      "是否能使用 jcmd <pid> GC.heap_info 查看堆信息。",
      "是否知道 JFR 生成的是 .jfr 文件，可以用 jfr summary 或 JMC 查看。",
      "是否理解堆 dump 和诊断文件可能包含敏感数据，需要谨慎保存和分享。"
    ],
    commonMistakes: [
      "程序已经退出后才执行 jcmd，pid 自然找不到。",
      "把操作系统进程号、端口号和线程 id 混为一谈。",
      "在生产环境随意执行 heap dump，造成磁盘压力或泄露敏感数据。",
      "只截取一份线程栈就下结论，卡顿问题常常需要连续多次采样对比。",
      "看到大量 WAITING 线程就以为一定异常，很多线程等待任务是正常状态。",
      "启动 JFR 后忘记导出或查看 .jfr 文件，导致记录没有进入分析流程。"
    ],
    sources: [
      {
        title: "Oracle JDK 26 Tool Guide: The jcmd Command",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/man/jcmd.html"
      },
      {
        title: "Oracle JDK 26 Tool Guide: The jstack Command",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/man/jstack.html"
      },
      {
        title: "Oracle JDK 26 Tool Guide: The jmap Command",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/man/jmap.html"
      },
      {
        title: "Oracle JDK 26 Tool Guide: The jfr Command",
        url: "https://docs.oracle.com/en/java/javase/26/docs/specs/man/jfr.html"
      },
      {
        title: "Oracle Java SE 26 Flight Recorder API Programmer's Guide",
        url: "https://docs.oracle.com/en/java/javase/26/jfapi/index.html"
      }
    ]
  }
];
