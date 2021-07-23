FROM python:3.9.6
COPY requirements.txt /
RUN pip3 install -r /requirements.txt

COPY . /app
WORKDIR /app

ENTRYPOINT [ "python" ]

CMD [ "app.py" ]
