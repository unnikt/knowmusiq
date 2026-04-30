// lib/getVideoData.ts
import { cache } from 'react';
import { knowmusiqAdminDB } from './server/knowmusiqAdmin';

export const getVideoData = cache(async (videoId: string) => {
    const doc = await knowmusiqAdminDB.collection('videos').doc(videoId).get();
    return doc.exists ? doc.data() : null;
});
