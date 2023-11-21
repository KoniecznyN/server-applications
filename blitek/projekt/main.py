from flask import Flask, request, render_template, session, redirect

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods = ['GET', 'POST'])
def handleform():
    a = float(request.form['a'])
    b = float(request.form['b'])
    c = float(request.form['c'])

    if (a == 0):
        return render_template('index.html', result = 'Dzielnik nie może wynosić 0')
    delta = (b**2 - 4 * a * c)
    if (delta == 0):
        miejsceZerowe = f'delta = {delta}, miejsce zerowe to: {-b/2*a}'
        return render_template('index.html', result = miejsceZerowe)
    if (delta < 0):
        miejsceZerowe = f'delta = {delta}, miejsce zerowe to: brak'
        return render_template('index.html', result = miejsceZerowe)
    if (delta > 0):
        x0 = (-b - delta**0.5) / (2 * a)
        x1 = (-b + delta**0.5) / (2 * a)
        miejsceZerowe = f'delta = {delta}, miejsca zerowe to: {x0} i {x1}'
        return render_template('index.html', result = miejsceZerowe)

if __name__ == '__main__':
    app.run(debug=True)