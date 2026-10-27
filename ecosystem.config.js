module.exports = {
  apps: [
    {
      name: 'beast-master-system-bus',
      script: './scripts/beast_master_system_bus.py',
      interpreter: 'python3',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        PYTHONUNBUFFERED: '1',
        BEAST_ORG: 'New World Order Private Government DAO LLC'
      }
    },
    {
      name: 'beast-ai-agent-dispatcher',
      script: './backend/beast_ai_agent_dispatcher.py',
      interpreter: 'python3',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1GB',
      env: {
        PYTHONUNBUFFERED: '1',
        GEMINI_API_KEY: process.env.GEMINI_API_KEY
      }
    },
    {
      name: 'beast-nextjs-command-center',
      script: 'npm',
      args: 'run start',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1GB',
      env: {
        PORT: 3000,
        NODE_ENV: 'production'
      }
    }
  ]
};
