import { createSelector } from '@reduxjs/toolkit';
import {
  filter, find, findIndex, every, includes, difference,
  eq, gt, gte, lt, lte,
  isString,
  union
} from 'lodash';

export const getConfig = state => state.config;
export const getBlocks = state => state.blocks;
export const getFormData = state => state.form;
const getBlockById = (state, id) => find(state.data, { id: id });
const getDestinationUrls = state => state.destinations;

export const getActiveBlock = createSelector(
  [getBlocks],
  blocks => find(blocks, { active: true })
);

export const getUnsyncedFormData = createSelector(
  [getFormData],
  data => filter(data, { synced: false })
);

export const getSyncedFormData = createSelector(
  [getFormData, getUnsyncedFormData],
  (data, unsynced) => difference(data, unsynced)
);

export default {
  getConfig,
  getBlocks,
  getActiveBlock,
  getFormData,
  getSyncedFormData,
  getUnsyncedFormData
};