FROM python:3.9.6
COPY . /app
WORKDIR /app
# COPY requirements.txt /
# RUN pip3 install -r requirements.txt
RUN pip3 install -e .
RUN apt update && apt install nodejs -y

# RUN cd src
ENTRYPOINT [ "python" ]

CMD [ "app.py" ]
