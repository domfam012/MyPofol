'use strict';

module.exports = {
    apps: [
        {
            name: "MyPofol", // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
            script: "./server.js", // pm2로 실행될 파일 경로
            watch: true, // 파일이 변경되면 자동으로 재실행 (true || false)
            env: {
                "PORT": 8080,
                "NODE_ENV": "development" // 개발환경시 적용될 설정 지정
            },
            env_production: {
                "PORT": 80,
                "NODE_ENV": "production" // 배포환경시 적용될 설정 지정
            }
        }
    ]
};

/**
 *  sudo npm run build
 *  sudo pm2 start ecosystem.config.js                   // NODE_ENV: "development"
 *  sudo pm2 start ecosystem.config.js --env production    // NODE_ENV: "production"
 */
