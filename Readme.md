### Gradle Webapp Sample

https://spring.io/guides/gs/spring-boot-docker/

Gradle Build
```
gradlew clean build -Pprofile=dev -x test && java -jar build/libs/gradle-webapp-1.0-SNAPSHOT.jar
```

Docker Build/Run
```
$ docker build --build-arg JAR_FILE=build/libs/*.jar -t cheol/gradle-webapp-docker:1.0-SNAPSHOT
$ docker run -p 8080:8080 cheol/gradle-webapp-docker
```

```text
cd src\main
vue create frontend
```

Dev 서버 Proxy 설정
- Local 개발 Proxy
- vue.config.js
```javascript
const path = require('path')

module.exports = {
    
    devServer: {
        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        proxy: {
            '/': {
                target: 'http://localhost:9000',
                ws: true,
                changeOrigin: true
            },
        }
    }
}
```

Vue 실행
```
npm run server
```

Vue 빌드
```javascript
npm run build
```

build 위치 설정
- 위치 설정 없을 경우 (root)/static
- vue.config.js
```javascript
module.exports = {
    ....
    outputDir: path.resolve(__dirname, "../" + "resources/static"),
    ...
}
```

gradle build 할 때 npm build
```groovy
plugins {
...
    id 'com.moowork.node' version '1.3.1'
...
}

node {
    version = '14.15.1'
    npmVersion = '6.14.8'
    workDir = file('./src/main/frontend')
    npmWorkDir = file('./src/main/frontend')
    nodeModulesDir = file('./src/main/frontend')
}
```

```groovy
task setUp(type: NpmTask) {
    description = "Install Node.js packages"
    args = ['install']
    inputs.files file('package.json')
    outputs.files file('node_modules')
}

task buildFrontEnd(type: NpmTask, dependsOn: setUp) {
    description = "Build vue.js"
    args = ['run', 'build']
}

processResources.dependsOn 'buildFrontEnd'
```

참고한 링크

https://deockstory.tistory.com/26

vue js devServer proxy : https://cli.vuejs.org/config/#devserver-proxy

Gradle npmTask: https://github.com/srs/gradle-node-plugin/blob/master/docs/node.md