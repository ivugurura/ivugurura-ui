import { AudioState } from './Audio';
import { CategoryState } from './Category';
import { ConfigState } from './Config';
import { CountState } from './Count';
import { MediaState } from './Media';
import { TopicState } from './Topic';
import { YoutubeState } from './Youtube';

export const appStates = [
  TopicState,
  CountState,
  YoutubeState,
  AudioState,
  CategoryState,
  MediaState,
  ConfigState,
];
