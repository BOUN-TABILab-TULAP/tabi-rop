#!/bin/bash
gunicorn -w 2  app:app -b 0.0.0.0:5001
