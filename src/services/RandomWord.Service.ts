import shuffle from 'shuffle-array';
import animals from '../words/animals';
import food from '../words/food';
import objects from '../words/objects';
import verbs from '../words/verbs';
import professions from '../words/professions';

export default {
  async getListWords(category: string) {
    switch (category) {
      case 'animais':
        return shuffle(animals).slice(0, 30);
      case 'comida':
        return shuffle(food).slice(0, 30);
      case 'objetos':
        return shuffle(objects).slice(0, 30);
      case 'verbos':
        return shuffle(verbs).slice(0, 30);
      case 'profissoes':
        return shuffle(professions).slice(0, 30);
      default:
        return 'Envie uma categoria';
    }
  },
};
