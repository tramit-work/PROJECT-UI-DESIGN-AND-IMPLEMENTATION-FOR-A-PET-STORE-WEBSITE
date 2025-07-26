from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/danhsach')
def danhsach():
    return render_template("shopping.html")

@app.route('/dichvu')
def dichvu():
    return render_template("dichvu.html")

@app.route('/thongtinsanpham')
def thongtinsanpham():
    return render_template("thongtinsanpham.html")

@app.route('/lienhe')
def lienhe():
    return render_template("lienhe.html")

@app.route('/chatbot', strict_slashes=False)
def chatbot():
    return render_template("chatbot.html")

if __name__ == "__main__":
    app.run(debug=True)
