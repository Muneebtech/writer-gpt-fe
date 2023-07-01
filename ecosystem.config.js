module.exports = {
    apps: [
      {
        name: 'writer-admin',
        script: 'node_modules/next/dist/bin/next',
        args: 'start',
        exec_mode: 'cluster',
        instances: '1',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
      },
    ],
  };