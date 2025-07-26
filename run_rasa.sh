#!/bin/bash
echo "Đang khởi động Rasa..."
source /opt/anaconda3/bin/activate rasa_env
cd rasa_backend 
rasa run --enable-api --cors "*" --debug
