const express = require('express');
const bodyParser = require('body-parser');
const db = require('./demodb');
const path = require('path');
const app = express();
const port = 3306;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('html'));
app.use(express.static('css'));
app.use(express.static('imgs'));
//app.use(express.static('scripts'))

// Obsługa strony logowania
app.get('/login', (req, res) => {
    const loginPath = path.join(__dirname, 'html', 'login.html');
    res.sendFile(loginPath);
  });
app.get('/home', (req, res) => {
    const UserPanelPath = path.join(__dirname, 'html', 'grid-demo2.html');
    res.sendFile(UserPanelPath);
  });


// Obsługa danych z formularza logowania
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query('SELECT * FROM users WHERE Email = ? AND Password = ?', [email, password], (err, results) => {
    if (err) {
      console.error('Błąd zapytania SQL:', err);
      res.send('Błąd podczas logowania');
    } else {
      if (results.length > 0) {
        // Zalogowano pomyślnie
        res.redirect('/home')
      } else {
        // Nieprawidłowe dane logowania
        res.send('Nieprawidłowe dane logowania');
      }
    }
  });
});

// Obsługa strony rejestracji
app.get('/register', (req, res) => {
    const registerPath = path.join(__dirname, 'html', 'register.html');
    res.sendFile(registerPath);
  });
// Obsługa danych z formularza rejestracji
app.post('/register', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const acceptRules = req.body.acceptRules;
    const role = 'user';

    if (password !== confirmPassword) {
        return res.send('Different passwords');
      }
    
      // Sprawdź czy checkbox jest zaznaczony
      if (!acceptRules) {
        return res.send('Accept terms');
      }
    
  
    // Tutaj możesz korzystać z obiektu `db` do wykonywania zapytań SQL
    db.query('INSERT INTO users (FirstName, LastName, Password, Email) VALUES (?, ?, ?, ?)', [firstName, lastName, password, email], (err, results) => {
      if (err) {
        console.error('Błąd zapytania SQL:', err);
        res.send('Registration ');
      } else {
        // Rejestracja pomyślna
        res.send('Succesfull Registration!');
      }
    });
  });

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});