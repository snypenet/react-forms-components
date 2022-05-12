import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import TextInput from './components/TextInput';

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmit = (validation) => {
    if (validation.isValid) {
      console.log('submitted!');
      setEmail('');
      setPassword('');
    } else {
      console.log('failed to submit');
    }
  };

  const emailValidation = (value) => {
    const messages = [];
    if (!value) {
      messages.push('Email is required!');
    } else {
      if (value.indexOf('@') === -1) {
        messages.push('Email must contain an @ symbol');
      }

      if (value.indexOf('.') === -1) {
        messages.push('Email must contain a . to donate the domain');
      }
    }

    return messages;
  }

  const passwordValidate = (value) => {
    const messages = [];

    if (!value) {
      messages.push('Password is required');
    }

    return messages;
  }

  return (
    <Form id="login-form" onSubmit={handleOnSubmit}>
      <TextInput id="login-email"
        name="login-email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        validation={[emailValidation]} />
      <TextInput id="login-password"
        name="login-password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        validation={[passwordValidate]} />
    </Form>
  );
}

export default App;
