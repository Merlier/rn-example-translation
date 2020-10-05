/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import * as RNLocalize from 'react-native-localize';

import * as i18n from './i18n';
import LocalizationContext from './context/LocalizationContext';
import HomeScreen from './HomeScreen';

const App: () => React$Node = () => {
  const [locale, setLocale] = React.useState(i18n.DEFAULT_LANGUAGE);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, {locale, ...options}),
      locale,
      setLocale,
    }),
    [locale],
  );

  const handleLocalizationChange = useCallback(
    (newLocale) => {
      const newSetLocale = i18n.setI18nConfig(newLocale);
      setLocale(newSetLocale);
    },
    [locale],
  );

  useEffect(() => {
    handleLocalizationChange();

    RNLocalize.addEventListener('change', handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  return (
    <>
      <LocalizationContext.Provider value={localizationContext}>
        <HomeScreen localizationChange={handleLocalizationChange} />
      </LocalizationContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
