FROM jenkins/jenkins:lts-jdk11

USER root

# Install Maven & Git-Flow
# ========================
RUN apt-get update \
    && apt-get -y install maven \
    && apt-get -y install git-flow \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

USER jenkins

# Install Jenkins Plugins
# =======================
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli -f /usr/share/jenkins/ref/plugins.txt

# Copy Configuration Files
# ========================
COPY config /usr/share/jenkins/ref/

# Copy Jobs
# =========
COPY jobs /usr/share/jenkins/ref/jobs

# Copy Maven Configuration
# ========================
COPY mvn /usr/share/jenkins/ref/.m2