import React from "react";

import "./SignIn.css";

function Error({ message }) {
  return message ? (
    <div className="alert alert-danger fade show SignIn--error" role="alert">
      <div class="alert-heading">
        <strong>Ошибка входа в кассу</strong>
      </div>
      {message}
    </div>
  ) : (
    ""
  );
}

function Button({ onClick, isFetching }) {
  const buttonType = isFetching ? "secondary" : "primary";
  const buttonClass = `btn btn-${buttonType} btn-block`;

  return (
    <button onClick={onClick} className={buttonClass} type="button">
      {isFetching ? (
        <span
          className="spinner-border spinner-border-sm text-warning"
          role="status"
          aria-hidden="true"
        />
      ) : (
        "Войти"
      )}
    </button>
  );
}

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      errorMessage: "",
      cashboxID: "",
      phone: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { cashboxID, phone, password } = this.state;
    if (!cashboxID || !phone || !password) return;

    this.setState({ isFetching: true, errorMessage: "" }, () => {
      (async () => {
        const rawResponse = await fetch("https://httpbin.org/post", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ a: 1, b: "Textual content" })
        });
        const content = await rawResponse.json();
        console.log(content);
        this.setState({
          isFetching: false,
          errorMessage: "Номер кассы введён неправильно или не зарегистрирован"
        });
      })();
    });
  }

  render() {
    const { isFetching, errorMessage, cashboxID, phone, password } = this.state;
    return (
      <div className="SignIn text-center">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Вход в кассу</h1>
          <Error message={errorMessage} />

          <fieldset disabled={isFetching}>
            <label htmlFor="inputCashboxID" className="sr-only">
              Номер кассы
            </label>
            <input
              type="number"
              id="inputCashboxID"
              name="cashboxID"
              className="form-control"
              placeholder="Номер кассы"
              value={cashboxID}
              onChange={this.handleChange}
              required
              autoFocus
            />
            <label htmlFor="inputPhone" className="sr-only">
              Номер телефона
            </label>
            <input
              type="tel"
              id="inputPhone"
              name="phone"
              className="form-control"
              value={phone}
              placeholder="Номер телефона"
              onChange={this.handleChange}
              required
            />
            <label htmlFor="inputPassword" className="sr-only">
              Пароль
            </label>
            <input
              type="password"
              id="inputPassword"
              name="password"
              className="form-control"
              value={password}
              placeholder="Пароль"
              onChange={this.handleChange}
              required
            />
          </fieldset>

          <Button onClick={this.handleSubmit} isFetching={isFetching} />
          <p className="mt-5 mb-3 text-muted">&copy; 2016-2019 Pult Fiscal</p>
        </form>
      </div>
    );
  }
}

export default SignIn;
