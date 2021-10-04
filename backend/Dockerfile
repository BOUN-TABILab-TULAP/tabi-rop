FROM python:3.9.6
COPY . /app
WORKDIR /app
# COPY requirements.txt /
RUN pip3 install -r requirements.txt
RUN pip3 install -e .

# RUN cd src
ENTRYPOINT [ "python" ]

CMD [ "app.py" ]

# Keeps the container running but does not start the python server. For Debug purposes
# CMD tail -f /dev/null
