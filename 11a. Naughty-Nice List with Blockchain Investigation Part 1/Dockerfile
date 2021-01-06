# Provided for your convenience, feel free to use this if it's helpful

FROM python:3

# Install dev tools
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get -y --no-install-recommends install ca-certificates vim nano

WORKDIR /usr/src/app

RUN pip install --no-cache-dir pycryptodome

CMD [ "bash" ]
