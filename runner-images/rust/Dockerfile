FROM rust:1-bullseye


WORKDIR /runner

COPY ./start.sh /runner


USER user:user



ENTRYPOINT ["/bin/sh","/runner/start.sh"]

