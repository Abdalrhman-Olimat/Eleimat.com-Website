export type ContentBlock = 
  | { type: 'text'; content: string }
  | { type: 'image'; content: string; alt?: string }
  | { type: 'code'; content: string; language?: string };

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  techStack: string[];
  content: ContentBlock[];
  githubLink: string;
}

export const projects: Project[] = [
  {
    id: "minishell",
    title: "Minishell",
    shortDescription: "A minimal bash-like shell implementation with pipes, redirections, and built-in commands.",
    techStack: ["C", "Unix", "Shell", "Makefile"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nMinishell is a simplified bash-like shell written in C. This project was developed as part of the 42 curriculum to understand how shells work under the hood."
      },
      {
        type: "text",
        content: "## Features\n\n- Command execution with absolute/relative paths\n- Built-in commands: echo, cd, pwd, export, unset, env, exit\n- Pipes and redirections (|, <, >, >>)\n- Environment variable expansion ($VAR)\n- Signal handling (Ctrl+C, Ctrl+D, Ctrl+\\)"
      },
      {
        type: "code",
        content: `int execute_command(t_cmd *cmd, t_env *env)
{
    pid_t pid;
    int   status;
    
    pid = fork();
    if (pid == 0)
    {
        if (cmd->redirections)
            handle_redirections(cmd);
        execve(cmd->path, cmd->args, env->envp);
        exit(127);
    }
    waitpid(pid, &status, 0);
    return (WEXITSTATUS(status));
}`,
        language: "c"
      },
      {
        type: "text",
        content: "## Technical Challenges\n\n- Implementing a robust lexer/parser for shell grammar\n- Managing file descriptors for pipe chains\n- Proper memory management to avoid leaks\n- Handling edge cases in quote parsing"
      }
    ],
    githubLink: "https://github.com/Abdalrhman-Olimat/minishell"
  },
  {
    id: "webserv",
    title: "Webserv",
    shortDescription: "A fully functional HTTP server written in C++98 that handles non-blocking I/O, CGI execution, and configuration parsing.",
    techStack: ["C++", "Network Programming", "HTTP/1.1", "Sockets", "CGI"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nWebserv involves writing a custom HTTP server in **C++98**. The primary goal is to understand the intricacies of the Hypertext Transfer Protocol (HTTP) by building a server capable of handling real browser requests[cite: 4, 6]. \n\nUnlike modern frameworks, this project requires manual management of sockets, request parsing, and response generation."
      },
      {
        type: "text",
        content: "## Key Features\n\n- **HTTP Methods:** Supports `GET`, `POST`, and `DELETE` requests .\n- **I/O Management:** Uses a single `poll()` (or `epoll`/`kqueue`) loop to handle all non-blocking I/O operations simultaneously .\n- **Configuration System:** Parses a configuration file to define listening ports, root directories, error pages, and body size limits .\n- **CGI Support:** Executes external scripts (like PHP or Python) based on file extensions and passes environment variables .\n- **File Handling:** Allows users to upload files and serves static websites."
      },
      {
        type: "text",
        content: "## Technical Constraints\n\nThe server is built with strict resilience requirements:\n- It must never crash, even under stress or memory exhaustion .\n- All socket operations (read/write) must be non-blocking and monitored via `poll()` to ensure the server remains responsive .\n- The use of `fork` is strictly limited to CGI execution."
      },
      {
        type: "code",
        content: `// Example: Non-blocking I/O Loop using poll()
int run_server(std::vector<struct pollfd> &fds) {
    while (true) {
        int ret = poll(fds.data(), fds.size(), -1);
        if (ret < 0) throw std::runtime_error("Poll error");

        for (size_t i = 0; i < fds.size(); i++) {
            if (fds[i].revents & POLLIN) {
                if (is_server_socket(fds[i].fd))
                    accept_new_client(fds);
                else
                    handle_client_request(fds[i].fd);
            }
        }
    }
    return (0);
}`,
        language: "cpp"
      },
      {
        type: "text",
        content: "## Installation & Usage\n\n1. **Compile:**\n    make\n 2. **Run:** Provide a configuration file as an argument.\n  ./webserv config/default.conf\n"
      }
    ],
    githubLink: "https://github.com/Abdalrhman-Olimat/webserv"
  },
  {
    id: "philosophers",
    title: "Philosophers",
    shortDescription: "A multi-threaded dining philosophers problem solution using mutexes and semaphores.",
    techStack: ["C", "Threads", "Mutexes", "Unix"],
    content: [
      {
        type: "text",
        content: "## The Dining Philosophers Problem\n\nA classic synchronization problem: N philosophers sit at a round table with N forks. Each philosopher needs two forks to eat. The challenge is to prevent deadlock and starvation."
      },
      {
        type: "text",
        content: "## Implementation\n\n- Each philosopher is a separate thread\n- Forks are protected by mutexes\n- A monitoring thread checks for deaths\n- Precise timing using gettimeofday()"
      },
      {
        type: "code",
        content: `void *philosopher_routine(void *arg)
{
    t_philo *philo = (t_philo *)arg;
    
    while (!simulation_ended(philo->data))
    {
        take_forks(philo);
        eat(philo);
        drop_forks(philo);
        sleep_think(philo);
    }
    return (NULL);
}`,
        language: "c"
      },
      {
        type: "text",
        content: "## Key Learnings\n\n- Understanding race conditions and how to prevent them\n- Proper mutex locking order to prevent deadlocks\n- Precise timing is crucial for death detection\n- The importance of thread-safe logging"
      }
    ],
    githubLink: "https://github.com/Abdalrhman-Olimat/philosophers"
  },
  {
    id: "deepdive-platform",
    title: "DeepDive Platform",
    shortDescription: "A full-stack learning platform for developers featuring interactive tutorials and collaborative coding.",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nDeepDive Platform is the flagship product of DeepDiveNerds - an interactive learning platform designed to help developers master complex programming concepts through hands-on experience."
      },
      {
        type: "text",
        content: "## Key Features\n\n- Interactive code editor with real-time execution\n- Progress tracking and achievement system\n- Collaborative coding sessions\n- AI-powered code review and suggestions\n- Community forums and discussions"
      },
      {
        type: "code",
        content: `// Real-time code execution service
export class CodeExecutor {
  private sandbox: DockerSandbox;
  
  async execute(code: string, language: Language): Promise<ExecutionResult> {
    const container = await this.sandbox.createContainer(language);
    
    try {
      const result = await container.run(code, { timeout: 10000 });
      return { success: true, output: result.stdout, errors: result.stderr };
    } finally {
      await container.cleanup();
    }
  }
}`,
        language: "typescript"
      },
      {
        type: "text",
        content: "## Architecture\n\n- Microservices architecture with Docker containers\n- Real-time collaboration using WebSockets\n- CDN-distributed static assets\n- Auto-scaling based on user load\n- Secure sandboxed code execution"
      }
    ],
    githubLink: "https://www.linkedin.com/company/deep-dive-nerds/"
  },
  {
    id: "ft-transcendence",
    title: "ft_transcendence",
    shortDescription: "A real-time multiplayer Pong game with user authentication, chat, and matchmaking system.",
    techStack: ["TypeScript", "NestJS", "React", "PostgreSQL", "WebSocket"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nft_transcendence is the final project of the 42 common core - a full-stack web application featuring a real-time multiplayer Pong game with comprehensive social features."
      },
      {
        type: "text",
        content: "## Features\n\n- Real-time multiplayer Pong with matchmaking\n- OAuth 2.0 authentication (42 API)\n- Two-factor authentication (2FA)\n- Real-time chat with channels and DMs\n- Friend system and user profiles\n- Game history and leaderboards"
      },
      {
        type: "code",
        content: `@WebSocketGateway({ namespace: 'game' })
export class GameGateway {
  @SubscribeMessage('paddle_move')
  handlePaddleMove(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PaddleInput
  ) {
    const game = this.gameService.getGame(data.gameId);
    game.updatePaddle(client.id, data.position);
    
    this.server.to(data.gameId).emit('game_state', game.getState());
  }
}`,
        language: "typescript"
      },
      {
        type: "text",
        content: "## Technical Highlights\n\n- 60 FPS game loop with server-side validation\n- WebSocket-based real-time communication\n- Responsive design for mobile play\n- Comprehensive test coverage\n- Docker containerization for deployment"
      }
    ],
    githubLink: "https://github.com/Abdalrhman-Olimat/ft_transcendence"
  },
  {
    id: "so_long",
    title: "so_long",
    shortDescription: "A small 2D game built with MiniLibX involving map parsing, window management, and basic event handling.",
    techStack: ["C", "MiniLibX", "Graphics", "Game Dev"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nso_long is a simple 2D game where a dolphin (or hero) escapes a map after eating all the fish (collectibles). It serves as an introduction to window management, event handling, and texture rendering using the MiniLibX library."
      },
      {
        type: "text",
        content: "## Gameplay Features\n\n- **Graphics:** Renders a 2D isometric/top-down view using the MiniLibX library.\n- **Movement:** Smooth movement handling using keyboard inputs (WASD or Arrows).\n- **Objectives:** The player must collect all items (C) before the exit (E) opens.\n- **Map Parsing:** Reads map configurations from `.ber` files and validates them.\n- **Collision:** Handles interactions with walls and map boundaries.\n- **Counter:** Displays the current number of moves in the shell."
      },
      {
        type: "text",
        content: "## Technical Implementation\n\n### The Map (.ber)\nThe program parses a file passed as an argument. The map must obey strict rules:\n- Must be rectangular and surrounded by walls (1).\n- Must contain at least one exit (E), one start position (P), and one collectible (C).\n\n### Flood Fill Algorithm\nImplemented to ensure there is a valid path from the player to the exit and all collectibles before the game starts."
      },
      {
        type: "code",
        content: `int key_hook(int keycode, t_game *game)
{
    if (keycode == ESC)
        close_game(game);
    else if (keycode == W)
        move_player(game, 0, -1);
    else if (keycode == A)
        move_player(game, -1, 0);
    else if (keycode == S)
        move_player(game, 0, 1);
    else if (keycode == D)
        move_player(game, 1, 0);
    return (0);
}`,
        language: "c"
      },
      {
        type: "text",
        content: "## Installation & Usage\n\n**Requirements:** `gcc`, `make`, `MiniLibX`\n\n```bash\ngit clone [https://github.com/Abdalrhman-Olimat/so_long.git](https://github.com/Abdalrhman-Olimat/so_long.git)\ncd so_long\nmake\n./so_long maps/level1.ber\n```\n\n**Controls:**\n- `W / ⬆️`: Move Up\n- `A / ⬅️`: Move Left\n- `S / ⬇️`: Move Down\n- `D / ➡️`: Move Right\n- `ESC`: Close Game"
      }
    ],
    githubLink: "https://github.com/Abdalrhman-Olimat/so_long"
  },
  {
    id: "push_swap",
    title: "push_swap",
    shortDescription: "A highly efficient sorting algorithm project using two stacks and a limited set of instructions.",
    techStack: ["C", "Algorithms", "Data Structures", "Complexity Analysis"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nPush_swap challenges you to sort data on a stack, with a limited set of instructions, using the lowest possible number of actions. To succeed, you must manipulate various types of algorithms and choose the most appropriate solution (optimized for complexity) for data sorting."
      },
      {
        type: "text",
        content: "## Key Features\n\n- **Two Stacks:** Sorting numbers using only Stack A and Stack B.\n- **Instruction Set:** `sa`, `sb`, `ss`, `pa`, `pb`, `ra`, `rb`, `rr`, `rra`, `rrb`, `rrr`.\n- **Algorithm Optimization:** sorting 100 numbers in < 700 operations and 500 numbers in < 5500 operations.\n- **Input Validation:** Handling duplicates, non-integers, and overflow values."
      },
      {
        type: "code",
        content: `void    sort_stacks(t_stack **a, t_stack **b)
{
    if (stack_size(*a) <= 5)
        simple_sort(a, b);
    else
    {
        // Pushing elements to B based on chunks or cost analysis
        while (stack_size(*a) > 3)
            pb(a, b); 
        sort_three(a);
        
        // Calculating cheapest cost to push back to A
        while (*b)
        {
            init_nodes_a(*a, *b);
            init_nodes_b(*a, *b);
            move_nodes(a, b); 
        }
    }
}`,
        language: "c"
      },
      {
        type: "text",
        content: "## Technical Challenges\n\n- Analyzing algorithmic complexity (Big O notation).\n- Implementing efficient sorting strategies (e.g., Radix sort, Turkish Algorithm).\n- Managing stack memory dynamically."
      }
    ],
    githubLink: "https://github.com/Abdalrhman-Olimat/push_swap"
  },
  {
    id: "get_next_line",
    title: "get_next_line",
    shortDescription: "A function that reads a file line by line, introducing the concept of static variables in C.",
    techStack: ["C", "File I/O", "Memory Management", "Static Variables"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nThis project requires writing a function that returns a line read from a file descriptor. It adds a convenient tool to your collection, allowing you to read text files one line at a time, regardless of the buffer size defined at compilation."
      },
      {
        type: "text",
        content: "## Features\n\n- **Buffer Management:** Reads efficiently using a customizable `BUFFER_SIZE`.\n- **Static Variables:** Persists data between function calls to handle partial reads.\n- **Multi-FD Support:** Capable of reading from multiple file descriptors simultaneously without losing thread."
      },
      {
        type: "code",
        content: `char    *get_next_line(int fd)
{
    static char *stash;
    char        *line;

    if (fd < 0 || BUFFER_SIZE <= 0)
        return (NULL);
    stash = read_from_file(fd, stash);
    if (!stash)
        return (NULL);
    line = extract_line(stash);
    stash = clean_stash(stash);
    return (line);
}`,
        language: "c"
      },
      {
        type: "text",
        content: "## Technical Challenges\n\n- Understanding how **static variables** persist in memory.\n- Preventing memory leaks when the buffer size is very large or very small.\n- Correctly handling the End of File (EOF) and newlines (`\\n`)."
      }
    ],
    githubLink: "https://github.com/Abdalrhman-Olimat/get_next_line"
  },
  {
    id: "ft_printf",
    title: "ft_printf",
    shortDescription: "A custom implementation of the standard C printf function using variadic arguments.",
    techStack: ["C", "Variadic Functions", "String Manipulation"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nThe goal of this project is to recode `printf()`. You will learn how to use variadic functions (`stdarg.h`) to handle a variable number of arguments and format outputs accordingly."
      },
      {
        type: "text",
        content: "## Features\n\n- **Format Specifiers:** Handles conversions for `%c`, `%s`, `%p`, `%d`, `%i`, `%u`, `%x`, `%X`, and `%%`.\n- **Variadic Arguments:** Uses `va_start`, `va_arg`, `va_copy`, and `va_end` to process inputs.\n- **Return Value:** Correctly calculates and returns the number of characters printed."
      },
      {
        type: "code",
        content: `int ft_printf(const char *format, ...)
{
    va_list args;
    int     count;

    count = 0;
    va_start(args, format);
    while (*format)
    {
        if (*format == '%')
        {
            count += handle_format(*(++format), args);
        }
        else
            count += ft_putchar(*format);
        format++;
    }
    va_end(args);
    return (count);
}`,
        language: "c"
      }
    ],
    githubLink: "https://github.com/Abdalrhman-Olimat/ft_printf"
  },
  {
    id: "libft",
    title: "Libft",
    shortDescription: "A foundational C library recreating standard libc functions to be used in future projects.",
    techStack: ["C", "Makefile", "Memory Management", "Linked Lists"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nLibft is the very first project at 42. It involves coding a C library consisting of standard functions (from `<string.h>`, `<stdlib.h>`, etc.) and additional utility functions that will be used throughout the curriculum."
      },
      {
        type: "text",
        content: "## Features\n\n- **Libc Functions:** `ft_strlen`, `ft_memset`, `ft_strchr`, `ft_atoi`, `ft_calloc`, etc.\n- **Additional Functions:** `ft_substr`, `ft_strjoin`, `ft_split`, `ft_itoa`.\n- **Bonus Part:** Linked list manipulation (`t_list`) including `ft_lstnew`, `ft_lstadd_back`, `ft_lstmap`."
      },
      {
        type: "code",
        content: `char    **ft_split(char const *s, char c)
{
    char    **result;
    int     word_count;
    int     i;

    if (!s)
        return (NULL);
    word_count = count_words(s, c);
    result = (char **)malloc(sizeof(char *) * (word_count + 1));
    if (!result)
        return (NULL);
    // Logic to allocate and copy each word into result...
    return (result);
}`,
        language: "c"
      },
      {
        type: "text",
        content: "## Technical Challenges\n\n- Strict memory management (allocation and freeing).\n- Creating a robust `Makefile` (rules: all, clean, fclean, re, bonus).\n- Deep understanding of pointer arithmetic and data types."
      }
    ],
    githubLink: "https://github.com/Abdalrhman-Olimat/Libft"
  },
  {
    id: "2048-wong-kar-wai",
    title: "2048",
    shortDescription: "A console-based recreation of the classic 2048 game featuring a polished UI built with the ncurses library.",
    techStack: ["C", "ncurses", "UI Design", "Game Logic"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nNamed after the director known for his visual flair, this project is a console-based implementation of the puzzle game 2048. It explores the power of the `ncurses` library to create a rich, interactive terminal application with color-coded tiles, menus, and smooth gameplay mechanics entirely in C."
      },
      {
        type: "text",
        content: "## Features\n\n- **Interactive UI:** Uses `ncurses` for real-time keyboard handling and dynamic screen updates without external graphics engines.\n- **Game Logic:** Full implementation of 2048 mechanics, including grid merging rules and win/loss detection.\n- **Visuals:** Color-coded tiles for better readability and a custom start menu.\n- **Stability:** Handles clean exits (graceful quitting) and screen redraws to prevent artifacts."
      },
      {
        type: "code",
        content: `void init_ncurses_setup(void)
{
    initscr();              // Start ncurses mode
    cbreak();               // Disable line buffering
    noecho();               // Don't echo input
    keypad(stdscr, TRUE);   // Enable special keys (arrows)
    curs_set(0);            // Hide cursor
    
    start_color();          // Initialize color
    init_pair(1, COLOR_WHITE, COLOR_BLACK);
    init_pair(2, COLOR_YELLOW, COLOR_BLACK);
    // ... setup pairs for specific tile values
}`,
        language: "c"
      },
      {
        type: "text",
        content: "## Technical Challenges\n\n- **Low-Level UI:** designing a user interface without standard GUI tools, relying on coordinate-based text rendering.\n- **Event Loop:** Managing the game loop to listen for input while maintaining the game state.\n- **Memory & Logic:** Efficiently manipulating 2D arrays to handle tile merging and spawning logic."
      }
    ],
    githubLink: "https://github.com/Abdalrhman-Olimat/2048"
  },
  {
    id: "born2beroot",
    title: "Born2BeRoot",
    shortDescription: "A rigorous system administration project focused on virtualization, LVM, and server security standards.",
    techStack: ["Linux (Debian)", "Bash", "Virtualization", "LVM", "SSH"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nBorn2BeRoot is an introduction to virtualization and system administration. The goal is to set up a Virtual Machine (VM) running a Linux server (Debian) with strict security protocols, partitioning schemes, and minimal software installation (no GUI)."
      },
      {
        type: "text",
        content: "## Features\n\n- **Virtualization:** Deployment of a minimal Linux server using VirtualBox.\n- **LVM & Encryption:** Implementation of Logical Volume Management with encrypted partitions.\n- **Security:** Strict password policies, sudo configuration, and UFW firewall setup (port 4242).\n- **SSH:** Secure remote access configuration forbidding root login.\n- **Monitoring:** A custom bash script that broadcasts system information to all terminals."
      },
      {
        type: "code",
        content: `#!/bin/bash

# Architecture
arch=$(uname -a)

# CPU physical
cpuf=$(grep "physical id" /proc/cpuinfo | wc -l)

# CPU load
cpul=$(top -bn1 | grep "^%Cpu" | cut -c 9- | xargs | awk '{printf("%.1f%%"), $1 + $3}')

# Last boot
lb=$(who -b | awk '$1 == "system" {print $3 " " $4}')

# LVM use
lvmu=$(if [ $(lsblk | grep "lvm" | wc -l) -gt 0 ]; then echo yes; else echo no; fi)

# Memory usage
ram_total=$(free -m | grep "Mem:" | awk '{print $2}')
ram_use=$(free -m | grep "Mem:" | awk '{print $3}')
ram_percent=$(free -m | grep "Mem:" | awk '{printf("%.1f"), $3/$2 * 100}')

# Disk usage
disk_total=$(df -h / | awk 'NR==2 {print $2}')
disk_use=$(df -h / | awk 'NR==2 {print $3}')
disk_percent=$(df -h / | awk 'NR==2 {print $5}')

wall "	#Architecture: $arch
  #CPU physical : $cpuf
  #vCPU : $cpuv
  #Memory Usage: $ram_use/{ram_total}MB ($ram_percent%)
  #Disk Usage: $disk_use/{disk_total} ($disk_percent%)
	#CPU load: $cpul
	#Last boot: $lb
	#LVM use: $lvmu
	#Connections TCP : $tcpc ESTABLISHED
	#User log: $ulog
	#Network: IP $ip ($mac)
	#Sudo : $cmnd cmd"`,
        language: "bash"
      },
      {
        type: "text",
        content: "## Technical Challenges\n\n- **Partitioning:** Manually configuring LVM partitions during OS installation.\n- **Sudoers Config:** Setting up strict rules for privilege escalation and logging.\n- **Scripting:** Parsing system metrics using tools like `top`, `free`, `lsblk`, and `grep`."
      }
    ],
   githubLink: "https://github.com/Abdalrhman-Olimat/Born2BeRoot"
  },
  {
    id: "qtech_cloud_migration",
    title: "QTech Cloud Migration",
    shortDescription: "A hybrid DevOps project combining AWS cloud infrastructure (ASG, ALB, S3) with rigorous on-premise Linux administration.",
    techStack: ["AWS", "Linux (RHEL)", "Bash", "Apache", "Networking"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nThis project simulates a complete enterprise migration for \"QTech\". It involves deploying a highly available web architecture on AWS and rebuilding the internal server infrastructure with strict security compliance standards."
      },
      {
        type: "text",
        content: "## Cloud Architecture (AWS)\n\n- **Auto Scaling & Load Balancing:** Configured an Application Load Balancer (ALB) acting as the \"Front Door\" , routing traffic to a dynamic Auto Scaling Group (ASG) that scales based on CPU utilization (>50%) .\n- **Security:** Implemented a \"Chain of Trust\" using Security Groups, ensuring EC2 instances only accept traffic from the ALB .\n- **Storage:** Utilized a private S3 bucket (`qtech-s3-htu`) to host static content, securely accessed via IAM Roles."
      },
      {
        type: "text",
        content: "## Internal System Administration\n\n- **User Management:** Structured departments (HR, Dev, Ops, IT) with dedicated groups and user accounts .\n- **Advanced Permissions:** Applied \"Sticky Bit\" and \"SGID\" (3770) to department directories to ensure file safety and proper group inheritance .\n- **Automation:** Developed User Data scripts for zero-touch server provisioning."
      },
      {
        type: "code",
        content: `#!/bin/bash
# Backup Script configured to run via Cron at 2:00 AM

BACKUP_ROOT="/company"
DEST_BUCKET="qtech-s3-htu"
LOG_FILE="/var/log/s3backup.log"
DEPTS=("hr" "dev" "ops" "management" "it")

log_message "Starting daily backup process..."

for DEPT in "\${DEPTS[@]}"; do
    ARCHIVE_NAME="\${DEPT}_$(date +%Y-%m-%d).tar.gz"
    
    # Compress department data
    tar -czf "/tmp/$ARCHIVE_NAME" -C "$BACKUP_ROOT" "$DEPT" 2>/dev/null
    
    # Upload to S3 if compression succeeded
    if [ $? -eq 0 ]; then
        aws s3 cp "/tmp/$ARCHIVE_NAME" "s3://$DEST_BUCKET/$ARCHIVE_NAME"
        log_message "UPLOAD SUCCESS: $ARCHIVE_NAME sent to S3."
    else
        log_message "COMPRESSION FAILED: Could not archive $DEPT."
    fi
done`,
        language: "bash"
      },
      {
        type: "text",
        content: "## Technical Challenges\n\n- **IAM Privileges:** Upgrading IAM roles from Read-Only to Write access to allow the internal server to perform backups.\n- **Network Security:** Designing tight inbound/outbound rules where the Internal Server is isolated from the public Web tier.\n- **Persistent Storage:** Integrating AWS CLI within a custom bash script to bridge local Linux filesystems with Cloud Object Storage."
      }
    ],
    githubLink: "https://github.com/Abdalrhman-Olimat/qtech_migration"
  },
  {
    id: "django-blog",
    title: "Full-Featured Django Blog Website",
    shortDescription: "A robust full-stack blog application with secure authentication and CRUD operations, styled with Tailwind CSS and custom animations.",
    techStack: ["Django", "Python", "PostgreSQL", "Tailwind CSS", "JavaScript"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nThis is a complete full-stack Blog Application built using the **Django web framework**. It demonstrates a scalable web solution for content management, adhering to Django’s **Model-Template-View (MTV)** architecture.\n\nUnlike standard template implementations, this project features a modern, responsive frontend built with **Tailwind CSS**, enhanced with **Vanilla JavaScript** and **custom animations** for a dynamic user experience."
      },
      {
        type: "text",
        content: "## Core Features\n\n- **User Authentication:** Registration, Login/Logout, and secure Password Reset via email.\n- **Profile Management:** Users can update their info and upload custom profile pictures (handled via Pillow).\n- **Full CRUD Functionality:** Authenticated users can Create, Read, Update, and Delete their own posts.\n- **Interactive Frontend:** Responsive layout using Tailwind CSS Grid/Flexbox with custom JS interactions."
      },
      {
        type: "text",
        content: "## Data Architecture\n\nThe application is structured into two main apps: **Blog** (content) and **Users** (auth). \n\n**Key Models:**\n- **User:** Handles authentication (One-to-One with Profile).\n- **Profile:** Extends user data with profile images.\n- **Post:** Core content containing title, body, and author (Many-to-One with User)."
      },
      {
        type: "code",
        content: `DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'capstone_blog_db',
        'USER': 'your_postgres_user',
        'PASSWORD': 'your_postgres_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}`,
        language: "python"
      },
      {
        type: "text",
        content: "## Installation\n\n1. **Clone & Setup:**\n   ```bash\n   git clone [https://github.com/Abdalrhman-Olimat/Blog-Website-Django.git](https://github.com/Abdalrhman-Olimat/Blog-Website-Django.git)\n   cd Blog-Website-Django\n   python3 -m venv venv\n   source venv/bin/activate\n   pip install -r requirements.txt\n   ```\n\n2. **Database Config:** Ensure PostgreSQL is running and update `settings.py`.\n\n3. **Run Migrations & Server:**\n   ```bash\n   python manage.py makemigrations\n   python manage.py migrate\n   python manage.py createsuperuser\n   python manage.py runserver\n   ```"
      }
    ],
    githubLink: "https://github.com/Abdalrhman-Olimat/Blog-Website-Django"
  },
  {
    id: "cub3d",
    title: "Cub3D",
    shortDescription: "A 3D graphical maze game using Raycasting (Wolfenstein 3D style) built with C and MiniLibX.",
    techStack: ["C", "MiniLibX", "Raycasting", "Mathematics", "Algorithms"],
    content: [
      {
        type: "text",
        content: "## Project Overview\n\nCub3D is a graphics project inspired by the world-famous Wolfenstein 3D (1992). The goal is to build a realistic 3D graphical representation of a maze from a first-person perspective using **Raycasting** principles."
      },
      {
        type: "text",
        content: "## Key Features\n\n- **Raycasting Engine:** Simulates 3D depth by casting rays from the player's viewpoint.\n- **Texture Mapping:** Renders distinct textures for North, South, East, and West wall faces.\n- **Map Parsing:** Reads `.cub` configuration files to load maze layout, colors, and texture paths.\n- **Player Movement:** First-person movement (WASD) and camera rotation (Left/Right arrows).\n- **Floor & Ceiling:** Renders custom RGB colors for the floor and ceiling."
      },
      {
        type: "text",
        content: "## Technical Implementation\n\n### The Math (DDA)\nThe core of the project relies on the **Digital Differential Analyzer (DDA)** algorithm. It allows us to calculate the intersection point of a ray with the grid lines of the map efficiently.\n\n### Fisheye Correction\nSince rays at the edge of the FOV travel longer distances than the center ray, a correction formula is applied to prevent walls from looking distorted (fisheye effect)."
      },
      {
        type: "code",
        content: `// Core DDA Algorithm Loop
void perform_dda(t_ray *ray, t_map *map)
{
    while (ray->hit == 0)
    {
        // Jump to next map square, OR in x-direction, OR in y-direction
        if (ray->side_dist_x < ray->side_dist_y)
        {
            ray->side_dist_x += ray->delta_dist_x;
            ray->map_x += ray->step_x;
            ray->side = 0; // Hit a vertical line (East/West)
        }
        else
        {
            ray->side_dist_y += ray->delta_dist_y;
            ray->map_y += ray->step_y;
            ray->side = 1; // Hit a horizontal line (North/South)
        }
        // Check if ray has hit a wall
        if (map->grid[ray->map_x][ray->map_y] == '1')
            ray->hit = 1;
    }
}`,
        language: "c"
      },
      {
        type: "text",
        content: "## Installation & Usage\n\n```bash\ngit clone [https://github.com/Abdalrhman-Olimat/cub3d.git](https://github.com/Abdalrhman-Olimat/cub3d.git)\ncd cub3d\nmake\n./cub3D maps/subject_map.cub\n```"
      }
    ],
    githubLink: "https://github.com/Abdalrhman-Olimat/cub3d"
  },


];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
