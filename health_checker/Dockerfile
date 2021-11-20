FROM python:3.9.6
COPY . /app
WORKDIR /app

RUN pip3 install -r requirements.txt

ENTRYPOINT [ "python" ]

CMD [ "main.py" ]

# CMD tail -f /dev/null
