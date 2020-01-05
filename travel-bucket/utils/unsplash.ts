import Unsplash from 'unsplash-js';
import { UNSPLASH_KEY } from './constants';

const unsplash = new Unsplash({ accessKey: UNSPLASH_KEY });

export default unsplash;
