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
    githubLink: "https://github.com/username/minishell"
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
    githubLink: "https://github.com/username/philosophers"
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
    githubLink: "https://github.com/deepdivenerds/platform"
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
    githubLink: "https://github.com/username/ft_transcendence"
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
