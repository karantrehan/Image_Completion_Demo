
# docker build -t myenvdocker .
# docker run -it --rm -v "$(pwd)":"/workdir" myenvdocker

FROM ubuntu:16.04

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

RUN apt-get update --fix-missing && apt-get install -y wget bzip2 ca-certificates \
    libglib2.0-0 libxext6 libsm6 libxrender1 \
    git mercurial subversion

# Install Python

# Install Python.
RUN \
  apt-get update && \
  apt-get install -y vim python python-tk python-dev python-pip python-virtualenv cmake libcupti-dev protobuf-compiler   python-protobuf && \
  rm -rf /var/lib/apt/lists/*


RUN pip install --upgrade pip
RUN pip install pillow matplotlib tqdm numpy editdistance scipy edit_distance python-Levenshtein shapely opencv-python
RUN pip install tensorflow
RUN pip install keras
RUN pip install flask flask-cors


COPY . /usr/src/app


CMD ["python", "/usr/src/app/serve.py"]
