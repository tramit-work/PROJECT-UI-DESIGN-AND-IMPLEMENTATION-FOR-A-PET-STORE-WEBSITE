#!/bin/bash
echo "Đang khởi động Rasa + Flask..."

# Chạy Flask ở nền (background)
bash run_flask.sh &

# Chạy Rasa ở foreground
bash run_rasa.sh
