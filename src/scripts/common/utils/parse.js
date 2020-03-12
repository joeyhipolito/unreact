import { attempt } from 'lodash';

export const parse = str => attempt(JSON.parse.bind(null, str));

export default parse;