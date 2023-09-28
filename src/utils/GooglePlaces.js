// src/utils/GooglePlaces.js

import { GOOGLE_PLACES_API_KEY } from '../config';

export const searchNearbyClubs = async (location) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=500&type=night_club&key=${GOOGLE_PLACES_API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching nearby clubs:', error);
    return [];
  }
};

export const getClubDetails = async (placeId) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}`
    );
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error getting club details:', error);
    return null;
  }
};