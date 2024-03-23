import { translate } from 'google-translate-api-x';

async function performTranslation() {
  try {
    const res = await translate('how are you', { to: 'hi' });

    console.log(res.text); // Output: I speak English
    console.log(res.from.language.iso); // Output: nl
  } catch (error) {
    console.error('Error during translation:', error);
  }
}

performTranslation();