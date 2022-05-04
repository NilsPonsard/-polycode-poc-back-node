FROM python:3


WORKDIR /runner

COPY ./start.sh /runner

RUN chown -R 1000:1000 /runner

USER 1000:1000



ENTRYPOINT ["/bin/sh","/runner/start.sh"]

