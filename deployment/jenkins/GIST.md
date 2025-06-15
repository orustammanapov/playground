Local Jenkins Setup
=================== 

Setup Docker Agent
__________________
```docker
# Install Docker Engine
# =====================
RUN apt-get update && apt-get install -y apt-transport-https \
    ca-certificates curl gnupg2 \
    software-properties-common

RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN apt-key fingerprint 0EBFCD88

RUN add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable"

# Install Docker CLI
# ==================
RUN apt-get update \
    && apt-get install -y docker-ce-cli

# Setup Docker Permissions
# ========================
RUN groupadd docker -g 1001 \
    && usermod -aG docker jenkins
```

Setup Docker Runtime
--------------------
```docker
RUN groupadd docker -g 1001
RUN groupadd docker && gpasswd -a jenkins docker 
RUN usermod -g docker jenkins
VOLUME /var/run/docker.sock
ENTRYPOINT groupmod -g $(stat -c “%g” /var/run/docker.sock) docker && \
    usermod -u $(stat -c “%u” /var/jenkins_home) jenkins
```

Install Jenkins Plugins
-----------------------
```docker
RUN jenkins-plugin-cli --plugins "blueocean:1.24.5 docker-workflow:1.26"
```

Java Execution Arguments
---
```docker
ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false
```

Add Bitbucket as Known Host
---------------------------
```docker
RUN mkdir ~/.ssh && chmod 0700 ~/.ssh \
    && touch ~/.ssh/known_hosts && chmod 644 ~/.ssh/known_hosts  \
    && ssh-keyscan -t rsa bitbucket.org >> ~/.ssh/known_hosts
```