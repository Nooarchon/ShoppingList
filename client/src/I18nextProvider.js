import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Your i18n configuration

ReactDOM.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
