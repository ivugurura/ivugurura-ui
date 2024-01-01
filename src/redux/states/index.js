import { AudioState } from './Audio';
import { CategoryState } from './Category';
import { ConfigState } from './Config';
import { MediaState } from './Media';
import { SystemState } from './System';
import { TopicState } from './Topic';
import { YoutubeState } from './Youtube';

export const appStates = [
  TopicState,
  SystemState,
  YoutubeState,
  AudioState,
  CategoryState,
  MediaState,
  ConfigState,
];
