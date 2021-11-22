FROM php:7.4.2-cli

# Setup sources list
RUN echo "deb http://deb.debian.org/debian/ buster main contrib non-free" > /etc/apt/sources.list
RUN echo "deb http://deb.debian.org/debian/ buster-updates main contrib non-free" >> /etc/apt/sources.list
RUN echo "deb http://security.debian.org/debian-security buster/updates main contrib non-free" >> /etc/apt/sources.list

RUN apt-get update && \
    apt-get -o Acquire::ForceIPv4=true -y \
    --allow-unauthenticated install \
    snmp-mibs-downloader \
    tcptraceroute \
    iputils-ping \
    libsnmp-dev \
    libssl-dev \
    net-tools \
    openssl \
    tcpdump \
    procps \
    snmp \
    wget \
    git \
    vim \
    htop

RUN cd /tmp && git clone https://github.com/swoole/swoole-src.git && \
    cd swoole-src && \
    git checkout v4.4.15 && \
    phpize  && \
    ./configure  --enable-openssl && \
    make && make install

RUN touch /usr/local/etc/php/conf.d/swoole.ini && \
    echo 'extension=swoole.so' > /usr/local/etc/php/conf.d/swoole.ini

# Install all needed extionsions in php
RUN docker-php-ext-install \
    snmp \
    pcntl

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64
RUN chmod +x /usr/local/bin/dumb-init

RUN download-mibs

RUN apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/usr/local/bin/dumb-init", "--", "php"]
