import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';

import LocalizationContext from './context/LocalizationContext';

function HomeScreen(props) {
  const {localizationChange} = props;
  const {t, locale, setLocale} = useContext(LocalizationContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React-Native example translation</Text>
      <Text style={styles.subtitle}>{t('Home screen')}</Text>
      <Text style={styles.paragraph}>Locale: {locale}</Text>

      {locale === 'en' ? (
        <Button title="FR" onPress={() => localizationChange('fr')} />
      ) : (
        <Button title="EN" onPress={() => localizationChange('en')} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 40,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
  },
  langButton: {
    flex: 1,
  },
});

export default HomeScreen;
